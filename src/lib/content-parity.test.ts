import { basename, join } from "node:path";
import { describe, expect, it } from "vitest";
import { CONTENT_ROOT, listMarkdown, readFrontmatter } from "@/test-utils/content-files";
import { missingTranslations } from "./content-rules";

interface Fact {
  value: string;
  label: string;
  source: string;
}

const idsOf = (collection: string): string[] =>
  listMarkdown(join(CONTENT_ROOT, collection)).map((file) => {
    const lang = basename(join(file, ".."));
    return `${lang}/${basename(file, ".md")}`;
  });

const digits = (value: string): string => value.replace(/\D/g, "");

const SHARED_KEYS = ["named", "liveUrl", "featured", "order", "stack", "image", "service"] as const;

describe("translation parity", () => {
  it.each(["work", "services"])("every %s entry exists in English and French", (collection) => {
    expect(missingTranslations(idsOf(collection))).toEqual([]);
  });

  it("keeps the same structure, sources and numbers in both languages", () => {
    for (const file of listMarkdown(join(CONTENT_ROOT, "work/en"))) {
      const en = readFrontmatter(file);
      const fr = readFrontmatter(file.replace("/work/en/", "/work/fr/"));
      for (const key of SHARED_KEYS) expect(fr[key], `${basename(file)} ${key}`).toEqual(en[key]);
      const enFacts = en.facts as Fact[];
      const frFacts = fr.facts as Fact[];
      expect(frFacts.map((fact) => fact.source)).toEqual(enFacts.map((fact) => fact.source));
      expect(frFacts.map((fact) => digits(fact.value))).toEqual(enFacts.map((fact) => digits(fact.value)));
    }
  });
});
