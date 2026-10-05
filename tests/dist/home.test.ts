import { describe, expect, it } from "vitest";
import { readPage } from "./helpers";

describe("home page", () => {
  it.each(["/", "/fr/"])("%s has one h1 with the full name", (route) => {
    const h1s = readPage(route).querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0]?.text.replace(/\s+/g, " ").trim()).toBe("Amadou Boubacar Niang");
  });

  it("shows the four public proof numbers, each linked to its case study", () => {
    expect(
      readPage("/")
        .querySelectorAll("#proof li")
        .map((li) => li.querySelector("a")?.getAttribute("href")),
    ).toEqual(["/work/podcasttranscript/", "/work/smsapp/", "/work/prnow/", "/work/multi-server-hosting/"]);
  });

  it("features the three named case studies in order", () => {
    expect(
      readPage("/fr/")
        .querySelectorAll("#featured-work h3 a")
        .map((a) => a.getAttribute("href")),
    ).toEqual(["/fr/work/prnow/", "/fr/work/smsapp/", "/fr/work/podcasttranscript/"]);
  });

  it("lists the four services in the #services section the menu points to", () => {
    const hrefs = readPage("/")
      .querySelectorAll("#services a[href^='/services/']")
      .map((a) => a.getAttribute("href"));
    expect(new Set(hrefs)).toEqual(
      new Set([
        "/services/press-release-platforms/",
        "/services/ai-transcription-apps/",
        "/services/sms-verification-platforms/",
        "/services/multilingual-seo-sites/",
      ]),
    );
  });

  it("describes the person and the site in structured data", () => {
    const types = readPage("/")
      .querySelectorAll('script[type="application/ld+json"]')
      .map((script) => (JSON.parse(script.rawText) as { "@type": string })["@type"]);
    expect(types).toEqual(expect.arrayContaining(["Person", "WebSite"]));
  });

  it("renders the first role in the HTML for crawlers and visitors without JavaScript", () => {
    expect(readPage("/").querySelector("[data-typing-text]")?.text).toBe("Full-stack developer");
    expect(readPage("/fr/").querySelector("[data-typing-text]")?.text).toBe("Développeur full-stack");
  });

  it("ships no React on the home page", () => {
    expect(readPage("/").querySelectorAll("astro-island")).toHaveLength(0);
  });
});
