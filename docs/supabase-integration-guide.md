# Supabase Integration Guide

## Overview
This guide covers how Supabase is integrated into the Logic Intelligence Technologies platform for Database, Auth, and Webhooks.

## Project Connection
1. Log into your Supabase Dashboard.
2. Select your project.
3. Retrieve your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from **Project Settings > API**.
4. Retrieve your `SUPABASE_SERVICE_ROLE_KEY` from the same page (mark as sensitive).

## Applying Migrations
Migrations are applied via the Supabase CLI:
```bash
supabase link --project-ref your_project_ref
supabase db push
```
This applies `20260823000000_init_schema.sql` and `20260823000001_email_tracking.sql`.

## Verifying RLS
All sensitive tables (`profiles`, `leads`, `checklist_submissions`) have Row Level Security enabled. 
- Public users cannot read sensitive data.
- Server-side routes bypass RLS using the Service Role Key to safely insert data after validation.

## Manual Dashboard Configurations

### 1. Auth URL Configuration
- Navigate to **Authentication > URL Configuration**.
- Set **Site URL** to: `https://logic-intelligence-technologies.vercel.app`
- Add **Redirect URLs**:
  - `http://localhost:3000/auth/callback`
  - `https://logic-intelligence-technologies.vercel.app/auth/callback`

### 2. Signup Webhook
- Navigate to **Database > Webhooks**.
- Create a new Webhook:
  - **Name:** Send Welcome Email on Signup
  - **Table:** `users` (under `auth` schema)
  - **Events:** `INSERT`
  - **Method:** `POST`
  - **URL:** `https://logic-intelligence-technologies.vercel.app/api/webhooks/signup`
  - **HTTP Headers:** Add `Authorization` with value `Bearer YOUR_SUPABASE_WEBHOOK_SECRET`
