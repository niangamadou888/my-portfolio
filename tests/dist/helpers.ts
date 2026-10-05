import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse, type HTMLElement } from "node-html-parser";

export const DIST = join(process.cwd(), "dist");
export const SITE_URL = "https://amadouniang.dev";

export const EN_ROUTES = [
  "/",
  "/work/",
  "/work/prnow/",
  "/work/smsapp/",
  "/work/podcasttranscript/",
  "/work/multi-server-hosting/",
  "/work/seo-data-api/",
  "/services/press-release-platforms/",
  "/services/ai-transcription-apps/",
  "/services/sms-verification-platforms/",
  "/services/multilingual-seo-sites/",
  "/about/",
  "/contact/",
] as const;

export const ALL_ROUTES: readonly string[] = [...EN_ROUTES, ...EN_ROUTES.map((route) => `/fr${route}`)];

/** "/work/" -> dist/work/index.html; "/404.html" -> dist/404.html */
export const fileFor = (route: string): string =>
  route.endsWith("/") ? join(DIST, route, "index.html") : join(DIST, route);

export const pageExists = (route: string): boolean => existsSync(fileFor(route));

export const readRaw = (route: string): string => readFileSync(fileFor(route), "utf8");

export const readPage = (route: string): HTMLElement => parse(readRaw(route));

export const listFiles = (dir: string, extensions: readonly string[]): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full, extensions);
    return extensions.some((ext) => entry.name.endsWith(ext)) ? [full] : [];
  });
