import { readFileSync } from "node:fs";

/** Claims retired as unverifiable. Product names that may not be named live in the git-ignored forbidden.local.json. */
export const FORBIDDEN_CLAIMS: readonly string[] = ["190+", "300+ services", "escrow", "400+ publishers", "2,400+", "assemblyai"];

const PRIVATE_NAMES_FILE = new URL("../../forbidden.local.json", import.meta.url);

const MISSING_FILE_MESSAGE =
  "forbidden.local.json is missing — copy forbidden.local.example.json and list the product names that must never appear on the site (kept out of git on purpose).";

// Digits glued to a letter, dot or hyphen are deliberately not matched (SVG path data), so "ip203.0.113.7" would not be caught.
export const IPV4 = /(?<![\w.-])(?:25[0-5]|2[0-4]\d|1?\d?\d)(?:\.(?:25[0-5]|2[0-4]\d|1?\d?\d)){3}(?![\w-]|\.\d)/g;

function readPrivateNamesFile(): string {
  try {
    return readFileSync(PRIVATE_NAMES_FILE, "utf8");
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new Error(MISSING_FILE_MESSAGE);
    }
    throw error;
  }
}

/** Reads the product names that must never appear on the site from the git-ignored forbidden.local.json. */
export function loadPrivateNames(): readonly string[] {
  const parsed: unknown = JSON.parse(readPrivateNamesFile());
  const names = typeof parsed === "object" && parsed !== null && "names" in parsed ? parsed.names : undefined;
  if (!Array.isArray(names) || names.length === 0 || !names.every((name) => typeof name === "string" && name.trim() !== "")) {
    throw new Error('forbidden.local.json must look like { "names": ["..."] } with at least one non-empty name.');
  }
  return names.map((name: string) => name.trim().toLowerCase());
}

export function findForbidden(text: string, privateNames: readonly string[] = loadPrivateNames()): string[] {
  const lower = text.toLowerCase();
  const strings = [...privateNames, ...FORBIDDEN_CLAIMS].filter((needle) => lower.includes(needle.toLowerCase()));
  const ips = [...text.matchAll(IPV4)].map((match) => `IPv4 ${match[0]}`);
  return [...strings, ...ips];
}
