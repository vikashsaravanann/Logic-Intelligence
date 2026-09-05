# Logic Intelligence Technologies

**Full-stack web development, AI integration, and enterprise software for businesses in Coimbatore, India.**

> "Where Logic Meets Innovation"

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Database | Supabase (PostgreSQL + Auth) |
| Email | Gmail SMTP via Nodemailer |
| Email Templates | React Email |
| Deployment | Vercel |
| AI Chat | Groq API (Qwen model) |

---

## Local Installation

```bash
# 1. Clone the repository
git clone https://github.com/vikashsaravanann/Logic-Intelligence.git
cd Logic-Intelligence

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in all required values in .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

---

## Required Environment Variables

Copy `.env.example` to `.env.local` and fill in all values:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous (public) key |
| `NEXT_PUBLIC_SITE_URL` | Production URL (`https://www.logicintelligencetechnologies.in`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only, never expose to browser) |
| `SUPABASE_WEBHOOK_SECRET` | Secret for validating Supabase webhook calls |
| `SMTP_HOST` | Gmail SMTP host (`smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (`465` for SSL) |
| `SMTP_SECURE` | `true` for port 465 |
| `SMTP_USER` | Gmail address |
| `SMTP_PASS` | Gmail App Password (not your account password) |
| `SMTP_FROM` | Sender address (e.g. `support@logicintelligencetechnologies.in`) |
| `SMTP_REPLY_TO` | Reply-to address |
| `LEAD_NOTIFICATION_EMAIL` | Internal email to receive new lead notifications |

---

## Development Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking (tsc --noEmit)
```

---

## Folder Structure

```
Logic-Intelligence/
├── emails/              # React Email templates (root-level, NOT inside src/)
│   └── components/      # Shared email layout components
├── public/              # Static assets (images, PDF, robots.txt)
│   └── assets/          # Organized images (logo, banner, founder, instagram/)
├── supabase/            # Supabase config and migrations
│   └── migrations/      # SQL migration files
├── src/
│   ├── app/             # Next.js App Router pages and API routes
│   │   ├── (marketing)/ # Public website pages
│   │   ├── (auth)/      # Authentication pages (/login)
│   │   ├── (portal)/    # Authenticated client portal (/dashboard, /profile)
│   │   ├── auth/        # OAuth route handlers (callback, signout) — DO NOT MOVE
│   │   └── api/         # API route handlers
│   ├── components/
│   │   ├── layout/      # Navbar, Footer
│   │   ├── motion/      # Animation components (FloatingElements)
│   │   ├── shared/      # Global widgets (WhatsApp, SupportChat)
│   │   └── ui/          # Generic reusable UI primitives
│   ├── config/
│   │   ├── company.ts   # Company information (single source of truth)
│   │   └── env.ts       # Validated environment variables (Zod schema)
│   ├── data/            # Static data (services, packages, portfolio, etc.)
│   ├── features/
│   │   ├── home/        # Homepage section components
│   │   └── leads/       # Lead-related components
│   ├── lib/
│   │   ├── email/       # Server-only email sending (SMTP + Nodemailer)
│   │   └── supabase/    # Supabase clients (browser, server, admin)
│   └── types/
│       └── database.ts  # TypeScript types for all Supabase tables
└── docs/                # Project documentation
```

See [docs/architecture.md](docs/architecture.md) for the full architecture reference.

---

## Supabase Setup

See [docs/deployment-supabase.md](docs/deployment-supabase.md) for Supabase setup instructions.

Active database tables:
- `public.contact_leads` — contact form submissions
- `public.demo_leads` — free demo request form submissions
- `public.checklist_leads` — website launch checklist form submissions
- `public.profiles` — authenticated user profiles (synced with `auth.users`)
- `public.projects` — CRM: client projects
- `public.invoices` — CRM: project invoices

## Vercel Deployment

See [docs/deployment-vercel.md](docs/deployment-vercel.md) for Vercel deployment instructions.

---

## Gmail SMTP Setup

See [docs/gmail-smtp.md](docs/gmail-smtp.md) for Gmail App Password and SMTP configuration.

---

## Security Notes

- The Supabase service role key is **server-only** — only used in API routes, never in client components
- `src/lib/supabase/admin.ts` has `import "server-only"` to prevent accidental client bundle inclusion
- `src/lib/email/smtp.ts` and `src/lib/email/send-email.ts` are also `server-only`
- All secrets are validated at startup via `src/config/env.ts` (Zod schema)
- Never commit `.env.local` — it is correctly covered by `.gitignore`
