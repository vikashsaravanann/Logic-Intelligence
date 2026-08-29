# Supabase Configuration

This directory contains all Supabase configuration, migrations, and edge functions
for Logic Intelligence Technologies.

---

## Migrations

Migrations are in `migrations/` and applied in chronological order.

| File | Description |
|---|---|
| `20260823000000_init_schema.sql` | Initial schema: `contact_leads`, `demo_leads`, `checklist_leads`, `profiles` + RLS |
| `20260823000001_email_tracking.sql` | `login_events` table, `checklist_submissions` (orphaned), profile refinements |
| `20260823000002_tighten_rls.sql` | Tighten RLS: email validation on lead inserts, remove unsafe profile UPDATE policy |
| `20260828_crm_tables.sql` | CRM: `projects` and `invoices` tables for admin dashboard |

### Orphaned Tables

The following tables exist in migrations but are not used by application code:

- `public.checklist_submissions` — defined in `email_tracking.sql`; application uses `checklist_leads` instead
- `public.login_events` — reserved for future login notification feature

Do not write application code against `checklist_submissions`.
Do not delete these tables without verifying they are empty in production.

---

## Adding a New Migration

```bash
# Create a new migration file
supabase migration new <description>

# Edit the generated file in supabase/migrations/
# Apply to local Supabase instance
supabase db push

# Update src/types/database.ts if schema changes
supabase gen types typescript --project-id <your-project-id> > src/types/database.ts
```

---

## RLS Policy Summary

| Table | Anon INSERT | Authenticated READ | Service Role |
|---|---|---|---|
| `contact_leads` | YES (email required) | NO | YES (bypasses RLS) |
| `demo_leads` | YES (email required) | NO | YES |
| `checklist_leads` | YES (email required) | NO | YES |
| `profiles` | NO | Own profile only | YES |
| `projects` | NO | Any authenticated | YES |
| `invoices` | NO | Any authenticated | YES |
| `login_events` | NO | Admin only | YES |

---

## Edge Functions

`functions/` is empty. Reserved for future serverless functions.

Use edge functions for:
- Logic that needs to run close to the database (e.g., complex triggers)
- Background tasks not suited for Next.js API routes
- Supabase Database Webhooks that require heavy processing

---

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_WEBHOOK_SECRET=your-webhook-secret
```

The service role key bypasses RLS entirely. Keep it server-only.
Never expose it to the browser.
