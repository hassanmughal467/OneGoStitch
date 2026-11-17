import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { publicAnalytics } from "@/lib/config/analytics-public";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Cookies", description: "Which cookies the OneGo Stitch website uses.", path: "/cookies" });

export default function Page() {
  const analyticsOn = publicAnalytics.configured;

  return (
    <>
      <PageHero
        compact
        eyebrow="Policy"
        title="Cookies"
        lede={analyticsOn ? "Essential cookies keep the site working. Analytics cookies run only if you accept them." : "This website does not use advertising cookies. Analytics tags are off until measurement IDs are configured."}
      />
      <section className="py-12 sm:py-14">
        <Container className="prose-site max-w-2xl leading-7 text-ink-soft">
          <p>
            Essential cookies may remember a form session while you complete a quote, or remember that you dismissed an announcement banner. They are required for the site to work.
          </p>
          {analyticsOn ? (
            <>
              <p>
                Optional analytics cookies are set only after you choose &quot;Accept analytics&quot; on the consent banner. They may include Google Analytics 4
                {publicAnalytics.gaMeasurementId ? ` (${publicAnalytics.gaMeasurementId})` : ""} and the LinkedIn Insight Tag
                {publicAnalytics.linkedInPartnerId ? ` (partner ${publicAnalytics.linkedInPartnerId})` : ""}. Events never include names, emails, phone numbers, artwork filenames or quote text.
              </p>
              <p>You can change your mind by clearing site cookies for this domain and reloading the page, which shows the banner again.</p>
            </>
          ) : (
            <p>
              No analytics or advertising cookies are set today. When a measurement ID is added in production, analytics will run only after consent, and this page will list the cookies involved.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
