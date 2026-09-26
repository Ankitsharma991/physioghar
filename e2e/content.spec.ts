import { expect, test, type Page } from "@playwright/test";

const section = (page: Page, heading: string | RegExp) =>
  page.locator("section, header").filter({ has: page.getByRole("heading", { name: heading }) });

test.describe("Home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero matches the brief", async ({ page }) => {
    await expect(page.getByText("🚀 Welcome to Digital Chautari")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "We build digital bridges between ideas and impact",
    );
    await expect(page.locator("h1 .text-gradient")).toHaveText("digital bridges");
    await expect(page.getByRole("link", { name: "Explore Services →" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View Products" })).toBeVisible();
    const bar = page.locator("header").filter({ has: page.locator("h1") });
    for (const text of ["3", "Products", "6+", "Team Members", "100%", "Commitment"]) {
      await expect(bar.getByText(text, { exact: true })).toBeVisible();
    }
  });

  test("feature strip has four cards", async ({ page }) => {
    for (const name of ["Growth-Driven", "Creative-First", "Tech-Powered", "Client-Centric"]) {
      await expect(page.getByRole("heading", { name, level: 3 })).toBeVisible();
    }
  });

  test("who we are has two paragraphs, a 2x2 checklist and four teaser cards", async ({ page }) => {
    const who = section(page, "A Chautari where ideas meet execution");
    await expect(who.locator("div.text-muted > p")).toHaveCount(2);
    await expect(
      who.locator("ul li").filter({
        hasText:
          /Creative Strategy|Brand Storytelling|Full-Stack Engineering|Health-Tech Expertise/,
      }),
    ).toHaveCount(4);
    await expect(who.getByRole("link", { name: "Meet the Team →" })).toHaveAttribute(
      "href",
      "/about#team",
    );
    for (const name of [
      "Digital Marketing",
      "Content Creation",
      "Software Development",
      "Branding & Design",
    ]) {
      await expect(who.getByRole("heading", { name, level: 3 })).toBeVisible();
    }
  });

  test("dark stats banner shows the four figures", async ({ page }) => {
    const banner = page.locator("section.bg-navy").first();
    for (const [value, label] of [
      ["250+", "Projects Delivered"],
      ["40+", "Happy Clients"],
      ["1M+", "Content Views"],
      ["98%", "Client Retention"],
    ]) {
      await expect(banner.getByText(value, { exact: true })).toBeVisible();
      await expect(banner.getByText(label, { exact: true })).toBeVisible();
    }
  });

  test("products teaser has three cards with Learn more links", async ({ page }) => {
    const products = section(page, "Three ventures, one vision");
    await expect(products.getByRole("link", { name: /^Learn more about/ })).toHaveCount(3);
    for (const name of [
      "Eco Creative Marketing Agency",
      "One Content Creation Studio",
      "Physio@Home",
    ]) {
      await expect(products.getByRole("heading", { name })).toBeVisible();
    }
  });

  test("six sectors, four process steps, three testimonials, three posts", async ({ page }) => {
    await expect(
      section(page, /Experience across the industries/).getByRole("heading", { level: 3 }),
    ).toHaveCount(6);
    const steps = section(page, "Our 4-step process").locator("ol > li");
    await expect(steps).toHaveCount(4);
    for (const name of ["Discover", "Design", "Develop", "Deliver"]) {
      await expect(steps.filter({ hasText: name })).toHaveCount(1);
    }
    const quotes = section(page, "What our clients say");
    await expect(quotes.locator("blockquote")).toHaveCount(3);
    await expect(quotes.getByRole("img", { name: "5 out of 5 stars" })).toHaveCount(3);
    const blog = section(page, "Latest from our blog");
    await expect(blog.locator("article")).toHaveCount(3);
    await expect(blog.getByRole("link", { name: /^Read more/ })).toHaveCount(3);
  });

  test("closing CTA", async ({ page }) => {
    const cta = section(page, "Ready to build something extraordinary together?");
    await expect(cta.getByRole("link", { name: "Start a Project →" })).toBeVisible();
    await expect(cta.getByRole("link", { name: "View Services" })).toBeVisible();
  });
});

test.describe("Services", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services");
  });

  test("hero and three categories with four sub-services each", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Services that drive growth");
    for (const id of ["digital-marketing", "content-creation", "software-development"]) {
      await expect(page.locator(`#${id}`).getByRole("heading", { level: 3 })).toHaveCount(4);
    }
    const marketing = page.locator("#digital-marketing");
    for (const name of [
      "SEO & SEM",
      "Social Media Marketing",
      "Paid Advertising",
      "Analytics & Reporting",
    ]) {
      await expect(marketing.getByRole("heading", { name })).toBeVisible();
    }
  });

  test("pricing tiers", async ({ page }) => {
    const pricing = page.locator("#pricing");
    await expect(pricing.getByText("Rs 15,000")).toBeVisible();
    await expect(pricing.getByText("Rs 45,000")).toBeVisible();
    await expect(pricing.getByText("Custom", { exact: true })).toBeVisible();
    await expect(pricing.getByText("Most Popular")).toBeVisible();
    await expect(pricing.getByRole("link")).toHaveCount(3);
  });

  test("industries, reasons and CTA", async ({ page }) => {
    const industries = section(page, "Who we work with");
    for (const name of [
      "Healthcare",
      "E-Commerce",
      "Real Estate",
      "Education",
      "Tourism",
      "Media",
    ]) {
      await expect(industries.getByText(name, { exact: true })).toBeVisible();
    }
    const why = section(page, /What you can count on/);
    for (const name of [
      "Dedicated project manager",
      "Agile development cycle",
      "Transparent pricing",
      "Post-launch support",
      "Scalable architecture",
      "Cross-platform expertise",
    ]) {
      await expect(why.getByRole("heading", { name })).toBeVisible();
    }
    await expect(
      page.getByRole("heading", { name: "Let's find the right service for you" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Book a Consultation →" })).toBeVisible();
  });
});

test.describe("Products", () => {
  test("hero, three tabs and the spotlight", async ({ page }) => {
    await page.goto("/products");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Three ventures, one vision");
    await expect(page.getByRole("tab")).toHaveCount(3);
    await expect(
      page.getByRole("heading", { name: /Physio@Home . healthcare reimagined/ }),
    ).toBeVisible();
  });

  test("each tab shows its category, title, description, CTA and preview", async ({ page }) => {
    await page.goto("/products");
    for (const name of [
      "Eco Creative Marketing Agency",
      "One Content Creation Studio",
      "Physio@Home",
    ]) {
      await page.getByRole("tab", { name }).click();
      const panel = page.getByRole("tabpanel");
      await expect(panel.getByRole("heading", { name, level: 2 })).toBeVisible();
      await expect(panel.locator(".eyebrow")).toBeVisible();
      await expect(panel.getByRole("link")).toHaveCount(1);
      await expect(panel.locator("[aria-hidden=true]").first()).toBeVisible();
    }
  });
});

test.describe("About", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("hero and story tiles", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "The people behind Digital Chautari",
    );
    const story = section(page, "From a chautari to a digital powerhouse");
    for (const text of ["2025", "Founded", "3", "Products", "Kathmandu", "7+", "Team Members"]) {
      await expect(story.getByText(text, { exact: true })).toBeVisible();
    }
    const tiles = await story
      .locator("dl > div")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor));
    expect(tiles).toEqual([
      "rgb(15, 148, 136)",
      "rgb(11, 18, 32)",
      "rgb(255, 255, 255)",
      "rgb(224, 169, 48)",
    ]);
  });

  test("mission, values, trust, team and roadmap", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Our Mission" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Our Vision" })).toBeVisible();
    for (const name of [
      "Passion",
      "Creativity",
      "Excellence",
      "Collaboration",
      "ISO 9001 Ready",
      "Data Protection",
      "Global Delivery",
      "Pan-Nepal Network",
    ]) {
      await expect(page.getByRole("heading", { name, level: 3 })).toBeVisible();
    }
    await expect(page.locator("#team").getByRole("heading", { level: 3 })).toHaveCount(7);
    const roadmap = section(page, "How we got here");
    for (const [title, year] of [
      ["The Idea", "2025"],
      ["First Products", "2025"],
      ["Health-Tech Entry", "2026"],
      ["Company Registration", "2026"],
    ]) {
      const item = roadmap.locator("ol > li").filter({ hasText: title });
      await expect(item).toContainText(year);
    }
    await expect(page.getByRole("heading", { name: "Want to join our journey?" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Get in Touch →" })).toBeVisible();
  });
});

