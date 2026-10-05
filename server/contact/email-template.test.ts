import { describe, expect, it } from "vitest";
import { buildHtmlBody, buildSubject, buildTextBody } from "./email-template";

const message = {
  name: "Ada <script>alert(1)</script>",
  email: "ada@example.com",
  subject: "Quote \"needed\"",
  message: "Hello <b>there</b>\n\nSecond paragraph",
};

describe("email template", () => {
  it("escapes visitor markup in the HTML body", () => {
    const html = buildHtmlBody(message);

    expect(html).not.toContain("<script>");
    expect(html).toContain("Ada &lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).toContain("Hello &lt;b&gt;there&lt;/b&gt;");
    expect(html).toContain("Quote &quot;needed&quot;");
  });

  it("keeps line breaks in the name and subject from forging extra lines", () => {
    const forged = { ...message, name: "Ada\r\nEmail:   boss@example.com", subject: "Hi\nBcc: x" };

    expect(buildSubject(forged)).not.toMatch(/[\r\n]/);
    expect(buildTextBody(forged)).not.toMatch(/^Email:\s+boss@example\.com$/m);
  });
});
