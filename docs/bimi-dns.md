# BIMI DNS configuration — logicintelligencetechnologies.in

## Status checklist

| Prerequisite | LIT status |
|--------------|------------|
| SPF aligned (Zoho) | Yes — SPF includes `zoho.in` |
| DKIM (Zoho) | Yes — `zmail._domainkey` |
| DMARC `p=quarantine` or `reject` | Yes — `p=quarantine` |
| DMARC `pct=100` | Confirm in DNS (default is 100 if omitted) |
| SVG Tiny PS logo over HTTPS | Hosted at `/bimi/logo.svg` after deploy |
| BIMI TXT `default._bimi` | **Add manually in DNS** (below) |
| VMC/CMC for Gmail logo | **Optional paid cert** (required for Gmail display) |

## DNS record to add (domain registrar / DNS panel)

| Field | Value |
|-------|--------|
| Type | **TXT** |
| Host / Name | `default._bimi` (panel may show `default._bimi.logicintelligencetechnologies.in`) |
| TTL | `3600` |
| Value | `v=BIMI1; l=https://www.logicintelligencetechnologies.in/bimi/logo.svg;` |

With VMC later:

```text
v=BIMI1; l=https://www.logicintelligencetechnologies.in/bimi/logo.svg; a=https://www.logicintelligencetechnologies.in/bimi/vmc.pem
```

## What BIMI does *not* replace

- **Zoho mailbox profile photo** still controls many inbox avatars when BIMI/VMC is absent.
- **Gmail** generally requires a **Verified Mark Certificate (VMC)** or **Common Mark Certificate (CMC)** before showing the logo. Apple/Yahoo also prefer VMC.
- Without VMC, publishing the TXT + SVG is still valid preparation; some clients (e.g. Fastmail) may show the logo; Gmail may not.

## Logo rules (SVG Tiny PS)

- `version="1.2"` and `baseProfile="tiny-ps"`
- Square `viewBox`, solid background (no transparency)
- No scripts, animation, external images, or embedded raster
- Centered mark (inbox often crops to a circle)

Replace `public/bimi/logo.svg` with the official trademark mark when ready (still Tiny PS).

## VMC path (Gmail-grade)

1. Register trademark for the logo (recognized IP office).
2. Buy VMC/CMC from a BIMI CA (e.g. DigiCert, Entrust) — typically annual fee.
3. Host the PEM at a stable HTTPS URL (e.g. `/bimi/vmc.pem`).
4. Update the BIMI TXT `a=` tag.
5. Validate with [BIMI Inspector](https://bimigroup.org/) / MXToolbox after DNS propagates (up to 48h).

## Verify

```bash
# After DNS publish
dig +short TXT default._bimi.logicintelligencetechnologies.in
curl -I https://www.logicintelligencetechnologies.in/bimi/logo.svg
```

Send a test from `no-reply@…` to Gmail → Show original (auth) + check avatar once VMC is active.
