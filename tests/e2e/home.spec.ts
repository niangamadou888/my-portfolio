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
