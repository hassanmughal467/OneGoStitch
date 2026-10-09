# Owner inputs still required

These are facts the repository must not invent. Items marked **Launch blocker** should be resolved before the site is used to take customer business or before indexing is turned on.

| Input | Why it matters | Launch blocker |
|---|---|---|
| Monitored email (`NEXT_PUBLIC_CONTACT_EMAIL` and `QUOTE_INBOX_EMAIL`) | Contact page, footer, paused intake and policy routes have no public channel until this exists. | Yes |
| Confirmed production hostname | Indexing, canonicals, sitemap and social images stay in preview mode until `NEXT_PUBLIC_SITE_URL` is real. | Yes, before marketing launch |
| Durable quote store token | The form stays paused without `QUOTE_STORE=vercel-blob` and `BLOB_READ_WRITE_TOKEN`. | Yes |
| Verified sender (`RESEND_FROM_EMAIL`, `RESEND_API_KEY`) | A saved request can exist without an email. Staff still need a working notification path. | Yes, before relying on email |
| Legal name, registered country, production location, dispatch origin | Copy no longer says United States or Pakistan. Schema has no address. | Yes, before any location claim |
| Whether DTF is garments only | The page now says finished garments, not loose transfers or gang sheets. | Confirm |
| Trade ship-to policy | Copy now says the delivery address is confirmed on the written quote. Decide if default is the trade shop, the end customer, or either. | Confirm |
| Payment milestone | Site says the written quote states when payment is due. Confirm that matches invoices. | Confirm |
| Support hours and response statement | Hidden until `NEXT_PUBLIC_SUPPORT_HOURS` and `NEXT_PUBLIC_RESPONSE_STATEMENT` are true. | No |
| Phone or WhatsApp | Shown only if staffed. | No |
| Minimums, prices, turnaround | Hidden until entered in `src/lib/config/offers` or `serviceCommercial`. | No |
| Permission-cleared photos | Gallery stays hidden. Do not use illustrations as customer work. | No, for launch; yes before using images as proof |
| Social profile URLs | Hidden unless they are real https profile paths. | No |
| Analytics provider and consent | No third-party analytics is sent. | No |
| Refund cash handling and legal review | Policy describes corrections. It does not invent a refund timeline. | Before publishing as legal advice |
