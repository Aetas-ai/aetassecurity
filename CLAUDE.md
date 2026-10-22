# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Astro 7 website for **Aetas Security**, the cybersecurity practice of Aetas Global Innovation (AGI), served at `www.aetassecurity.com`. It is a sibling of aetas.ai (github.com/Aetas-ai/Aetas): it shares the stack, security build, and writing rules, but has its own visual identity (HANDOFF.md "Design System").

## Required Project Context

Before modifying website code or content, read:

- `HANDOFF.md` for positioning, the AGI relationship rules, approved messaging, routes, redirects, partners, deployment, and the DNS plan
- `README.md` for the project structure and visual system
- `CONTENT-TODO.md` for items still awaiting business confirmation

Do not invent services, partners, client results, certifications, metrics, testimonials, or internal delivery details. Unconfirmed content stays unpublished behind its flag (`confirmed` in `src/data/services.ts`) and is tracked in `CONTENT-TODO.md`. Partners are the 7 cybersecurity partners approved on aetas.ai (`src/data/partner-logos.ts`). When positioning or architecture changes, update the relevant documentation in the same change.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Commands

- `npm test`: Node's built-in test runner (`--experimental-strip-types`) over `tests/*.test.mjs`.
- Single test file: `node --experimental-strip-types --test tests/server-runtime.test.mjs`. Filter with `--test-name-pattern "<regex>"`.
- `npm run build`: runs the test suite first, then `astro build`. A failing test fails the build.
- `npm start`: runs `dist/server/entry.mjs` (copied from `scripts/start-server.mjs` by the build). It requires a prior build and exits if `dist/client/_headers.json` is missing.
- `npm run og:generate`: regenerates `public/og/*.png` through headless Edge. Run it after changing a page title or the logo, and commit the PNGs.
- There is no lint script.

## Architecture

- **Output.** All pages are prerendered; the Node adapter serves them. Public files go to `dist/client`, the Node bundle to `dist/server`. Production runs as a Hostinger Node.js web app (output `dist`, entry file `server/entry.mjs`).
- **Build-time security headers and CSP.** `scripts/security-headers-integration.mjs` SHA-256-hashes the final inline scripts and styles, rejects `target="_blank"` links without `rel="noopener noreferrer"` and inline event handlers, fails on public source maps, logs, env files, or credential artifacts, and writes `dist/client/_headers.json` and `dist/client/.htaccess`. The policy lives in `scripts/security-policy.mjs`. New external origins must be added to the policy. Never edit the generated `.htaccess` by hand, and never rewrite HTML after the build.
- **Canonical host and redirects.** `CANONICAL_ORIGIN` (`https://www.aetassecurity.com`) and the legacy `REDIRECTS` map live in `scripts/security-policy.mjs`. `scripts/server-runtime.mjs` applies headers, 301s for legacy paths, and the canonical 308 before Astro; the generated `.htaccess` mirrors them for static hosting. Add redirects only to the map, with a test.
- **UI.** `src/layouts/Layout.astro` is the shared shell (ClientRouter, SEO, structured data, `data-motion` pausing; no scroll reveals). It renders `SiteHeader`, `MobileNav`, and `SiteFooter`, all driven by `src/data/navigation.ts`; menu behaviour lives in `src/scripts/site-nav.ts`. Not a Next.js app: no `next/*` APIs. There is no Bob assistant and no loading overlay.
- **Code-rendered demo.** One `MxdrConsole` React island on the homepage body (never in the hero), built on `DemoWindow` / `useSteps` (`src/components/demos/demo-runtime.tsx`) with simulated data in `src/data/demos.ts`. "Simulated" label, reserved example domains and documentation IP ranges only, analyst approval before containment, no live indicators, no runtime `<style>` injection (CSP).
- **Design system.** Own identity, not aetas.ai's: navy surfaces (`#050b16` to `#13243d`), cyan accent `#3aaee0` (navy text on cyan buttons; never cyan text on light surfaces), Saira headings with Inter body, chamfered panels and buttons drawn on `::before` (`--cut`, `--panel-fill`, `--panel-line`), reticle corners, sentence-case labels. The logo gradient (`--brand-gradient`) is only for the hero radar, the step pipeline, and the header CTA edge; status hues only in the radar and demo chips. The hero `ThreatRadar` is the single orchestrated motion; no scroll reveals. Tokens and `agi-*` classes live in `src/styles/global.css` and `src/styles/product-ui.css`.
- **Images.** Code-built visuals only. `public/logo.png` and `public/icon.png` are the final logo. Partner artwork lives in `public/partners/`.
- **Sitemap.** The sitemap filter in `astro.config.mjs` excludes `/404`. Update it when adding non-indexed routes.
- **Phase 2 forms.** Not present yet. Port the aetas.ai pipeline (CSRF, zod, rate limiting, Resend from a verified notify subdomain) as described in HANDOFF.md.

Before handoff, inspect `npm run`, run `npm test`, run `npm run build`, and run `git diff --check`. Report test results accurately.

## Documentation

Full documentation: https://docs.astro.build
