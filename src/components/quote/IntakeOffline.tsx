import { ContactChannels } from "@/components/contact/ContactChannels";
import { ButtonLink } from "@/components/ui/Button";
import { mailtoQuoteHref, site } from "@/lib/site";

/**
 * Shown instead of the quote form while intake is offline (maintenance or no
 * durable store). Leads with a working email route; never asks visitors to
 * wait and check the page again.
 */
export function IntakeOffline({ message, service }: { message: string; service?: string }) {
  return (
    <div className="bg-card p-6 sm:p-8" role="status">
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-copper-dark">Email a quote request</p>
      <h2 className="mt-3 text-2xl font-semibold">Send your request to {site.email}</h2>
      <p className="mt-3 leading-7 text-ink-soft">
        The online form is not taking requests right now. Email {site.email}
        {service ? ` about ${service}` : ""} with the size or quantity, the date you need it, and your artwork. We reply with a
        reference and a quotation.
      </p>
      <p className="mt-3 text-sm leading-6 text-ink-soft">{message}</p>
      <div className="mt-6">
        <ButtonLink href={mailtoQuoteHref(service)} external>
          Email {site.email}
        </ButtonLink>
      </div>
      <div className="mt-6 rounded-sm border border-line bg-warm p-5">
        <h3 className="text-base font-semibold">Or use another channel</h3>
        <p className="mt-1 text-sm leading-6 text-ink-soft">
          WhatsApp and telephone stay available if you prefer not to email. Include the same job details so we can quote once.
        </p>
        <div className="mt-4">
          <ContactChannels message={`Hello OneGo Stitch, I would like a quote${service ? ` for ${service}` : ""}.`} compact />
        </div>
      </div>
    </div>
  );
}
