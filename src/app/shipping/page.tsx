import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shipping & Delivery",
  description: "How digital files and physical orders are delivered, how shipping is quoted, and what to expect on customs and tracking.",
  path: "/shipping",
});

export default function Page() {
  return (
    <>
      <PageHero compact eyebrow="Help" title="Shipping & delivery" lede="Digital files are delivered by download. Physical orders ship with tracking. The quote states the shipping cost and an estimated transit time for your destination. The dispatch origin is confirmed on that quote." />
      <section className="py-12 sm:py-14">
        <Container className="prose-site max-w-2xl leading-7 text-ink-soft">
          <h2 className="text-xl font-semibold text-charcoal">Digital files</h2>
          <p>Embroidery files, vector artwork and logo files are sent as a download link once payment is received. There is nothing to ship and no shipping charge.</p>
          <h2 className="mt-8 text-xl font-semibold text-charcoal">Physical orders</h2>
          <p>
            Patches, apparel, printed goods and caps are shipped with tracking. Every product quote shows the shipping cost and an estimated transit time for your postal
            code, separate from the production time. The dispatch location is the one written on that quote.
          </p>
          <p>Tell us the destination country and postal code when you request a quote so shipping can be estimated. We do not publish a dispatch country until it is confirmed.</p>
          <h2 className="mt-8 text-xl font-semibold text-charcoal">Customs and duties</h2>
          <p>
            Import duties and taxes charged by your country are the responsibility of the recipient unless your quote states otherwise. Commercial invoices are included with each
            shipment.
          </p>
          <h2 className="mt-8 text-xl font-semibold text-charcoal">Timing</h2>
          <p>
            Production time starts after proof approval and payment. Shipping time starts at dispatch. Both are shown on the quote so you can see the total lead time before you
            order.
          </p>
        </Container>
      </section>
    </>
  );
}
