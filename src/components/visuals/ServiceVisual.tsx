import { ArtworkToStitch, CapPuff, PatchSwatches } from "@/components/visuals/HeroComposition";
import type { ServiceVisual as VisualKind } from "@/lib/services";

/** Work sample shown for a service. */
export function ServiceVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "digitizing":
      return <ArtworkToStitch />;
    case "vector":
      return <RasterVsVector />;
    case "logo":
      return <LogoConcepts />;
    case "patches":
      return <PatchSwatches />;
    case "apparel":
      return <PlacementDiagram />;
    case "printing":
      return <PrintLocations />;
    case "dtf":
      return <DtfTransfer />;
    case "caps":
      return <CapPuff />;
  }
}

function Sample({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="h-full w-full bg-warm object-cover object-center" />;
}

export function RasterVsVector() {
  return (
    <div className="grid h-full min-h-40 grid-cols-2">
      <Sample src="/samples/vector-before.png" alt="Blurred raster artwork before it is redrawn" />
      <Sample src="/samples/vector-after.png" alt="The same artwork redrawn as clean vector paths" />
    </div>
  );
}

export function LogoConcepts() {
  return <Sample src="/samples/logo-concepts.jpg" alt="Three embroidered logo concepts: horizontal, badge, and stacked" />;
}

export function PlacementDiagram() {
  return <Sample src="/samples/embroidered-apparel.jpg" alt="Embroidered apparel placements: nape, name, full back, left chest, and sleeve" />;
}

export function PrintLocations() {
  return <Sample src="/samples/screen-print-separations.png" alt="A three-spot-color front print shown beside one screen per ink color" />;
}

export function DtfTransfer() {
  return <Sample src="/samples/dtf-transfer.jpg" alt="A full-color garment print next to the matching DTF heat-transfer film" />;
}
