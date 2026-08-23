# Supabase Deployment Guide

## Migrations
The migrations for `profiles`, `leads`, and `checklist_submissions` have been successfully applied to your remote database via `supabase db push`. 

## RLS Verification
Row Level Security is enabled on all tables. Anonymous visitors cannot read sensitive data. Server-side API routes bypass this safely using the `SUPABASE_SERVICE_ROLE_KEY`.

## Auth Configuration
**MANUAL ACTION REQUIRED**
1. Navigate to **Authentication > URL Configuration**.
2. Set Site URL: `https://logic-intelligence-technologies.vercel.app`
3. Add redirect URL: `https://logic-intelligence-technologies.vercel.app/auth/callback`

## Database Webhook
**MANUAL ACTION REQUIRED**
1. Navigate to **Database > Webhooks**.
2. Create Webhook: Send Welcome Email on Signup
3. Table: `users` (auth schema)
4. Event: `INSERT`
5. Method: `POST`
6. URL: `https://logic-intelligence-technologies.vercel.app/api/webhooks/signup`
7. Header: `Authorization: Bearer YOUR_WEBHOOK_SECRET`
