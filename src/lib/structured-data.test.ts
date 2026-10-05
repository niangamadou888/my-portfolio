import { describe, expect, it } from "vitest";
import { breadcrumbJsonLd, caseStudyJsonLd, personJsonLd, serviceJsonLd } from "./structured-data";

describe("structured data", () => {
  it("describes the person with profile links", () => {
    const person = personJsonLd();
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Amadou Boubacar Niang");
    expect(person.sameAs).toContain("https://github.com/niangamadou888/");
  });

  it("numbers breadcrumb items from 1 with absolute URLs", () => {
    expect(
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Work", path: "/work/" },
      ]).itemListElement,
    ).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://amadouniang.dev/" },
      { "@type": "ListItem", position: 2, name: "Work", item: "https://amadouniang.dev/work/" },
    ]);
  });

  it("links a service to its provider", () => {
    const service = serviceJsonLd({ name: "X", description: "Y", path: "/services/x/", lang: "fr" });
    expect(service["@type"]).toBe("Service");
    expect(service.url).toBe("https://amadouniang.dev/fr/services/x/");
    expect((service.provider as { name: string }).name).toBe("Amadou Boubacar Niang");
  });

  it("includes the image only when there is one", () => {
    expect(caseStudyJsonLd({ name: "A", description: "B", path: "/work/a/", lang: "en" })).not.toHaveProperty("image");
    expect(
      caseStudyJsonLd({ name: "A", description: "B", path: "/work/a/", lang: "en", image: "/_astro/a.jpg" }).image,
    ).toBe("https://amadouniang.dev/_astro/a.jpg");
  });
});
