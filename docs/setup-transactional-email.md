# Transactional Email Setup Guide

This guide outlines exactly how to configure the third-party services (Resend, Supabase, Vercel) required to power the Logic Intelligence Technologies transactional email system.

## 1. Resend Setup

1. **Create Account:** Sign up at [resend.com](https://resend.com).
2. **Verify Domain (Required for Production):** 
   - Go to **Domains** -> **Add Domain**.
   - Enter your domain (e.g., `logicintel.com`).
   - Add the provided TXT/MX records to your DNS provider (GoDaddy, Namecheap, Cloudflare, etc.).
   - Wait for verification.
3. **Generate API Key:**
   - Go to **API Keys** -> **Create API Key**.
   - Name it `Vercel Production`. Give it full access.
   - Copy the key (it starts with `re_...`).

## 2. Environment Variables Setup

You must define these variables in your Vercel Project Settings (and locally in `.env.local` for testing).

| Variable | Value Example |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhb...` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhb...` (Found in Supabase -> Settings -> API) |
| `RESEND_API_KEY` | `re_...` |
| `RESEND_SENDER_EMAIL` | `Logic Intelligence Technologies <hello@your-verified-domain.com>` |
| `LEAD_NOTIFICATION_EMAIL` | `logicwithvikash@gmail.com` |
| `SUPABASE_WEBHOOK_SECRET` | Create a random secure string (e.g. `MySecureSecret123!`) |
| `NEXT_PUBLIC_SITE_URL` | `https://your-production-domain.com` |

## 3. Supabase Auth Site URL Configuration

To ensure Supabase Auth redirects work correctly:
1. Go to **Supabase Dashboard** -> **Authentication** -> **URL Configuration**.
2. Set the **Site URL** to your Vercel production domain.
3. Add `http://localhost:3000` to the **Redirect URLs** if testing locally.

## 4. Supabase Webhook Setup (Welcome Emails)

To trigger the Welcome Email when a new user signs up:
1. Go to **Supabase Dashboard** -> **Database** -> **Webhooks**.
2. Click **Create Webhook**.
3. **Name:** `New User Signup Email`
4. **Table:** `auth.users`
5. **Events:** Only `INSERT`
6. **Type:** `HTTP Request`
7. **Method:** `POST`
8. **URL:** `https://your-production-domain.com/api/webhooks/signup`
9. **HTTP Headers:** Add a header:
   - **Key:** `Authorization`
   - **Value:** `Bearer MySecureSecret123!` (Must match your `SUPABASE_WEBHOOK_SECRET` exactly).

## 5. Security & Idempotency Testing

- **Signup Testing:** Create a new user in Supabase Auth. Verify the Welcome Email arrives exactly once.
- **Form Testing:** Submit the Free Demo form. Verify you receive the internal notification email, and the visitor receives the confirmation email.
- **Failure Resilience:** The code ensures that if Resend is unconfigured or fails, the Supabase insert (the actual business lead) still succeeds.

## 6. Troubleshooting

- **Emails not sending?** Check the Vercel logs. If it says `[Email MOCK]`, it means your `RESEND_API_KEY` is missing or invalid.
- **Emails going to spam?** Ensure your domain is verified in Resend.
- **Webhook returning 401?** Ensure the `Authorization` header exactly matches `Bearer <SUPABASE_WEBHOOK_SECRET>`.
