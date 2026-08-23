# Gmail SMTP Integration Guide

## Overview
The website uses Gmail SMTP strictly for transactional emails to users and internal admin notifications. No bulk marketing or unprompted emails are sent.

## Sender Configuration
- **Account:** `logicwithvikash@gmail.com`
- **Sender Name:** Logic Intelligence Technologies

## Manual Gmail Setup Steps
1. Log into `logicwithvikash@gmail.com`.
2. Enable 2-Step Verification in Google Security settings.
3. Open Google App Passwords.
4. Create a custom app password named: `Logic Intelligence Website SMTP`.
5. Copy the 16-character App Password.
6. Remove all spaces when using it as `SMTP_PASS`.
7. Store it securely in a password manager.
8. Add it only to Vercel Sensitive Variables and local `.env.local`.
9. **Never add to GitHub or commit to version control.**
10. Revoke and regenerate the App Password immediately if exposed.

## Testing SMTP
A local Node script can verify the connection without triggering a frontend form:
```bash
node test-smtp.js
```
If successful, it will return a 250 OK response with a unique Gmail Message ID.
