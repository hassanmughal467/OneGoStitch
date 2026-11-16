/**
 * Homepage and guide visuals. Tiles use work samples kept in /public/samples.
 */
export function HeroComposition() {
  return (
    <figure className="relative mx-auto w-full max-w-lg lg:ml-auto lg:max-w-md">
      <div className="grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4" style={{ aspectRatio: "6 / 5.2" }}>
        <div className="col-span-6 row-span-4 overflow-hidden rounded-sm border border-line bg-card shadow-sm">
          <ArtworkToStitch />
        </div>
        <div className="col-span-3 row-span-2 overflow-hidden rounded-sm border border-line bg-card shadow-sm">
          <CapPuff />
        </div>
        <div className="col-span-3 row-span-2 overflow-hidden rounded-sm border border-line bg-card shadow-sm">
          <PatchSwatches />
        </div>
      </div>
      <figcaption className="mt-3 inline-block rounded-sm bg-charcoal px-2 py-1 text-left text-sm leading-5 text-[#D0C7BF]">
        Sample work: artwork turned into a stitched patch, 3D puff cap embroidery, and patch constructions.
      </figcaption>
    </figure>
  );
}

export function ArtworkToStitch(_props?: { id?: string }) {
  return (
    <div className="grid h-full min-h-48 grid-cols-2 bg-warm" role="img" aria-label="Vector artwork beside the finished embroidered patch">
      <img src="/samples/vector-artwork.jpg" alt="" className="h-full w-full object-cover object-center" />
      <img src="/samples/embroidered-patch.png" alt="" className="h-full w-full object-cover object-center" />
    </div>
  );
}

export function CapPuff(_props?: { id?: string }) {
  return <img src="/samples/cap-front-3d-puff.jpg" alt="Black cap with a white 3D puff embroidered mark on the front" className="h-full w-full object-cover object-center" />;
}

export function PatchSwatches(_props?: { id?: string }) {
  return <img src="/samples/patch-types.jpg" alt="Embroidered, woven, PVC, and chenille custom patches" className="h-full w-full object-cover object-center" />;
}
