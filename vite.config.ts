import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Critters from "critters";
import fs from "fs";

// Vite plugin that inlines critical (above-the-fold) CSS and loads the rest async
// Uses closeBundle so CSS files are already written to dist when critters runs
function criticalCssPlugin() {
  return {
    name: "critical-css",
    apply: "build" as const,
    async closeBundle() {
      const critters = new Critters({
        path: "dist",
        publicPath: "/",
        preload: "swap",        // non-blocking load for full stylesheet
        inlineFonts: false,
        pruneSource: false,
      });
      const indexPath = path.resolve("dist/index.html");
      let html = fs.readFileSync(indexPath, "utf-8");
      html = await critters.process(html);

      // critters leaves rel="stylesheet" due to a bug with the crossorigin attribute.
      // Manually convert to the proper preload→stylesheet pattern so CSS is non-blocking.
      html = html.replace(
        /<link rel="stylesheet"([^>]*?) href="([^"]+\.css)"([^>]*?) onload="this\.rel='stylesheet'">/g,
        (_m, before, href, after) =>
          `<link rel="preload" as="style"${before} href="${href}"${after} onload="this.onload=null;this.rel='stylesheet'">`
      );
      // Fix noscript fallbacks to be proper (no onload)
      html = html.replace(
        /<noscript>(<link [^>]+) onload="this\.rel='stylesheet'"([^>]*)><\/noscript>/g,
        "<noscript>$1$2></noscript>"
      );

      fs.writeFileSync(indexPath, html);
      console.log("✓ Critical CSS inlined + non-blocking CSS load configured");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && criticalCssPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion/')) {
            return 'framer-motion';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'lucide';
          }
          if (id.includes('node_modules/react-icons/')) {
            return 'react-icons';
          }
          if (id.includes('node_modules/@radix-ui/')) {
            return 'radix-ui';
          }
          if (id.includes('node_modules/react-router-dom/') || id.includes('node_modules/react-router/')) {
            return 'router';
          }
        },
      },
    },
  },
}));
