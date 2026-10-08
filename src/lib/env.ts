/**
 * Environment resolution for indexing, canonical URLs and provider availability.
 *
 * Production indexing is opt-in. It is on when a public origin is known AND this
 * is a production deployment:
 *   NEXT_PUBLIC_SITE_ENV=production, or Vercel's VERCEL_ENV=production
 * Origin comes from NEXT_PUBLIC_SITE_URL, or VERCEL_PROJECT_PRODUCTION_URL.
 * Preview hosts (VERCEL_URL / *.vercel.app git deployments) are never used for
 * canonicals, Open Graph, Twitter images or the sitemap.
 */

function clean(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function normalizeOrigin(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    if (url.protocol !== "https:" && url.hostname !== "localhost") return undefined;
    if (url.hostname.endsWith(".vercel.app") && url.hostname.includes("-git-")) return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

const configuredSiteUrl = normalizeOrigin(clean(process.env.NEXT_PUBLIC_SITE_URL));
const vercelProductionUrl = normalizeOrigin(clean(process.env.VERCEL_PROJECT_PRODUCTION_URL));
const productionUrl = configuredSiteUrl ?? vercelProductionUrl;

const declaredEnv = clean(process.env.NEXT_PUBLIC_SITE_ENV);
const vercelEnv = clean(process.env.VERCEL_ENV);
const isProductionSignal = declaredEnv === "production" || vercelEnv === "production";
const isProduction = isProductionSignal && Boolean(productionUrl);

const port = clean(process.env.PORT) ?? "3000";

export const siteEnv = {
  /** "production" only when this deployment is the live site and the origin is known. */
  mode: isProduction ? ("production" as const) : ("preview" as const),
  isProduction,
  /** Origin for metadataBase and public URLs. Preview git hosts are never used. */
  baseUrl: productionUrl ?? `http://localhost:${port}`,
  /** Search engines may index only the production deployment. */
  indexable: isProduction,
  /** Public origin, or undefined when it has not been established. */
  productionUrl,
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteEnv.baseUrl).toString();
}

/**
 * Public, shareable URL on the production origin.
 * Preview git hostnames are never returned.
 */
export function publicAbsoluteUrl(path = "/"): string | undefined {
  if (!siteEnv.productionUrl) return undefined;
  return new URL(path, siteEnv.productionUrl).toString();
}
