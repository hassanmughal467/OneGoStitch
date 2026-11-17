"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { hasAnalyticsConsent } from "@/lib/analytics";

type Props = {
  gaMeasurementId?: string | null;
  linkedInPartnerId?: string | null;
};

/**
 * Loads GA4 / LinkedIn Insight only after the visitor grants analytics consent.
 * IDs come from env; when unset nothing is injected.
 */
export function AnalyticsScripts({ gaMeasurementId, linkedInPartnerId }: Props) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(hasAnalyticsConsent());
    sync();
    window.addEventListener("sc-consent-changed", sync);
    return () => window.removeEventListener("sc-consent-changed", sync);
  }, []);

  if (!allowed) return null;

  return (
    <>
      {gaMeasurementId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
          `}</Script>
        </>
      ) : null}
      {linkedInPartnerId ? (
        <Script id="linkedin-insight" strategy="afterInteractive">{`
          _linkedin_partner_id = "${linkedInPartnerId}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l){
            if (!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
            var s=document.getElementsByTagName("script")[0];
            var b=document.createElement("script");
            b.type="text/javascript";b.async=true;
            b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b,s);
          })(window.lintrk);
        `}</Script>
      ) : null}
    </>
  );
}
