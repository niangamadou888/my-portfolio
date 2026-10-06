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

  test("swaps whole roles instead of typing them", async ({ page }) => {
    await page.clock.install({ time: 0 });
    await page.clock.pauseAt(1_000);
    await page.goto("/");
    const role = page.locator("[data-typing-text]");
    await expect(page.locator(".typing-caret")).toBeHidden();
    await page.clock.runFor(2_900);
    await expect(role).toHaveText("Full-stack developer");
    await page.clock.runFor(100);
    await expect(role).toHaveText("SaaS builder");
  });
});
