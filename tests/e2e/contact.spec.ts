import { expect, test, type Page } from "@playwright/test";

const fillForm = async (page: Page): Promise<void> => {
  const form = page.locator("form");
  await form.getByLabel("Name").fill("Ada Lovelace");
  await form.getByLabel("Email").fill("ada@example.com");
  await form.getByLabel("Subject").fill("New platform");
  await form.getByLabel("Message").fill("I would like a press release platform for my agency.");
};

const stubApi = async (page: Page, status: number, body: object): Promise<string[]> => {
  const posts: string[] = [];
  await page.route("**/api/contact", async (route) => {
    posts.push(route.request().postData() ?? "");
    await route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
  });
  return posts;
};

test.describe("contact form", () => {
  test("sends exactly one message even when Send is double-clicked", async ({ page }) => {
    const posts = await stubApi(page, 200, { ok: true });
    await page.goto("/contact/");
    await fillForm(page);
    const send = page.getByRole("button", { name: "Send message" });
    await expect(send).toBeEnabled();
    await send.dblclick();
    await expect(page.getByRole("status")).toContainText("Message sent!");
    await expect(page.getByRole("status")).toBeFocused();
    expect(posts).toHaveLength(1);
    expect(JSON.parse(posts[0] ?? "{}")).toMatchObject({ name: "Ada Lovelace", email: "ada@example.com" });
  });

  test("shows a message under each empty field", async ({ page }) => {
    await page.goto("/contact/");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Please enter your name (2–100 characters)")).toBeVisible();
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();
    await expect(page.getByText("Please enter a subject (3–150 characters)")).toBeVisible();
    await expect(page.getByText("Please write at least 20 characters (5,000 max)")).toBeVisible();
  });

  test("explains a rate limit in plain words", async ({ page }) => {
    await stubApi(page, 429, { ok: false, error: "Too many" });
    await page.goto("/contact/");
    await fillForm(page);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("alert")).toContainText("Too many messages in a short time");
  });

  test("falls back to the email address when the server fails", async ({ page }) => {
    await stubApi(page, 500, { ok: false, error: "boom" });
    await page.goto("/contact/");
    await fillForm(page);
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("alert")).toContainText("amadouniang2001@gmail.com");
  });

  test("speaks French on the French page", async ({ page }) => {
    await page.goto("/fr/contact/");
    await page.getByRole("button", { name: "Envoyer le message" }).click();
    await expect(page.getByText("Indiquez votre nom (2 à 100 caractères)")).toBeVisible();
  });
});
