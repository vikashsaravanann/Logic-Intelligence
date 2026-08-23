# Folder Structure Audit

## Current Architecture

- Framework: Next.js 14 (App Router)
- Router: App Router (`src/app/`)
- Source directory: `src/`
- Existing aliases: `@/*` pointing to `./src/*`
- Existing route structure: Mixed inside `src/app/` (about, api, contact, free-demo, packages, privacy-policy, terms-of-service) without route grouping (e.g. `(marketing)`).
- Existing Supabase structure: Barebones client in `src/lib/supabaseClient.ts`. No `supabase/migrations/` or `supabase/functions/` present.
- Existing email structure: No `emails/` directory.
- Existing asset structure: Mostly missing from `public/assets/`.
- Existing documentation: Only `README.md`. No `docs/` folder except this audit.
- Existing deployment configuration: `next.config.ts` configured for GitHub Pages with `basePath`.

## Problems Found

| Problem | Location | Impact | Recommended Fix |
|---|---|---|---|
| Unorganized Route Structure | `src/app/` | Difficult to manage protected vs public routes | Wrap marketing pages in `src/app/(marketing)/` |
| Monolithic Component Directory | `src/components/` | Cluttered, mixing layout, features, and UI | Split into `components/ui`, `components/layout`, `features/...` |
| Missing Feature Architecture | Global | Hard to scale domain logic (auth, leads) | Introduce `src/features/` |
| Missing Config Hub | Global | Hardcoded values scattered | Introduce `src/config/company.ts`, etc. |
| Mixed Supabase Config | `src/lib/supabaseClient.ts` | Not secure for SSR/Edge | Split into `client.ts`, `server.ts`, `middleware.ts` in `src/lib/supabase/` |

## Files to Move

| Current Path | Target Path | Reason | Import Updates Required |
|---|---|---|---|
| `src/app/about` | `src/app/(marketing)/about` | Route Grouping | None (URLs remain same) |
| `src/app/contact` | `src/app/(marketing)/contact` | Route Grouping | None |
| `src/app/free-demo` | `src/app/(marketing)/free-demo` | Route Grouping | None |
| `src/app/packages` | `src/app/(marketing)/packages` | Route Grouping | None |
| `src/app/privacy-policy` | `src/app/(marketing)/privacy` | Consistency | Footer Links |
| `src/app/terms-of-service` | `src/app/(marketing)/terms` | Consistency | Footer Links |
| `src/app/page.tsx` | `src/app/(marketing)/page.tsx` | Route Grouping | None |
| `src/app/layout.tsx` | `src/app/(marketing)/layout.tsx` | Shared Marketing Layout | None |
| `src/components/HeroSection.tsx` | `src/features/home/components/hero-section.tsx` | Feature colocation | Home Page |
| `src/components/ServicesSection.tsx` | `src/features/home/components/services-section.tsx` | Feature colocation | Home Page |
| `src/components/navbar.tsx` | `src/components/layout/navbar.tsx` | Layout component | Layout |
| `src/components/footer.tsx` | `src/components/layout/footer.tsx` | Layout component | Layout |
| `src/components/ui/button.tsx` | `src/components/ui/button.tsx` | Reusable generic | Stay |

## Files to Keep in Place

| File/Folder | Reason |
|---|---|
| `src/app/api/contact` | Currently valid route, though will be moved to `leads` eventually |
| `src/app/globals.css` | Standard Next.js entrypoint |
| `src/data/*` | Valid static data holding |
| `package.json`, `tsconfig.json` | Root configs |

## Duplicate or Obsolete Files

| File | Status | Action |
|---|---|---|
| `src/app/page.tsx` (current) | Overwritten with generic form | Revert/Merge with premium components into `features/home` |

## Proposed Architecture

```text
Logic-Intelligence/
├── public/
│   ├── assets/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── services/
│   │   │   ├── packages/
│   │   │   ├── terms/
│   │   │   ├── privacy/
│   │   │   └── refund-policy/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   ├── (portal)/
│   │   ├── api/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   ├── config/
│   ├── features/
│   │   ├── home/
│   │   ├── auth/
│   │   ├── leads/
│   ├── lib/
│   │   ├── supabase/
│   ├── types/
├── supabase/
│   ├── migrations/
│   ├── functions/
```

## Migration Plan

1. Step one: Create the directory skeleton (`src/features`, `src/config`, `src/app/(marketing)`, `src/components/layout`).
2. Step two: Move the page routes into `(marketing)` and adjust any immediate layout bugs.
3. Step three: Move and rename components into their respective feature folders and update all imports.
4. Step four: Re-establish `src/lib/supabase` with strict server/client separation.
5. Step five: Verify types, build, and routes.

## Risks

- Route risk: Low, Next.js handles route groups `(marketing)` transparently.
- Import risk: High, many components rely on `src/components/*` imports. Must carefully update all paths.
- Client/server boundary risk: Medium, moving components requires verifying `"use client"` directives remain intact.
- Supabase risk: Low, current implementation is minimal.
- Vercel build risk: High, broken imports will fail the strict Next.js build process.

## Verification Plan

- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`
- Route checks: Manually test marketing routes (`/`, `/about`, `/contact`).
- Supabase checks: Verify imports to `@/lib/supabase/client` work.
- Deployment checks: Run `npm run build` locally.
