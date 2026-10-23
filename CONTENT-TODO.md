# Content To Confirm

Items to confirm with Sir Rob before launch. Unconfirmed items stay unpublished: flip the flag (or fill the value) in the named file once approved.

Rows 16 to 29 are the proof and marketing sections added from the Arctic Wolf / Huntress / CrowdStrike review. In placeholder mode (`PUBLIC_SHOW_PLACEHOLDERS=true` in `.env` for dev, or a staging build) each one shows as a dashed slot labelled with its row number; on the live site an empty slot renders nothing. Fill the named data with real, approved content only.

| # | Item | Where | Current state |
|---|---|---|---|
| 1 | Partners from the old site (Vulcan, Microsoft, Halcyon, Aetas Global, AWS, OnDefend, Synopsys, Lightstream, Google Cloud): add any of them? The site shows the 7 cybersecurity partners approved on aetas.ai. | `src/data/partner-logos.ts` | not shown |
| 2 | Aetas Global link: `https://www.aetasglobal.com/` (used) or `https://www.aetas-global.com/` (old site) | `src/pages/index.astro` | aetasglobal.com |
| 3 | **Partner Portal URL** (old site: `https://aetassecurity.partnerportal.io`) | `src/data/partner-logos.ts` `partnerPortalUrl` | unset; button hidden |
| 4 | **Booking URL**: `https://outlook.office365.com/owa/calendar/ScheduleaDemo@aetassecurity.com/bookings/` | `src/data/navigation.ts` | in use (from the old site) |
| 5 | Social links: LinkedIn, Facebook | `src/data/navigation.ts` | in use (from the old site) |
| 6 | Legal sign-off: Privacy Policy and Terms & Conditions (the old site's links returned 404) | `src/pages/legal/*` | new draft text |
| 7 | "Decades of industry expertise" claim from the old site | — | not used |
| 8 | New copy review: Expert in the Loop section, radar legend, MSP programme section, FAQ "Does AI act on its own?" | `src/data/approach.ts`, `src/components/ThreatRadar.astro`, `src/pages/partners.astro`, `src/data/service-faqs.ts` | drafted from approved positioning |
| 9 | **Service page copy**: hero titles, "what it covers", "how it works" for the two testing services, "expert oversight", "what you receive", and FAQs beyond the approved focus answers. Check especially: MXDR coverage (endpoints, identity, email, network, cloud environments), the testing process (scope, discovery, testing, reporting, findings review), and deliverables (executive summary, findings with evidence, remediation guidance, findings review session). | `src/data/services.ts` | drafted; live on the branch |
| 10 | Services hub "Which service fits?" rows and closing copy | `src/pages/services/index.astro` | drafted |
| 11 | Homepage "Why Aetas Security" pillars and the engagement steps wording | `src/data/approach.ts` | drafted / adapted from aetas.ai |
| 12 | About page: hero title, principles, engagement model | `src/pages/about.astro`, `src/data/approach.ts` | drafted / adapted from aetas.ai |
| 13 | Contact: "What happens next" steps and the thank-you page text (no response-time promise is made) | `src/data/approach.ts`, `src/pages/contact/thanks.astro` | drafted |
| 14 | **Form delivery activation**: approve sending, the recipient `info@aetassecurity.com`, the sender `forms@notify.aetassecurity.com`, and the Resend account | Hostinger environment, DNS | sending off; form shows the email/booking fallback |
| 15 | Trust content to add once approved: case studies (client approval), certifications or compliance frameworks, an insights hub | — | superseded by rows 16 to 26 |
| 16 | **Practice and service metrics**: real, dated figures with a definition each (engagements delivered, years in practice, a measured median time) | `src/data/proof.ts` `practiceStats`; `stats` per service in `src/data/services.ts` | empty; slots in placeholder mode |
| 17 | **Threat statistics** for "Why it matters": figures from named public reports, with year and link | `src/data/proof.ts` `threatStats` | empty; the copy shows alone on the live site |
| 18 | **Customer logos**, each with written permission | `src/data/proof.ts` `customerLogos`, artwork in `public/` | empty |
| 19 | **Testimonials**: quote, name, role, company, with written permission | `src/data/proof.ts` `testimonials` | empty |
| 20 | **Case studies**, approved by each client | `src/data/proof.ts` `caseStudies` | empty |
| 21 | **Certifications held, frameworks supported, awards** | `src/data/proof.ts` `recognitions` | empty |
| 22 | **How engagements are priced**: a plain-language note (no figures unless approved) | `src/data/proof.ts` `pricingNote`; slot on the homepage | unset |
| 23 | **Incident line and hours**: is the phone line staffed for incidents, and when? No 24/7 or response-time claim until confirmed | `src/components/ServicePage.astro` urgent band, `src/data/navigation.ts` | uses the main phone and email |
| 24 | **AI and customer data**: is customer data used to train AI models, and where is it processed? | homepage Expert in the Loop slot (`src/pages/index.astro`) | slot only |
| 25 | **Incident Response page copy**: hero, coverage (ransomware, BEC, compromised accounts, malware, cloud, preparation), steps, deliverables, FAQs; confirm IR is offered beyond MXDR customers | `src/data/services.ts` (`incident-response`) | drafted; live on the branch |
| 26 | **First Resources posts**: advisories, blog posts, guides; replace or keep the `advisory-template` draft | `src/content/resources/` | none published; hub shows an empty state |
| 27 | **Announcement bar**: one line and a link | `src/data/proof.ts` `announcement` | unset |
| 28 | **New homepage copy**: "Why it matters", the outcome grouping (Detect and respond / Find weaknesses first / Stay compliant and in control), the Expert in the Loop governance points, the two new FAQs, "Experienced a breach?" wording | `src/data/approach.ts`, `src/data/services.ts` `outcomes`, `src/data/service-faqs.ts` | drafted |
| 29 | **Hero taglines**: the four rotating lines reuse approved wording (MXDR steps, Expert in the Loop, analyst approval, the testing services); approve any new lines before adding them | `src/data/approach.ts` `heroTaglines` | live on the branch |
| 30 | **Platform diagram labels**: the core bar ("Expert in the Loop": Human Led AI, Analyst approval before containment, Every action documented) and the base bar ("Your environment": Endpoints, Identity, Email, Network, Cloud environments) | `src/components/PlatformDiagram.astro` | drafted from approved positioning and the MXDR coverage list |

Dropped from the old site: the "Enter" gateway page, cart, broken newsletter form, "Travel Policy" and "Attributions" footer links, and the copy "Automated, Human-led AI-powered systems identify and neutralize threats in real time" (implied autonomous AI).

Resolved: the logo files in `public/` are final; partners are the 7 approved on aetas.ai; the additional services from the old site (around-the-clock threat monitoring and response, SOC, regulatory compliance assistance, co-management of security controls) are listed on the services hub with the old site's wording and linked from the homepage outcome columns; proactive incident response now has its own page, which reuses the old site's line "When threats are detected, we respond, so you never face an attack alone."

Deliberately not adopted from the reference sites: competitor comparison pages (CrowdStrike is a partner), free trials and per-unit price lists (project-based services), breach warranties, and scale claims such as customer counts, telemetry volumes, or analyst-report placements.
