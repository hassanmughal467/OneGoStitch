# Environment variables

Nothing in this file is a secret. Values marked **server only** must never be prefixed with `NEXT_PUBLIC_`.

## Indexing (preview vs production)

| Variable | Public? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_ENV` | yes | Set to `production` only on the confirmed live domain. |
| `NEXT_PUBLIC_SITE_URL` | yes | Confirmed origin, e.g. `https://www.example.com`. Used for canonicals, sitemap, Open Graph and schema. Preview hostnames are never used. |

Both must be set together. Any other combination keeps `noindex`, an empty sitemap, and no canonical.

## Public business details

All optional. Unset or placeholder values resolve to `null` and the UI hides that channel.

| Variable | Shown as |
| --- | --- |
| `NEXT_PUBLIC_LEGAL_NAME` | Footer / legal pages |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact, footer, mailto |
| `NEXT_PUBLIC_PHONE` | Contact, tel: link |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp link (digits with country code, no `+`) |
| `NEXT_PUBLIC_SUPPORT_HOURS` | Customer-service hours |
| `NEXT_PUBLIC_RESPONSE_STATEMENT` | Response-time wording on Contact and confirmations |
| `NEXT_PUBLIC_ADDRESS_LINE1` / `NEXT_PUBLIC_ADDRESS_CITY` | Structured address (only if set) |
| `NEXT_PUBLIC_INSTAGRAM_URL` / `LINKEDIN` / `FACEBOOK` / `PINTEREST` | Profile URLs (bare homepages ignored) |
| `NEXT_PUBLIC_FOUNDER_NOTE` | Optional founder line on `/about` |
| `NEXT_PUBLIC_PHONE_NOTE` | Explains the published phone number |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 ID; scripts load only after consent |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight partner ID; consent-gated |

## Quote intake (server)

| Variable | Purpose |
| --- | --- |
| `QUOTE_STORE` | `file`, `memory`, or `vercel-blob`. Unset = form offline. |
| `QUOTE_STORE_DIR` | File-store root (default `.data/quotes`) |
| `QUOTE_STORE_PREFIX` | Blob key prefix (default `stitchcraft`) |
| `QUOTE_STORE_ALLOW_VOLATILE` | Allow memory store in `NODE_ENV=production` (tests only) |
| `QUOTE_INTAKE_MODE` | `offline` forces maintenance even when a store exists |
| `QUOTE_OFFLINE_MESSAGE` | Public notice while offline |
| `QUOTE_RESPONSE_STATEMENT` | Confirmation wording (falls back to `NEXT_PUBLIC_RESPONSE_STATEMENT`) |
| `QUOTE_IP_SALT` | Salt for hashed IP in logs (never log raw IPs) |
| `QUOTE_ARTWORK_LINK_SECRET` | HMAC secret for expiring staff artwork links |
| `QUOTE_ARTWORK_LINK_TTL_HOURS` | Link lifetime (default 72) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token |

## Email (server)

| Variable | Purpose |
| --- | --- |
| `EMAIL_PROVIDER` | `smtp`, `resend`, or `log` |
| `EMAIL_USER` / `EMAIL_APP_PASSWORD` | Gmail / Workspace SMTP login (alias of `SMTP_USER` / `SMTP_PASS`) |
| `SMTP_HOST` | SMTP host (default `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (default `465`) |
| `SMTP_SECURE` | `true`/`false` (default: secure when port is 465) |
| `SMTP_FROM` | From address (default: SMTP user) |
| `QUOTE_INBOX_EMAIL` | Staff inbox (default: SMTP user) |
| `RESEND_API_KEY` | Resend secret |
| `RESEND_FROM_EMAIL` | Verified From address (Resend) |

If `EMAIL_PROVIDER` is unset, SMTP credentials are preferred; otherwise Resend is used when its keys are present.

Quotes are saved even if email is not configured. The customer is told to keep the reference; staff must open the store.

## Optional spam check

Turnstile is **off** unless both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` are set. Honeypot + rate limit remain on.

## Local development

```
QUOTE_STORE=file
EMAIL_PROVIDER=log
```

Gmail / Workspace SMTP (local or Vercel):

```
EMAIL_PROVIDER=smtp
EMAIL_USER=info@yourdomain.com
EMAIL_APP_PASSWORD=
QUOTE_INBOX_EMAIL=info@yourdomain.com
```

Do not commit `.env.local`. On Vercel, set `QUOTE_STORE=vercel-blob`, `BLOB_READ_WRITE_TOKEN`, and the SMTP values above before promoting the form to production.
