import { expect, test, type Page } from "@playwright/test";

const KEY_ROUTES = [
  "/",
  "/work/",
  "/work/prnow/",
  "/services/press-release-platforms/",
  "/about/",
  "/contact/",
  "/fr/",
  "/fr/work/seo-data-api/",
];

test("switches language on a case study and lands on its French twin", async ({ page }) => {
  await page.goto("/work/prnow/");
  await page.locator('a[hreflang="fr"]:visible').first().click();
  await expect(page).toHaveURL(/\/fr\/work\/prnow\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});

test("has no sideways scrolling on key pages", async ({ page }) => {
  for (const route of KEY_ROUTES) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, route).toBeLessThanOrEqual(1);
  }
});

test("opens the mobile menu and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator("#mobile-nav").getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work\/$/);
});

test.describe("mobile menu keyboard focus", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile only");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
  });

  const focusIsInMenu = (page: Page): Promise<boolean> =>
    page.evaluate(() => {
      const active = document.activeElement;
      return Boolean(active?.closest("#mobile-nav") || active?.matches("[data-menu-toggle]"));
    });

  test("moves focus to the first menu link when opened", async ({ page }) => {
    await expect(page.locator("#mobile-nav a").first()).toBeFocused();
  });

  test("keeps Tab and Shift+Tab inside the open menu", async ({ page }) => {
    const stops = (await page.locator("#mobile-nav a").count()) + 1;
    for (const key of ["Tab", "Shift+Tab"]) {
      for (let press = 1; press <= stops * 2; press += 1) {
        await page.keyboard.press(key);
        expect(await focusIsInMenu(page), `${key} #${press}`).toBe(true);
      }
    }
  });

  test("closes on Escape and returns focus to the toggle", async ({ page }) => {
    await page.keyboard.press("Tab");
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-nav")).toBeHidden();
    await expect(page.locator("[data-menu-toggle]")).toBeFocused();
  });

  test("closes and releases page scrolling when the viewport widens to desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 812 });
    await expect(page.locator("#mobile-nav")).toBeHidden();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  });
});

test("answers unknown pages with a real 404", async ({ page }) => {
  const response = await page.goto("/no-such-page/");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("404");
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("shows below-the-fold content without scrolling it into view", async ({ page }) => {
    await page.goto("/work/prnow/");
    await expect(page.locator(".reveal").last()).toHaveCSS("opacity", "1");
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("still shows case-study text and every footer link", async ({ page }) => {
    await page.goto("/work/smsapp/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(".reveal").last()).toHaveCSS("opacity", "1");
    await expect(page.locator("footer nav a")).toHaveCount(4);
  });
});
