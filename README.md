# Aetas Security Website

Astro website for **Aetas Security**, the cybersecurity practice of Aetas Global Innovation (AGI), served at `www.aetassecurity.com`. It is a sibling of the aetas.ai website (github.com/Aetas-ai/Aetas): same stack, security build, and writing rules, with its own visual identity.

The site presents:

- **Managed Extended Detection and Response (MXDR)**: Monitor, Investigate, Respond, Document.
- **Offensive Security**: Network Security Testing and Application Security Testing (Pen Testing).
- **Expert in the Loop**: Human Led AI with Expert Human Oversight of AI; analysts approve containment.

Read [HANDOFF.md](./HANDOFF.md) before changing positioning, services, partners, routes, or shared functionality. Open content questions live in [CONTENT-TODO.md](./CONTENT-TODO.md).

## Current Experience

- Split hero with the approved headline, booking-link CTA, and an animated threat radar that acts out analyst-approved containment
- A strip of the 7 approved cybersecurity partner logos under the hero
- MXDR and Offensive Security service cards, the Expert in the Loop step strip, an FAQ with `FAQPage` structured data, and an AGI cross-link band
- One code-rendered, clearly simulated MXDR console (React island) below the hero
- A services hub and a dedicated page per service (MXDR, Network Security Testing, Application Security Testing), built from one template with Service and FAQ structured data
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

Aetas Security's own "command center" identity; see HANDOFF.md "Design System" for the full token table.

- Navy surfaces `#050b16` / `#08111f` / `#0d1a2e` / `#13243d` with cyan-tinted hairlines; text `#e6f1f9`, muted `#8a9bb0`.
- One cyan UI accent `#3aaee0` (navy text on cyan buttons; never cyan text on light surfaces), `#8fd3f2` for accent text on navy. The logo's cyan-to-blue gradient appears only on the hero radar, the step pipeline line, and the header CTA edge.
- Saira headings (weight 600, solid colour), Inter body, system monospace only for demo data.
- Chamfered panels and buttons from the shield logo, drawn on `::before` so focus outlines stay visible; reticle corners frame the radar and the demo window; 2px radii.
- Sentence-case labels only where they name content; numbering only for real sequences.
- One orchestrated motion moment: the hero threat radar (Detected, then Analyst review, then Contained after approval). The partner marquee and the MXDR demo are the only other motion; all pause off-screen and respect `prefers-reduced-motion`. No scroll reveals.
- A faint network-map background: animated lightly in page heroes (`NetworkBackdrop.astro`), a static tile on section bands, plain navy behind long text.
- Code-built visuals only. No stock or AI-generated imagery; at most one "Simulated" demo window per page, never in the hero.

## Routes

- `/`, `/services`, `/services/mxdr`, `/services/network-security-testing`, `/services/application-security-testing`
- `/about`, `/partners`, `/contact`, `/contact/thanks` (noindex)
- `/legal/privacy`, `/legal/terms`, 404 (branded, `noindex`, excluded from the sitemap)
- `/api/forms/csrf`, `/api/forms/contact` (on-demand)

## Commands

```sh
npm install
npm run dev
npm test
npm run build
npm start          # runs dist/server/entry.mjs after a build
npm run og:generate
node scripts/check-form-security.mjs   # mocked form checks against the build
```

`npm run build` runs the test suite before the Astro build. Run `git diff --check` alongside the production build before handoff.
