/**
 * Public analytics IDs. Scripts load only after consent (see ConsentBanner).
 * Leave unset to keep the site free of third-party tags.
 */

function clean(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const publicAnalytics = {
  gaMeasurementId: clean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  linkedInPartnerId: clean(process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID),
  get configured() {
    return Boolean(this.gaMeasurementId || this.linkedInPartnerId);
  },
} as const;
