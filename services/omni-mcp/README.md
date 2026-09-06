# Omni Publisher MCP Server

Server name: `logic-intelligence-omni-publisher`

## Run locally

```bash
cd services/omni-mcp
pip install -r requirements.txt
export DISCORD_WEBHOOK_URL=...
export TELEGRAM_BOT_TOKEN=...
export TELEGRAM_CHAT_ID=...
export SUPABASE_URL=...
export SUPABASE_SERVICE_ROLE_KEY=...
python server.py
```

## Tools

- `publish_discord_webhook`
- `publish_telegram_bot`
- `publish_website_db`
- `publish_x`
- `publish_linkedin`
- `publish_to_meta` (instagram | facebook | threads)
- `list_publish_tools`

Celery / cron workers should call these tools when `omni_publish_jobs` rows are due.
