# Architecture Reference

Logic Intelligence Technologies — Next.js 16 App Router monorepo.

---

## Folder Tree

```
Logic-Intelligence/
├── emails/              # React Email templates — root-level (NOT inside src/)
│   └── components/      # Shared email layout primitives
├── public/              # Static assets served at /
│   └── assets/          # Organized images (logo, banner, founder, instagram/)
├── supabase/            # Supabase configuration
│   └── migrations/      # SQL migration files (chronological)
├── docs/                # Project documentation
└── src/                 # All application source code
    ├── app/             # Next.js App Router
    ├── components/      # Shared React components
    ├── config/          # Centralized configuration
    ├── data/            # Static content (services, packages, portfolio)
    ├── features/        # Feature-grouped business logic components
    ├── lib/             # Server and shared utilities
    └── types/           # TypeScript type definitions
```

---

## Route Groups

Route groups use Next.js parentheses notation — they do NOT appear in URLs.

| Route Group | URL Pattern | Purpose |
|---|---|---|
| `(marketing)` | `/`, `/about`, `/contact`, `/free-demo`, etc. | Public company website |
| `(auth)` | `/login` | Authentication pages |
| `(portal)` | `/dashboard`, `/profile` | Authenticated user portal |
| `api/` | `/api/contact`, `/api/free-demo`, etc. | API route handlers |
| `auth/` | `/auth/callback`, `/auth/signout` | OAuth route handlers — NOT pages |

> **Important:** `src/app/auth/callback/route.ts` and `src/app/auth/signout/route.ts`
> are route HANDLERS (not page routes). Their URLs are registered in Supabase OAuth settings.
> NEVER move or rename these files without updating the Supabase Auth Redirect URLs.

---

## Component Categories

| Directory | Contains | Example |
|---|---|---|
| `src/components/layout/` | Navbar, Footer — renders on every page | `navbar.tsx` |
| `src/components/ui/` | Generic reusable primitives | `button.tsx`, `back-to-home.tsx` |
| `src/components/motion/` | Framer Motion animations | `floating-elements.tsx` |
| `src/components/shared/` | Global floating widgets | `floating-whatsapp.tsx`, `support-chat-widget.tsx` |
| `src/features/*/components/` | Feature-specific components | `hero-section.tsx`, `free-demo-cta.tsx` |

### Where to place a new component

- Generic UI primitive (button, input, badge) → `src/components/ui/`
- Shared across all pages (chat widget, toast) → `src/components/shared/`
- Specific to one feature or page section → `src/features/[feature]/components/`
- Layout (header/footer) → `src/components/layout/`

---

## Supabase Client Separation

Three separate clients — never mix them up:

| File | Key Used | Where Used | Server-Only? |
|---|---|---|---|
| `src/lib/supabase/client.ts` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client components | No |
| `src/lib/supabase/server.ts` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Route handlers, server components | Yes (`import "server-only"`) |
| `src/lib/supabase/admin.ts` | `SUPABASE_SERVICE_ROLE_KEY` | API routes (bypasses RLS) | Yes (`import "server-only"`) |

**Rule:** Any file that imports from `src/lib/supabase/admin.ts` or `src/lib/email/smtp.ts` MUST be a server component, route handler, or server action.

---

## Environment Variables

Centralized in `src/config/env.ts` with Zod validation.

- Public (safe for browser): `NEXT_PUBLIC_*` prefix
- Server-only secrets: No prefix — accessed only in route handlers

Never read `process.env.SUPABASE_SERVICE_ROLE_KEY` directly in components. Always use `env.SUPABASE_SERVICE_ROLE_KEY` from `src/config/env.ts`.

---

## Email Templates

Email templates live in `emails/` at the repository root (not inside `src/`).

Import them using the `@/emails/*` path alias:
```ts
import WelcomeEmail from "@/emails/welcome-email";
import LeadConfirmationEmail from "@/emails/lead-confirmation-email";
```

