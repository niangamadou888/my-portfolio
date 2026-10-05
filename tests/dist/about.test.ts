import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DIST, readPage } from "./helpers";

describe("about page", () => {
  it.each([
    ["/about/", "en", "About me"],
    ["/fr/about/", "fr", "À propos de moi"],
  ] as const)("%s renders in %s with one heading", (route, lang, heading) => {
    const page = readPage(route);
    expect(page.querySelector("html")?.getAttribute("lang")).toBe(lang);
    expect(page.querySelectorAll("h1").map((h1) => h1.text.trim())).toEqual([heading]);
  });

  it("leads the experience timeline with the current contract role", () => {
    expect(readPage("/about/").querySelector("#experience h3")?.text.trim()).toBe("Lead Full-Stack Developer (contract)");
    expect(readPage("/fr/about/").querySelector("#experience h3")?.text.trim()).toBe(
      "Développeur full-stack principal (contrat)",
    );
  });

  it("links both CVs to files that exist", () => {
    const hrefs = readPage("/about/")
      .querySelectorAll("a[download]")
      .map((link) => decodeURI(link.getAttribute("href") ?? ""));
    expect(hrefs).toEqual(["/Amadou Boubacar Niang - Resume.pdf", "/Amadou Boubacar Niang - CV.pdf"]);
    for (const href of hrefs) expect(existsSync(join(DIST, href)), href).toBe(true);
  });

  it("lists education and certifications", () => {
    const page = readPage("/about/");
    expect(page.querySelectorAll("#education article")).toHaveLength(3);
    expect(page.querySelectorAll("#certifications article")).toHaveLength(4);
  });
});
