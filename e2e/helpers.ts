import type { Page } from "@playwright/test";

export const routes = [
  "/",
  "/services",
  "/products",
  "/about",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/blog/seo-fixes-for-small-businesses",
  "/blog/plan-a-month-of-social-content",
  "/blog/home-physiotherapy-booking",
];

export async function settle(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach((el) => {
      el.dataset.reveal = "shown";
    });
  });
  await page.waitForTimeout(700);
}

export function luminance(rgb: string) {
  const [r, g, b] = (rgb.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
