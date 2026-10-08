# Audit remediation

Audit date: 9 October 2026. Code reviewed and updated in the existing Next.js app. This file records status against the 24 audit areas. It is not a claim that the live Vercel deployment has been changed.

| ID | Status | What changed | Evidence / remaining work |
|---|---|---|---|
| 01 Quote intake paused | Fixed in code / Needs Verification on Vercel | Local `next dev` uses the file store. Vercel with `BLOB_READ_WRITE_TOKEN` uses Blob even if `QUOTE_STORE` is unset. Paused copy no longer claims a request was logged. Contact channels show on `/quote` whenever they are configured. | Link Vercel Blob (or set `QUOTE_STORE` + token) on production. Set `NEXT_PUBLIC_CONTACT_EMAIL` for a public fallback. |
| 02 No contact channel | Blocked | Channels render only from validated env (`src/lib/site.ts`, `ContactChannels`). Empty `mailto` links are not shown. | Set `NEXT_PUBLIC_CONTACT_EMAIL` (and phone or WhatsApp only if staffed). Launch blocker. |
| 03 Indexing disabled | Fixed in code | Production is `VERCEL_ENV=production` or `NEXT_PUBLIC_SITE_ENV=production`, plus `NEXT_PUBLIC_SITE_URL` or `VERCEL_PROJECT_PRODUCTION_URL`. Preview stays noindex with an empty sitemap. Git `*-git-*` Vercel hosts are rejected as a public origin. | Confirm the Production environment on Vercel after deploy. |
| 04 Dev host in social metadata | Fixed | `metadataBase`, Open Graph and Twitter image URLs use the production origin. Preview git hostnames are never used. Canonicals are emitted on public pages whenever that origin is known, including preview. |  |
| 05 US copy vs PK schema | Fixed | Removed hardcoded United States claims and `addressCountry: "PK"`. Schema has no postal address. Country prints only from `NEXT_PUBLIC_ADDRESS_COUNTRY`. | Owner must supply legal entity, production location and dispatch origin. Launch blocker for location-specific claims. |
| 06 Orange contrast | Fixed | `--color-blue` is `#A04A16` (white text about 6:1). `--color-blue-dark` is the hover. Bright `#D06A2C` remains `--color-accent` for decoration. | Not a full WCAG audit. |
| 07 Hero caption | Fixed | Caption is 14px `#D0C7BF` on a solid `#141414` chip. Still labeled as an illustration. | Measure on a real screen if the chip is ever placed over a lighter image. |
| 08 Real work photos | Blocked | Empty portfolio stays hidden. Illustrations remain labeled as illustrations. | Permission-cleared sew-outs, patch edges and cap photos. See `docs/ASSETS_REQUIRED.md`. |
| 09 Process sequence | Fixed | Homepage, how-it-works, trade, terms and fulfilment copy separate a digital draft/preview from bulk production. | Payment milestone still follows the written quote, not a new site-wide rule. |
| 10 DTF spelling | Fixed | Service id, quote links and the public path are `dtf-printing`. `service=dft-printing` and `/dft-printing` still resolve. New saved requests use `dtf-printing`. | Confirm with the owner that loose transfers are not sold. |
| 11 Quote pipeline | Needs Verification | Server validation, idempotency key, store, and notification decoupling exist and have unit tests. | Staging: one valid request, one retry, one forced email failure. |
| 12 File privacy | Needs Verification | Artwork links require `QUOTE_ARTWORK_LINK_SECRET` and expire. Uploads are not served as active content from the app origin. | Cross-customer access test on staging storage. |
| 13 Mobile and a11y | Needs Verification | Skip link, focus styles, reduced motion and 44px-class buttons were already present. Contrast tokens updated. | Real iOS Safari, Android Chrome, keyboard and 200% zoom were not run in this pass. |
| 14 Two routes, three cards | Fixed | Homepage says three groups. Cards match Digitizing & Artwork, Screen Printing & DTF, and Custom Products. |  |
| 15 Vector tracing findability | Fixed | Vector Tracing is under Digitizing & Artwork and in that quote group. Printing cross-links remain on the service record. `/vector` redirects to `/vector-tracing`. |  |
| 16 Service hierarchy | Fixed | Homepage order leads with digitizing and custom patches. Other services stay listed. |  |
| 17 Minimums and turnaround | Already Correct | `serviceCommercial` renders a row only when the owner sets a value. No invented prices. | Owner-approved ranges, if they want them public. |
| 18 Logo weight | Fixed | `public/logo.png` resized from 956×871 (702,493 bytes) to 320×291 (93,063 bytes). Original kept at `brand/logo-original.png`. Width and height are set on the image. | Visual check in the header at 1x and 2x. Lighthouse was not run. |
| 19 Repeated process copy | Fixed | Shared steps now distinguish digital draft from physical production. Service pages still share `ProcessStrip`. | Further per-service process blocks are optional. |
| 20 Trade reorder | Already Correct | Trade page keeps a manual reorder using the previous reference. No portal and no promised discount. |  |
| 21 Policies | Fixed | Terms proof language matches the two journeys. Shipping no longer claims a US origin. Contact routes still depend on a configured email. | Legal review of refund timing and entity. |
| 22 Analytics | Already Correct | `src/lib/analytics.ts` is a no-send interface aligned with the cookies page. Events do not include email or artwork. | Connect a provider only with a consent decision. |
| 23 CSP | Needs Verification | Existing headers kept, including `unsafe-inline` for Next.js. Not switched to enforce-nonce in this pass. | Report-only trial on preview before removing `unsafe-inline`. |
| 24 Performance | Needs Verification | Logo bytes reduced. No Lighthouse or CrUX numbers were collected. | Run mobile Lighthouse on `/`, `/embroidery-digitizing` and `/quote` after a production build. |

## Checks run

See the handoff for the commands actually executed in this session. Do not treat this document as a passing production build unless the handoff lists that result.
