import { expect, test } from "@playwright/test";

test("goes from the home page to a featured case study", async ({ page }) => {
  await page.goto("/");
  await page.locator("#featured-work h3 a").first().click();
  await expect(page).toHaveURL(/\/work\/prnow\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("PRNow");
});

test("cycles the typing role", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-typing-text]")).not.toHaveText("Full-stack developer", { timeout: 10_000 });
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("still types the role, with a steady caret", async ({ page }) => {
    await page.clock.install({ time: 0 });
    await page.clock.pauseAt(1_000);
    await page.goto("/");
    const role = page.locator("[data-typing-text]");
    const caret = page.locator(".typing-caret");
    await expect(caret).toBeVisible();
    await expect(caret).toHaveCSS("animation-iteration-count", "1");
    await page.clock.runFor(1_500);
    await expect(role).not.toHaveText("Full-stack developer");
    await expect(role).toHaveText(/^Full-stack develop/);
  });
});
