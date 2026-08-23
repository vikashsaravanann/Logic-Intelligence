# Vercel Integration Guide

## Overview
Vercel hosts the Next.js App Router marketing website, Server-Side API Routes, and Nodemailer email integrations.

## Manual Vercel Setup Steps

1. Go to Vercel Dashboard.
2. Click Add New → Project.
3. Import: `vikashsaravanann/Logic-Intelligence`
4. Confirm Next.js Framework Preset.
5. Add the following environment variables in the Vercel Dashboard Settings:

```env
NEXT_PUBLIC_SUPABASE_URL=your_value
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_value
NEXT_PUBLIC_SITE_URL=https://logic-intelligence-technologies.vercel.app
SUPABASE_SERVICE_ROLE_KEY=your_value (Mark as Sensitive)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=logicwithvikash@gmail.com
SMTP_PASS=your_app_password (Mark as Sensitive)
SMTP_FROM=Logic Intelligence Technologies <logicwithvikash@gmail.com>
SMTP_REPLY_TO=logicwithvikash@gmail.com
LEAD_NOTIFICATION_EMAIL=logicwithvikash@gmail.com
SUPABASE_WEBHOOK_SECRET=your_secret (Mark as Sensitive)
```

6. Click **Deploy**.
7. Test the live website contact forms to verify the server-side Node.js Nodemailer routes execute correctly.

## Node.js Runtime Requirement
Because Nodemailer is used for secure SMTP transaction emails, Vercel must run these specific `/api` routes on the Node.js runtime, not Edge. This is explicitly configured in the code with `export const runtime = "nodejs";`.
