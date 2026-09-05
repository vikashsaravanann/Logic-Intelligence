# Definitive Email Infrastructure

Logic Intelligence Technologies uses **Zoho SMTP** with **Nodemailer** for all transactional emails.
Resend and Gmail are NOT used.

## Active Mailboxes & Envs
- no-reply@logicintelligencetechnologies.in -> \`SMTP_NOREPLY_PASS\`
- hello@logicintelligencetechnologies.in -> \`SMTP_HELLO_PASS\`
- contact@logicintelligencetechnologies.in -> \`SMTP_CONTACT_PASS\`
- admin@logicintelligencetechnologies.in -> \`SMTP_ADMIN_PASS\`
- support@logicintelligencetechnologies.in -> \`SMTP_SUPPORT_PASS\`
- vikash@logicintelligencetechnologies.in -> \`SMTP_VIKASH_PASS\`

## Fallback Env
- \`SMTP_PASS\`
- \`SMTP_USER\`
- \`SMTP_HOST\` (smtp.zoho.in)
- \`SMTP_PORT\` (587)

## Code Architecture
- \`src/lib/email/send-email.ts\`: Exposes \`sendEmail()\` which automatically routes to the correct SMTP transporter based on the \`from\` property.
- \`src/lib/email/smtp.ts\`: Initializes transporters and configures mock fallback when variables are missing.
- \`src/emails/*\`: Contains all the \`@react-email/components\` React templates.

## Triggers
1. **Welcome Email**: \`src/app/api/webhooks/signup/route.ts\` (Supabase webhook on \`auth.users\` insert).
2. **Login Notification**: \`src/app/auth/callback/route.ts\` & \`src/app/api/auth/login-notification/route.ts\`.
3. **Contact / Demo**: \`src/app/api/contact/route.ts\` & \`src/app/api/free-demo/route.ts\`.
4. **Checklist Download**: \`src/app/api/checklist/route.ts\`.
5. **Weekly Recognition**: \`src/app/api/cron/weekly-recognition/route.ts\`.
