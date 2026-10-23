# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Astro 7 website for **Aetas Security**, the cybersecurity practice of Aetas Global Innovation (AGI), served at `www.aetassecurity.com`. It is a sibling of aetas.ai (github.com/Aetas-ai/Aetas): it shares the stack, security build, and writing rules, but has its own visual identity (HANDOFF.md "Design System").

## Required Project Context

Before modifying website code or content, read:

- `HANDOFF.md` for positioning, the AGI relationship rules, approved messaging, routes, redirects, partners, deployment, and the DNS plan
- `README.md` for the project structure and visual system
- `CONTENT-TODO.md` for items still awaiting business confirmation

Do not invent services, partners, client results, certifications, metrics, testimonials, or internal delivery details. Unconfirmed content stays unpublished and is tracked in `CONTENT-TODO.md`. Proof content lives in `src/data/proof.ts` (empty until approved); empty proof sections show `ContentSlot` placeholders only in placeholder mode (`src/data/site-flags.ts`: on in dev, off in production unless `PUBLIC_SHOW_PLACEHOLDERS=true`), and the build fails if placeholder markup reaches a production build. The four remaining additional services from the old site are in `capabilities` in `src/data/services.ts`; proactive incident response is the `incident-response` service page. Partners are the 7 cybersecurity partners approved on aetas.ai (`src/data/partner-logos.ts`). When positioning or architecture changes, update the relevant documentation in the same change.

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
- `node scripts/check-form-security.mjs`: mocked checks against the built backend (CSRF, validation, rate limit, honeypot, disabled delivery). Requires `npm run build`; sends no email.
- `npm run og:generate`: regenerates `public/og/*.png` through headless Edge (on Linux set `BROWSER_PATH=/usr/bin/google-chrome`). Run it after changing a page title or the logo, and commit only the PNGs that changed.
- `PUBLIC_SHOW_PLACEHOLDERS=true npm run build`: staging build with placeholder slots and draft resources. Never deploy it as production.
- There is no lint script.

## Architecture

- **Output.** All pages are prerendered except `src/pages/api/forms/*` (`prerender = false`); the Node adapter serves them. Public files go to `dist/client`, the Node bundle to `dist/server`. Production runs as a Hostinger Node.js web app (output `dist`, entry file `server/entry.mjs`).
- **Build-time security headers and CSP.** `scripts/security-headers-integration.mjs` SHA-256-hashes the final inline scripts and styles, rejects `target="_blank"` links without `rel="noopener noreferrer"` and inline event handlers, fails on public source maps, logs, env files, or credential artifacts, fails on `data-placeholder` markup unless placeholder mode is enabled, and writes `dist/client/_headers.json` and `dist/client/.htaccess`. The policy lives in `scripts/security-policy.mjs`. New external origins must be added to the policy. Never edit the generated `.htaccess` by hand, and never rewrite HTML after the build.
- **Canonical host and redirects.** `CANONICAL_ORIGIN` (`https://www.aetassecurity.com`) and the legacy `REDIRECTS` map live in `scripts/security-policy.mjs`. `scripts/server-runtime.mjs` applies headers, 301s for legacy paths, and the canonical 308 before Astro; the generated `.htaccess` mirrors them for static hosting. Add redirects only to the map, with a test.
- **UI.** `src/layouts/Layout.astro` is the shared shell (ClientRouter, SEO, structured data, `data-motion` pausing; no scroll reveals). It renders `SiteHeader` (with the utility row: "Experienced a breach?", phone, email), `AnnouncementBar`, `MobileNav`, and `SiteFooter`, all driven by `src/data/navigation.ts`; menu behaviour lives in `src/scripts/site-nav.ts`. Section patterns adopted from the reference sites (stat numerals, value cards, outcome columns, content slots, Resources) live in `src/styles/sections.css`. Not a Next.js app: no `next/*` APIs. There is no Bob assistant and no loading overlay.
- **Code-rendered demo.** One `MxdrConsole` React island on `/services/mxdr` (never in a hero, not on the homepage), built on `DemoWindow` / `useSteps` (`src/components/demos/demo-runtime.tsx`) with simulated data in `src/data/demos.ts`. "Simulated" label, reserved example domains and documentation IP ranges only, analyst approval before containment, no live indicators, no runtime `<style>` injection (CSP).
- **Design system.** Own identity, not aetas.ai's: navy surfaces (`#050b16` to `#13243d`), cyan accent `#3aaee0` (navy text on cyan buttons; never cyan text on light surfaces), Saira headings with Inter body, chamfered panels and buttons drawn on `::before` (`--cut`, `--panel-fill`, `--panel-line`), reticle corners, sentence-case labels. The logo gradient (`--brand-gradient`) is only for the hero radar and globe arc, the step pipeline, and the header CTA edge; status hues only in the radar, the demo chips, and the hero globe chips (always with a text label). Each page has one main motion moment (homepage `HeroGlobe` with `ShieldMark` at its centre, service-page `ServiceDiagram` signal, About `ThreatRadar`); light scroll entrances below the fold (`src/scripts/reveal.ts`); everything static under reduced motion, and infinite motion pauses off-screen via `data-motion`. Hero scripts (`hero-globe.ts`, `hero-taglines.ts`, `reveal.ts`) init on `astro:page-load` and tear down on `astro:before-preparation` in `Layout.astro`. Glow tokens `--glow-blue` / `--glow-cyan` are for backgrounds only; `HeroAtmosphere.astro` draws hero glow, rings, and particles. Backgrounds use the network map: `NetworkBackdrop.astro` in inner page heroes (pulses, plus a trace where there is no diagram) and the static `public/backdrop/network-tile.svg` on `.agi-band`; never behind body text. Tokens and `agi-*` classes live in `src/styles/global.css` and `src/styles/product-ui.css`.
- **Images.** Code-built visuals only. `public/logo.png` and `public/icon.png` are the final logo. Partner artwork lives in `public/partners/`.
- **Sitemap.** The sitemap filter in `astro.config.mjs` excludes `/404` and `/contact/thanks`. Update it when adding non-indexed routes.
- **Forms pipeline.** `src/scripts/secure-forms.ts` and `FormSubmitButton.astro` fetch a token from `/api/forms/csrf` and submit to `/api/forms/contact`, built with `createFormEndpoint` (`src/lib/server/forms.ts`: zod schema, same-origin and CSRF checks, bounded rate limit). `email.ts` selects Resend or the legacy webhook (mutually exclusive). `FORM_DELIVERY_ENABLED` defaults to false; `astro.config.mjs` `env.schema` types the secrets, and `invalidEnvironmentVariables` makes `npm start` fail on partial configuration. The service picker values in `contact.astro` must match the schema enum.
- **Pages.** Service pages come from `services` in `src/data/services.ts` through `ServicePage.astro` and `src/pages/services/[slug].astro`; add a service there, not by copying a page (and add its form value to the zod enum, the contact picker, the email labels in `src/lib/server/email-delivery.ts`, and its OG key). Shared approach copy lives in `src/data/approach.ts`.
- **Resources.** Markdown in `src/content/resources/`, schema in `src/content.config.ts`, helpers in `src/data/resources.ts`; `draft: true` entries build only in placeholder mode.

Before handoff, inspect `npm run`, run `npm test`, run `npm run build`, and run `git diff --check`. Report test results accurately.

## Documentation

Full documentation: https://docs.astro.build
