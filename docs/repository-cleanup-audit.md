# Repository Cleanup Audit

## Audit Scope

- Repository: Logic-Intelligence
- Branch: main
- Date: 2026-08-30
- Framework: Next.js App Router
- Package manager: npm
- Build system: Next.js
- Deployment targets: Vercel
- Database platform: Supabase
- Email platform: Gmail SMTP

## Summary

| Category | Verified Active | Safe to Remove | Needs Review | Broken/Obsolete |
|---|---:|---:|---:|---:|
| Next.js Pages/Routes | 19 | 0 | 0 | 0 |
| UI Components | 10 | 3 | 0 | 0 |
| Database Migrations | 4 | 0 | 1 | 0 |
| Data Sources | 4 | 1 | 0 | 0 |
| Python/Temp Scripts | 0 | 18 | 0 | 0 |
| Assets/Images | 9 | 3 | 1 | 0 |
| Dependencies | 20 | 5 | 0 | 0 |

## Duplicate Files

| File A | File B | Similarity/Reason | Active References | Recommended Action |
|---|---|---|---|---|
| `files/support-chat-widget.tsx` | `src/components/support-chat-widget.tsx` | Identical backup copy | None in `files/` | Remove `files/` directory |
| `files/layout.tsx` | `src/app/layout.tsx` | Older backup | None in `files/` | Remove `files/` directory |
| `portfolio.json` | `src/data/portfolioData.ts` | Duplicate/legacy JSON | None (only TS used) | Remove `portfolio.json` |
| `push-vercel-env.js` | `upload-env.js` | Similar env scripts | None (temp scripts) | Remove both |

## Suspected Unused Files

| File | Type | References Found | Runtime/Config Check | Recommendation |
|---|---|---|---|---|
| `IMG_4806.PNG` | Image | None | Verified unused | Remove |
| `logic-intelligence-post2-how-we-work.PNG` | Image | None | Verified unused | Remove |
| `profile4.jpeg` | Image | None | Verified unused | Remove |
| `free-demo-request.html` | HTML | None | Verified unused | Remove |
| `src/components/PageTransition.tsx` | Component | None | Verified unused | Remove |
| `src/components/CustomCursor.tsx` | Component | None | Verified unused | Remove |
| `src/components/InitialLoader.tsx` | Component | None | Verified unused | Remove |

## Obsolete Temporary Files

| File | Reason | Safe to Remove? | Verification |
|---|---|---|---|
| `.next 2/` | Duplicate untracked build artifact | Yes | It is untracked/ignored |
| `node_modules 2/` | Duplicate untracked modules | Yes | It is untracked/ignored |
| `test-smtp.js` | Local Node test script | Yes | No references |
| `test_deepseek.py`, `test_nvidia.py`, etc | Local Python test scripts | Yes | No references |
| `*.log`, `*.txt`, `*_response.json` (root) | Local execution outputs | Yes | Untracked or irrelevant |

## Empty Files and Folders

| Path | Reason | Action |
|---|---|---|
| None identified | N/A | N/A |

## Duplicate Components

| Component | Locations | Active Version | Recommendation |
|---|---|---|---|
| Support Chat Widget | `files/`, `src/components/` | `src/components/support-chat-widget.tsx` | Remove `files/` backup |

## Duplicate Routes

| Route | Files Involved | Risk | Required Action |
|---|---|---|---|
| None identified | N/A | None | N/A |

## Duplicate Data Sources

| Data Type | Locations | Active Source | Recommendation |
|---|---|---|---|
| Portfolio | `src/data/portfolio.json`, `src/data/portfolioData.ts` | `src/data/portfolioData.ts` | Remove `portfolio.json` |

## Duplicate/Legacy Supabase References

| Table/Schema Reference | Code Locations | Active? | Required Action |
|---|---|---|---|
| `contact_leads`, `demo_leads`, `checklist_leads` | `supabase/migrations/20260823000000_init_schema.sql` | Yes | Requires Founder Review if replacing |

## Asset Audit

| Asset | Referenced By | Exists | Duplicate? | Action |
|---|---|---|---|---|
| `public/reply-drafter.html` | None found | Yes | No | Requires Founder Review |

## Dependency Audit

| Dependency | Used In | Status | Action |
|---|---|---|---|
| `pdfkit` | Nowhere | Unused | Remove |
| `react-simple-typewriter` | Nowhere | Unused | Remove |
| `@tsparticles/react` | Nowhere | Unused | Remove |
| `@tsparticles/slim` | Nowhere | Unused | Remove |
| `gh-pages` (dev) | Nowhere | Unused (Vercel is target) | Remove |

## Deployment Configuration Audit

| File/Setting | Used By | Current Status | Action |
|---|---|---|---|
| `push-vercel-env.js`, `upload-env.js` | None | Unused manual scripts | Remove |

## Sensitive Files/Secrets Audit

| File/Pattern | Tracked by Git? | Risk | Required Action |
|---|---|---|---|
| `.env.local` | No | Low | Keep ignored |
| `hf_auth_output.txt` | No | Low | Remove |

## Items Requiring Founder Review

| Item | Why It Cannot Be Safely Deleted Automatically | Decision Needed |
|---|---|---|
| `ml-from-scratch/` directory | Contains independent ML workflow/dataset not part of Next.js app | Decide whether to keep as a submodule, move to separate repo, or delete |
| Supabase `20260823000000_init_schema.sql` | Legacy tables might still have remote data | Determine if these tables can be dropped in a new migration |
| `public/reply-drafter.html` | Public HTML file, might be an externally linked landing page | Is this page still active/needed? |

## Proposed Cleanup Plan

- **Batch 1**: Remove `.next 2/`, `node_modules 2/`, `.DS_Store`, root `.log`, `.txt`, `.json` outputs, `test-smtp.js`, python test scripts, and `upload-env.js` / `push-vercel-env.js`.
- **Batch 2**: Remove `files/` backup directory, `portfolio.json`, unused components (`PageTransition.tsx`, `CustomCursor.tsx`, `InitialLoader.tsx`), and unused root images.
- **Batch 3**: Remove unused dependencies (`pdfkit`, `react-simple-typewriter`, `@tsparticles/*`, `gh-pages`). Run `npm install`, `npm run lint`, `npm run build`.
- **Batch 4**: Document items requiring Founder Review in the final report.
