/**
 * Sitewide conversion promises confirmed for public copy (Nov 2026 audit).
 * Keep claims process-true; do not invent size limits or payment brands here.
 */

export type PromiseItem = {
  id: string;
  title: string;
  body: string;
};

export const conversionPromises: PromiseItem[] = [
  {
    id: "reply",
    title: "Reply in 2–3 hours",
    body: "Most quote requests get a first reply within 2–3 hours, Eastern Time.",
  },
  {
    id: "hand-built",
    title: "Built by hand",
    body: "Every embroidery file is digitized for your placement, fabric and machine — not auto-traced and shipped.",
  },
  {
    id: "revisions",
    title: "Unlimited revisions to approval",
    body: "We revise the draft until you approve the preview. Sew-out corrections that fix our digitizing are included.",
  },
];

/** Published file prices used on /pricing and Offer schema. */
export const publishedPrices = [
  {
    id: "left-chest",
    name: "Left chest digitizing",
    price: 4,
    priceLabel: "$4",
    detail: "Production-ready embroidery file for a standard left-chest placement. Built by hand for your artwork, fabric and machine.",
    includes: ["Stitch preview before delivery", "Machine format you name (DST, PES, EXP, JEF, EMB and others)", "Sew-out correction if the issue is in our digitizing"],
  },
  {
    id: "jacket-back",
    name: "Jacket back digitizing",
    price: 6,
    priceLabel: "$6",
    detail: "Production-ready embroidery file for a jacket-back placement. Built by hand — not an auto-digitizer dump.",
    includes: ["Stitch preview before delivery", "Machine format you name", "Sew-out correction if the issue is in our digitizing"],
  },
  {
    id: "vector",
    name: "Simple logo vector or screen-print artwork",
    price: 5,
    priceLabel: "$5",
    detail: "Clean vector artwork for a simple logo or a screen-print separation.",
    includes: ["Preview before delivery", "Editable vector file", "Corrections that bring the mark closer to your original"],
  },
] as const;

export const tradeTerms = [
  {
    title: "Payment and invoices",
    body: "Accepted payment methods and due dates are stated on every written quote. Trade accounts can request invoices after the first completed job; Net terms are agreed in writing when volume justifies them.",
  },
  {
    title: "File check",
    body: "Send a file with your enquiry and we check whether it will run before you commit. Fixes that keep the same artwork, size and placement are included in the digitizing price.",
  },
  {
    title: "Reorder by reference",
    body: "Quote your previous reference. We reuse the approved file and specification, then reconfirm price and availability before running the job. Online accounts are not offered yet.",
  },
  {
    title: "White-label delivery",
    body: "We do not contact your customers. Packaging is unmarked unless you ask otherwise. Ship-to shop or ship-to customer is confirmed on the quote.",
  },
] as const;
