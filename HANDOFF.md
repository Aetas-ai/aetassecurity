# Aetas Security Website Handoff

Last updated: October 23, 2026 (reference-site rebuild: Incident Response page and breach entry point, homepage restructure, Resources hub, proof sections in placeholder mode; Heimdal/Layers-style hero with particle globe, typed taglines, brighter glow, and scroll entrances)

This is the primary implementation and positioning reference for developers and coding assistants working on the Aetas Security website (www.aetassecurity.com). It is a sibling of the aetas.ai website (github.com/Aetas-ai/Aetas): same stack, security build, and writing rules, with its own visual identity.

## Company Positioning

**Aetas Security** is the cybersecurity practice of **Aetas Global Innovation (AGI)**. The site says this once, in the About hero ("Aetas Security, the cybersecurity practice of Aetas Global Innovation"), and in the shared footer line "Part of Aetas Global Innovation · aetas.ai" (linking https://aetas.ai).

- Do not describe AGI as a holding company or invent any group structure (no parent-organization structured data either).
- Cross-link to https://aetas.ai/security and https://www.aetasglobal.com where relevant ("Explore Aetas Global" is the approved name).
- aetas.ai's Cybersecurity page links to https://www.aetassecurity.com/, so the root URL is the real homepage. Never reintroduce a gateway ("Enter") page.

Services:

- **Managed Extended Detection and Response (MXDR)**: Monitor, Investigate, Respond, Document.
- **Incident Response**: the old site's "proactive incident response", now its own page and the target of the "Experienced a breach?" link.
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
- When unsure, add a `[CONFIRM]` placeholder in code and track it in `CONTENT-TODO.md`. Unconfirmed items stay unpublished on the live site.
- **Placeholder mode.** Proof sections (metrics, threat statistics, customer logos, testimonials, case studies, recognitions, pricing note, announcement) and draft resources render as dashed, labelled slots (`ContentSlot.astro`, "Placeholder · CONTENT-TODO #n") so the team can see what goes where. Placeholder mode is on in `astro dev` and off in production builds unless `PUBLIC_SHOW_PLACEHOLDERS=true` (staging only; `src/data/site-flags.ts`). The build fails if placeholder markup (`data-placeholder`) appears while the switch is off. Slots never hold invented figures, names, or quotes.

## Technical Stack

Matches aetas.ai: Astro 7 (prerendered pages, Node adapter), React 19 islands via `@astrojs/react`, Tailwind CSS 4 via `@tailwindcss/vite`, `@fontsource-variable/inter` plus `@fontsource-variable/saira` for headings, `lucide-react`, `@astrojs/sitemap`, `zod` (the contact form schema), Astro content collections for Resources, Node >= 22.23.4 (required by Astro 7.4). Not Next.js. No animation library; CSS keyframes only. Tests use Node's built-in test runner.

## What Was Copied From aetas.ai, and What Was Left Out

Copied and adapted (then restyled; see Design System): `global.css`, `product-ui.css`, `Layout.astro` (SEO, structured data, ClientRouter, `data-motion` pausing), `Button`, `SectionHeading`, `PageHero` (plus a `primaryExternal` prop for the booking link), `Breadcrumbs`, `Faq`, `ServiceFaqSection`, `ServiceIcon`, `PartnerLogo`, `SiteHeader`, `MobileNav`, `SiteFooter`, `site-nav.ts`, `demo-runtime.tsx`, `MxdrConsole.tsx`, the MXDR part of `demos.ts`, the security-header build scripts, the secure Node entry, and the OG image generator.

Left out (not used by this site): the scroll-reveal system, Bob and the loading overlay, the AGI network graph, the advisor quiz and responsibility selector, the Work/Resources/Brief/About/Careers pages, the AI and service-desk demos, `middleware.ts`, and the form pipeline (Phase 2). Their CSS was removed too.

## Important Files

- `src/data/navigation.ts`: header, mobile, and footer links (Services menu, About, Partners, Contact), contact details (phone, email, booking URL), social links. The Services menu has three columns (Detection and response, Offensive Security, Compliance and co-management); every item opens its own service page or its card on the hub (`/services#<id>`, ids from `capabilities`), and the card is highlighted on arrival. Keep menu items pointing only at pages or hub cards.
- `src/data/services.ts`: `services`, the content of each service page (hero, CTA, coverage, steps, oversight, deliverables, FAQs, related, optional `urgent` band and `stats`); `capabilities`, the four remaining additional services from the old site (shown by `CapabilitiesSection.astro` on the services hub); and `outcomes`, the homepage grouping of every service by outcome.
- `src/data/approach.ts`: homepage pillars, "Why it matters" copy, Expert in the Loop steps and governance points, principles, engagement steps, and the contact page's "what happens next".
- `src/data/proof.ts`: metrics, threat statistics, customer logos, testimonials, case studies, recognitions, pricing note, and announcement, all empty until approved. `src/data/site-flags.ts`: the placeholder switch.
- `src/components/ContentSlot.astro`, `StatBand.astro`, `LogoWall.astro`, `CustomerStories.astro`, `RecognitionStrip.astro`, `AnnouncementBar.astro`: the proof sections; each renders real entries, slots in placeholder mode, or nothing.
- `src/content.config.ts`, `src/content/resources/*.md`, `src/data/resources.ts`, `ResourceCard.astro`, `src/pages/resources/`: the Resources hub (advisories, blog, guides). Front matter: title, description, type, date, services, author, draft.
- `src/data/service-faqs.ts`: homepage FAQs.
- `src/data/partner-logos.ts`: the 7 approved cybersecurity partners (same as aetas.ai), plus `partnerPortalUrl`.
- `src/data/demos.ts`: simulated MXDR data.
- `src/components/ServicePage.astro`: the shared service page template, rendered by `src/pages/services/[slug].astro` with `Service` structured data.
- `src/components/HomeHero.astro`: the homepage hero (headline with its last line in the accent, typed taglines, lede, CTAs, the breach link, `HeroGlobe` on the right, and a strip linking the four service pages).
- `src/components/HeroGlobe.astro` + `src/scripts/hero-globe.ts` (math in `src/scripts/hero-globe-math.ts`, tested): the canvas particle globe with `ShieldMark` at its centre and the Detected → Analyst approval → Contained cycle; pointer tilt on fine pointers.
- `src/components/HeroAtmosphere.astro`: hero glow, concentric rings, and drifting particles (`full` on the homepage, `soft` in `PageHero`).
- `src/scripts/hero-taglines.ts` (`heroTaglines` in `src/data/approach.ts`) and `src/scripts/reveal.ts` (scroll entrances), initialised and torn down in `Layout.astro` on `astro:page-load` / `astro:before-preparation`.
- `src/components/ServiceDiagram.astro`: the process diagram in each service page hero (`diagram` in `src/data/services.ts`); the services hub hero shows the services as linked tiles.
- `src/components/ThreatRadar.astro`: the radar, now beside Expert in the Loop on About.
- `src/components/PartnerMarquee.astro`: the partner strip.
- `src/pages/index.astro` (overview and conversion), `services/index.astro` (hub), `resources/index.astro` and `resources/[slug].astro`, `about.astro`, `partners.astro`, `contact.astro`, `contact/thanks.astro`, `legal/*`, `404.astro`.
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
- **Heroes:** after the Heimdal reference, the homepage hero is split: the headline slides in on the left with taglines that type, hold, and erase (approved wording only, `heroTaglines`), then the lede, CTAs, and breach link; on the right a code-drawn particle globe (`HeroGlobe`) carries the shield from the logo (`ShieldMark.astro`, which still draws itself once) at its centre. Every few seconds a detection appears on the globe ("Detected"), an arc carries it to the shield ("Analyst approval"), and only then does it turn "Contained". The globe grows in, tilts toward the pointer (not on touch devices), and sits on `HeroAtmosphere` (royal-blue and cyan glow, concentric rings, drifting particles). Never a fake dashboard or product screenshot. Service page heroes show the process as a diagram (`ServiceDiagram.astro`) with a highlighted gate (MXDR: analyst approval; testing: rules of engagement agreed) and a signal travelling down the chain; the hub hero shows the services as linked tiles.
- **Motion:** each page has one main moment: the globe on the homepage, the diagram signal on service pages, and the `ThreatRadar` beside Expert in the Loop on About (Detected, then Analyst review, then Contained after approval). Hero atmospheres, the partner marquee, and the demo are ambient. Below-the-fold headings, cards, steps, stats, and FAQ rows fade and rise in once as they scroll into view (`reveal.ts`, 60 ms stagger); content already on screen is never hidden, and nothing is hidden without JavaScript. All infinite motion pauses off-screen (`data-motion`); under reduced motion everything is static (one globe frame, the first tagline, no entrances; the marquee becomes a wrapped row and the demo uses Previous/Next).
- **Background:** brighter royal-blue and cyan glow (`--glow-blue`, `--glow-cyan`, backgrounds only, never under text contrast) plus a faint "monitored network" map. Inner page heroes layer `HeroAtmosphere variant="soft"` under `NetworkBackdrop.astro` (inline SVG, masked away from the text column; a few nodes pulse, and where the hero has no diagram a short signal travels one path in the logo gradient). The homepage hero uses `HeroAtmosphere` in full. Section bands (`.agi-band`) carry a royal-blue glow from alternating edges and the static tile `public/backdrop/network-tile.svg`, faded toward the centre. Legal pages and long text sit on plain navy. Never put the map behind body text; it pauses off-screen and is static under reduced motion.
- **Patterns from the reference sites** (Arctic Wolf, Huntress, CrowdStrike; `src/styles/sections.css`): a utility row above the main header on large screens ("Experienced a breach?", phone, email; `--site-utility-height`, included in `--site-header-height`); an optional announcement bar at the top of the page; large stat numerals (Saira at weight 300, the only place below 600, in `--color-accent-text`) with numbered definition and source footnotes; numbered value cards (`01`–`04`, mono); outcome columns with arrow link lists; a hairline governance grid under Expert in the Loop; an urgent contact band on Incident Response; and dashed, hatched content slots for unapproved content. Status hues appear only in the radar, the demo chips, and the hero globe chips (always with a text label); never on the breach link.
- `accent-ai|security|global|governance` remain aliases of the accent so copied markup keeps working.

## Partners

The Partners page and the homepage strip show the 7 cybersecurity partners approved on aetas.ai: SentinelOne, CrowdStrike, Zscaler, Qualys, Proofpoint, Abnormal, and Sublime Security (`src/data/partner-logos.ts`, artwork in `public/partners/`). Keep the list in sync with aetas.ai. Partners from the previous aetassecurity.com are not shown (CONTENT-TODO.md).

## Code-rendered Demo

One `MxdrConsole` window on `/services/mxdr` ("Follow a detection to containment"), never in a hero and not on the homepage. Same rules as aetas.ai: "Simulated" label and caption, reserved example domains and documentation IP ranges only, analyst approval before containment, advances only on screen, pause control, Previous/Next under reduced motion, no runtime `<style>` injection.

## Site Structure

| Route | Purpose |
|---|---|
| `/` | Overview and conversion: shield hero with the breach link and service strip, partner strip, practice metrics, "Why it matters" (threat statistics), "Why Aetas Security" value cards, services by outcome, Expert in the Loop with governance points, customer logos, testimonials and case studies, certifications, how engagements start (and pricing note), FAQ, latest resources, CTA |
| `/services` | Hub: Detection and response, Offensive Security (`#offensive-security`), the additional services (`#more-services`), "Which service fits?" |
| `/services/mxdr` | Managed Extended Detection and Response (MXDR), with the simulated demo |
| `/services/incident-response` | Incident Response, with the "Under attack right now?" phone and email band; target of every "Experienced a breach?" link |
| `/services/network-security-testing` | Network Security Testing |
| `/services/application-security-testing` | Application Security Testing (Pen Testing) |
| `/resources`, `/resources/<id>` | Resources hub (advisories, blog, guides) and article pages with `Article` structured data; drafts only in placeholder mode |
| `/about` | Practice-of-AGI statement, Expert in the Loop (`#expert-in-the-loop`) with the threat radar, principles, engagement model, partners, AGI links |
| `/partners` | The 7 approved partners and the MSP programme |
| `/contact` | Secure form, booking link, email, phone, what happens next; `?service=mxdr|incident-response|network-testing|application-testing|msp-partnership|general` preselects the picker |
| `/contact/thanks` | `noindex` confirmation, excluded from the sitemap |
| `/legal/privacy`, `/legal/terms`, 404 | Legal pages and the branded `noindex` 404 |

Each service page follows one template (`ServicePage.astro`): hero with breadcrumbs and a service-specific CTA (MXDR: Request a demo; Incident Response: Get help now; testing: Scope a test, linking to `/contact?service=…`), the urgent contact band (Incident Response), service metrics, what it covers, how it works, expert oversight and what you receive, the demo (MXDR only), case studies, FAQ, related resources, related services, and a closing CTA. Add a service by adding an entry to `services` in `src/data/services.ts` (and its form value to the contact schema), never by copying a page. The four remaining additional services from the old site (around-the-clock threat monitoring and response, SOC, regulatory compliance assistance, co-management of security controls) are listed, as the old site did, in a card section on the hub and linked from the homepage outcome columns; they do not have their own pages. Proactive incident response became the Incident Response page.

To publish a resource, add a Markdown file to `src/content/resources/` (see `advisory-template.md`) with `draft: false`. List service slugs in `services` to show it under "Related resources" on those service pages.

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
6. Proof content for the placeholder slots (CONTENT-TODO.md rows 16 to 28): metrics, threat statistics, customer logos, testimonials, case studies, certifications, pricing note, the incident line and hours, the AI-and-data answer, and the first Resources posts.
7. Industry and threat solution pages (by sector; ransomware, BEC, compliance), deferred until the served industries are confirmed.

## Required Change Workflow

1. Read this file and the relevant source before changing positioning, services, partners, routes, or shared functionality.
2. Keep edits scoped; do not add services, claims, partners, metrics, or dependencies that were not approved.
3. Test at 390 px, 768 px, 1280×720, 1366×768, 1536×864, and 1920×1080. On small laptops the hero and its main CTA must be visible without scrolling.
4. Run `npm test`, `npm run build`, and `git diff --check` before handoff.
5. Update this file, README.md, and CLAUDE.md when positioning, routes, architecture, or deployment change.
