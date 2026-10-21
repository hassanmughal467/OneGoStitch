import { describe, expect, it } from "vitest";
import { leadCta, leadHref, quoteCta, quoteCtaByService, serviceInSentence } from "@/lib/copy";
import { quoteServiceIds } from "@/lib/quote";

describe("quote CTAs", () => {
  it("covers every service with Request a/an wording", () => {
    for (const id of quoteServiceIds) {
      expect(quoteCtaByService[id]).toMatch(/^Request an? /);
      expect(quoteCta(id)).not.toMatch(/^Get a /);
    }
    expect(quoteCta()).toBe("Request a quote");
  });

  it("routes dead-end quote CTAs to contact while intake is offline", () => {
    expect(leadHref(true, "/quote?service=dtf-printing")).toBe("/quote?service=dtf-printing");
    expect(leadHref(false, "/quote?service=dtf-printing")).toBe("/contact");
    expect(leadCta(true, "dtf-printing")).toBe("Request a DTF printing quote");
    expect(leadCta(false)).toBe("Email a quote request");
  });

  it("keeps DTF capitalized in sentence case", () => {
    expect(serviceInSentence("DTF Printing")).toBe("DTF printing");
    expect(serviceInSentence("Embroidery Digitizing")).toBe("embroidery digitizing");
  });
});
