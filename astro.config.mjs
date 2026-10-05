import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://amadouniang.dev",
  trailingSlash: "always",
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", fr: "fr" } },
      filter: (page) => !/\/404\/?$/.test(page),
    }),
  ],
});
