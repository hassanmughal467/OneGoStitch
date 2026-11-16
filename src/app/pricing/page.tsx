import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Embroidery file pricing: left chest digitizing $4, jacket back digitizing $6, and simple logo vector or screen-print artwork $5. Preview included, with a sew-out correction if needed.",
  path: "/pricing",
});

const prices = [
  { name: "Left chest digitizing", price: "$4", detail: "A production-ready embroidery file for a left-chest placement." },
  { name: "Jacket back digitizing", price: "$6", detail: "A production-ready embroidery file for a jacket back." },
  { name: "Simple logo vector or screen-print artwork", price: "$5", detail: "Clean vector artwork for a simple logo or a screen-print separation." },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="What does a production-ready embroidery file cost? Here's ours."
        lede="Published prices for the file types shops order most. Every order includes a preview before delivery."
      />
      <section className="border-b border-line py-14 sm:py-16">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {prices.map((item) => (
              <li key={item.name} className="rounded-sm border border-line bg-card p-6 sm:p-8">
                <p className="text-4xl font-semibold tracking-[-0.03em] text-charcoal">{item.price}</p>
                <h2 className="mt-4 text-xl font-semibold">{item.name}</h2>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{item.detail}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 max-w-3xl space-y-4 text-base leading-7 text-ink-soft">
            <p>Every order includes a preview before delivery. If a file does not sew well on your machine, send us a sew-out photo and we will correct it.</p>
            <p>We work with embroidery shops, promo distributors, and decorators, including white-label jobs. We never contact your customers.</p>
          </div>
        </Container>
      </section>
      <CtaBand
        title="Send the artwork for one of these prices"
        body="Tell us the placement and attach the logo. We confirm the file type, then deliver a preview before the final file."
      />
    </>
  );
}
