import Link from "next/link";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { QuoteIntake } from "@/components/quote/QuoteIntake";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getIntakeStatus } from "@/lib/server/intake-config";
import { pageMetadata } from "@/lib/seo";
import { contactChannels, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact OneGo Stitch about embroidery digitizing, vector artwork, patches, apparel, printing or caps. Email, WhatsApp and quote form.",
  path: "/contact",
});

export default function Page() {
  const status = getIntakeStatus();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to OneGo Stitch"
        lede={
          status.online
            ? "Send a quote request with the service, size or quantity, and your artwork. We reply with a price and any questions."
            : contactChannels.hasAny
              ? "The online form is paused. Email or message us with the service, size or quantity, the date you need it, and your artwork."
              : "The online quote form is paused until requests can be saved."
        }
      />
      <section className="py-14 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <h2 className="text-2xl font-semibold">How to reach us</h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{site.location}</p>
            <div className="mt-6">
              <ContactChannels message="Hello OneGo Stitch, I have a question." />
            </div>
            <p className="mt-6 text-sm leading-6 text-ink-soft">
              Include the service, quantity or size, the date you need it and your artwork. If you have ordered before, quote your previous reference so we can reuse the approved file.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {[
                ["/how-it-works", "How ordering works"],
                ["/artwork-guidelines", "Artwork guidelines"],
                ["/shipping", "Shipping and delivery"],
                ["/faq", "Frequently asked questions"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="font-semibold text-blue hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold">Request a quote</h2>
              {status.online ? (
                <ButtonLink href="/quote" variant="secondary" className="min-h-10 px-4 text-[0.78rem]">
                  Open the full quote page
                </ButtonLink>
              ) : null}
            </div>
            <div className="mt-4 rounded-sm border border-line">
              <QuoteIntake />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
