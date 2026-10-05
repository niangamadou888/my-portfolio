// Fetches every https source cited in content and data files and fails if any is unreachable.
// Run: node scripts/check-sources.mjs
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src/content", "src/data"];
const SOURCE = /source:\s*"(https:\/\/[^"]+)"/g;

const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return files(full);
    return /\.(md|ts)$/.test(entry.name) ? [full] : [];
  });

const urls = [
  ...new Set(ROOTS.flatMap(files).flatMap((file) => [...readFileSync(file, "utf8").matchAll(SOURCE)].map((m) => m[1]))),
];

let failures = 0;
for (const url of urls) {
  try {
    const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15_000) });
    console.log(`${response.ok ? "ok  " : "FAIL"} ${response.status} ${url}`);
    if (!response.ok) failures += 1;
  } catch (error) {
    console.log(`FAIL ${error instanceof Error ? error.message : error} ${url}`);
    failures += 1;
  }
}

console.log(`${urls.length - failures}/${urls.length} sources reachable`);
process.exit(failures > 0 ? 1 : 0);
