import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { findForbidden } from "@/lib/forbidden";
import { ALL_ROUTES, DIST, SITE_URL, listFiles, pageExists, readPage } from "./helpers";

describe("whole site", () => {
  it("builds every page in both languages", () => {
    for (const route of ALL_ROUTES) expect(pageExists(route), route).toBe(true);
  });

  it("gives every page one h1, a unique title and a unique 50–160 character description", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const route of ALL_ROUTES) {
      const page = readPage(route);
      expect(page.querySelectorAll("h1"), route).toHaveLength(1);
      const title = page.querySelector("title")?.text ?? "";
      const description = page.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
      expect(titles.has(title), `${route} repeats title "${title}"`).toBe(false);
      expect(descriptions.has(description), `${route} repeats its description`).toBe(false);
      expect(description.length, route).toBeGreaterThanOrEqual(50);
      expect(description.length, route).toBeLessThanOrEqual(160);
      titles.add(title);
      descriptions.add(description);
    }
  });

  it("points every canonical at the page itself and every hreflang at a built page", () => {
    for (const route of ALL_ROUTES) {
      const page = readPage(route);
      expect(page.querySelector('link[rel="canonical"]')?.getAttribute("href"), route).toBe(`${SITE_URL}${route}`);
      const alternates = page.querySelectorAll('link[rel="alternate"][hreflang]');
      expect(alternates.map((link) => link.getAttribute("hreflang")), route).toEqual(["en", "fr", "x-default"]);
      for (const link of alternates) {
        const href = link.getAttribute("href") ?? "";
        expect(href.startsWith(SITE_URL), href).toBe(true);
        expect(pageExists(href.slice(SITE_URL.length)), href).toBe(true);
      }
    }
  });

  it("emits JSON-LD that parses on every page", () => {
    for (const route of ALL_ROUTES) {
      for (const script of readPage(route).querySelectorAll('script[type="application/ld+json"]')) {
        expect(() => JSON.parse(script.rawText), route).not.toThrow();
      }
    }
  });

  it("lists every page in the sitemap and leaves the 404 out", () => {
    const sitemap = readFileSync(join(DIST, "sitemap-0.xml"), "utf8");
    for (const route of ALL_ROUTES) expect(sitemap, route).toContain(`<loc>${SITE_URL}${route}</loc>`);
    expect(sitemap).not.toContain("404");
  });

  it("points robots.txt at the sitemap index", () => {
    expect(readFileSync(join(DIST, "robots.txt"), "utf8")).toContain(`Sitemap: ${SITE_URL}/sitemap-index.xml`);
  });

  it("contains no forbidden strings or IP addresses in any page, sitemap, text or script file", () => {
    for (const file of listFiles(DIST, [".html", ".xml", ".txt", ".js"])) {
      expect(findForbidden(readFileSync(file, "utf8")), file).toEqual([]);
    }
  });
});
