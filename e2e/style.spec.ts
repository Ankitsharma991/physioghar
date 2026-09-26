import { expect, test } from "@playwright/test";
import { settle } from "./helpers";

const css = (page: import("@playwright/test").Page, selector: string, props: string[]) =>
  page
    .locator(selector)
    .first()
    .evaluate(
      (el, list) =>
        Object.fromEntries(list.map((p) => [p, getComputedStyle(el).getPropertyValue(p)])),
      props,
    );

test.describe("Typography (desktop)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await settle(page);
  });

  test("body is Inter 16px, line-height 1.5, ink on paper", async ({ page }) => {
    const s = await css(page, "body", [
      "font-family",
      "font-size",
      "line-height",
      "color",
      "background-color",
    ]);
    expect(s["font-family"]).toMatch(/Inter/);
    expect(s["font-size"]).toBe("16px");
    expect(s["line-height"]).toBe("24px");
    expect(s["color"]).toBe("rgb(16, 24, 38)");
    expect(s["background-color"]).toBe("rgb(251, 251, 249)");
  });

  test("h1 is Sora 46px weight 800", async ({ page }) => {
    const s = await css(page, "h1", ["font-family", "font-size", "font-weight"]);
    expect(s["font-family"]).toMatch(/Sora/);
    expect(s["font-size"]).toBe("46px");
    expect(s["font-weight"]).toBe("800");
  });

  test("section h2 is 28 to 30px weight 700", async ({ page }) => {
    const s = await css(page, "section h2", ["font-size", "font-weight", "font-family"]);
    expect(["28px", "30px"]).toContain(s["font-size"]);
    expect(s["font-weight"]).toBe("700");
    expect(s["font-family"]).toMatch(/Sora/);
  });

  test("card h3 is 16 to 17px, weight 600 to 700", async ({ page }) => {
    const sizes = await page.locator("h3").evaluateAll((els) =>
      els.map((el) => ({
        size: getComputedStyle(el).fontSize,
        weight: getComputedStyle(el).fontWeight,
        text: el.textContent,
      })),
    );
    for (const h of sizes) {
      expect(["16px", "17px"], `${h.text} is ${h.size}`).toContain(h.size);
      expect(["600", "700"]).toContain(h.weight);
    }
  });

  test("eyebrow and caption follow the scale", async ({ page }) => {
    const eyebrow = await css(page, ".eyebrow", [
      "font-size",
      "font-weight",
      "letter-spacing",
      "text-transform",
    ]);
    expect(eyebrow["font-size"]).toBe("12px");
    expect(eyebrow["font-weight"]).toBe("600");
    expect(eyebrow["text-transform"]).toBe("uppercase");
    expect(parseFloat(eyebrow["letter-spacing"])).toBeCloseTo(0.24, 1);
    const caption = await css(page, ".caption", ["font-size", "font-weight"]);
    expect(caption["font-size"]).toBe("13px");
    expect(caption["font-weight"]).toBe("500");
  });

  test("fonts actually load", async ({ page }) => {
    const loaded = await page.evaluate(async () => {
      await document.fonts.ready;
      return [...document.fonts].filter((f) => f.status === "loaded").map((f) => f.family);
    });
    expect(loaded.join(" ")).toMatch(/Sora/);
    expect(loaded.join(" ")).toMatch(/Inter/);
  });

  test("headline gradient runs teal, gold, leaf green at 90 degrees", async ({ page }) => {
    const s = await css(page, "h1 .text-gradient", [
      "background-image",
      "-webkit-background-clip",
      "color",
    ]);
    expect(s["background-image"]).toBe(
      "linear-gradient(90deg, rgb(15, 148, 136), rgb(224, 169, 48), rgb(127, 174, 58))",
    );
    expect(s["-webkit-background-clip"]).toBe("text");
    expect(s["color"]).toBe("rgba(0, 0, 0, 0)");
  });
});

test.describe("Typography (mobile)", () => {
  test.use({ viewport: { width: 400, height: 800 } });

  test("h1 is 32px", async ({ page }) => {
    await page.goto("/");
    expect((await css(page, "h1", ["font-size"]))["font-size"]).toBe("32px");
  });
});

