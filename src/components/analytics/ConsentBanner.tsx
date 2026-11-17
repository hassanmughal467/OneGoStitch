"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";

const CONSENT_COOKIE = "sc_consent";
const CONSENT_VALUE = "analytics";
const DECISION_KEY = "sc_consent_decided";

function readConsentDecided() {
  if (typeof document === "undefined") return true;
  try {
    if (window.localStorage.getItem(DECISION_KEY) === "1") return true;
  } catch {
    /* ignore */
  }
  return document.cookie.split(";").some((c) => {
    const [k] = c.trim().split("=");
    return k === CONSENT_COOKIE;
  });
}

function setConsent(granted: boolean) {
  const maxAge = 60 * 60 * 24 * 180;
  if (granted) {
    document.cookie = `${CONSENT_COOKIE}=${CONSENT_VALUE}; path=/; max-age=${maxAge}; SameSite=Lax`;
  } else {
    document.cookie = `${CONSENT_COOKIE}=essential; path=/; max-age=${maxAge}; SameSite=Lax`;
  }
  try {
    window.localStorage.setItem(DECISION_KEY, "1");
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event("sc-consent-changed"));
}

/** Shown only when analytics IDs are configured. Essential cookies never need a prompt. */
export function ConsentBanner({ analyticsConfigured }: { analyticsConfigured: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!analyticsConfigured) return;
    setVisible(!readConsentDecided());
  }, [analyticsConfigured]);

  const accept = useCallback(() => {
    setConsent(true);
    setVisible(false);
  }, []);

  const decline = useCallback(() => {
    setConsent(false);
    setVisible(false);
  }, []);

  if (!analyticsConfigured || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-card shadow-[0_-8px_24px_rgba(21,21,21,0.08)]" role="dialog" aria-label="Analytics cookies">
      <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-ink-soft">
          We use optional analytics cookies (Google Analytics and LinkedIn Insight when configured) to understand which pages lead to quotes. They never receive artwork or contact details.{" "}
          <Link href="/cookies" className="font-semibold text-blue hover:underline">
            Cookie policy
          </Link>
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={decline} className="inline-flex min-h-10 items-center rounded-sm border border-line px-4 text-sm font-semibold text-charcoal hover:border-blue">
            Essential only
          </button>
          <button type="button" onClick={accept} className="inline-flex min-h-10 items-center rounded-sm bg-blue px-4 text-sm font-semibold text-card hover:bg-blue-dark">
            Accept analytics
          </button>
        </div>
      </Container>
    </div>
  );
}
