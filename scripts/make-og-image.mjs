// Renders scripts/og-card.html to public/og-image.png (1200×630), the image shared on social networks.
// Run: node scripts/make-og-image.mjs
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";

const CARD = new URL("./og-card.html", import.meta.url);
const OUTPUT = fileURLToPath(new URL("../public/og-image.png", import.meta.url));
const VIEWPORT = { width: 1200, height: 630 };

// The card pulls its fonts from ../public/fonts over file://, which Chromium blocks by default.
const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
try {
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  await page.goto(CARD.href);
  const faces = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts].map((face) => ({ face: `${face.family} ${face.weight}`, status: face.status }));
  });
  const notLoaded = faces.filter(({ status }) => status !== "loaded");
  if (faces.length === 0 || notLoaded.length > 0) {
    throw new Error(`Card fonts did not load: ${JSON.stringify(notLoaded.length > 0 ? notLoaded : faces)}`);
  }
  await page.screenshot({ path: OUTPUT, type: "png" });
  console.log(`Wrote ${OUTPUT} (${faces.map(({ face }) => face).join(", ")})`);
} finally {
  await browser.close();
}
