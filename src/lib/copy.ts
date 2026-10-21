import { services } from "@/lib/services";

/**
 * Public CTA wording. Kept in one place so service cards, pages and the quote
 * form stay grammatically consistent ("Request a…" / "Request an…").
 */
export const quoteCtaByService: Record<string, string> = {
  "embroidery-digitizing": "Request an embroidery digitizing quote",
  "vector-tracing": "Request a vector tracing quote",
  "dtf-printing": "Request a DTF printing quote",
  "custom-logo-design": "Request a logo design quote",
  "custom-patches": "Request a custom patch quote",
  "embroidered-apparel": "Request an embroidered apparel quote",
  "screen-printing": "Request a screen-printing quote",
  "custom-hats": "Request a custom hat quote",
};

export function quoteCta(serviceId?: string) {
  if (serviceId && quoteCtaByService[serviceId]) return quoteCtaByService[serviceId];
  return "Request a quote";
}

export function similarProjectCta(serviceId?: string) {
  const service = serviceId ? services.find((item) => item.id === serviceId) : undefined;
  return service ? `Quote a similar ${serviceInSentence(service.title)} project` : "Quote a similar project";
}

/** Lowercases a service title for a sentence while keeping DTF and similar marks intact. */
export function serviceInSentence(title: string) {
  return title
    .split(/(\bDTF\b)/)
    .map((part) => (part === "DTF" ? "DTF" : part.toLowerCase()))
    .join("");
}

export function leadHref(online: boolean, quotePath = "/quote") {
  return online ? quotePath : "/contact";
}

export function leadCta(online: boolean, serviceId?: string) {
  return online ? quoteCta(serviceId) : "Email a quote request";
}
