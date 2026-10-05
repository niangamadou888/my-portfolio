import { describe, expect, it } from "vitest";
import { readPage } from "./helpers";

const CASES = ["prnow", "smsapp", "podcasttranscript", "multi-server-hosting", "seo-data-api"] as const;
const UNNAMED = ["multi-server-hosting", "seo-data-api"] as const;

describe("work pages", () => {
  it.each(["/work/", "/fr/work/"])("%s lists all five case studies, then seven more projects", (route) => {
    const page = readPage(route);
    expect(page.querySelectorAll("h1")).toHaveLength(1);
    const prefix = route.startsWith("/fr/") ? "/fr" : "";
    const links = new Set(page.querySelectorAll("#case-studies a").map((a) => a.getAttribute("href")));
    for (const slug of CASES) expect(links.has(`${prefix}/work/${slug}/`), slug).toBe(true);
    expect(page.querySelectorAll("#more-projects article")).toHaveLength(7);
  });

  it.each(CASES.flatMap((slug) => [`/work/${slug}/`, `/fr/work/${slug}/`]))(
    "%s has one h1, at least three results and a call to action",
    (route) => {
      const page = readPage(route);
      expect(page.querySelectorAll("h1")).toHaveLength(1);
      expect(page.querySelectorAll("#results li").length).toBeGreaterThanOrEqual(3);
      expect(page.querySelector('a[href$="/contact/"]')).not.toBeNull();
    },
  );

  it("writes the French case study in French", () => {
    expect(readPage("/fr/work/prnow/").querySelector("h1")?.text).toContain("plateforme de distribution");
  });

  it("links named case studies to the live product", () => {
    expect(readPage("/work/prnow/").querySelectorAll('main a[href="https://prnow.io"]').length).toBeGreaterThan(0);
  });

  it.each(UNNAMED)("never links out from the unnamed %s case study", (slug) => {
    for (const route of [`/work/${slug}/`, `/fr/work/${slug}/`]) {
      expect(
        readPage(route)
          .querySelectorAll('main a[href^="http"]')
          .map((a) => a.getAttribute("href")),
        route,
      ).toEqual([]);
    }
  });

  it.each(UNNAMED.flatMap((slug) => [`/work/${slug}/`, `/fr/work/${slug}/`]))(
    "%s shows no image and shares the default social image",
    (route) => {
      const page = readPage(route);
      expect(page.querySelectorAll("main img")).toHaveLength(0);
      expect(page.querySelector('meta[property="og:image"]')?.getAttribute("content")).toMatch(/\/og-image\.png$/);
    },
  );

  it("ships no JavaScript islands on case-study pages", () => {
    for (const slug of CASES) expect(readPage(`/work/${slug}/`).querySelectorAll("astro-island"), slug).toHaveLength(0);
  });

  it("uses the screenshot as the Open Graph image", () => {
    expect(readPage("/work/prnow/").querySelector('meta[property="og:image"]')?.getAttribute("content")).toMatch(
      /^https:\/\/amadouniang\.dev\/_astro\/.+\.jpg$/,
    );
  });
});
