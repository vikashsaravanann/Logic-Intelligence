#!/usr/bin/env python3
"""
Logic Intelligence Technologies — Omni Publisher MCP Server
Agent 11 — MCP Tool & CLI Integration

Server name: logic-intelligence-omni-publisher
Transport: stdio (default) or SSE via MCP Python SDK

Install:
  pip install mcp httpx pydantic python-dotenv supabase pillow
"""

from __future__ import annotations

import json
import os
import re
from datetime import datetime, timezone
from typing import Any, Literal
from urllib.parse import quote

import httpx
from pydantic import BaseModel, Field, HttpUrl

try:
    from mcp.server.fastmcp import FastMCP
except ImportError:  # pragma: no cover
    from mcp.server.fastmcp import FastMCP  # type: ignore

mcp = FastMCP("logic-intelligence-omni-publisher")

Channel = Literal[
    "instagram",
    "facebook",
    "linkedin",
    "x",
    "telegram",
    "threads",
    "discord",
    "website",
]


class PublishResult(BaseModel):
    ok: bool
    channel: Channel
    external_id: str | None = None
    error: str | None = None
    raw: dict[str, Any] = Field(default_factory=dict)


def _client(timeout: float = 30.0) -> httpx.Client:
    return httpx.Client(timeout=timeout, follow_redirects=True)


def _slugify(title: str) -> str:
    s = title.lower().strip()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"[\s_]+", "-", s)
    return s[:80] or f"post-{int(datetime.now(tz=timezone.utc).timestamp())}"


# ---------------------------------------------------------------------------
# High-readiness tools
# ---------------------------------------------------------------------------


@mcp.tool()
def publish_discord_webhook(
    content: str,
    webhook_url: str | None = None,
    embeds_json: str | None = None,
) -> dict[str, Any]:
    """
    Publish a message to Discord via Incoming Webhook.
    Uses DISCORD_WEBHOOK_URL env if webhook_url omitted.
    """
    url = webhook_url or os.environ.get("DISCORD_WEBHOOK_URL")
    if not url:
        return PublishResult(
            ok=False, channel="discord", error="DISCORD_WEBHOOK_URL missing"
        ).model_dump()

    payload: dict[str, Any] = {"content": content[:2000]}
    if embeds_json:
        try:
            payload["embeds"] = json.loads(embeds_json)
        except json.JSONDecodeError:
            return PublishResult(
                ok=False, channel="discord", error="embeds_json invalid JSON"
            ).model_dump()

    with _client() as client:
        r = client.post(url, json=payload)
        if r.status_code not in (200, 204):
            return PublishResult(
                ok=False,
                channel="discord",
                error=f"HTTP {r.status_code}: {r.text[:300]}",
            ).model_dump()
        return PublishResult(
            ok=True, channel="discord", external_id="webhook", raw={"status": r.status_code}
        ).model_dump()


@mcp.tool()
def publish_telegram_bot(
    text: str,
    chat_id: str | None = None,
    bot_token: str | None = None,
    parse_mode: str = "HTML",
    photo_url: str | None = None,
) -> dict[str, Any]:
    """
    Publish to Telegram via Bot API (sendMessage or sendPhoto).
    Env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
    """
    token = bot_token or os.environ.get("TELEGRAM_BOT_TOKEN")
    chat = chat_id or os.environ.get("TELEGRAM_CHAT_ID")
    if not token or not chat:
        return PublishResult(
            ok=False,
            channel="telegram",
            error="TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing",
        ).model_dump()

    base = f"https://api.telegram.org/bot{token}"
    with _client() as client:
        if photo_url:
            r = client.post(
                f"{base}/sendPhoto",
                json={
                    "chat_id": chat,
                    "photo": photo_url,
                    "caption": text[:1024],
                    "parse_mode": parse_mode,
                },
            )
        else:
            r = client.post(
                f"{base}/sendMessage",
                json={
                    "chat_id": chat,
                    "text": text[:4096],
                    "parse_mode": parse_mode,
                    "disable_web_page_preview": False,
                },
            )
        data = r.json()
        if not data.get("ok"):
            return PublishResult(
                ok=False,
                channel="telegram",
                error=str(data.get("description") or r.text[:300]),
                raw=data,
            ).model_dump()
        msg_id = str(data.get("result", {}).get("message_id", ""))
        return PublishResult(
            ok=True, channel="telegram", external_id=msg_id, raw=data
        ).model_dump()


