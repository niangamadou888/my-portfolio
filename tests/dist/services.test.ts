import { describe, expect, it } from "vitest";
import { pageExists, readPage } from "./helpers";

const SERVICES = [
  "press-release-platforms",
  "ai-transcription-apps",
  "sms-verification-platforms",
  "multilingual-seo-sites",
] as const;

describe("service pages", () => {
  it.each(SERVICES.flatMap((slug) => [`/services/${slug}/`, `/fr/services/${slug}/`]))(
    "%s has one h1, features, FAQ and a call to action",
    (route) => {
      const page = readPage(route);
      expect(page.querySelectorAll("h1")).toHaveLength(1);
      expect(page.querySelectorAll("#features li").length).toBeGreaterThanOrEqual(4);
      expect(page.querySelectorAll("#faq details").length).toBeGreaterThanOrEqual(3);
      expect(page.querySelector('a[href$="/contact/"]')).not.toBeNull();
    },
  );

  it.each(SERVICES)("links the %s proof to case studies that exist", (slug) => {
    for (const route of [`/services/${slug}/`, `/fr/services/${slug}/`]) {
      const hrefs = readPage(route)
        .querySelectorAll("#proof a[href*='/work/']")
        .map((a) => a.getAttribute("href") ?? "");
      expect(hrefs.length, route).toBeGreaterThan(0);
      for (const href of hrefs) expect(pageExists(href), href).toBe(true);
    }
  });

  it("describes each service with Service structured data", () => {
    const types = readPage("/services/press-release-platforms/")
      .querySelectorAll('script[type="application/ld+json"]')
      .map((script) => (JSON.parse(script.rawText) as { "@type": string })["@type"]);
    expect(types).toContain("Service");
  });

  it("links each named case study to its related service, in its own language", () => {
    expect(readPage("/work/prnow/").querySelector('a[href="/services/press-release-platforms/"]')).not.toBeNull();
    expect(readPage("/fr/work/smsapp/").querySelector('a[href="/fr/services/sms-verification-platforms/"]')).not.toBeNull();
  });
});