test.describe("Layout and spacing (desktop)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await settle(page);
  });

  test("container is 1120px of content with 40px side padding", async ({ page }) => {
    const box = await page
      .locator("main .wrap")
      .first()
      .evaluate((el) => {
        const s = getComputedStyle(el);
        return {
          width: el.getBoundingClientRect().width,
          left: s.paddingLeft,
          right: s.paddingRight,
        };
      });
    expect(box.width).toBe(1200);
    expect(box.left).toBe("40px");
    expect(box.right).toBe("40px");
  });

  test("standard sections use 64px, tight 48px, hero 84px top and 48px bottom", async ({
    page,
  }) => {
    const standard = await css(page, "section.section.wrap", ["padding-top", "padding-bottom"]);
    expect(standard["padding-top"]).toBe("64px");
    expect(standard["padding-bottom"]).toBe("64px");
    const tight = await css(page, "section.section-tight", ["padding-top", "padding-bottom"]);
    expect(tight["padding-top"]).toBe("48px");
    expect(tight["padding-bottom"]).toBe("48px");
    const hero = await css(page, "header.section-hero", ["padding-top", "padding-bottom"]);
    expect(hero["padding-top"]).toBe("84px");
    expect(hero["padding-bottom"]).toBe("48px");
  });

  test("card grids use a 20px gap", async ({ page }) => {
    const gaps = await page
      .locator(".card-grid")
      .evaluateAll((els) =>
        els.map((el) => [getComputedStyle(el).columnGap, getComputedStyle(el).rowGap]),
      );
    expect(gaps.length).toBeGreaterThan(3);
    for (const [col, row] of gaps) {
      expect(col).toBe("20px");
      expect(row).toBe("20px");
    }
  });

  test("cards are white with a 1px line border, 12px radius and 22px padding", async ({ page }) => {
    const s = await css(page, "#main section .group", [
      "background-color",
      "border-top-width",
      "border-top-color",
      "border-top-left-radius",
      "padding-top",
      "padding-left",
    ]);
    expect(s["background-color"]).toBe("rgb(255, 255, 255)");
    expect(s["border-top-width"]).toBe("1px");
    expect(s["border-top-color"]).toBe("rgb(231, 229, 223)");
    expect(s["border-top-left-radius"]).toBe("12px");
    expect(s["padding-top"]).toBe("22px");
    expect(s["padding-left"]).toBe("22px");
  });

  test("icon chips use a 10px radius and a pastel background", async ({ page }) => {
    const chips = await page
      .locator("#main section .group > span[aria-hidden=true]")
      .evaluateAll((els) =>
        els
          .slice(0, 5)
          .map((el) => [
            getComputedStyle(el).borderTopLeftRadius,
            getComputedStyle(el).backgroundColor,
          ]),
      );
    const pastels = [
      "rgb(231, 245, 234)",
      "rgb(231, 242, 244)",
      "rgb(253, 241, 222)",
      "rgb(244, 233, 246)",
      "rgb(253, 238, 240)",
    ];
    expect(chips.map((c) => c[0])).toEqual(Array(5).fill("10px"));
    for (const [, color] of chips) expect(pastels).toContain(color);
    expect(new Set(chips.map((c) => c[1])).size).toBeGreaterThanOrEqual(3);
  });

  test("primary and ghost buttons", async ({ page }) => {
    const primary = await css(page, "#main header a[href='/services']", [
      "padding",
      "border-top-left-radius",
      "background-color",
      "color",
      "font-weight",
      "font-size",
    ]);
    expect(primary["padding"]).toBe("13px 24px");
    expect(primary["border-top-left-radius"]).toBe("8px");
    expect(primary["background-color"]).toBe("rgb(15, 148, 136)");
    expect(primary["color"]).toBe("rgb(255, 255, 255)");
    expect(primary["font-weight"]).toBe("600");
    expect(["14px", "15px"]).toContain(primary["font-size"]);
    const ghost = await css(page, "#main header a[href='/products']", [
      "background-color",
      "border-top-width",
      "padding",
    ]);
    expect(ghost["background-color"]).toBe("rgb(255, 255, 255)");
    expect(ghost["border-top-width"]).toBe("1px");
    expect(ghost["padding"]).toBe("13px 24px");
  });

  test("header is sticky with a translucent white background", async ({ page }) => {
    const s = await css(page, "body > header", ["position", "background-color", "backdrop-filter"]);
    expect(s["position"]).toBe("sticky");
    expect(s["background-color"]).toMatch(/0\.85\)$/);
    expect(s["backdrop-filter"]).toMatch(/blur/);
  });

  test("hero has the mint to paper gradient with radial glows", async ({ page }) => {
    const s = await css(page, "#main header.section-hero", ["background-image"]);
    expect(s["background-image"]).toMatch(/radial-gradient/);
    expect(s["background-image"]).toMatch(/linear-gradient/);
    expect(s["background-image"]).toMatch(/rgb\(231, 245, 234\)/);
  });

  test("dark sections and footer use navy", async ({ page }) => {
    const colors = await page
      .locator("section.bg-navy, footer")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor));
    expect(colors.length).toBeGreaterThanOrEqual(3);
    for (const c of colors) expect(c).toBe("rgb(11, 18, 32)");
  });

  test("closing CTA is a rounded teal to blue gradient", async ({ page }) => {
    const s = await css(page, "#main .bg-cta", ["background-image", "border-top-left-radius"]);
    expect(s["background-image"]).toMatch(/linear-gradient/);
    expect(s["background-image"]).toMatch(/rgb\(15, 148, 136\)/);
    expect(s["background-image"]).toMatch(/rgb\(31, 111, 178\)/);
    expect(parseInt(s["border-top-left-radius"])).toBeGreaterThanOrEqual(14);
  });
});

