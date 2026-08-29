# Repository Structure Audit

**Date:** 2026-08-30
**Auditor:** Antigravity (automated deep inspection)
**Status:** AUDIT COMPLETE — REFACTOR PLAN READY

---

## Current Architecture

| Area | Current Location | Status | Problem or Strength |
|---|---|---|---|
| Framework | Next.js 16.2.4 App Router | HEALTHY | Latest stable version |
| TypeScript | `tsconfig.json`, `"strict": true` | HEALTHY | Strict mode on |
| Source root | `src/` with `app/` inside | CORRECT | Proper src-based layout |
| Path alias | `@/*` → `./src/*` | CORRECT | All app imports use `@/` |
| Email alias | None configured | PROBLEM | Email templates imported via fragile relative paths (`../../../../emails/`) |
| Route groups | `(marketing)`, `(auth)`, `(portal)` | CORRECT | Already grouped properly |
| Auth route handlers | `src/app/auth/callback/route.ts`, `src/app/auth/signout/route.ts` | NOTE | Outside `(auth)` group — correct: these are route handlers with stable OAuth-registered URLs |
| Supabase client | `src/lib/supabaseClient.ts` (orphan) + `src/lib/supabase/` (empty) | CRITICAL | `supabaseClient.ts` unused, orphaned; `src/lib/supabase/` directory is completely empty |
| Email library | `src/lib/email/smtp.ts`, `src/lib/email/send-email.ts` | HEALTHY | `import "server-only"` correctly enforced |
| Email templates | `emails/` at root | HEALTHY | Correct separation from `src/` |
| Email template imports | `../../../../emails/` (relative, 6 files) | CRITICAL | Fragile deep relative paths — must use `@/emails/*` alias |
| Company config | `src/config/company.ts` | HEALTHY | Centralized, complete |
| Env config | `src/config/env.ts` | HEALTHY | Zod-validated, server-safe |
| Components root | `src/components/` | MIXED | Motion/animation components (FloatingElements, InitialLoader, CustomCursor, PageTransition) uncategorized at root |
| Layout components | `src/components/layout/navbar.tsx`, `footer.tsx` | CORRECT | Proper location |
| UI primitives | `src/components/ui/button.tsx`, `back-to-home.tsx` | CORRECT | Proper location |
| Feature modules | `src/features/home/`, `src/features/leads/` | PARTIAL | Only 2 features; checklist/auth/admin missing feature modules |
| Static data | `src/data/` (6 files) | CORRECT | Proper location |
| Supabase migrations | `supabase/migrations/` (4 files) | CORRECT | All migrations present |
| Supabase functions | `supabase/functions/` | EMPTY | No edge functions — expected |
| Admin dashboard | `src/app/(portal)/dashboard/page.tsx` | PROBLEM | Admin mixed inside portal route group |
| Public assets | `public/` (flat) | PROBLEM | All images at public root — no `assets/`, `og/`, `portfolio/` subfolders |
| GitHub Pages | `package.json` has `gh-pages` dev dep | LEGACY | No workflow file found; Vercel is active; gh-pages unused |
| Documentation | `docs/` (23 files) | CLUTTERED | Many overlapping incremental docs from previous refactoring sessions |
| Stray root files | `IMG_4806.PNG`, `debug_test.log`, `test.log`, `available_models.txt`, etc. | PROBLEM | Dev/testing artifacts committed to repository root |
| Duplicate dirs | `.next 2/`, `node_modules 2/` | PROBLEM | Duplicate build/install directories |
| Security email | `import "server-only"` on smtp.ts and send-email.ts | HEALTHY | Correct |
| Security supabase | Service role key used inline in 4 API routes | PROBLEM | Admin Supabase client created inline — should use centralized admin.ts |
| Middleware | No `middleware.ts` at src root | PROBLEM | Dashboard redirect is inside page component — SSR hit before redirect |
| `.gitignore` | Covers env, build, DS_Store | INCOMPLETE | Does not ignore `*.log`, `*.txt`, `*.py` test artifacts |

---

## Current Routes

