# Deployment checklist

Do not change the live Vercel project, merge to `main`, or send a real customer message as part of code review. Apply these on the intended production project only after the values are known.

## Environment

Set on **Production** only:

| Name | Scope | Value rule |
|---|---|---|
| `NEXT_PUBLIC_SITE_ENV` | Production | `production` |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://` plus the confirmed hostname. Do not invent a domain. |
| `QUOTE_STORE` | Production | `vercel-blob` |
| `BLOB_READ_WRITE_TOKEN` | Production | Vercel Blob read/write token. Server only. |
| `QUOTE_ARTWORK_LINK_SECRET` | Production | 32+ random characters. Server only. |
| `QUOTE_IP_SALT` | Production | Random string. Server only. |
| `EMAIL_PROVIDER` | Production | `resend` when sending mail |
| `RESEND_API_KEY` | Production | Server only |
| `RESEND_FROM_EMAIL` | Production | Verified sender |
| `QUOTE_INBOX_EMAIL` | Production | Staff inbox |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Production | Same monitored address, shown publicly |
| `NEXT_PUBLIC_ADDRESS_COUNTRY` | Production | Only after the legal location is confirmed |
| `NEXT_PUBLIC_LEGAL_NAME` | Production | Only if it differs from OneGo Stitch and is verified |

Leave `NEXT_PUBLIC_SITE_ENV` and `NEXT_PUBLIC_SITE_URL` **unset** on Preview and Development. That keeps `noindex`, an empty sitemap and no canonical.

Optional, both required together: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.

Do not set `QUOTE_STORE_ALLOW_VOLATILE=true` on Production. Do not set `EMAIL_PROVIDER=log` on Production.

`QUOTE_INTAKE_MODE=offline` is the maintenance switch. Unset or `online` enables the form when the store is configured.

## Migrations

No database migration. Quotes are objects in the configured store. Preview and production must use different Blob stores and different inboxes.

## Vercel

1. Confirm which project and branch serve the public hostname.
2. Attach the hostname to that production deployment.
3. Add the variables above to the Production environment, not Preview.
4. Redeploy Production after the variables exist.
5. Check `/robots.txt` allows `/`, `/sitemap.xml` lists canonical URLs, and a page has no `X-Robots-Tag: noindex`.
6. Check a preview URL still returns `X-Robots-Tag: noindex`.
7. Submit one staging quote, retry it, and confirm a single reference.

## Redirects already in the app

- `/dft-printing` → `/dtf-printing` (permanent)
- `/vector` → `/vector-tracing` (permanent)
- `/services` → `/digitizing-artwork`
- `/industries` → `/trade`
