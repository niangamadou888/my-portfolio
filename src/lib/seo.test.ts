import { describe, expect, it } from "vitest";
import { absoluteUrl, buildSeo, serializeJsonLd } from "./seo";

const base = { title: "PRNow | Amadou Niang", description: "A case study." } as const;

describe("buildSeo", () => {
  it("points the canonical at the page's own language", () => {
    expect(buildSeo({ ...base, lang: "en", path: "/work/prnow/" }).canonical).toBe(
      "https://amadouniang.dev/work/prnow/",
    );
    expect(buildSeo({ ...base, lang: "fr", path: "/work/prnow/" }).canonical).toBe(
      "https://amadouniang.dev/fr/work/prnow/",
    );
  });

  it("lists en, fr and x-default alternates, with x-default on English", () => {
    expect(buildSeo({ ...base, lang: "fr", path: "/about/" }).alternates).toEqual([
      { hreflang: "en", href: "https://amadouniang.dev/about/" },
      { hreflang: "fr", href: "https://amadouniang.dev/fr/about/" },
      { hreflang: "x-default", href: "https://amadouniang.dev/about/" },
    ]);
  });

  it("falls back to the default Open Graph image as an absolute URL", () => {
    expect(buildSeo({ ...base, lang: "en", path: "/" }).ogImage).toBe("https://amadouniang.dev/og-image.png");
  });

  it("makes a root-relative image absolute and keeps absolute ones", () => {
    expect(buildSeo({ ...base, lang: "en", path: "/", image: "/_astro/a.jpg" }).ogImage).toBe(
      "https://amadouniang.dev/_astro/a.jpg",
    );
    expect(buildSeo({ ...base, lang: "en", path: "/", image: "https://cdn.example/a.jpg" }).ogImage).toBe(
      "https://cdn.example/a.jpg",
    );
  });

  it("sets Open Graph locales for the page and its alternate", () => {
    const seo = buildSeo({ ...base, lang: "fr", path: "/" });
    expect(seo.ogLocale).toBe("fr_FR");
    expect(seo.ogLocaleAlternate).toBe("en_US");
    expect(seo.ogType).toBe("website");
  });
});

describe("serializeJsonLd", () => {
  it("escapes < so content can never close the script tag", () => {
    expect(serializeJsonLd({ name: "</script><script>alert(1)</script>" })).not.toContain("</script>");
  });
});

describe("absoluteUrl", () => {
  it("joins with the site URL", () => {
    expect(absoluteUrl("/fr/")).toBe("https://amadouniang.dev/fr/");
  });
});
