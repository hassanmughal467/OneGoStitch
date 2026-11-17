import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { conversionPromises } from "@/lib/config/promises";

export function PromiseStrip({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "border-b border-line bg-warm py-8" : "border-b border-line bg-warm py-10 sm:py-12"} aria-label="What you can expect">
      <Container>
        <ul className="grid gap-6 sm:grid-cols-3 sm:gap-8">
          {conversionPromises.map((item) => (
            <li key={item.id}>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-copper-dark">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-soft">
          See{" "}
          <Link href="/pricing" className="font-semibold text-blue hover:underline">
            published file prices
          </Link>{" "}
          and the{" "}
          <Link href="/refund-policy" className="font-semibold text-blue hover:underline">
            refund and remake policy
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
