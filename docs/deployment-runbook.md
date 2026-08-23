# Deployment Runbook

1. **Local Preparation:** Ensure code is tested and `.env.local` contains all credentials.
2. **GitHub Push:** `git push origin main` triggers Vercel.
3. **Supabase Migration Deployment:** Run `supabase db push`.
4. **Supabase Edge Function Deployment:** Not applicable.
5. **Vercel Deployment:** Wait for automatic build to finish.
6. **Vercel Environment Variable Setup:** Copy variables from `.env.local` into Vercel Dashboard and redeploy.
7. **Gmail App Password Setup:** Already configured in `.env.local` and uploaded to Vercel.
8. **Supabase Auth Configuration:** Add the Vercel URL to Auth Site URL settings.
9. **Supabase Webhook Configuration:** Add the Vercel `/api/webhooks/signup` endpoint.
10. **Production Testing:** Submit a test lead form on the live Vercel URL.
11. **Rollback Plan:** Revert commit in Git and rollback Vercel deployment.
12. **Security Rotation Plan:** If `SMTP_PASS` is exposed, revoke in Google Account and update Vercel.