@mcp.tool()
def publish_website_db(
    title: str,
    body_md: str,
    cover_image_url: str | None = None,
    alt_text: str | None = None,
    excerpt: str | None = None,
    seo_json: str | None = None,
    source_omni_post_id: str | None = None,
) -> dict[str, Any]:
    """
    Insert a CMS row into Supabase/PostgreSQL table public.cms_posts.
    Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
    """
    supabase_url = os.environ.get("SUPABASE_URL") or os.environ.get(
        "NEXT_PUBLIC_SUPABASE_URL"
    )
    service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not service_key:
        return PublishResult(
            ok=False,
            channel="website",
            error="SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing",
        ).model_dump()

    seo: dict[str, Any] = {}
    if seo_json:
        try:
            seo = json.loads(seo_json)
        except json.JSONDecodeError:
            return PublishResult(
                ok=False, channel="website", error="seo_json invalid JSON"
            ).model_dump()

    row = {
        "title": title[:200],
        "slug": _slugify(title),
        "body_md": body_md,
        "excerpt": (excerpt or body_md[:180]),
        "cover_image_url": cover_image_url,
        "alt_text": alt_text,
        "seo": seo,
        "status": "published",
        "published_at": datetime.now(tz=timezone.utc).isoformat(),
        "source_omni_post_id": source_omni_post_id,
    }

    endpoint = f"{supabase_url.rstrip('/')}/rest/v1/cms_posts"
    with _client() as client:
        r = client.post(
            endpoint,
            headers={
                "apikey": service_key,
                "Authorization": f"Bearer {service_key}",
                "Content-Type": "application/json",
                "Prefer": "return=representation",
            },
            json=row,
        )
        if r.status_code not in (200, 201):
            return PublishResult(
                ok=False,
                channel="website",
                error=f"HTTP {r.status_code}: {r.text[:400]}",
            ).model_dump()
        data = r.json()
        row_id = None
        if isinstance(data, list) and data:
            row_id = str(data[0].get("id"))
        elif isinstance(data, dict):
            row_id = str(data.get("id"))
        return PublishResult(
            ok=True, channel="website", external_id=row_id, raw={"status": r.status_code}
        ).model_dump()


# ---------------------------------------------------------------------------
# Moderate-readiness: Meta Graph + LinkedIn + X wrappers
# ---------------------------------------------------------------------------


@mcp.tool()
def publish_to_meta(
    platform: Literal["instagram", "facebook", "threads"],
    caption: str,
    image_url: str | None = None,
    access_token: str | None = None,
    page_or_ig_user_id: str | None = None,
) -> dict[str, Any]:
    """
    Publish via Meta Graph API family (IG / FB Page / Threads).
    Tokens should be injected by the orchestrator from the encrypted vault —
    do not hardcode. Env fallbacks: META_ACCESS_TOKEN, META_PAGE_ID / IG_USER_ID.
    """
    token = access_token or os.environ.get("META_ACCESS_TOKEN")
    target = page_or_ig_user_id or os.environ.get(
        "IG_USER_ID" if platform == "instagram" else "META_PAGE_ID"
    )
    if not token or not target:
        return PublishResult(
            ok=False,
            channel=platform,  # type: ignore[arg-type]
            error="Meta access_token or page/ig user id missing",
        ).model_dump()

    graph = "https://graph.facebook.com/v21.0"
    with _client(timeout=60.0) as client:
        try:
            if platform == "facebook":
                # Page feed photo or status
                endpoint = f"{graph}/{target}/photos" if image_url else f"{graph}/{target}/feed"
                body: dict[str, Any] = {"access_token": token, "message": caption}
                if image_url:
                    body["url"] = image_url
                    body.pop("message", None)
                    body["caption"] = caption
                r = client.post(endpoint, data=body)
            elif platform == "instagram":
                # Container → publish (image required for basic feed post)
                if not image_url:
                    return PublishResult(
                        ok=False, channel="instagram", error="image_url required for IG"
                    ).model_dump()
                c = client.post(
                    f"{graph}/{target}/media",
                    data={
                        "image_url": image_url,
                        "caption": caption,
                        "access_token": token,
                    },
                )
                cdata = c.json()
                creation_id = cdata.get("id")
                if not creation_id:
                    return PublishResult(
                        ok=False,
                        channel="instagram",
                        error=str(cdata),
                        raw=cdata,
                    ).model_dump()
                r = client.post(
                    f"{graph}/{target}/media_publish",
                    data={"creation_id": creation_id, "access_token": token},
                )
            else:  # threads — Graph Threads API surface
                r = client.post(
                    f"{graph}/{target}/threads",
                    data={
                        "media_type": "TEXT" if not image_url else "IMAGE",
                        "text": caption,
                        "image_url": image_url or "",
                        "access_token": token,
                    },
                )
            data = r.json()
            if r.status_code >= 400 or data.get("error"):
                return PublishResult(
                    ok=False,
                    channel=platform,  # type: ignore[arg-type]
                    error=str(data.get("error") or data),
                    raw=data,
                ).model_dump()
            return PublishResult(
                ok=True,
                channel=platform,  # type: ignore[arg-type]
                external_id=str(data.get("id") or data.get("post_id")),
                raw=data,
            ).model_dump()
        except httpx.HTTPError as exc:
            return PublishResult(
                ok=False, channel=platform, error=str(exc)  # type: ignore[arg-type]
            ).model_dump()


