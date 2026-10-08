import { CtaBand } from "@/components/sections/CtaBand";
import { ProcessStrip } from "@/components/sections/ProcessStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { StitchField } from "@/components/visuals/StitchField";
import { breadcrumbJsonLd } from "@/lib/seo";
import { routes, services, type ServiceRoute } from "@/lib/services";

export function RouteOverview({ route, lede, points }: { route: ServiceRoute; lede: string; points: string[] }) {
  const info = routes.find((r) => r.id === route)!;
  const list = services.filter((s) => s.route === route);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: info.title, path: info.href }])} />
      <section className="overflow-hidden border-b border-charcoal bg-hero text-card">
        <StitchField />
        <Container className="relative z-10 grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <Eyebrow className="text-copper-soft">
              {route === "digitizing"
                ? "Files delivered by download"
                : route === "vector"
                  ? "Screen printing, vector files and DTF prints"
                  : "Products made to order and shipped"}
            </Eyebrow>
            <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">{info.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-card/75">{lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/quote?service=${list[0].id}`} className="bg-card text-charcoal hover:bg-warm">
                Request a Quote
              </ButtonLink>
            </div>
          </div>
          <div className="hidden lg:col-span-2 lg:block" aria-hidden />
          <ul className="grid gap-3 self-center lg:col-span-5">
            {points.map((point) => (
              <li key={point} className="flex gap-3 rounded-sm border border-card/15 bg-card/5 p-4 text-sm leading-6 text-card/80">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper-soft" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="border-b border-line bg-card py-14 sm:py-16">
        <Container>
          <ul className={`grid gap-5 sm:grid-cols-2 ${list.length > 3 ? "lg:grid-cols-4" : list.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
            {list.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ul>
        </Container>
      </section>
      <ProcessStrip />
      <CtaBand />
    </>
  );
}
