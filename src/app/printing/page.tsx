import { RouteOverview } from "@/components/services/RouteOverview";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Screen Printing & DTF",
  description: "Screen printing and Direct-to-Film on finished garments. Choose the process that fits the artwork, then request an itemized quote.",
  path: "/printing",
});

export default function Page() {
  return (
    <RouteOverview
      route="printing"
      lede="Two garment-print services. Screen printing suits solid-color runs. Direct-to-Film suits full-colour or short-run marks. Each has its own quote."
      points={[
        "Screen printing and DTF are quoted as separate services.",
        "This offer is finished decorated garments, not loose transfers or gang sheets.",
        "A placement proof is approved before bulk production. Shipping is on the quote.",
      ]}
    />
  );
}
