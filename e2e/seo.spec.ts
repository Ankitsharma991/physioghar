import { expect, test } from "@playwright/test";
import { routes } from "./helpers";

test.describe("Metadata", () => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();

  for (const path of routes) {
    test(`${path} has complete, unique metadata`, async ({ page }) => {
      await page.goto(path);
      const title = await page.title();
      const description = await page.locator("meta[name=description]").getAttribute("content");
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThanOrEqual(65);
      expect(description?.length ?? 0).toBeGreaterThan(80);
      expect(description?.length ?? 0).toBeLessThanOrEqual(165);
      await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
        "href",
        /^https?:\/\/[^/]+(\/.*)?$/,
      );
      expect(
        (await page.locator("link[rel=canonical]").getAttribute("href"))?.endsWith(
          path === "/" ? "" : path,
        ),
      ).toBe(true);
      await expect(page.locator("meta[property='og:image']")).toHaveCount(1);
      await expect(page.locator("meta[name='twitter:card']")).toHaveAttribute(
        "content",
        "summary_large_image",
      );
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      expect(titles.has(title), `duplicate title: ${title}`).toBe(false);
      expect(descriptions.has(description ?? ""), `duplicate description on ${path}`).toBe(false);
      titles.add(title);
      descriptions.add(description ?? "");
    });
  }

  test("structured data parses on every page", async ({ page }) => {
    for (const path of routes) {
      await page.goto(path);
      const blocks = await page.locator("script[type='application/ld+json']").allTextContents();
      expect(blocks.length, path).toBeGreaterThan(0);
      for (const block of blocks) expect(() => JSON.parse(block), path).not.toThrow();
    }
  });

  test("FAQ page exposes every question as FAQPage data", async ({ page }) => {
    await page.goto("/faq");
    const data = (await page.locator("script[type='application/ld+json']").allTextContents()).map(
      (t) => JSON.parse(t),
    );
    const faq = data.find((d) => d["@type"] === "FAQPage");
    expect(faq.mainEntity).toHaveLength(await page.locator("details").count());
  });
});

test.describe("Crawler files", () => {
  test("robots.txt blocks the API and points to the sitemap", async ({ request }) => {
    const text = await (await request.get("/robots.txt")).text();
    expect(text).toMatch(/User-Agent: \*/i);
    expect(text).toMatch(/Disallow: \/api\//);
    expect(text).toMatch(/Sitemap: https?:\/\/.+\/sitemap\.xml/);
  });

  test("sitemap lists every public page exactly once", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    expect(urls.sort()).toEqual(routes.map((r) => r).sort());
  });

  test("share images render as PNG", async ({ request }) => {
    for (const path of [
      "/opengraph-image",
      "/blog/seo-fixes-for-small-businesses/opengraph-image",
      "/icon",
      "/apple-icon",
    ]) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      expect(res.headers()["content-type"]).toBe("image/png");
    }
  });
});

test.describe("Security headers", () => {
  test("every response carries the hardening headers", async ({ request }) => {
    const headers = (await request.get("/")).headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["strict-transport-security"]).toMatch(/max-age=\d+/);
    expect(headers["content-security-policy"]).toMatch(/default-src 'self'/);
    expect(headers["content-security-policy"]).toMatch(/frame-ancestors 'none'/);
    expect(headers["x-powered-by"]).toBeUndefined();
  });
});
