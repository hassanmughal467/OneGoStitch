import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * Indexing must be opt-in: only a production deployment with a known origin
 * is crawlable. Modules read process.env at import time, so each case re-imports them.
 */
async function load(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const key of [
    "NEXT_PUBLIC_SITE_ENV",
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_VERCEL_URL",
    "VERCEL_URL",
    "VERCEL_ENV",
    "VERCEL_PROJECT_PRODUCTION_URL",
    "PORT",
  ]) {
    vi.stubEnv(key, env[key] ?? "");
  }
  const envMod = await import("@/lib/env");
  const robots = (await import("@/app/robots")).default;
  const sitemap = (await import("@/app/sitemap")).default;
  const seo = await import("@/lib/seo");
  return { siteEnv: envMod.siteEnv, robots: robots(), sitemap: sitemap(), seo };
}

afterEach(() => vi.unstubAllEnvs());

describe("indexing by environment", () => {
  it("treats local and Vercel previews as noindex with an empty sitemap", async () => {
    const preview = await load({ NEXT_PUBLIC_VERCEL_URL: "onegostitch-git-dev-example.vercel.app", VERCEL_ENV: "preview" });
    expect(preview.siteEnv.mode).toBe("preview");
    expect(preview.siteEnv.baseUrl).toBe("http://localhost:3000");
    expect(preview.siteEnv.productionUrl).toBeUndefined();
    expect(preview.robots).toEqual({ rules: { userAgent: "*", disallow: "/" } });
    expect(preview.sitemap).toEqual([]);
    const meta = preview.seo.pageMetadata({ title: "Test", description: "d", path: "/custom-patches" });
    expect(meta.alternates?.canonical).toBeUndefined();
    expect(meta.openGraph?.url).toBeUndefined();
    expect(JSON.stringify(meta)).not.toContain("vercel.app");
    expect(preview.seo.organizationJsonLd().url).toBeUndefined();
    expect(meta.robots).toMatchObject({ index: false, follow: false });
  });

  it("uses the production origin for canonicals and social URLs even on preview", async () => {
    const preview = await load({
      VERCEL_ENV: "preview",
      VERCEL_URL: "onegostitch-git-dev-example.vercel.app",
      VERCEL_PROJECT_PRODUCTION_URL: "onegostitch.vercel.app",
    });
    expect(preview.siteEnv.indexable).toBe(false);
    expect(preview.robots).toEqual({ rules: { userAgent: "*", disallow: "/" } });
    expect(preview.sitemap).toEqual([]);
    const meta = preview.seo.pageMetadata({ title: "Test", description: "d", path: "/custom-patches" });
    expect(meta.alternates?.canonical).toBe("https://onegostitch.vercel.app/custom-patches");
    expect(meta.openGraph?.url).toBe("https://onegostitch.vercel.app/custom-patches");
    expect(JSON.stringify(meta)).not.toContain("git-dev");
    expect(meta.robots).toMatchObject({ index: false, follow: false });
  });

  it("requires a production signal and a confirmed https origin", async () => {
    const envOnly = await load({ NEXT_PUBLIC_SITE_ENV: "production" });
    expect(envOnly.siteEnv.indexable).toBe(false);
    const urlOnly = await load({ NEXT_PUBLIC_SITE_URL: "https://www.example-studio.com" });
    expect(urlOnly.siteEnv.indexable).toBe(false);
    const insecure = await load({ NEXT_PUBLIC_SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: "http://www.example-studio.com" });
    expect(insecure.siteEnv.indexable).toBe(false);
    const gitHost = await load({
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "onegostitch-git-dev-example.vercel.app",
    });
    expect(gitHost.siteEnv.indexable).toBe(false);
  });

  it("indexes a Vercel production deployment from the project production URL", async () => {
    const prod = await load({ VERCEL_ENV: "production", VERCEL_PROJECT_PRODUCTION_URL: "onegostitch.vercel.app" });
    expect(prod.siteEnv.mode).toBe("production");
    expect(prod.siteEnv.baseUrl).toBe("https://onegostitch.vercel.app");
    expect(prod.robots).toMatchObject({ rules: { userAgent: "*", allow: "/" }, sitemap: "https://onegostitch.vercel.app/sitemap.xml" });
    const urls = prod.sitemap.map((entry) => entry.url);
    expect(urls).toContain("https://onegostitch.vercel.app/");
    expect(urls).toContain("https://onegostitch.vercel.app/dtf-printing");
    expect(urls).toContain("https://onegostitch.vercel.app/printing");
    expect(urls).not.toContain("https://onegostitch.vercel.app/dft-printing");
    const meta = prod.seo.pageMetadata({ title: "Test", description: "d", path: "/custom-patches" });
    expect(meta.alternates?.canonical).toBe("https://onegostitch.vercel.app/custom-patches");
    expect(meta.robots).toMatchObject({ index: true, follow: true });
  });

  it("indexes the confirmed production domain with canonicals and a populated sitemap", async () => {
    const prod = await load({ NEXT_PUBLIC_SITE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://www.example-studio.com/" });
    expect(prod.siteEnv.mode).toBe("production");
    expect(prod.siteEnv.baseUrl).toBe("https://www.example-studio.com");
    expect(prod.robots).toMatchObject({ rules: { userAgent: "*", allow: "/" }, sitemap: "https://www.example-studio.com/sitemap.xml" });
    const urls = prod.sitemap.map((entry) => entry.url);
    expect(urls).toContain("https://www.example-studio.com/");
    expect(urls).toContain("https://www.example-studio.com/custom-patches");
    expect(urls.some((u) => u.includes("/quote") || u.includes("/account") || u.includes("/api"))).toBe(false);
    expect(urls.some((u) => u.includes("/portfolio"))).toBe(false);
    const meta = prod.seo.pageMetadata({ title: "Test", description: "d", path: "/custom-patches" });
    expect(meta.alternates?.canonical).toBe("https://www.example-studio.com/custom-patches");
    expect(meta.openGraph?.url).toBe("https://www.example-studio.com/custom-patches");
    expect(prod.seo.organizationJsonLd().url).toBe("https://www.example-studio.com");
    expect(meta.robots).toMatchObject({ index: true, follow: true });
  });
});
