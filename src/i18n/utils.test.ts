import { describe, expect, it } from "vitest";
import { LANGS, ui, type UiKey } from "./ui";
import { langFromPath, localizePath, normalizePath, otherLang, stripLang, t } from "./utils";

describe("t", () => {
  it("returns the string for the requested language", () => {
    expect(t("en", "nav.work")).toBe("Work");
    expect(t("fr", "nav.work")).toBe("Réalisations");
  });

  it("has a non-empty French string for every English key", () => {
    for (const key of Object.keys(ui.en) as UiKey[]) {
      expect(ui.fr[key].trim(), key).not.toBe("");
    }
  });

  it("keeps every meta description between 50 and 160 characters", () => {
    for (const lang of LANGS) {
      for (const key of Object.keys(ui.en).filter((k) => k.endsWith("description")) as UiKey[]) {
        expect(ui[lang][key].length, `${lang} ${key}`).toBeGreaterThanOrEqual(50);
        expect(ui[lang][key].length, `${lang} ${key}`).toBeLessThanOrEqual(160);
      }
    }
  });

  it("supports exactly English and French", () => {
    expect(LANGS).toEqual(["en", "fr"]);
  });
});

describe("normalizePath", () => {
  it.each([
    ["", "/"],
    ["/", "/"],
    ["/about", "/about/"],
    ["about/", "/about/"],
    ["/work/prnow/", "/work/prnow/"],
  ])("%s -> %s", (input, expected) => {
    expect(normalizePath(input)).toBe(expected);
  });
});

describe("langFromPath", () => {
  it.each([
    ["/", "en"],
    ["/work/prnow/", "en"],
    ["/fr", "fr"],
    ["/fr/", "fr"],
    ["/fr/work/prnow/", "fr"],
    ["/french-page/", "en"],
  ] as const)("%s is %s", (path, lang) => {
    expect(langFromPath(path)).toBe(lang);
  });
});

describe("stripLang / localizePath", () => {
  it("removes the French prefix", () => {
    expect(stripLang("/fr/")).toBe("/");
    expect(stripLang("/fr/work/smsapp/")).toBe("/work/smsapp/");
    expect(stripLang("/about/")).toBe("/about/");
  });

  it("adds the prefix for French and nothing for English", () => {
    expect(localizePath("/", "fr")).toBe("/fr/");
    expect(localizePath("/work/prnow/", "fr")).toBe("/fr/work/prnow/");
    expect(localizePath("/work/prnow/", "en")).toBe("/work/prnow/");
  });

  it("is idempotent and switches between languages", () => {
    expect(localizePath("/fr/about/", "fr")).toBe("/fr/about/");
    expect(localizePath("/fr/about/", "en")).toBe("/about/");
    expect(localizePath("/contact", "fr")).toBe("/fr/contact/");
  });
});

describe("otherLang", () => {
  it("flips the language", () => {
    expect(otherLang("en")).toBe("fr");
    expect(otherLang("fr")).toBe("en");
  });
});
