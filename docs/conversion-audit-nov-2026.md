# Conversion audit implementation — Nov 2026

Code changes from the onegostitch.com Conversion Audit (Nov 17, 2026). This is not a claim that production env vars or assets are already live.

## Shipped in code

| Audit item | What changed |
| --- | --- |
| CTAs dead-end at email | All quote CTAs go to `/quote` (online or offline). Offline page still shows contact channels. |
| Offers invisible | Promise strip (2–3 hour reply, built by hand, unlimited revisions to approval). FAQ / buying answers aligned. Black Friday 20% banner scheduled 20–30 Nov 2026. |
| Hero not trade-first | Homepage H1 and CTAs lead with trade buyers; individual quote is secondary. |
| Cheap price without proof | Pricing page leads with hand-built copy, inclusions, refund/trade links, Offer schema. |
| Pricing page thin | Expanded inclusions, trade/trust aside, promise strip. |
| Trade mechanics | Trade terms block: payment/invoices, file check, reorder, white-label. |
| Portfolio / proof | Portfolio always in nav; empty state shows labeled studio samples and asks for permissioned sew-outs. |
| Social / sameAs | Pinterest env wired; footer + Organization `sameAs` include all set profile URLs. |
| Company identity | About shows phone + note, optional founder note env, stronger location line. |
| Tracking / CSP | Optional GA4 + LinkedIn Insight behind consent; CSP allow-lists those hosts. |
| Wording / a11y | “sew cleanly” → “stitch out well”; home sample images have real `alt` + `loading="lazy"`. |
| Commercial facts | Digitizing and vector `serviceCommercial` rows publish approved starting prices and revision language. |

## Still remaining (owner / ops)

These cannot be finished in the repo alone:

1. **Reopen production quote intake** — set on Vercel: `BLOB_READ_WRITE_TOKEN`, `QUOTE_STORE=vercel-blob`, plus SMTP (`EMAIL_PROVIDER=smtp`, `EMAIL_USER`, `EMAIL_APP_PASSWORD`, `QUOTE_INBOX_EMAIL`) or Resend. Until then the form stays offline on serverless even though CTAs land on `/quote`.
2. **Confirm sample image rights** — 11 `/samples/` images may show third-party brand names; keep as studio samples or replace with OneGo sew-outs + written permission.
3. **Real portfolio case studies** — add permission-cleared stitch-out photos to `src/lib/portfolio.ts` (see `docs/ASSETS_REQUIRED.md`).
4. **Size limits for $4 / $6** — publish exact max sizes once the owner confirms them.
5. **Named payment methods** — list cards/ACH/PayPal etc. only after the owner confirms what staff actually accept.
6. **Social profile URLs** — set `NEXT_PUBLIC_INSTAGRAM_URL`, `LINKEDIN`, `FACEBOOK`, `PINTEREST` to real profile paths (not bare homepages).
7. **Founder photo + note** — set `NEXT_PUBLIC_FOUNDER_NOTE` and supply an approved photo asset.
8. **Street address** — set `NEXT_PUBLIC_ADDRESS_LINE1` if a public address should appear.
9. **Analytics IDs** — set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and/or `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` to turn the consent banner on.
10. **Reviews / testimonials** — collect with permission; nowhere to invent them.
11. **Black Friday live dates** — banner is coded for 20–30 Nov 2026; confirm the discount still applies and staff are ready.
12. **Dispatch / shipping country** — align FAQ “US, UK, AU” with `/shipping` once origin is confirmed.
