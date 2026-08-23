# Vercel Migration & Preparation

## Why GitHub Pages is Not Suitable
GitHub Pages is a static file host. It cannot execute server-side Node.js code. Because the Logic Intelligence application relies on dynamic API Route Handlers (`/api/contact`) to securely communicate with the Gmail SMTP server via Nodemailer and securely interact with the Supabase database using the `service_role` key, a Serverless runtime environment is mandatory. Vercel provides this runtime natively.

## Settings Modified for Vercel
- Removed `output: 'export'` from `next.config.ts` to restore API route support.
- Removed GitHub Actions deployment workflow (`.github/workflows/nextjs.yml`).
- Removed `gh-pages` deploy scripts from `package.json`.
- Kept `export const runtime = "nodejs";` in the `/api/contact` route.

## Vercel Import Guide
1. Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New → Project**.
3. Import the `vikashsaravanann/Logic-Intelligence` repository.
4. Framework preset: **Next.js**.
5. Root directory: `./`

## Required Environment Variables
Add the following in Vercel **Project Settings → Environment Variables**:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (Set to the generated Vercel URL, e.g., `https://logic-intelligence-technologies.vercel.app`)
- `SUPABASE_SERVICE_ROLE_KEY` (Sensitive)
- `SMTP_HOST` (`smtp.gmail.com`)
- `SMTP_PORT` (`465`)
- `SMTP_SECURE` (`true`)
- `SMTP_USER` (`logicwithvikash@gmail.com`)
- `SMTP_PASS` (Sensitive - Gmail App Password)
- `SMTP_FROM` (`Logic Intelligence Technologies <logicwithvikash@gmail.com>`)
- `SMTP_REPLY_TO` (`logicwithvikash@gmail.com`)
- `LEAD_NOTIFICATION_EMAIL` (`logicwithvikash@gmail.com`)
- `SUPABASE_WEBHOOK_SECRET` (Sensitive)

## Supabase Configuration (Post-Deployment)
Once the Vercel app is live:
1. **Auth URL:** In Supabase, go to Authentication → URL Configuration and set the Site URL to your new Vercel domain.
2. **Webhooks:** In Supabase, go to Database → Webhooks and point your signup webhook to `https://[YOUR_VERCEL_DOMAIN]/api/webhooks/signup`.

## Legacy Strategy
GitHub Pages should be fully retired from the repository settings to avoid duplicate, broken deployments.

## Rollback Process
If Vercel experiences issues, Vercel supports instant one-click rollbacks to previous production deployments directly from the Deployments tab in the dashboard.
