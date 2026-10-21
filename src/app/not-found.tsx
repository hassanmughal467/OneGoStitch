import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { leadCta, leadHref } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";
import { getIntakeStatus } from "@/lib/server/intake-config";

export const metadata = pageMetadata({
  title: "Page not found",
  description: "That page does not exist. Return home or request a quote.",
  path: "/404",
  noindex: true,
});

export default function NotFound() {
  const intakeOnline = getIntakeStatus().online;
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-2xl">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-copper-dark">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Page not found</h1>
        <p className="mt-5 text-base leading-7 text-ink-soft">The address may have changed or the page does not exist. Use the links below to continue.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href={leadHref(intakeOnline)} variant="secondary">
            {leadCta(intakeOnline)}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
