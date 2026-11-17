import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { leadCta, leadHref } from "@/lib/copy";
import { hasPublishedPortfolio, portfolioFilters, publishedPortfolio } from "@/lib/portfolio";
import { pageMetadata } from "@/lib/seo";
import { getIntakeStatus } from "@/lib/server/intake-config";
import { services } from "@/lib/services";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description: "Embroidery digitizing, patch, apparel and cap projects by OneGo Stitch, shown with customer permission or labeled as company samples.",
  path: "/portfolio",
  // Not indexable until published work exists.
  noindex: !hasPublishedPortfolio(),
});

const sampleTiles = [
  { src: "/samples/embroidered-patch.png", alt: "Embroidered patch sample", label: "Embroidered patch" },
  { src: "/samples/cap-front-3d-puff.jpg", alt: "3D puff cap embroidery sample", label: "3D puff cap" },
  { src: "/samples/embroidered-apparel.jpg", alt: "Embroidered apparel placements sample", label: "Apparel placements" },
  { src: "/samples/vector-after.png", alt: "Clean vector redraw sample", label: "Vector redraw" },
] as const;

export default function Page() {
  const items = publishedPortfolio();
  const serviceTitles = Object.fromEntries(services.map((s) => [s.id, s.title]));
  const intakeOnline = getIntakeStatus().online;

  if (!items.length) {
    return (
      <>
        <PageHero
          eyebrow="Portfolio"
          title="Permission-cleared projects are being prepared"
          lede="We publish named client work only with written permission. Ask for stitch-out examples of the product or placement you are planning and we will send relevant samples with your quote."
        />
        <section className="border-b border-line py-14">
          <Container>
            <h2 className="text-xl font-semibold">Studio samples on the site today</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft">
              These are illustrative technique samples, not a client case study gallery. Real sew-out photos with before-and-after proofs will replace this section once permissions are recorded.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sampleTiles.map((tile) => (
                <li key={tile.src} className="overflow-hidden rounded-sm border border-line bg-card">
                  <img src={tile.src} alt={tile.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
                  <p className="px-3 py-2 text-sm font-medium text-charcoal">{tile.label}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={leadHref(intakeOnline)}>{leadCta(intakeOnline)}</ButtonLink>
              <ButtonLink href="/pricing" variant="secondary">
                View pricing
              </ButtonLink>
              <ButtonLink href="/custom-products" variant="secondary">
                Browse products
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              Prefer a specific technique? Start from{" "}
              <Link href="/embroidery-digitizing" className="font-semibold text-blue hover:underline">
                embroidery digitizing
              </Link>{" "}
              or{" "}
              <Link href="/custom-patches" className="font-semibold text-blue hover:underline">
                custom patches
              </Link>
              .
            </p>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Portfolio" title="Selected projects and company samples" lede="Client projects are shown with permission. Company samples are self-initiated pieces made to demonstrate a technique." />
      <section className="py-14 sm:py-16">
        <Container>
          <PortfolioGallery items={items} filters={portfolioFilters()} serviceTitles={serviceTitles} />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