| Route | File | Works | Required Action |
|---|---|---|---|
| `/` | `src/app/(marketing)/page.tsx` | YES | None |
| `/about` | `src/app/(marketing)/about/page.tsx` | YES | None |
| `/contact` | `src/app/(marketing)/contact/page.tsx` | YES | None |
| `/free-demo` | `src/app/(marketing)/free-demo/page.tsx` | YES | None |
| `/checklist` | `src/app/(marketing)/checklist/page.tsx` | YES | None |
| `/work` | `src/app/(marketing)/work/page.tsx` | YES | None |
| `/work/[slug]` | `src/app/(marketing)/work/[slug]/page.tsx` | YES | None |
| `/packages` | `src/app/(marketing)/packages/page.tsx` | YES | None |
| `/packages/[slug]` | `src/app/(marketing)/packages/[slug]/page.tsx` | YES | None |
| `/discovery` | `src/app/(marketing)/discovery/page.tsx` | YES | None |
| `/blog` | `src/app/(marketing)/blog/page.tsx` | UNKNOWN | Inspect file |
| `/privacy` | `src/app/(marketing)/privacy/page.tsx` | YES | None |
| `/terms` | `src/app/(marketing)/terms/page.tsx` | YES | None |
| `/refund-policy` | `src/app/(marketing)/refund-policy/page.tsx` | YES | None |
| `/login` | `src/app/(auth)/login/page.tsx` | YES | None |
| `/dashboard` | `src/app/(portal)/dashboard/page.tsx` | YES | None |
| `/profile` | `src/app/(portal)/profile/page.tsx` | YES | None |
| `/ai` | `src/app/ai/page.tsx` | YES | Ungrouped — consider route group |
| `/auth/callback` | `src/app/auth/callback/route.ts` | YES | None — OAuth URL must not change |
| `/auth/signout` | `src/app/auth/signout/route.ts` | YES | None |
| `/api/contact` | `src/app/api/contact/route.ts` | YES | Centralize Supabase client |
| `/api/free-demo` | `src/app/api/free-demo/route.ts` | YES | Centralize Supabase client |
| `/api/checklist` | `src/app/api/checklist/route.ts` | YES | Centralize Supabase client |
| `/api/webhooks/signup` | `src/app/api/webhooks/signup/route.ts` | YES | Centralize Supabase client |
| `/api/ai` | `src/app/api/ai/route.ts` | YES | None |
| `/api/chat` | `src/app/api/chat/route.ts` | YES | None |

---

## Current Feature Mapping

| Feature | Components | API/Server Logic | Database Table | Required Action |
|---|---|---|---|---|
| Contact leads | `contact/page.tsx` (inline form) | `api/contact/route.ts` | `public.contact_leads` | Extract form to features/leads |
| Demo leads | `free-demo/page.tsx` (inline form) | `api/free-demo/route.ts` | `public.demo_leads` | Extract form to features/leads |
| Checklist | `checklist/page.tsx` (inline) | `api/checklist/route.ts` | `public.checklist_leads` | None critical |
| Authentication | `(auth)/login/page.tsx` | `auth/callback/route.ts`, `auth/signout/route.ts` | `public.profiles` | Centralize Supabase; add middleware.ts |
| Profiles/roles | `(portal)/dashboard/page.tsx` (role check inline) | — | `public.profiles` | Centralize via middleware |
| Login events | Migration exists | No API route uses it | `public.login_events` | Unused — document as reserved |
| Instagram | `features/home/components/instagram-feed-section.tsx` | Client-side Meta Graph API | None | None |
| Email | `emails/` (5 templates, 4 components) | `lib/email/smtp.ts`, `lib/email/send-email.ts` | None | Add `@/emails/*` alias |
| Admin dashboard | `(portal)/dashboard/page.tsx` | Reads contact_leads, projects, invoices | `contact_leads`, `projects`, `invoices` | Separate admin from portal |
| Legal pages | `privacy/`, `terms/`, `refund-policy/` | None | None | None |
| Services | `features/home/components/services-section.tsx` | `data/servicesData.ts` | None (static) | None |
| Portfolio | `work/page.tsx`, `work/[slug]/page.tsx` | `data/portfolioData.ts`, `data/portfolio.json` | None (static) | portfolioData.ts reads portfolio.json — fine |
| AI chat | `app/ai/page.tsx` | `api/ai/route.ts`, `api/chat/route.ts` | Supabase? | Inspect ai/page.tsx |
| Signup webhook | — | `api/webhooks/signup/route.ts` | `public.profiles` | None |

