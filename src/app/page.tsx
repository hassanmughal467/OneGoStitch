import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProcessStrip } from "@/components/sections/ProcessStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { ArtworkToStitch, HeroComposition } from "@/components/visuals/HeroComposition";
import { StitchField } from "@/components/visuals/StitchField";
import { featuredPortfolio, hasPublishedPortfolio } from "@/lib/portfolio";
import { PortfolioPreview } from "@/components/portfolio/PortfolioPreview";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { buyingAnswers, routes, tradeBenefits } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Embroidery Digitizing & Custom Patches | ${site.name}`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  const showWork = hasPublishedPortfolio();

  return (
    <>
      <JsonLd data={faqJsonLd([...buyingAnswers])} />

      <section className="relative overflow-hidden border-b border-charcoal bg-hero text-card">
        <StitchField />
        <Container className="relative z-10 py-14 sm:py-16 lg:min-h-[34rem] lg:py-20">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-6">
              <Eyebrow className="text-copper-soft">Embroidery digitizing and custom patches</Eyebrow>
              <h1 className="mt-4 max-w-[16ch] text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.03em] text-card sm:text-[2.5rem] lg:text-[3.05rem]">
                Embroidery Digitizing &amp; Custom Patches for Your Next Order
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-card/80 sm:text-lg sm:leading-8">
                Machine-ready stitch files and custom patches for print shops, brands, and teams. Share your artwork and requirements for an itemized quote.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/quote" className="bg-card text-charcoal hover:bg-warm">
                  Request a Quote
                </ButtonLink>
                {showWork ? (
                  <ButtonLink href="/portfolio" variant="invertGhost">
                    View Our Work
                  </ButtonLink>
                ) : (
                  <ButtonLink href="#services" variant="invertGhost">
                    Explore Services
                  </ButtonLink>
                )}
              </div>
            </div>
            <div className="lg:col-span-6">
              <HeroComposition />
            </div>
          </div>
        </Container>
      </section>

      {featuredPortfolio().length ? (
        <PortfolioPreview featured />
      ) : (
        <section className="border-b border-line bg-card py-16 sm:py-20">
          <Container className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Quality"
                title="What changes between your logo and the sew-out"
                lede="Embroidery is not a print. Thin lines get thickened, tiny text is simplified, and the border is planned so the patch edge does not fray. The stitch preview shows these decisions before production."
              />
              <Link href="/resources/embroidery-proofs" className="mt-6 inline-block text-sm font-semibold text-blue hover:underline">
                Understanding embroidery proofs
              </Link>
            </div>
            <div className="overflow-hidden rounded-sm border border-line bg-warm shadow-[0_1px_2px_rgba(21,21,21,0.05)] lg:col-span-7">
              <ArtworkToStitch id="home-compare" />
            </div>
          </Container>
        </section>
      )}

      <section id="services" className="scroll-mt-24 border-b border-line py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Services" title="Choose the work you need" lede="Three groups, one quote form. Every service stays in the menu." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {routes.map((route) => (
              <Link
                key={route.id}
                href={route.href}
                className="group flex flex-col rounded-sm border border-line bg-card p-7 shadow-[0_1px_2px_rgba(21,21,21,0.05)] transition-colors hover:border-blue sm:p-8"
              >
                <h3 className="text-2xl font-semibold tracking-[-0.02em]">{route.title}</h3>
                <p className="mt-3 leading-7 text-ink-soft">{route.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {route.items.map((item) => (
                    <li key={item} className="rounded-full border border-line bg-warm px-3 py-1 text-xs font-medium text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue">
                  View {route.title}
                  <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden>
                    <path d="M3 8h9M8 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ProcessStrip />

      <section className="border-b border-charcoal bg-charcoal py-16 text-card sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              invert
              eyebrow="For trade"
              title="Overflow capacity for print shops, decorators and agencies"
              lede="Send digitizing, vector and production jobs under your own reference. Approved files stay on record for reorders. We do not contact your customers."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/trade" variant="invert">
                Trade information
              </ButtonLink>
              <ButtonLink href="/quote?customer=business" variant="invertGhost">
                Send a trade enquiry
              </ButtonLink>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {tradeBenefits.map((item) => (
              <li key={item.title} className="rounded-sm border border-card/15 p-5">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-card/70">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Before you order" title="Price, timing, minimums and revisions" />
            <Link href="/faq" className="mt-5 inline-block text-sm font-semibold text-blue hover:underline">
              All frequently asked questions
            </Link>
          </div>
          <dl className="divide-y divide-line rounded-sm border border-line bg-card lg:col-span-8">
            {buyingAnswers.map((item) => (
              <div key={item.q} className="grid gap-2 p-5 sm:grid-cols-12 sm:gap-6">
                <dt className="font-semibold sm:col-span-4">{item.q}</dt>
                <dd className="text-sm leading-6 text-ink-soft sm:col-span-8">{item.a}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
