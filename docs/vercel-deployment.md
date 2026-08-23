# Vercel Deployment Guide

## Overview
Vercel hosts the Next.js marketing site and the Node.js API routes required for Nodemailer.

## Deployment Steps
1. Push to GitHub `main` branch.
2. Vercel automatically deploys.

## Required Environment Variables
**MANUAL ACTION REQUIRED**
The following variables must be added to the Vercel Dashboard (Settings > Environment Variables) and marked as **Sensitive** where appropriate:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (Sensitive)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS` (Sensitive)
- `SMTP_FROM`
- `SMTP_REPLY_TO`
- `LEAD_NOTIFICATION_EMAIL`
- `SUPABASE_WEBHOOK_SECRET` (Sensitive)

After adding these, **Redeploy** the project in Vercel to activate them.
