# Supabase Backend Audit

## Existing Project Structure

| Area | Location | Status | Required Action |
|---|---|---|---|
| Supabase CLI folder | `supabase/` | Present | Inspect migrations SQL (done) and update RLS/security policies via new migrations |
| CLI config | `supabase/config.toml` | Present | None |
| Migrations | `supabase/migrations/` | Present (single init migration) | Keep existing migration; add new non-destructive migrations to tighten RLS/admin rules |
| Edge Functions | `supabase/functions/` | Empty | None (no login-events/instagram sync needed) |
| Tests | `supabase/tests/` | Missing/Unknown | Create `supabase/tests/rls/` after RLS is corrected |

## Existing Database Schema

| Table | Exists in Code/Migrations | Expected Purpose | Required Action |
|---|---|---|---|
| `public.profiles` | Yes | User profile + role enforcement | Fix UPDATE policy so users cannot change `role` or `welcome_email_sent` |
| `public.contact_leads` | Yes | Contact form leads | Tighten RLS INSERT checks (optional validation; at least ensure no role fields etc.) |
| `public.demo_leads` | Yes | Free demo leads | Tighten RLS INSERT checks (optional validation; ensure intended fields only) |
| `public.checklist_leads` | Yes | Checklist submissions/leads | Add/ensure RLS policies block reads/updates/deletes for anon/authenticated (currently only INSERT is allowed) |

## Existing RLS Policies

| Table | RLS Status | Existing Policy Status | Risk | Required Action |
|---|---|---|---|---|
| `public.profiles` | Enabled | SELECT own profile; UPDATE own profile; no column restrictions | **High** (users can likely set `role='admin'` and modify `welcome_email_sent`) | Replace UPDATE policy with safe column-restricted approach; optionally add helper `is_admin()` and admin-only policies |
| `public.contact_leads` | Enabled | INSERT allowed for anon with `WITH CHECK (true)` | Medium (insert is wide open; still blocks reads/updates/deletes) | Tighten `WITH CHECK` to require valid inputs + restrict unexpected fields |
| `public.demo_leads` | Enabled | INSERT allowed for anon with `WITH CHECK (true)` | Medium | Tighten `WITH CHECK` similarly |
| `public.checklist_leads` | Enabled | INSERT allowed for anon with `WITH CHECK (true)` | Medium | Tighten `WITH CHECK` similarly |
| `public.login_events` | Not present | N/A | N/A | None |
| `public.instagram_posts` | Not present | N/A | N/A | None |

## Existing Auth Integration

| Feature | Status | Required Action |
|---|---|---|
| Email/password setup | Present (stated) | Ensure profile row creation exists (not shown in migration) and ensure role defaults to client only |
| Profile role enforcement | Present via `profiles.role` | Must be DB-enforced and non-escalatable (fix RLS UPDATE) |

## Existing Edge Functions

| Function | Purpose | Deno Compatible | Status | Required Action |
|---|---|---|---|---|
| None | — | — | Empty | None |

## Existing Environment Variables

| Variable | Public/Secret | Current Usage | Required Action |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Client createClient URL | None |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Client inserts into leads tables | Keep, but confirm RLS INSERT allows only safe inserts |
| Gmail SMTP creds | Secret | Used in Vercel Nodemailer routes | Ensure NOT used in Supabase Edge Functions |

## Deployment Readiness

| Requirement | Status | Required Action |
|---|---|---|
| No duplicate schema | Yes | None |
| RLS safety | Partially complete | Fix `profiles` UPDATE policy to prevent privilege escalation |
| Admin role protected | Currently insecure | Must update RLS policies / column restrictions |
| Gmail SMTP belongs in Vercel | Likely correct | Confirm code path is only Node runtime routes |

## Manual Requirements

| Requirement | Why Needed | Manual Action |
|---|---|---|
| Verify existing code writes to `contact_leads`, `demo_leads`, `checklist_leads` | Confirms anon inserts are appropriate | Confirm the API routes match the tables/policies |
| Create a real admin user | Needed because normal users must not self-escalate | Use Dashboard Table Editor or a secure admin procedure after RLS fix |
| Verify policy behavior | Ensure RLS denies reads/updates/deletes and blocks role escalation | Use local tests or dashboard policy testing after migration |

## Audit Summary

- Already complete:
  - Supabase folder exists and has an init migration creating the necessary lead tables + profiles.
  - RLS is enabled on `profiles` and lead tables.
  - Lead endpoints can insert using anon key (by design).
- Partially complete:
  - RLS policies for lead INSERT are permissive (`WITH CHECK (true)`), but still not allowing reads/updates/deletes.
  - Auth/profile role logic exists but is not yet safe against self-assigning admin.
- Missing:
  - Column-level protection for `profiles.role` and `profiles.welcome_email_sent`.
  - RLS verification test documentation/files.
- Insecure:
  - **Users can likely escalate to admin** via the current `profiles` UPDATE policy.
- Remote deployment blocked by:
  - Need to apply a new migration to tighten `profiles` UPDATE policy before promoting to production.
- Manual actions required:
  - Apply security migration(s).
  - Manually set exactly one admin user role after policy fix.
