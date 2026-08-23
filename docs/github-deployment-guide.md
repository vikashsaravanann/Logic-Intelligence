# GitHub Deployment Guide

## Git Workflow
This project uses a standard Git workflow:
- The `main` branch is the single source of truth for production.
- All new features should be developed on separate branches and merged into `main`.

## Safely Pushing Code
Always check your git status before committing to ensure no secrets are exposed:
```bash
git status
```
If you see `.env`, `.env.local`, or any credential file, DO NOT commit. 

Safe commit process:
```bash
git add .
git commit -m "feat: your feature description"
git push origin main
```

## Vercel Connection
Vercel is automatically connected to the `main` branch. Any commits pushed to `main` will automatically trigger a Vercel production deployment.

## Required Files
- `src/` (Next.js frontend and backend APIs)
- `supabase/migrations/` (Database schema changes)
- `.env.example` (Template for environment variables)
- `docs/` (System documentation)

## Forbidden Files
These files must NEVER be committed to GitHub:
- `.env`, `.env.local`, `.env.production`
- Actual passwords, including Gmail App Passwords
- Supabase Service Role Keys or Webhook Secrets
- Any raw credential files
