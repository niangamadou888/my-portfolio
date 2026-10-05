import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";

export const CONTENT_ROOT = join(process.cwd(), "src/content");

export const listMarkdown = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return listMarkdown(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });

export const readFrontmatter = (file: string): Record<string, unknown> => {
  const match = /^---\n([\s\S]*?)\n---/.exec(readFileSync(file, "utf8"));
  return match ? (parseYaml(match[1] ?? "") as Record<string, unknown>) : {};
};