test.describe("Contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("hero, info cards and department lines", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Let's start a conversation");
    for (const name of ["Address", "Email", "Phone", "Business Hours"]) {
      await expect(page.getByRole("heading", { name, level: 3 })).toBeVisible();
    }
    await expect(page.getByText("Kathmandu, Nepal").first()).toBeVisible();
    const direct = section(page, "Reach the right team");
    for (const name of ["Marketing", "Content Studio", "Software Dev", "Business Dev"]) {
      await expect(direct.getByRole("heading", { name })).toBeVisible();
    }
    await expect(direct.locator("a[href^='mailto:']")).toHaveCount(4);
  });

  test("form has the specified fields and project type pills", async ({ page }) => {
    for (const label of ["Name", "Email", "Subject", "Message"]) {
      await expect(page.getByLabel(label, { exact: true })).toBeVisible();
    }
    await expect(page.getByRole("radio")).toHaveCount(5);
    await expect(page.getByRole("button", { name: "Send Message" })).toBeVisible();
  });

  test("aside has a map card, FAQ callout and response times", async ({ page }) => {
    await expect(page.getByRole("link", { name: /Open map/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Need quick answers?" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Visit FAQ page →" })).toHaveAttribute(
      "href",
      "/faq",
    );
    const times = page
      .locator("dl")
      .filter({ hasText: "Response" })
      .or(page.locator("dl").filter({ hasText: "Proposals" }));
    await expect(times).toContainText("Within 24 hours");
    await expect(times).toContainText("2 to 3 days");
    await expect(times).toContainText("Same day");
  });
});

test.describe("Global components", () => {
  test("header nav and CTA", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const label of ["Home", "Services", "Products", "About", "Contact"]) {
      await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    await expect(
      page.locator("header").first().getByRole("link", { name: "Contact Us" }),
    ).toBeVisible();
    await expect(page.getByText("Ideas meet execution").first()).toBeVisible();
  });

  test("footer has four columns and a copyright line", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    for (const name of ["Company", "Services", "Legal"]) {
      await expect(footer.getByRole("heading", { name })).toBeVisible();
    }
    await expect(footer.getByText(/All rights reserved/)).toBeVisible();
  });
});