test.describe("Layout (mobile)", () => {
  test.use({ viewport: { width: 400, height: 800 } });

  test("side padding is 22px and the header collapses to a hamburger", async ({ page }) => {
    await page.goto("/");
    const s = await css(page, "main .wrap", ["padding-left", "padding-right"]);
    expect(s["padding-left"]).toBe("22px");
    expect(s["padding-right"]).toBe("22px");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
  });
});

test.describe("Motion", () => {
  test("cards lift 4px with a soft shadow and chips scale on hover", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    const card = page.locator("#main section .group").first();
    await card.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
    const chip = card.locator("span[aria-hidden=true]").first();
    await card.hover();
    const read = (el: HTMLElement) => {
      const style = getComputedStyle(el);
      return { translate: style.translate, shadow: style.boxShadow };
    };
    await expect
      .poll(() => card.evaluate(read), { timeout: 5000 })
      .toMatchObject({
        translate: "0px -4px",
      });
    expect((await card.evaluate(read)).shadow).toMatch(
      /rgba\(16, 24, 38, 0\.2\) 0px 16px 30px -18px/,
    );
    await expect
      .poll(async () => parseFloat(await chip.evaluate((el) => getComputedStyle(el).scale)), {
        timeout: 5000,
      })
      .toBeCloseTo(1.08, 2);
  });

  test("below-the-fold items reveal on scroll with a stagger step of 70ms", async ({ page }) => {
    await page.goto("/");
    await expect.poll(() => page.locator("[data-reveal=hidden]").count()).toBeGreaterThan(10);
    const delays = await page
      .locator("section.section-tight")
      .first()
      .locator("[data-reveal-item]")
      .evaluateAll((els) =>
        els.map((el) => (el as HTMLElement).style.getPropertyValue("--reveal-delay")),
      );
    expect(delays).toEqual(["0ms", "70ms", "140ms", "210ms"]);
    const hiddenItems = page.locator("[data-reveal=hidden]");
    const revealNext = () =>
      page.evaluate(() => {
        const el = document.querySelector("[data-reveal=hidden]");
        el?.scrollIntoView({ block: "center", behavior: "instant" });
        return el !== null;
      });
    for (let tries = 0; tries < 300 && (await revealNext()); tries++) {
      await page.waitForTimeout(60);
    }
    await expect(hiddenItems).toHaveCount(0);
  });

  test("navigation fades and slides in over 0.45s, first load does not", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-ready", "");
    const beforeHydration = await page.evaluate(() => {
      const root = document.documentElement;
      root.removeAttribute("data-ready");
      const name = getComputedStyle(document.querySelector(".page-in")!).animationName;
      root.setAttribute("data-ready", "");
      return name;
    });
    expect(beforeHydration).toBe("none");
    await page.getByRole("link", { name: "Services", exact: true }).first().click();
    await expect(page).toHaveURL(/\/services$/);
    const s = await css(page, ".page-in", ["animation-duration", "animation-name"]);
    expect(s["animation-duration"]).toBe("0.45s");
    expect(s["animation-name"]).toBe("page-in");
  });

  test.describe("with reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("nothing is hidden and animations are near instant", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("[data-reveal=hidden]")).toHaveCount(0);
      const s = await css(page, ".page-in", ["animation-duration"]);
      expect(parseFloat(s["animation-duration"])).toBeLessThan(0.001);
    });
  });
});