Never use deep relative paths like `../../../../emails/`.

---

## Database Tables

| Table | Purpose | Written By |
|---|---|---|
| `public.contact_leads` | Contact form submissions | `/api/contact` |
| `public.demo_leads` | Free demo requests | `/api/free-demo` |
| `public.checklist_leads` | Checklist downloads | `/api/checklist` |
| `public.profiles` | User profiles (auth) | `auth/callback`, `/api/webhooks/signup` |
| `public.projects` | CRM: client projects | Dashboard UI |
| `public.invoices` | CRM: invoices | Dashboard UI |
| `public.login_events` | Login audit trail | RESERVED — not yet implemented |
| `public.checklist_submissions` | Legacy table | ORPHANED — use `checklist_leads` |

---

## How To Add Things

### Add a new page

1. Create the page file in the appropriate route group:
   - Public page → `src/app/(marketing)/new-page/page.tsx`
   - Auth-protected page → `src/app/(portal)/new-page/page.tsx`
2. Update `src/components/layout/navbar.tsx` if it needs a nav link
3. Update `src/app/sitemap.ts` with the new URL
4. Update `docs/architecture.md`

### Add a new lead form

1. Create the form component in `src/features/leads/components/`
2. Create the API route handler in `src/app/api/[form-name]/route.ts`
3. Import `sendEmail` from `@/lib/email/send-email`
4. Import `supabaseAdmin` from `@/lib/supabase/admin`
5. Do NOT create a new database table unless the data is genuinely different from `contact_leads`, `demo_leads`, or `checklist_leads`
6. Add a React Email template in `emails/` if a new email type is needed

### Add a new service

Edit `src/data/servicesData.ts` — add a new entry to the exported array.

### Add a portfolio item

Edit `src/data/portfolio.json` — add a new entry.
`src/data/portfolioData.ts` reads this file and re-exports typed data.

### Add an admin page

Currently admin pages are inside `src/app/(portal)/`. For proper separation:
- Future admin pages should go in `src/app/(admin)/`
- Add role check in the page component or in `middleware.ts`

### Avoid secret leaks

- Never import `src/lib/supabase/admin.ts` in a file with `"use client"` at the top
- Never import `src/lib/email/smtp.ts` or `src/lib/email/send-email.ts` in client components
- Use `import "server-only"` at the top of any new server-only utility file
- Run `npm run typecheck` to catch any boundary violations at compile time

---

## Supabase Migrations

Migration files live in `supabase/migrations/` and are numbered chronologically.
Never edit existing migration files — create a new one for schema changes.

```bash
# Create a new migration
supabase migration new <description>

# Apply migrations to local Supabase
supabase db push

# Generate TypeScript types from live schema
supabase gen types typescript --project-id <id> > src/types/database.ts
```

## Edge Functions

`supabase/functions/` is empty — reserved for future use.
Edge functions are serverless functions that run on Supabase's infrastructure.
Use for: webhook handlers that need to be closer to the DB, background jobs.

---

## React Email Templates

```
emails/
├── components/          # Reusable email layout components
│   ├── email-header.tsx # Company logo + header
│   ├── email-footer.tsx # Company info + social links
│   ├── email-button.tsx # CTA button
│   └── email-layout.tsx # Wrapper layout
├── welcome-email.tsx            # Sent on first user signup
├── lead-confirmation-email.tsx  # Sent to user after any form submission
├── new-lead-notification-email.tsx  # Sent to internal team for contact/demo leads
├── checklist-submission-email.tsx   # Sent to internal team for checklist submissions
└── login-notification-email.tsx     # UNUSED — reserved for login alert feature
```

---

## GitHub Pages (Legacy)

GitHub Pages was the original deployment platform. It is now retired.
Vercel is the active deployment platform.

- No GitHub Actions workflows exist
- `gh-pages` has been removed from devDependencies
- The `/out` directory (static export) is gitignored

Do not re-add GitHub Pages configuration without migrating this to a documented plan.
