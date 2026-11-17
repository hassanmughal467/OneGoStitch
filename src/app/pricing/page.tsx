import Link from "next/link";
import { PromiseStrip } from "@/components/sections/PromiseStrip";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { publishedPrices } from "@/lib/config/promises";
import { offerCatalogJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Hand-built embroidery digitizing from $4 left chest and $6 jacket back, plus $5 simple logo vector. Preview included, unlimited revisions to approval, sew-out correction when needed.",
  path: "/pricing",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={offerCatalogJsonLd(
          publishedPrices.map((item) => ({
            name: item.name,
            description: item.detail,
            price: item.price,
            path: "/pricing",
          })),
        )}
      />
      <PageHero
        eyebrow="Pricing"
        title="Hand-built embroidery files at published prices"
        lede="Every price below is for work digitized or redrawn by hand for your placement — not auto-digitizer output. Preview included before delivery."
      />
      <PromiseStrip compact />
      <section className="border-b border-line py-14 sm:py-16">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {publishedPrices.map((item) => (
              <li key={item.id} className="flex flex-col rounded-sm border border-line bg-card p-6 sm:p-8">
                <p className="text-4xl font-semibold tracking-[-0.03em] text-charcoal">{item.priceLabel}</p>
                <h2 className="mt-4 text-xl font-semibold">{item.name}</h2>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{item.detail}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm leading-6 text-ink-soft">
                  {item.includes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <div className="max-w-3xl space-y-4 text-base leading-7 text-ink-soft lg:col-span-7">
              <h2 className="text-xl font-semibold text-charcoal">What these prices include</h2>
              <p>
                Standard left-chest and jacket-back placements for embroidery shops and decorators. Tell us your machine, fabric and finished size on the quote form so we build the file for that run — not a generic auto export.
              </p>
              <p>
                Caps, 3D puff, multi-placement sets, complex artwork and products are quoted separately. Size limits for a given price are confirmed on your written quote when the artwork needs them.
              </p>
              <p>
                {site.responseStatement} Unlimited revisions until you approve the preview. If a delivered embroidery file does not stitch out well on your machine, send a sew-out photo and fabric details — we correct our digitizing at no charge.
              </p>
            </div>
            <aside className="rounded-sm border border-line bg-warm p-6 text-sm leading-6 text-ink-soft lg:col-span-5">
              <h2 className="text-base font-semibold text-charcoal">Trade and trust</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  White-label work for shops and distributors — we never contact your customers. See{" "}
                  <Link href="/trade" className="font-semibold text-blue hover:underline">
                    trade terms
                  </Link>
                  .
                </li>
                <li>
                  Remake and correction rules are written on the{" "}
                  <Link href="/refund-policy" className="font-semibold text-blue hover:underline">
                    refund and remake policy
                  </Link>
                  .
                </li>
                <li>
                  Payment methods and any deposit are stated on your quote. We do not take payment on this website.
                </li>
              </ul>
            </aside>
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