---

## Structural Problems

| Problem | File/Folder | Impact | Proposed Fix |
|---|---|---|---|
| `src/lib/supabase/` is empty | `src/lib/supabase/` | Every API route reinvents inline admin client | Create `client.ts`, `server.ts`, `admin.ts` |
| `src/lib/supabaseClient.ts` orphaned | `src/lib/supabaseClient.ts` | Zero imports — dead code | Delete after confirmation |
| Email templates use deep relative paths | 6 route files | Build breaks if dirs move | Add `@/emails/*` to tsconfig.json |
| Inline Supabase admin clients | `api/free-demo`, `api/checklist`, `api/chat`, `api/webhooks/signup`, `auth/callback` | Service role key scattered | Centralize in `src/lib/supabase/admin.ts` with server-only |
| No `middleware.ts` | Root | Dashboard redirect in page component | Add middleware.ts with session check |
| Uncategorized motion components | `CustomCursor.tsx`, `FloatingElements.tsx`, `InitialLoader.tsx`, `PageTransition.tsx` | Mixed concerns at component root | Move to `src/components/motion/` |
| Uncategorized global widgets | `floating-whatsapp.tsx`, `support-chat-widget.tsx` | No clear category | Move to `src/components/shared/` |
| Admin inside `(portal)` | `(portal)/dashboard/page.tsx` | Admin and client share route group | Future: create `(admin)/` route group |
| Flat `public/` assets | `public/` | No organization | Move images to `public/assets/` |
| Duplicate tables in migrations | `profiles` in both init_schema and email_tracking | IF NOT EXISTS guards prevent errors | Flag for future consolidation |
| `checklist_submissions` in migration | `email_tracking.sql` | Code uses `checklist_leads` instead | Document as orphaned table |
| Stray test files at root | Various `*.log`, `*.py`, `*.txt` | Repository pollution | Delete or .gitignore |
| 23 overlapping docs | `docs/` | Unclear canonical reference | Consolidate to 6 authoritative files |
| Large image files at root | `IMG_4806.PNG`, `logic-intelligence-post2-how-we-work.PNG` | Not in public/ — 5.8 MB each | Move to public/assets/ or delete |
| Utility scripts at root | `push-vercel-env.js`, `upload-env.js` | May contain env logic | Review for secrets; move to `scripts/` |
| Default README | `README.md` | Useless for this project | Replace with project-specific content |
| Empty `.github/workflows/` | `.github/workflows/` | No CI/CD | Add lint/typecheck workflow |

---

## Files to Move

| Existing Path | Target Path | Reason | Import Updates |
|---|---|---|---|
| `src/components/FloatingElements.tsx` | `src/components/motion/floating-elements.tsx` | Categorize motion components | 11 page files import this |
| `src/components/InitialLoader.tsx` | `src/components/motion/initial-loader.tsx` | Motion component | Check all usages |
| `src/components/CustomCursor.tsx` | `src/components/motion/custom-cursor.tsx` | Motion component | Check all usages |
| `src/components/PageTransition.tsx` | `src/components/motion/page-transition.tsx` | Motion component | Check all usages |
| `src/components/floating-whatsapp.tsx` | `src/components/shared/floating-whatsapp.tsx` | Global UI widget | 1 import in layout.tsx |
| `src/components/support-chat-widget.tsx` | `src/components/shared/support-chat-widget.tsx` | Global UI widget | 1 import in layout.tsx |
| `public/logo.jpg` | `public/assets/logo.jpg` | Asset organization | COMPANY config paths + email-header.tsx |
| `public/banner.jpg` | `public/assets/banner.jpg` | Asset organization | COMPANY.bannerPath |
| `public/founder.jpg` | `public/assets/founder.jpg` | Asset organization | COMPANY.founder.photoPath |
| `public/instagram-*.jpg` | `public/assets/instagram/` | Asset organization | Instagram feed component |

---

## Files Not to Move

