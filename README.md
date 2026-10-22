# Aetas Security Website

Astro website for **Aetas Security**, the cybersecurity practice of Aetas Global Innovation (AGI), served at `www.aetassecurity.com`. It is a sibling of the aetas.ai website (github.com/Aetas-ai/Aetas): same stack, design system, security build, and writing rules, with its own cyan accent.

The site presents:

- **Managed Extended Detection and Response (MXDR)**: Monitor, Investigate, Respond, Document.
- **Offensive Security**: Network Security Testing and Application Security Testing (Pen Testing).
- **Expert in the Loop**: Human Led AI with Expert Human Oversight of AI; analysts approve containment.

Read [HANDOFF.md](./HANDOFF.md) before changing positioning, services, partners, routes, or shared functionality. Open content questions live in [CONTENT-TODO.md](./CONTENT-TODO.md).

## Current Experience

- Text-led dark hero with the approved headline, booking-link CTA, and service focus list
- MXDR and Offensive Security service cards, the Expert in the Loop step strip, an FAQ with `FAQPage` structured data, and an AGI cross-link band
- One code-rendered, clearly simulated MXDR console (React island) below the hero
- Partners page with approval-gated partner logos and the MSP partner programme
- Contact page with the demo booking link, email, and phone (no on-site form in Phase 1)
- Privacy Policy, Terms & Conditions, and a branded `noindex` 404
- Header with a keyboard-accessible Services disclosure menu and an accessible mobile sheet
- Canonical metadata, Organization/WebSite/WebPage structured data, per-page share images, robots.txt, and a generated sitemap
- Build-generated, SHA-256 hash-based Content Security Policy and security headers, applied by the secure Node entry and the generated `.htaccess`
- 301 redirects for the old Squarespace paths (`/home`, `/contactus`, `/cart`) and a fixed canonical redirect to `https://www.aetassecurity.com`

## Technical Stack

- Astro 7 with prerendered pages and the Node adapter (standalone)
- React 19 islands through `@astrojs/react`
- Tailwind CSS 4 through `@tailwindcss/vite`
- Self-hosted Inter variable font via `@fontsource-variable/inter`
- Lucide React icons
- `@astrojs/sitemap`; `zod` reserved for the Phase 2 form pipeline
- CSS keyframes and Intersection Observer reveals (no animation library)
- Node's built-in test runner

## Project Structure

```text
src/
  components/        Astro components; demos/ holds the MXDR React island
  data/              Navigation and contact details, services, partners, FAQs, demo data
  layouts/           Shared layout, metadata, structured data, and scripts
  pages/             Astro routes
  scripts/           Header and mobile navigation behaviour
  styles/            Global Tailwind theme and product UI CSS
scripts/             Security-header build integration, secure Node entry, OG image generator
tests/               Security policy and server runtime tests
public/              Logo, icon, partner artwork, share images, robots.txt
```

## Visual System

Copied from aetas.ai; only the accent differs.

- Dark-first, Linear-inspired duotone: layered surfaces `#08090a` / `#0c0d0e` / `#111214` / `#17181b`, hairlines `rgba(255,255,255,.06)` and `rgba(255,255,255,.11)`, text `#f7f8f8`, muted text `#8a8f98`.
- ONE muted cyan accent: `--color-accent: #3aaee0`, `--color-accent-ink: #0b6f9c` (on light), `--color-accent-text: #8fd3f2` (on dark). `#3aaee0` is 2.5:1 on white, so never use it as text on a light band. No gradients or extra hues; status colours appear only in demo chips, always paired with text.
- Inter headings at weight 600 with tight tracking and the white-to-grey fade; 12 px card radius, 8 px control radius.
- Tokens, the fluid type scale (with the short-laptop rule `(min-width: 1024px) and (max-height: 900px)`), surface-aware text (`text-strong`, `text-muted`), and the `agi-*` section, card, eyebrow, and button classes live in `src/styles/global.css`; navigation, band, step-strip, window, and chip classes live in `src/styles/product-ui.css`.
- Shared components: `Button.astro` (`tone`, `variant`, `accent`, `arrow`, `external`), `SectionHeading.astro`, `PageHero.astro` (including `primaryExternal` and `secondaryExternal`), `Breadcrumbs`, `Faq`, `ServiceFaqSection`, `PartnerLogo`.
- Code-built visuals only. No stock or AI-generated imagery; use real photos only when the business supplies them.
- At most one "Simulated" demo window per page, never in the hero.
- Motion respects `prefers-reduced-motion`. Reveals use `data-reveal` / `data-reveal-group`; infinite animations carry `data-motion` and pause off-screen; the demo advances only on screen and shows Previous/Next under reduced motion.

## Routes

- `/`
- `/partners`
- `/contact`
- `/legal/privacy`, `/legal/terms`
- 404 (branded, `noindex`, excluded from the sitemap)

## Commands

```sh
npm install
npm run dev
npm test
npm run build
npm start          # runs dist/server/entry.mjs after a build
npm run og:generate
```

`npm run build` runs the test suite before the Astro build. Run `git diff --check` alongside the production build before handoff.
