# amadouniang.dev

Portfolio of Amadou Boubacar Niang: a static Astro site with English pages at `/` and French pages at `/fr/`, served by a Cloudflare Worker that also handles the contact form (`worker/`, `server/contact/`).

## Develop

Requires Node 22.12 or newer.

    npm install
    npm run dev        # local site
    npm run build      # static site in dist/
    npm run preview    # serve dist/

## Content

- Case studies: `src/content/work/{en,fr}/<slug>.md`. Frontmatter is validated by `src/content.config.ts`: every fact needs a `source` (a public https URL or `repo:<id>`), and unnamed client work (`named: false`) may not link to or show the product.
- Services: `src/content/services/{en,fr}/<slug>.md`.
- Interface text: `src/i18n/ui.ts` (every English key needs a French one).
- `node scripts/check-sources.mjs` re-checks that every public source still responds.

## Tests

    npm test                            # unit tests and the contact Worker
    npm run build && npm run test:dist  # checks over the built pages
    npm run test:e2e                    # Playwright, desktop and phone widths
    npm run check                       # Astro and TypeScript types

The unit and built-page tests read `forbidden.local.json` (git-ignored): copy `forbidden.local.example.json` and list the product names that must never appear on the site.

## Deploy

Pushing `main` triggers Cloudflare Workers Builds (`npm run build`, then `npx wrangler deploy`). The contact form needs the `RESEND_API_KEY` secret on the `my-portfolio` Worker.
