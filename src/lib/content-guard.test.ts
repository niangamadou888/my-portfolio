import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CONTENT_ROOT, listMarkdown, readFrontmatter } from "@/test-utils/content-files";
import { findForbidden } from "./forbidden";

const NAMED_HOSTS = ["prnow.io", "smsapp.io", "podcasttranscript.ai", "topaccounts.io"];

interface Fact {
  value: string;
  label: string;
  source: string;
}

describe("content guard", () => {
  const files = listMarkdown(CONTENT_ROOT);

  it("has the five English case studies", () => {
    const english = listMarkdown(join(CONTENT_ROOT, "work/en")).map((file) => file.split("/").pop());
    expect(english.sort()).toEqual([
      "multi-server-hosting.md",
      "podcasttranscript.md",
      "prnow.md",
      "seo-data-api.md",
      "smsapp.md",
    ]);
  });

  it.each(files.map((file) => [file.replace(CONTENT_ROOT, ""), file]))("%s has no forbidden strings", (_name, file) => {
    expect(findForbidden(readFileSync(file, "utf8"))).toEqual([]);
  });

  it("has the four English services", () => {
    const english = listMarkdown(join(CONTENT_ROOT, "services/en")).map((file) => file.split("/").pop());
    expect(english.sort()).toEqual([
      "ai-transcription-apps.md",
      "multilingual-seo-sites.md",
      "press-release-platforms.md",
      "sms-verification-platforms.md",
    ]);
  });

  it("links named case studies only to permitted domains", () => {
    for (const file of listMarkdown(join(CONTENT_ROOT, "work"))) {
      const data = readFrontmatter(file);
      if (data.named !== true) continue;
      expect(NAMED_HOSTS, file).toContain(new URL(String(data.liveUrl)).host);
    }
  });

  it("cites only the codebase for unnamed case studies, so no source can reveal the product", () => {
    for (const file of listMarkdown(join(CONTENT_ROOT, "work"))) {
      const data = readFrontmatter(file);
      if (data.named !== false) continue;
      for (const fact of data.facts as Fact[]) expect(fact.source, file).toMatch(/^repo:/);
    }
  });
});
