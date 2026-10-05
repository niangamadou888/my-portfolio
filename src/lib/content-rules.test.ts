import { describe, expect, it } from "vitest";
import { missingTranslations, workRuleErrors } from "./content-rules";
import { parseEntryId } from "./entry-id";

describe("parseEntryId", () => {
  it("splits language and slug", () => {
    expect(parseEntryId("fr/prnow")).toEqual({ lang: "fr", slug: "prnow" });
  });

  it.each(["prnow", "de/prnow", "en/a/b", "en/"])("rejects %s", (id) => {
    expect(() => parseEntryId(id)).toThrow(/<en\|fr>\/<slug>/);
  });
});

describe("workRuleErrors", () => {
  it("accepts a named case study with a live link and a described screenshot", () => {
    expect(workRuleErrors({ named: true, liveUrl: "https://prnow.io", image: {}, imageAlt: "PRNow home" })).toEqual([]);
  });

  it("requires a live link for named case studies", () => {
    expect(workRuleErrors({ named: true })).toEqual(["Named case studies need a liveUrl."]);
  });

  it("forbids links and screenshots on unnamed case studies", () => {
    expect(workRuleErrors({ named: false, liveUrl: "https://x.example", image: {}, imageAlt: "x" })).toEqual([
      "Unnamed case studies must not link to the product.",
      "Unnamed case studies must not show a screenshot.",
    ]);
  });

  it("requires alt text for a screenshot", () => {
    expect(workRuleErrors({ named: true, liveUrl: "https://prnow.io", image: {} })).toEqual([
      "Screenshots need imageAlt.",
    ]);
  });
});

describe("missingTranslations", () => {
  it("lists the language twin each slug is missing", () => {
    expect(missingTranslations(["en/prnow", "fr/prnow", "en/smsapp", "fr/seo"])).toEqual(["fr/smsapp", "en/seo"]);
  });

  it("is empty for an empty collection", () => {
    expect(missingTranslations([])).toEqual([]);
  });
});
