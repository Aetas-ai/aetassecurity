# Aetas Security Website

Astro website for **Aetas Security**, the cybersecurity practice of Aetas Global Innovation (AGI), served at `www.aetassecurity.com`. It is a sibling of the aetas.ai website (github.com/Aetas-ai/Aetas): same stack, security build, and writing rules, with its own visual identity.

The site presents:

- **Managed Extended Detection and Response (MXDR)**: Monitor, Investigate, Respond, Document.
- **Incident Response**: help during and before an incident; every "Experienced a breach?" link opens it.
- **Offensive Security**: Network Security Testing and Application Security Testing (Pen Testing).
- **Expert in the Loop**: Human Led AI with Expert Human Oversight of AI; analysts approve containment.

Read [HANDOFF.md](./HANDOFF.md) before changing positioning, services, partners, routes, or shared functionality. Open content questions live in [CONTENT-TODO.md](./CONTENT-TODO.md).

## Current Experience

- A homepage structured after Arctic Wolf, Huntress, and CrowdStrike: shield hero with a breach link and a strip linking the four service pages, partner strip, practice metrics, "Why it matters", numbered value cards, services grouped by outcome, Expert in the Loop with AI-governance points, customer proof, certifications, engagement steps, FAQ, latest resources, and a closing CTA
- A utility row above the header ("Experienced a breach?", phone, email) and an optional announcement bar
- Proof sections (metrics, threat statistics, logos, testimonials, case studies, recognitions) that show labelled placeholder slots in development and staging, and nothing on the live site until real content is approved
- One code-rendered, clearly simulated MXDR console (React island) on `/services/mxdr`
- A services hub and a dedicated page per service (MXDR, Incident Response, Network Security Testing, Application Security Testing), built from one template with Service and FAQ structured data
- A Resources hub (security advisories, blog, guides) from Markdown content collections, with `Article` structured data
- An About page: the practice-of-AGI statement, Expert in the Loop, principles, and the engagement model
- Partners page with the 7 approved cybersecurity partners and the MSP partner programme
- Contact page with the secure form (sending off until activated), demo booking link, email, phone, and what happens next
- Privacy Policy, Terms & Conditions, and a branded `noindex` 404
- Header with a keyboard-accessible Services disclosure menu and an accessible mobile sheet
- Canonical metadata, Organization/WebSite/WebPage structured data, per-page share images, robots.txt, and a generated sitemap
- Build-generated, SHA-256 hash-based Content Security Policy and security headers, applied by the secure Node entry and the generated `.htaccess`
- 301 redirects for the old Squarespace paths (`/home`, `/contactus`, `/cart`) and a fixed canonical redirect to `https://www.aetassecurity.com`

## Technical Stack

- Astro 7 with prerendered pages and the Node adapter (standalone)
- React 19 islands through `@astrojs/react`
- Tailwind CSS 4 through `@tailwindcss/vite`
- Self-hosted Saira (headings) and Inter (body) variable fonts via Fontsource
- Lucide React icons
- `@astrojs/sitemap`; `zod` for the contact form schema and the Resources content collection
- CSS keyframes, one canvas (the hero globe), and small bundled scripts for taglines and scroll entrances; no animation library
- Node's built-in test runner

## Project Structure

```text
src/
  components/        Astro components; demos/ holds the MXDR React island
  content/resources/ Resources hub articles (Markdown)
  data/              Navigation and contact details, services, proof content, placeholder switch, partners, FAQs, demo data
  layouts/           Shared layout, metadata, structured data, and scripts
  pages/             Astro routes
  scripts/           Header and mobile navigation behaviour
  styles/            Global Tailwind theme and product UI CSS
scripts/             Security-header build integration, secure Node entry, OG image generator
tests/               Security policy and server runtime tests
public/              Logo, icon, partner artwork, share images, robots.txt
```

## Visual System

Aetas Security's own "command center" identity; see HANDOFF.md "Design System" for the full token table.

- Navy surfaces `#050b16` / `#08111f` / `#0d1a2e` / `#13243d` with cyan-tinted hairlines; text `#e6f1f9`, muted `#8a9bb0`.
- One cyan UI accent `#3aaee0` (navy text on cyan buttons; never cyan text on light surfaces), `#8fd3f2` for accent text on navy. The logo's cyan-to-blue gradient appears only on the hero radar, the step pipeline line, and the header CTA edge.
- Saira headings (weight 600, solid colour), Inter body, system monospace only for demo data.
- Chamfered panels and buttons from the shield logo, drawn on `::before` so focus outlines stay visible; reticle corners frame the radar and the demo window; 2px radii.
- Sentence-case labels only where they name content; numbering only for real sequences.
- One main motion moment per page: the particle globe with the shield on the homepage (detections go Detected → Analyst approval → Contained; tilts toward the pointer), the diagram signal on service pages, and the threat radar on About. Typed hero taglines, hero atmospheres, the partner marquee, and the MXDR demo are the other motion, plus light scroll entrances below the fold. All infinite motion pauses off-screen, and everything respects `prefers-reduced-motion`.
- Brighter royal-blue and cyan glow in heroes and bands (after the Heimdal reference), a faint network-map background in inner page heroes (`NetworkBackdrop.astro`), a static tile on section bands, plain navy behind long text.
- Code-built visuals only. No stock or AI-generated imagery; at most one "Simulated" demo window per page, never in the hero.

## Routes

- `/`, `/services`, `/services/mxdr`, `/services/incident-response`, `/services/network-security-testing`, `/services/application-security-testing`
- `/resources`, `/resources/<id>`
- `/about`, `/partners`, `/contact`, `/contact/thanks` (noindex)
- `/legal/privacy`, `/legal/terms`, 404 (branded, `noindex`, excluded from the sitemap)
- `/api/forms/csrf`, `/api/forms/contact` (on-demand)

## Commands

Requires Node.js 22.23.4 or newer (Astro 7.4).

```sh
npm ci
npm run dev
npm test
npm run build
npm start          # runs dist/server/entry.mjs after a build
npm run og:generate  # on Linux: BROWSER_PATH=/usr/bin/google-chrome npm run og:generate
node scripts/check-form-security.mjs   # mocked form checks against the build
PUBLIC_SHOW_PLACEHOLDERS=true npm run build   # staging build with placeholder slots
```

`npm run build` runs the test suite before the Astro build. Placeholder slots appear in `npm run dev`; a production build fails if any reach it. Run `git diff --check` alongside the production build before handoff.
