# Aetas Security Website Handoff

Last updated: October 23, 2026 (dedicated service pages, About, secure contact form)

This is the primary implementation and positioning reference for developers and coding assistants working on the Aetas Security website (www.aetassecurity.com). It is a sibling of the aetas.ai website (github.com/Aetas-ai/Aetas): same stack, security build, and writing rules, with its own visual identity.

## Company Positioning

**Aetas Security** is the cybersecurity practice of **Aetas Global Innovation (AGI)**. The site says this once, in the About hero ("Aetas Security, the cybersecurity practice of Aetas Global Innovation"), and in the shared footer line "Part of Aetas Global Innovation · aetas.ai" (linking https://aetas.ai).

- Do not describe AGI as a holding company or invent any group structure (no parent-organization structured data either).
- Cross-link to https://aetas.ai/security and https://www.aetasglobal.com where relevant ("Explore Aetas Global" is the approved name).
- aetas.ai's Cybersecurity page links to https://www.aetassecurity.com/, so the root URL is the real homepage. Never reintroduce a gateway ("Enter") page.

Services:

- **Managed Extended Detection and Response (MXDR)**: Monitor, Investigate, Respond, Document.
- **Offensive Security**: Network Security Testing and Application Security Testing (Pen Testing).
- **Expert in the Loop**: AI-assisted detection is presented as Human Led AI with Expert Human Oversight of AI (Expert in the Loop). Analysts review findings and approve containment. Never imply fully autonomous AI.

## Approved Messaging Baseline

- **Homepage hero:** "Detect threats. Test defenses. Strengthen resilience." (the aetas.ai Cybersecurity hero), with the existing tagline "Advanced Cybersecurity Solutions for your business" as the eyebrow.
- Service summaries, the MXDR steps, the testing focus lines, and the closing CTA reuse the approved aetas.ai `/security` wording.
- Everything else on the service pages, About, and Contact (coverage, process, deliverables, FAQs, pillars, "what happens next"), plus the MSP programme copy and legal pages, is drafted and listed for review in `CONTENT-TODO.md`.

## Critical Copy Rules

Same as aetas.ai:

- Never invent customers, results, metrics, certifications, partner tiers, testimonials, or addresses.
- Always spell out **Business Processes**.
- Do not name internal service-delivery platforms, ticketing systems, or tools.
- Do not frame services around one vendor-specific platform.
- Publish partner names and logos only after business approval.
- When unsure, add a `[CONFIRM]` placeholder in code and track it in `CONTENT-TODO.md`. Unconfirmed items stay unpublished (flags off), not visible as placeholder text.

## Technical Stack

Matches aetas.ai: Astro 7 (prerendered pages, Node adapter), React 19 islands via `@astrojs/react`, Tailwind CSS 4 via `@tailwindcss/vite`, `@fontsource-variable/inter` plus `@fontsource-variable/saira` for headings, `lucide-react`, `@astrojs/sitemap`, `zod` (reserved for the Phase 2 form pipeline), Node >= 22.12. Not Next.js. No animation library; CSS keyframes only. Tests use Node's built-in test runner.

## What Was Copied From aetas.ai, and What Was Left Out

Copied and adapted (then restyled; see Design System): `global.css`, `product-ui.css`, `Layout.astro` (SEO, structured data, ClientRouter, `data-motion` pausing), `Button`, `SectionHeading`, `PageHero` (plus a `primaryExternal` prop for the booking link), `Breadcrumbs`, `Faq`, `ServiceFaqSection`, `ServiceIcon`, `PartnerLogo`, `SiteHeader`, `MobileNav`, `SiteFooter`, `site-nav.ts`, `demo-runtime.tsx`, `MxdrConsole.tsx`, the MXDR part of `demos.ts`, the security-header build scripts, the secure Node entry, and the OG image generator.

Left out (not used by this site): the scroll-reveal system, Bob and the loading overlay, the AGI network graph, the advisor quiz and responsibility selector, the Work/Resources/Brief/About/Careers pages, the AI and service-desk demos, `middleware.ts`, and the form pipeline (Phase 2). Their CSS was removed too.

## Important Files

- `src/data/navigation.ts`: header, mobile, and footer links (Services menu, About, Partners, Contact), contact details (phone, email, booking URL), social links.
- `src/data/services.ts`: `services`, the content of each service page (hero, CTA, coverage, steps, oversight, deliverables, FAQs, related), and `capabilities`, the five extra services from the old site behind `confirmed`.
- `src/data/approach.ts`: homepage pillars, Expert in the Loop steps, principles, engagement steps, and the contact page's "what happens next".
- `src/data/service-faqs.ts`: homepage FAQs.
- `src/data/partner-logos.ts`: the 7 approved cybersecurity partners (same as aetas.ai), plus `partnerPortalUrl`.
- `src/data/demos.ts`: simulated MXDR data.
- `src/components/ServicePage.astro`: the shared service page template, rendered by `src/pages/services/[slug].astro` with `Service` structured data.
- `src/components/HomeHero.astro`, `ThreatRadar.astro`, `PartnerMarquee.astro`: the homepage hero, its radar, and the partner strip.
- `src/pages/index.astro` (overview and conversion), `services/index.astro` (hub), `about.astro`, `partners.astro`, `contact.astro`, `contact/thanks.astro`, `legal/*`, `404.astro`.
- `src/lib/server/*`, `src/pages/api/forms/{csrf,contact}.ts`, `src/scripts/secure-forms.ts`, `src/components/FormSubmitButton.astro`, `src/middleware.ts`: the secure contact form (see "Contact form").
- `scripts/security-policy.mjs`: CSP, security headers, `CANONICAL_ORIGIN`, and the `REDIRECTS` map.
- `scripts/security-headers-integration.mjs`: build-time CSP hashing, `.htaccess` (redirects, canonical host, headers), `_headers.json`, and installing the secure Node entry.
- `scripts/server-runtime.mjs` / `scripts/start-server.mjs`: the secure Node entry (`dist/server/entry.mjs`): form environment validation, security headers, legacy 301s, canonical redirect.
- `scripts/check-form-security.mjs`: mocked end-to-end form checks against the built backend (no email sent).

## Design System

Aetas Security has its own visual identity ("command center"); only the stack, the build, and the writing rules are shared with aetas.ai. Do not copy aetas.ai's neutral-black surfaces, rounded cards, white-to-grey heading fade, uppercase dotted eyebrows, per-section scroll reveals, or arrow-on-every-button styling back into this site.

| Token | Value | Use and contrast |
|---|---|---|
| `--surface-0` … `--surface-3` | `#050b16`, `#08111f`, `#0d1a2e`, `#13243d` | navy page, band, panel, raised |
| `--line-subtle` / `--line-strong` | `rgba(143,211,242,.08)` / `.16` | cyan-tinted hairlines |
| text / muted text | `#e6f1f9` / `#8a9bb0` | ≥13.5:1 / ≥5.4:1 on every surface |
| `--color-accent` | `#3aaee0` | UI accent, links, focus; ≥6.1:1 on navy. Primary buttons are cyan with navy text (7.8:1). **2.5:1 on white: never text on light bands** |
| `--color-accent-text` | `#8fd3f2` | accent text on navy, ≥9.4:1 |
| `--color-accent-ink` | `#0b6f9c` | accent text on light surfaces |
| `--color-logo-blue` | `#2f6bff` | decorative only, never text |
| `--brand-gradient` | `#22d3ee → #2f6bff` (the logo gradient) | **only** the hero radar sweep, the step pipeline line, and the header CTA edge |
| `--color-detected` / `--color-review` | `#f0523d` / `#f5a524` | status only (radar, demo chips), always beside a text label |

- **Type:** Saira (`@fontsource-variable/saira`, weight axis) for headings and labels at weight 600, solid colour; Inter for body; system monospace only for demo data.
- **Shape:** chamfered (cut-corner) panels and buttons from the shield logo. `--cut` / `--cut-sm` set the cut; the shape and its 1px edge are drawn on `::before` (`.agi-card--dark`, `.agi-btn--dark-*`, or `.as-chamfer` with `--panel-fill` / `--panel-line`), so focus outlines are never clipped. Reticle corner brackets frame the radar and the demo window. Radii are 2px.
- **Labels:** sentence case, only where they name the content (MXDR, Offensive Security, Expert in the Loop). Numbers only for real sequences (MXDR stages, Expert in the Loop steps, MSP onboarding).
- **Motion:** one orchestrated moment, the hero `ThreatRadar`: the sweep passes a blip, which shows as Detected, then Analyst review, then Contained after approval (Expert in the Loop). The partner marquee and the demo are the only other motion. All three pause off-screen (`data-motion`); under reduced motion the radar is static, the marquee is a wrapped row, and the demo uses Previous/Next. There are no scroll reveals.
- `accent-ai|security|global|governance` remain aliases of the accent so copied markup keeps working.

## Partners

The Partners page and the homepage strip show the 7 cybersecurity partners approved on aetas.ai: SentinelOne, CrowdStrike, Zscaler, Qualys, Proofpoint, Abnormal, and Sublime Security (`src/data/partner-logos.ts`, artwork in `public/partners/`). Keep the list in sync with aetas.ai. Partners from the previous aetassecurity.com are not shown (CONTENT-TODO.md).

## Code-rendered Demo

One `MxdrConsole` window on `/services/mxdr` ("Follow a detection to containment"), never in a hero and not on the homepage. Same rules as aetas.ai: "Simulated" label and caption, reserved example domains and documentation IP ranges only, analyst approval before containment, advances only on screen, pause control, Previous/Next under reduced motion, no runtime `<style>` injection.

## Site Structure

| Route | Purpose |
|---|---|
| `/` | Overview and conversion: hero with radar, partner strip, the three services, "Why Aetas Security", how engagements start, FAQ, CTA |
| `/services` | Hub: Detection and response, Offensive Security (`#offensive-security`), "Which service fits?" |
| `/services/mxdr` | Managed Extended Detection and Response (MXDR), with the simulated demo |
| `/services/network-security-testing` | Network Security Testing |
| `/services/application-security-testing` | Application Security Testing (Pen Testing) |
| `/about` | Practice-of-AGI statement, Expert in the Loop (`#expert-in-the-loop`), principles, engagement model, partners, AGI links |
| `/partners` | The 7 approved partners and the MSP programme |
| `/contact` | Secure form, booking link, email, phone, what happens next; `?service=mxdr|network-testing|application-testing|msp-partnership|general` preselects the picker |
| `/contact/thanks` | `noindex` confirmation, excluded from the sitemap |
| `/legal/privacy`, `/legal/terms`, 404 | Legal pages and the branded `noindex` 404 |

Each service page follows one template (`ServicePage.astro`): hero with breadcrumbs and a service-specific CTA (MXDR: Request a demo; testing: Scope a test, linking to `/contact?service=…`), what it covers, how it works, expert oversight and what you receive, the demo (MXDR only), FAQ, related services, and a closing CTA. Add a service by adding an entry to `services` in `src/data/services.ts` (and its form value to the contact schema), never by copying a page. The five unconfirmed services get pages only after Sir Rob confirms them.

## Routes and Redirects

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

## Contact form

The contact form uses the aetas.ai secure pipeline: zod schema (`src/lib/server/forms.ts`, fields first name, last name, work email, company, service, message), same-origin checks, signed CSRF sessions, a honeypot and timing check, an eight-per-ten-minute rate limit per IP, HTML-escaped notifications, and Resend delivery (or the mutually exclusive HTTPS webhook). The middleware keeps `/api` responses `no-store`, same-origin, and `noindex`.

**Sending is off** (`FORM_DELIVERY_ENABLED` defaults to false). Until it is enabled, `/api/forms/csrf` answers 503 and the form shows: "The online form is not available yet. Email info@aetassecurity.com or use Request a demo to book a time…". Visitors are never left with a silent failure.

To activate (after Sir Rob's approval):

1. Create the company Resend account and verify the `notify.aetassecurity.com` sending domain (its DNS records are added alongside the DNS move; keep the existing email records untouched).
2. Create a sending-only API key restricted to that domain.
3. In the Hostinger Node app environment, set `FORM_DELIVERY_ENABLED=true`, `FORM_CSRF_SECRET` (32+ random bytes), `RESEND_API_KEY`, `FORM_SENDER_EMAIL=forms@notify.aetassecurity.com`, and `CONTACT_RECIPIENT_EMAIL=info@aetassecurity.com`. Leave the webhook settings unset. `npm start` refuses to start with an incomplete configuration.
4. Redeploy, submit a test request, and confirm it arrives with the visitor as Reply-To.

`.env.example` lists the variables. The aetas.ai `EMAIL-SETUP.md` has the detailed Resend walkthrough. `node scripts/check-form-security.mjs` (after `npm run build`) exercises the built backend with a mocked Resend and sends no email.

## Known Gaps

1. All `[CONFIRM]` items in `CONTENT-TODO.md`. The logo (`public/logo.png`, `public/icon.png`) is final.
2. Legal review of the Privacy Policy and Terms & Conditions.
3. Activate form delivery (see "Contact form").
4. A browser check for CSP violations against the production build over HTTPS (local checks used the dev server).
5. Analytics and consent, once the business chooses a platform.
6. Trust content that needs approval before it can be shown: case studies (client approval), certifications or compliance frameworks, an insights hub, and the five extra services.

## Required Change Workflow

1. Read this file and the relevant source before changing positioning, services, partners, routes, or shared functionality.
2. Keep edits scoped; do not add services, claims, partners, metrics, or dependencies that were not approved.
3. Test at 390 px, 768 px, 1280×720, 1366×768, 1536×864, and 1920×1080. On small laptops the hero and its main CTA must be visible without scrolling.
4. Run `npm test`, `npm run build`, and `git diff --check` before handoff.
5. Update this file, README.md, and CLAUDE.md when positioning, routes, architecture, or deployment change.
