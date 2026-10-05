import { describe, expect, it } from "vitest";
import { readPage } from "./helpers";

describe("contact page", () => {
  it.each(["/contact/", "/fr/contact/"])("%s ships the send button disabled until the form hydrates", (route) => {
    const button = readPage(route).querySelector('form button[type="submit"]');
    expect(button).not.toBeNull();
    expect(button?.hasAttribute("disabled")).toBe(true);
  });

  it("labels every visible field", () => {
    const page = readPage("/contact/");
    for (const id of ["contact-name", "contact-email", "contact-subject", "contact-message"]) {
      expect(page.querySelector(`label[for="${id}"]`), id).not.toBeNull();
      expect(page.querySelector(`#${id}`), id).not.toBeNull();
    }
  });

  it("offers the email address as a fallback", () => {
    expect(readPage("/contact/").querySelectorAll('a[href="mailto:amadouniang2001@gmail.com"]').length).toBeGreaterThan(0);
  });
});
