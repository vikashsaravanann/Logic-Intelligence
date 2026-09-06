"""
LLM → MCP client execution path (Agent 11).
Orchestrator loads tools from logic-intelligence-omni-publisher and executes
multi-channel publish autonomously.

Requires: mcp, any OpenAI-compatible client (Groq / vLLM / Ollama).
"""

from __future__ import annotations

import asyncio
import json
import os
from typing import Any

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


async def list_and_publish_example(root_caption: str, image_url: str | None = None) -> list[dict[str, Any]]:
    """
    Connect to the local MCP server over stdio, list tools, and fan-out publish.
    In production the orchestrating LLM selects tools; here we demonstrate direct calls.
    """
    server = StdioServerParameters(
        command="python",
        args=["-m", "mcp_server.server"]
        if False
        else [os.path.join(os.path.dirname(__file__), "server.py")],
        env=os.environ.copy(),
    )

    results: list[dict[str, Any]] = []
    async with stdio_client(server) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await session.list_tools()
            tool_names = [t.name for t in tools.tools]

            # Website long-form
            if "publish_website_db" in tool_names:
                r = await session.call_tool(
                    "publish_website_db",
                    {
                        "title": root_caption[:80],
                        "body_md": root_caption,
                        "cover_image_url": image_url,
                        "alt_text": root_caption[:120],
                        "seo_json": json.dumps(
                            {
                                "@type": "BlogPosting",
                                "headline": root_caption[:110],
                            }
                        ),
                    },
                )
                results.append({"tool": "publish_website_db", "result": r.content})

            if "publish_telegram_bot" in tool_names:
                r = await session.call_tool(
                    "publish_telegram_bot",
                    {"text": root_caption[:4096], "photo_url": image_url},
                )
                results.append({"tool": "publish_telegram_bot", "result": r.content})

            if "publish_discord_webhook" in tool_names:
                r = await session.call_tool(
                    "publish_discord_webhook",
                    {"content": root_caption[:2000]},
                )
                results.append({"tool": "publish_discord_webhook", "result": r.content})

    return results


def tool_specs_for_llm() -> list[dict[str, Any]]:
    """
    JSON-schema style tool definitions for Qwen/Llama function-calling.
    Bind these to your chat.completions tools= parameter.
    """
    return [
        {
            "type": "function",
            "function": {
                "name": "publish_discord_webhook",
                "description": "Post content to Discord via webhook",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "content": {"type": "string"},
                        "webhook_url": {"type": "string"},
                    },
                    "required": ["content"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "publish_telegram_bot",
                "description": "Send Telegram channel/group message",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "text": {"type": "string"},
                        "photo_url": {"type": "string"},
                        "chat_id": {"type": "string"},
                    },
                    "required": ["text"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "publish_website_db",
                "description": "Insert blog post into LIT website CMS (Supabase)",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {"type": "string"},
                        "body_md": {"type": "string"},
                        "cover_image_url": {"type": "string"},
                        "alt_text": {"type": "string"},
                        "seo_json": {"type": "string"},
                    },
                    "required": ["title", "body_md"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "publish_to_meta",
                "description": "Publish to Instagram, Facebook, or Threads via Graph API",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "platform": {
                            "type": "string",
                            "enum": ["instagram", "facebook", "threads"],
                        },
                        "caption": {"type": "string"},
                        "image_url": {"type": "string"},
                    },
                    "required": ["platform", "caption"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "publish_linkedin",
                "description": "Publish LinkedIn UGC post",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "commentary": {"type": "string"},
                        "image_url": {"type": "string"},
                    },
                    "required": ["commentary"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "publish_x",
                "description": "Post to X (Twitter) API v2",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "text": {"type": "string"},
                        "media_url": {"type": "string"},
                    },
                    "required": ["text"],
                },
            },
        },
    ]


if __name__ == "__main__":
    out = asyncio.run(list_and_publish_example("LIT omni-publisher smoke test"))
    print(json.dumps(out, indent=2, default=str))
