import { expect, test } from "@playwright/test";
import { settle } from "./helpers";

test.describe("Navigation", () => {
  test("active link is marked on each page", async ({ page }) => {
    for (const [path, label] of [
      ["/", "Home"],
      ["/services", "Services"],
      ["/products", "Products"],
      ["/about", "About"],
      ["/contact", "Contact"],
    ]) {
      await page.goto(path);
      const nav = page.getByRole("navigation", { name: "Main" });
      await expect(nav.getByRole("link", { name: label, exact: true })).toHaveAttribute(
        "aria-current",
        "page",
      );
    }
  });

  test("skip link moves focus to the main landmark", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("footer service links land on the right section", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/\/services#pricing$/);
    await expect(page.locator("#pricing")).toBeInViewport();
  });

  test("unknown routes return a real 404 with a way back", async ({ page }) => {
    const response = await page.goto("/no-such-page");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("wandered off");
    await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();
  });
});

test.describe("Mobile menu", () => {
  test.use({ viewport: { width: 400, height: 800 } });

  test("opens, navigates and closes; Escape also closes", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await page.getByRole("button", { name: "Open menu" }).click();
    await menu.getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(menu).toBeHidden();
  });
});

test.describe("Product tabs", () => {
  test("mouse, keyboard and hash all switch the panel", async ({ page }) => {
    await page.goto("/products");
    const visible = () => page.locator("[role=tabpanel]:not([hidden])").getAttribute("id");
    expect(await visible()).toBe("panel-eco-creative");
    await page.getByRole("tab", { name: "One Content Creation Studio" }).click();
    expect(await visible()).toBe("panel-one-content-studio");
    await page.keyboard.press("ArrowRight");
    expect(await visible()).toBe("panel-physio-at-home");
    await expect(page.getByRole("tab", { name: "Physio@Home" })).toBeFocused();
    await page.keyboard.press("Home");
    expect(await visible()).toBe("panel-eco-creative");
    await page.goto("/products#physio-at-home");
    expect(await visible()).toBe("panel-physio-at-home");
  });

  test("Learn more on Home opens the matching tab", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Learn more about One Content Creation Studio" }).click();
    await expect(page.getByRole("tab", { name: "One Content Creation Studio" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("spotlight button opens Physio@Home", async ({ page }) => {
    await page.goto("/products");
    await page.getByRole("link", { name: /Explore Physio@Home/ }).click();
    await expect(page.getByRole("tab", { name: "Physio@Home" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});

test.describe("FAQ", () => {
  test("questions expand and collapse", async ({ page }) => {
    await page.goto("/faq");
    const first = page.locator("details").first();
    await expect(first).not.toHaveAttribute("open", "");
    await first.locator("summary").click();
    await expect(first).toHaveAttribute("open", "");
    await first.locator("summary").click();
    await expect(first).not.toHaveAttribute("open", "");
  });
});

test.describe("Contact form", () => {
  const fill = async (page: import("@playwright/test").Page) => {
    await page.getByLabel("Name", { exact: true }).fill("Asha Gurung");
    await page.getByLabel("Email", { exact: true }).fill("asha@example.com");
    await page.getByLabel("Subject").fill("Clinic booking website");
    await page
      .getByText("Software Development", { exact: true })
      .and(page.locator("main span"))
      .click();
    await page.getByLabel("Message").fill("We need a booking site for our physiotherapy clinic.");
  };

  test("empty submit shows every error and focuses the first field", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.locator("form p.text-red-700")).toHaveCount(5);
    await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
    await expect(page.getByLabel("Name", { exact: true })).toHaveAttribute("aria-invalid", "true");
  });

  test("invalid email is rejected on the client", async ({ page }) => {
    await page.goto("/contact");
    await fill(page);
    await page.getByLabel("Email", { exact: true }).fill("not-an-email");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  });

  test("a valid message posts JSON and shows the confirmation", async ({ page }) => {
    await page.goto("/contact");
    const request = page.waitForRequest("**/api/contact");
    await fill(page);
    await page.getByRole("button", { name: "Send Message" }).click();
    const body = (await request).postDataJSON();
    expect(body).toMatchObject({
      name: "Asha Gurung",
      email: "asha@example.com",
      projectType: "Software Development",
      company: "",
    });
    await expect(page.locator("main [role=status]")).toContainText(
      "Thanks, your message is on its way",
    );
  });

  test("a server failure keeps what was typed and explains the problem", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 502,
        json: { ok: false, message: "We could not send your message. Please email us directly." },
      }),
    );
    await page.goto("/contact");
    await fill(page);
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.locator("form [role=alert]")).toContainText("could not send");
    await expect(page.getByLabel("Message")).toHaveValue(/booking site/);
  });

  test("project type pills are keyboard operable radios", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Subject").focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("radio", { name: "Content Creation" })).toBeChecked();
  });

  test("the honeypot field is hidden from people", async ({ page }) => {
    await page.goto("/contact");
    const honeypot = page.locator("input[name=company]");
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
    await expect(honeypot.locator("xpath=ancestor::div[@aria-hidden='true']")).toHaveCount(1);
  });
});

test.describe("Responsive", () => {
  const pages = [
    "/",
    "/services",
    "/products",
    "/about",
    "/contact",
    "/faq",
    "/blog/seo-fixes-for-small-businesses",
  ];
  for (const width of [360, 400, 760, 761, 1024, 1440]) {
    test(`no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of pages) {
        await page.goto(path);
        await settle(page);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        );
        expect(overflow, `${path} at ${width}px`).toBeLessThanOrEqual(0);
      }
    });
  }

  test("the layout switches exactly at 760px", async ({ page }) => {
    await page.setViewportSize({ width: 760, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await page.setViewportSize({ width: 761, height: 900 });
    await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  });
});
