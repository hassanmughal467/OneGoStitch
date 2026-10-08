import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { StitchField } from "@/components/visuals/StitchField";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  compact,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
  compact?: boolean;
  /** Kept for existing callers; every banner now uses the homepage theme. */
  dark?: boolean;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden border-b border-charcoal bg-hero text-card",
        compact ? "py-12 sm:py-14" : "py-14 sm:py-20",
      )}
    >
      <StitchField />
      <Container className="relative z-10">
        {eyebrow ? <Eyebrow className="text-copper-soft">{eyebrow}</Eyebrow> : null}
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h1>
        {lede ? <p className="mt-5 max-w-2xl text-lg leading-8 text-card/75">{lede}</p> : null}
        {children}
      </Container>
    </section>
  );
}
