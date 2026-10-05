import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { DIST, listFiles, readPage } from "./helpers";

describe("base layout", () => {
  it("renders the head tags every page needs", () => {
    const page = readPage("/");
    expect(page.querySelector("title")?.text).toBe("Amadou Niang — Full-stack developer for SaaS & AI products");
    expect(page.querySelector('meta[name="description"]')?.getAttribute("content")).toMatch(/^Full-stack developer/);
    expect(page.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://amadouniang.dev/");
    expect(
      page.querySelectorAll('link[rel="alternate"]').map((link) => [link.getAttribute("hreflang"), link.getAttribute("href")]),
    ).toEqual([
      ["en", "https://amadouniang.dev/"],
      ["fr", "https://amadouniang.dev/fr/"],
      ["x-default", "https://amadouniang.dev/"],
    ]);
    expect(page.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe(
      "https://amadouniang.dev/og-image.png",
    );
  });

  it("marks the French home as French and links back to English", () => {
    const page = readPage("/fr/");
    expect(page.querySelector("html")?.getAttribute("lang")).toBe("fr");
    expect(page.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://amadouniang.dev/fr/");
    expect(page.querySelectorAll('a[hreflang="en"]').map((a) => a.getAttribute("href"))).toContain("/");
    expect(page.querySelectorAll("nav a").map((a) => a.getAttribute("href"))).toContain("/fr/work/");
  });

  it("offers a skip link to the main content", () => {
    const page = readPage("/");
    expect(page.querySelector("a.skip-link")?.getAttribute("href")).toBe("#main");
    expect(page.querySelector("main#main")).not.toBeNull();
  });

  it("serves a noindex 404 page with no language switch to a missing page", () => {
    const page = readPage("/404.html");
    expect(page.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex");
    expect(page.querySelector('link[rel="canonical"]')).toBeNull();
    expect(page.querySelectorAll("a[hreflang]")).toHaveLength(0);
    expect(page.querySelector('meta[property="og:url"]')).toBeNull();
    expect(page.querySelectorAll("h1")).toHaveLength(1);
  });

  it("never hides the system cursor", () => {
    for (const file of listFiles(DIST, [".html", ".css"])) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/cursor:\s*none/);
    }
  });
});
