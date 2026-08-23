# GitHub Pages Diagnosis

## Current Status

- GitHub Pages URL: `https://vikashsaravanann.github.io/Logic-Intelligence/`
- URL fetch/result: Failing/Not Found (404) or broken assets
- Deployment method: GitHub Actions (`.github/workflows/nextjs.yml`)
- Latest workflow status: Failing or Skipping Route Handlers
- Current publishing branch/folder: `gh-pages` branch / `out` folder
- Static export enabled: No (Removed from `next.config.ts`)
- API routes present: Yes (`/api/contact`)
- Server Actions present: No
- Gmail SMTP/Nodemailer present: Yes (Server-side required)
- Supabase server-side logic present: Yes (API webhook receiver, service_role client)
- Vercel required: Yes

## Root Cause

GitHub Pages exclusively supports **static sites**. It requires the Next.js `output: "export"` setting, which compiles all pages into plain HTML/CSS/JS. However, this project now includes **Node.js server-side features** like API route handlers (`/api/contact`), Nodemailer (Gmail SMTP integration), and Supabase Webhooks. These features require an active Node.js server runtime, which GitHub Pages cannot provide. As a result, the GitHub Pages build either fails or completely excludes the necessary API backend, breaking forms and email delivery.

## GitHub Pages Compatibility Matrix

| Feature | Used by Project | GitHub Pages Compatible | Action |
|---|---|---|---|
| Static Marketing Pages | Yes | Yes | Retain |
| Next.js App Router | Yes | Yes (if static) | Retain |
| `next/image` Optimization | Yes | No (requires unoptimized) | Keep unoptimized for now |
| Route Handlers (`/api/*`) | Yes | **No** | Requires Vercel |
| Nodemailer / SMTP | Yes | **No** | Requires Vercel |
| Supabase Auth Webhooks | Yes | **No** | Requires Vercel |

## Files/Settings Causing Conflict

| File | Setting | GitHub Pages Effect | Vercel Effect | Required Action |
|---|---|---|---|---|
| `.github/workflows/nextjs.yml` | GitHub Pages Deploy Action | Triggers failed static export | Irrelevant to Vercel | **Deleted** |
| `package.json` | `"deploy": "gh-pages -d out"` | Attempts static push | Irrelevant | **Deleted** |
| `next.config.ts` | `output: "export"` | Enables Pages | Breaks Vercel API Routes | **Already Removed** |
| `next.config.ts` | `basePath` / `assetPrefix` | Fixes Pages repo paths | Breaks Vercel root paths | **Already Removed** |

## Recommended Hosting Strategy

- **Vercel as primary production host.** Vercel natively supports Next.js Serverless Functions, enabling the Node.js API routes and Nodemailer SMTP features to run seamlessly.
- **GitHub Pages retired.** To prevent confusion and broken deployments, GitHub Pages should be fully disabled for this repository.

## Manual GitHub Dashboard Checks

To fully retire GitHub Pages and prevent failed actions:
1. Go to **Repository → Settings → Pages**.
2. Under "Build and deployment", set the Source to **None**.
3. Go to **Repository → Settings → Actions → General**.
4. Disable workflows if they are still attempting to run on push (though the YAML is now deleted).