@mcp.tool()
def publish_linkedin(
    commentary: str,
    author_urn: str | None = None,
    access_token: str | None = None,
    image_url: str | None = None,
) -> dict[str, Any]:
    """
    Publish a LinkedIn UGC post (text; image optional via separate asset flow).
    Env: LINKEDIN_ACCESS_TOKEN, LINKEDIN_AUTHOR_URN (urn:li:person:... or organization)
    """
    token = access_token or os.environ.get("LINKEDIN_ACCESS_TOKEN")
    author = author_urn or os.environ.get("LINKEDIN_AUTHOR_URN")
    if not token or not author:
        return PublishResult(
            ok=False,
            channel="linkedin",
            error="LINKEDIN_ACCESS_TOKEN or LINKEDIN_AUTHOR_URN missing",
        ).model_dump()

    body = {
        "author": author,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": commentary[:3000]},
                "shareMediaCategory": "NONE",
            }
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"},
    }
    # image_url would require registerUpload + binary upload — orchestrator pre-stages assets
    void image_url

    with _client() as client:
        r = client.post(
            "https://api.linkedin.com/v2/ugcPosts",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
                "X-Restli-Protocol-Version": "2.0.0",
            },
            json=body,
        )
        if r.status_code not in (200, 201):
            return PublishResult(
                ok=False,
                channel="linkedin",
                error=f"HTTP {r.status_code}: {r.text[:400]}",
            ).model_dump()
        data = r.json() if r.content else {}
        return PublishResult(
            ok=True,
            channel="linkedin",
            external_id=str(data.get("id") or r.headers.get("x-restli-id")),
            raw=data,
        ).model_dump()


@mcp.tool()
def publish_x(
    text: str,
    access_token: str | None = None,
    media_url: str | None = None,
) -> dict[str, Any]:
    """
    Post to X via API v2. Env: X_BEARER_TOKEN or X_USER_ACCESS_TOKEN.
    Media upload is a separate v1.1 flow; pass pre-uploaded media_id in future extension.
    """
    token = access_token or os.environ.get("X_USER_ACCESS_TOKEN") or os.environ.get(
        "X_BEARER_TOKEN"
    )
    if not token:
        return PublishResult(
            ok=False, channel="x", error="X access token missing"
        ).model_dump()

    payload: dict[str, Any] = {"text": text[:280]}
    void media_url

    with _client() as client:
        r = client.post(
            "https://api.x.com/2/tweets",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
            },
            json=payload,
        )
        data = r.json() if r.content else {}
        if r.status_code not in (200, 201):
            return PublishResult(
                ok=False, channel="x", error=str(data)[:400], raw=data
            ).model_dump()
        tweet_id = str((data.get("data") or {}).get("id") or "")
        return PublishResult(
            ok=True, channel="x", external_id=tweet_id, raw=data
        ).model_dump()


@mcp.tool()
def list_publish_tools() -> dict[str, Any]:
    """List registered Omni publishing tools and channel readiness."""
    return {
        "server": "logic-intelligence-omni-publisher",
        "tools": [
            {"name": "publish_discord_webhook", "readiness": "high"},
            {"name": "publish_telegram_bot", "readiness": "high"},
            {"name": "publish_website_db", "readiness": "high"},
            {"name": "publish_x", "readiness": "high"},
            {"name": "publish_linkedin", "readiness": "moderate"},
            {"name": "publish_to_meta", "readiness": "moderate", "platforms": ["instagram", "facebook", "threads"]},
        ],
    }


if __name__ == "__main__":
    mcp.run()
