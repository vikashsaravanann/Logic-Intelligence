# Omni-Channel Autonomous Publishing Engine — Architecture

**Product:** Logic Intelligence Technologies  
**Pattern:** Hierarchical orchestrator–workers + MCP tool surface  
**Stack:** Next.js (App Router) · FastAPI · PostgreSQL/Supabase · Redis · Celery · MCP (stdio/SSE) · Pillow/FFmpeg

## System diagram

```
[Next.js Calendar UI]
        │ JWT
        ▼
[FastAPI Orchestrator API]
        │
        ├──► Content Adapter (Agent 4 LLM) ── platform copy variants
        ├──► Media Pipeline (Agent 7) ────── aspect crops
        ├──► SEO Enricher (Agent 9) ──────── hashtags, alt, JSON-LD
        ├──► Predictive Scheduler (Agent 5) ─ optimal send windows
        │
        ▼
[Celery + Redis] ── enqueue ScheduledPost at execute_at
        │
        ▼
[MCP Client] ── JSON-RPC tools on logic-intelligence-omni-publisher
        │
        ├── publish_instagram / facebook / threads  (Meta Graph)
        ├── publish_linkedin
        ├── publish_x
        ├── publish_telegram_bot
        ├── publish_discord_webhook
        └── publish_website_db  (Supabase CMS)
```

## Channels (8)

| Channel | Integration readiness | MCP tool |
|---------|----------------------|----------|
| Discord | High (webhook) | `publish_discord_webhook` |
| Telegram | High (Bot API) | `publish_telegram_bot` |
| X | High (API v2) | `publish_x` |
| LinkedIn | Moderate (OAuth) | `publish_linkedin` |
| Instagram | Moderate (Graph) | `publish_to_meta` (ig) |
| Facebook | Moderate (Graph) | `publish_to_meta` (fb) |
| Threads | Moderate (Graph) | `publish_to_meta` (threads) |
| Website CMS | High (DB) | `publish_website_db` |

## Security baseline

- OAuth tokens & API keys encrypted at rest (Fernet / AES-GCM; key in KMS/env)
- Service-role only for token table; RLS on user-owned posts
- MCP server runs in private network; no public exposure of tool endpoints
- Webhook signatures verified where applicable

## Deploy units

1. `frontend` — Vercel  
2. `backend` — container (API + Celery worker)  
3. `mcp_server` — sidecar / private process (stdio or SSE)  
4. Redis + Postgres (Supabase or managed)
