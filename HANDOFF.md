# Aetas Security Website Handoff

Last updated: October 23, 2026

This is the primary implementation and positioning reference for developers and coding assistants working on the Aetas Security website (www.aetassecurity.com). It is a sibling of the aetas.ai website (github.com/Aetas-ai/Aetas): same stack, design system, security build, and writing rules, with its own accent colour.

## Company Positioning

**Aetas Security** is the cybersecurity practice of **Aetas Global Innovation (AGI)**. The site says this once, in the homepage hero ("Aetas Security, the cybersecurity practice of Aetas Global Innovation"), and in the shared footer line "Part of Aetas Global Innovation · aetas.ai" (linking https://aetas.ai).

- Do not describe AGI as a holding company or invent any group structure (no parent-organization structured data either).
- Cross-link to https://aetas.ai/security and https://www.aetasglobal.com where relevant ("Explore Aetas Global" is the approved name).
- aetas.ai's Cybersecurity page links to https://www.aetassecurity.com/, so the root URL is the real homepage. Never reintroduce a gateway ("Enter") page.

Services:

- **Managed Extended Detection and Response (MXDR)**: Monitor, Investigate, Respond, Document.
- **Offensive Security**: Network Security Testing and Application Security Testing (Pen Testing).
- **Expert in the Loop**: AI-assisted detection is presented as Human Led AI with Expert Human Oversight of AI (Expert in the Loop). Analysts review findings and approve containment. Never imply fully autonomous AI.

## Approved Messaging Baseline

- **Homepage hero:** "Detect threats. Test defenses. Strengthen resilience." (the aetas.ai Cybersecurity hero), with the existing tagline "Advanced Cybersecurity Solutions for your business" as the eyebrow.
- MXDR, Offensive Security, FAQ, and closing CTA copy reuse the approved aetas.ai `/security` wording.
- The Expert in the Loop section, MSP programme copy, contact card copy, and legal pages are new or rewritten and are listed for review in `CONTENT-TODO.md`.

## Critical Copy Rules

Same as aetas.ai:

- Never invent customers, results, metrics, certifications, partner tiers, testimonials, or addresses.
- Always spell out **Business Processes**.
- Do not name internal service-delivery platforms, ticketing systems, or tools.
- Do not frame services around one vendor-specific platform.
- Publish partner names and logos only after business approval.
- When unsure, add a `[CONFIRM]` placeholder in code and track it in `CONTENT-TODO.md`. Unconfirmed items stay unpublished (flags off), not visible as placeholder text.

## Technical Stack

Matches aetas.ai exactly: Astro 7 (prerendered pages, Node adapter), React 19 islands via `@astrojs/react`, Tailwind CSS 4 via `@tailwindcss/vite`, `@fontsource-variable/inter`, `lucide-react`, `@astrojs/sitemap`, `zod` (reserved for the Phase 2 form pipeline), Node >= 22.12. Not Next.js. No animation library; CSS keyframes only. Tests use Node's built-in test runner.

## What Was Copied From aetas.ai, and What Was Left Out

Copied and adapted: `global.css`, `product-ui.css`, `Layout.astro` (SEO, structured data, ClientRouter, reveals, `data-motion` pausing), `Button`, `SectionHeading`, `PageHero` (plus a `primaryExternal` prop for the booking link), `Breadcrumbs`, `Faq`, `ServiceFaqSection`, `ServiceIcon`, `PartnerLogo`, `SiteHeader`, `MobileNav`, `SiteFooter`, `site-nav.ts`, `demo-runtime.tsx`, `MxdrConsole.tsx`, the MXDR part of `demos.ts`, the security-header build scripts, the secure Node entry, and the OG image generator.

Left out (not used by this site): Bob and the loading overlay, the AGI network graph, the advisor quiz and responsibility selector, the Work/Resources/Brief/About/Careers pages, the AI and service-desk demos, `middleware.ts`, and the form pipeline (Phase 2). Their CSS was removed too.

## Important Files

- `src/data/navigation.ts`: header, mobile, footer links, contact details (phone, email, booking URL), social links.
- `src/data/services.ts`: the five extra capabilities from the old site, each behind `confirmed`.
- `src/data/partner-logos.ts`: the 13 partners from the old site, each behind `approved`, plus `partnerPortalUrl`.
- `src/data/service-faqs.ts`: homepage FAQ answers (approved copy only).
- `src/data/demos.ts`: simulated MXDR data.
- `src/pages/index.astro`: homepage (hero, services `#mxdr` / `#offensive-security` / `#network-testing` / `#application-testing`, demo, `#expert-in-the-loop`, capabilities, FAQ, AGI band, CTA).
- `src/pages/partners.astro`, `contact.astro`, `legal/privacy.astro`, `legal/terms.astro`, `404.astro`.
- `scripts/security-policy.mjs`: CSP, security headers, `CANONICAL_ORIGIN`, and the `REDIRECTS` map.
- `scripts/security-headers-integration.mjs`: build-time CSP hashing, `.htaccess` (redirects, canonical host, headers), `_headers.json`, and installing the secure Node entry.
- `scripts/server-runtime.mjs` / `scripts/start-server.mjs`: the secure Node entry (`dist/server/entry.mjs`): security headers, legacy 301s, canonical redirect.

## Design System

Identical to aetas.ai (see README "Visual System") except the single accent:

| Token | Value | Contrast |
|---|---|---|
| `--color-accent` | `#3aaee0` | 7.0–7.9:1 on the dark surfaces; **2.5:1 on white, so never use it for text on light bands** |
| `--color-accent-ink` (on light) | `#0b6f9c` | 5.1:1 on `#f5f5f6`, ≈4.7:1 on `#ececee` |
| `--color-accent-text` (on dark) | `#8fd3f2` | 10.8–12.1:1 on the dark surfaces |

ONE accent, no gradients or extra hues. The old brand red-orange `#F0523D` is not used. `accent-ai|security|global|governance` remain aliases of the single accent.

## Code-rendered Demo

One `MxdrConsole` window on the homepage ("How MXDR works"), never in the hero. Same rules as aetas.ai: "Simulated" label and caption, reserved example domains and documentation IP ranges only, analyst approval before containment, advances only on screen, pause control, Previous/Next under reduced motion, no runtime `<style>` injection.

## Routes and Redirects

Routes: `/`, `/partners`, `/contact`, `/legal/privacy`, `/legal/terms`, and the branded `noindex` 404.

Canonical origin: `https://www.aetassecurity.com`. The bare domain and plain HTTP redirect (308) to it.

Legacy Squarespace paths answer 301 from one map (`REDIRECTS` in `scripts/security-policy.mjs`), applied by both the Node listener and the generated `.htaccess`:

- `/home` → `/`
- `/contactus` → `/contact`
- `/cart` → `/`

Add new redirects to that map only; never edit the generated `.htaccess`.

## Hosting and Deployment

Target: a Hostinger Node.js web app, the same as aetas.ai.

- Node.js 22.x, npm, build command `npm run build`, output directory `dist`, **entry file `server/entry.mjs`**.
- On a Hostinger Node app, Hostinger's own proxy `.htaccess` sits in `public_html`; the generated `dist/client/.htaccess` is not used. That is why the redirects and headers are also applied by the Node entry.
- A static-only deployment (output `dist/client`) would rely on the generated `.htaccess` instead.
- Run `npm test`, then verify the live domain's response headers and redirects after each deploy.

### DNS move plan (Squarespace → Hostinger; nothing has been changed yet)

1. Export every current DNS record for aetassecurity.com from Squarespace. Keep the email records (MX, SPF/TXT, DKIM, DMARC, autodiscover) exactly as they are: `info@aetassecurity.com` and the Outlook booking page depend on them.
2. Create the Hostinger Node web app for www.aetassecurity.com, deploy, and verify on Hostinger's temporary domain.
3. Lower the TTL of the current A/CNAME records 24–48 hours before the switch.
4. Point the bare domain's A record and the `www` CNAME to Hostinger (records only, or move the nameservers after recreating every record).
5. Issue SSL for both hostnames on Hostinger. Verify: `/` returns 200, the bare domain redirects to www, `/home` and `/contactus` return 301, and the security headers are present.
6. In Google Search Console, verify the domain property and submit `https://www.aetassecurity.com/sitemap-index.xml`.
7. Cancel the Squarespace site only after the new site and email have been verified.

## Phase 2: Forms

Reuse the aetas.ai secure form pipeline: `src/lib/server/*`, `src/pages/api/forms/*`, `src/scripts/secure-forms.ts`, `FormSubmitButton.astro`, `middleware.ts`, the `env.schema` in `astro.config.mjs`, the form CSS, `invalidEnvironmentVariables` in `server-runtime.mjs`/`start-server.mjs`, and their tests. Sending uses Resend from a verified notify subdomain (for example `notify.aetassecurity.com`). Follow the aetas.ai `EMAIL-SETUP.md`.

## Known Gaps

1. All `[CONFIRM]` items in `CONTENT-TODO.md`, especially the official white logo files: `public/logo.png` and `public/icon.png` are temporary, generated from the colour master.
2. Legal review of the Privacy Policy and Terms & Conditions.
3. Phase 2 forms.
4. A browser check for CSP violations against the production build over HTTPS (local checks used the dev server).
5. Analytics and consent, once the business chooses a platform.

## Required Change Workflow

1. Read this file and the relevant source before changing positioning, services, partners, routes, or shared functionality.
2. Keep edits scoped; do not add services, claims, partners, metrics, or dependencies that were not approved.
3. Test at 390 px, 768 px, 1280×720, 1366×768, 1536×864, and 1920×1080. On small laptops the hero and its main CTA must be visible without scrolling.
4. Run `npm test`, `npm run build`, and `git diff --check` before handoff.
5. Update this file, README.md, and CLAUDE.md when positioning, routes, architecture, or deployment change.
