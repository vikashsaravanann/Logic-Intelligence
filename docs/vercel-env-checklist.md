# Vercel environment checklist (Logic Intelligence Technologies)

## Required — Production + Preview

| Key | Expected |
|-----|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://lcmbwalrupoyparxsnjw.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key |
| `NEXT_PUBLIC_SITE_URL` | `https://www.logicintelligencetechnologies.in` |
| `SMTP_HOST` | **`smtp.zoho.in`** |
| `SMTP_PORT` | `587` (STARTTLS) or `465` (SSL) |
| `SMTP_SECURE` | `false` for 587 · `true` for 465 |
| `SMTP_USER` | `no-reply@logicintelligencetechnologies.in` |
| `SMTP_PASS` or `SMTP_NOREPLY_PASS` | Zoho mailbox / app password |
| `SMTP_FROM` | `Logic Intelligence Technologies <no-reply@logicintelligencetechnologies.in>` |
| `LEAD_NOTIFICATION_EMAIL` | `contact@logicintelligencetechnologies.in` |

## Optional mailbox passwords

`SMTP_HELLO_PASS`, `SMTP_SUPPORT_PASS`, `SMTP_ADMIN_PASS`, `SMTP_VIKASH_PASS`, `SMTP_NOREPLY_PASS`

## Removed

| Key | Reason |
|-----|--------|
| `SMTP_CONTACT_PASS` | Not mapped in code |

## Provider

**Zoho Mail India** — host `smtp.zoho.in` (not Hostinger).