| File/Folder | Reason |
|---|---|
| `src/app/(marketing)/` all pages | Routes correct; moving risks breaking URLs |
| `src/app/auth/callback/route.ts` | OAuth redirect URI registered in Supabase — must not change |
| `src/app/auth/signout/route.ts` | Same — stable API endpoint |
| `src/app/api/` all routes | API route URLs must remain stable |
| `emails/` directory | Correct root-level location |
| `supabase/` directory | Correct location |
| `src/data/` | Static data, correct location |
| `src/config/company.ts`, `src/config/env.ts` | Already correct |
| `src/lib/email/smtp.ts`, `src/lib/email/send-email.ts` | Already correct |
| `src/components/layout/navbar.tsx`, `footer.tsx` | Already correct |
| `src/components/ui/button.tsx`, `back-to-home.tsx` | Already correct |
| `src/features/home/components/` | All 12 home section components correct |
| `src/features/leads/components/free-demo-cta.tsx` | Correct |

---

## Duplicate/Legacy Candidates

| File/Table | Usage Found | Recommended Decision |
|---|---|---|
| `src/lib/supabaseClient.ts` | Zero imports in codebase | DELETE — confirmed unused |
| `public.checklist_submissions` (migration `email_tracking.sql`) | Zero code references | DOCUMENT as orphaned — do not delete from migration; do not write code to use it |
| `public.login_events` (migration) | Zero reads/writes in app code | DOCUMENT as reserved — future feature |
| `portfolio.json` + `portfolioData.ts` | portfolioData.ts imports portfolio.json | No action — intended relationship |
| `emails/login-notification-email.tsx` | Zero imports anywhere | Keep — document as unused template for future |
| `gh-pages` devDependency | Not referenced in any script | REMOVE from package.json |
| `Dockerfile` | Not referenced in Vercel config | REVIEW — unknown purpose |
| `.next 2/` | Duplicate build cache | DELETE — safe build artifact |
| `node_modules 2/` | Duplicate install dir | DELETE — safe to remove |
| `IMG_4806.PNG` at root | Same 5.8 MB as instagram-post2.jpg | REVIEW — likely duplicate upload |
| `logic-intelligence-post2-how-we-work.PNG` at root | Not in public/ | Move to public/assets/ or delete |
| `profile4.jpeg` at root | Same size as public/founder.jpg | REVIEW — likely duplicate |
| `*.log`, `*.txt`, `*.py`, `*.yaml` at root | Dev testing artifacts | DELETE or add to .gitignore |

---

## Final Planned Structure

```
Logic-Intelligence/
├── .env.example                       # Keep
├── .gitignore                         # Update: add *.log, *.py, etc.
├── .nvmrc                             # Keep
├── eslint.config.mjs                  # Keep
├── next.config.ts                     # Keep
├── next-env.d.ts                      # Keep (auto-generated)
├── package.json                       # Update: remove gh-pages dep
├── postcss.config.mjs                 # Keep
├── tsconfig.json                      # UPDATE: add @/emails/* path alias
├── README.md                          # REPLACE: project-specific content
│
├── docs/
│   ├── repository-structure-audit.md  # This file
│   ├── architecture.md                # NEW
│   ├── deployment-vercel.md           # Consolidated
│   ├── deployment-supabase.md         # Consolidated
│   ├── gmail-smtp.md                  # Updated
│   ├── security.md                    # NEW
│   └── repository-structure-final-report.md  # NEW (end of refactor)
│
├── emails/
│   ├── components/
│   │   ├── email-header.tsx
│   │   ├── email-footer.tsx
│   │   ├── email-button.tsx
│   │   └── email-layout.tsx
│   ├── welcome-email.tsx
│   ├── lead-confirmation-email.tsx
│   ├── new-lead-notification-email.tsx
│   ├── checklist-submission-email.tsx
│   └── login-notification-email.tsx   # Keep - future use
│
├── public/
│   ├── assets/
│   │   ├── logo.jpg
│   │   ├── banner.jpg
│   │   ├── founder.jpg
│   │   └── instagram/
│   │       ├── instagram-1.jpg
│   │       ├── instagram-post1.jpg
│   │       └── instagram-post2.jpg
│   ├── checklist.pdf
│   ├── robots.txt
│   └── sitemap.xml
│
├── supabase/
│   ├── migrations/ (4 files - unchanged)
│   ├── functions/ (empty - reserved)
│   ├── config.toml
│   └── README.md  # NEW
│
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── robots.ts
    │   ├── sitemap.ts
    │   ├── (marketing)/  (all public routes - unchanged)
    │   ├── (auth)/login/page.tsx
    │   ├── (portal)/dashboard/, profile/
    │   ├── ai/page.tsx
    │   ├── auth/callback/, signout/  (route handlers - DO NOT MOVE)
    │   └── api/contact/, free-demo/, checklist/, ai/, chat/, webhooks/
    │
    ├── components/
    │   ├── layout/navbar.tsx, footer.tsx  (unchanged)
    │   ├── motion/                         # NEW
    │   │   ├── floating-elements.tsx       # Moved
    │   │   ├── initial-loader.tsx          # Moved
    │   │   ├── custom-cursor.tsx           # Moved
    │   │   └── page-transition.tsx         # Moved
    │   ├── shared/                         # NEW
    │   │   ├── floating-whatsapp.tsx       # Moved
    │   │   └── support-chat-widget.tsx     # Moved
    │   └── ui/button.tsx, back-to-home.tsx (unchanged)
    │
    ├── config/company.ts, env.ts  (unchanged)
    ├── data/ (6 files - unchanged)
    ├── features/home/, leads/  (unchanged)
    │
    ├── lib/
    │   ├── email/smtp.ts, send-email.ts  (unchanged)
    │   ├── supabase/
    │   │   ├── client.ts   # NEW - browser anon client
    │   │   ├── server.ts   # NEW - SSR cookie client
    │   │   └── admin.ts    # NEW - service role, server-only
    │   └── utils.ts  (unchanged)
    │
    └── types/
        └── database.ts  # NEW - Supabase table types
```

---

## Risk Assessment

- **Route risk:** LOW — no routes moving; all URLs remain identical
- **Import risk:** MEDIUM — FloatingElements imported by 11 files; must be batch-updated carefully
- **Email import risk:** HIGH — 6 files use deep relative paths; fix requires tsconfig alias + import updates in all 6
- **Server/client boundary risk:** LOW — smtp.ts and send-email.ts already server-only; new admin.ts must follow same pattern
- **Supabase risk:** MEDIUM — inline admin client must be centralized; existing routes must import from @/lib/supabase/admin
- **Vercel risk:** LOW — no changes to next.config.ts or deployment config needed
- **GitHub Pages migration risk:** LOW — no workflow files exist; gh-pages package removal is safe
- **Database risk:** NONE — no table changes; no migration modifications
- **Asset path risk:** MEDIUM — moving public/ assets requires updating COMPANY config and all component references simultaneously

---

## Prioritized Action Plan

### Priority 1 — Critical (broken pattern, security risk)
1. Add `"@/emails/*": ["./emails/*"]` to tsconfig.json paths
2. Update all 6 email import statements from `../../../../emails/` to `@/emails/`
3. Create `src/lib/supabase/admin.ts` with `import "server-only"` and service role client
4. Delete `src/lib/supabaseClient.ts` (zero imports confirmed)

### Priority 2 — Important (structural clarity)
5. Create `src/components/motion/` and move 4 motion components; update all 11 import locations
6. Create `src/components/shared/` and move 2 widget components; update 1 import each
7. Create `src/lib/supabase/client.ts` and `server.ts` for standardized client creation
8. Add `src/types/database.ts` for Supabase table type definitions

### Priority 3 — Housekeeping
9. Remove `.next 2/` and `node_modules 2/` directories
10. Delete or .gitignore stray root-level test artifacts
11. Remove `gh-pages` from package.json devDependencies
12. Move public images to `public/assets/` and update COMPANY config paths
13. Consolidate docs/ to 6 canonical files

### Priority 4 — Documentation
14. Replace README.md with project-specific content
15. Create `docs/architecture.md`
16. Create `supabase/README.md`
17. Create `docs/repository-structure-final-report.md` after all changes verified
