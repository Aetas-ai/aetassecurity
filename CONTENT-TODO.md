# Content To Confirm

Items to confirm with Sir Rob before launch. Unconfirmed items stay unpublished: flip the flag (or fill the value) in the named file once approved.

| # | Item | Where | Current state |
|---|---|---|---|
| 1 | **24/7 threat monitoring and response** | `src/data/services.ts` | `confirmed: false` (hidden) |
| 2 | **Proactive incident response** | `src/data/services.ts` | `confirmed: false` (hidden) |
| 3 | **SOC** (expert-led monitoring and incident handling) | `src/data/services.ts` | `confirmed: false` (hidden) |
| 4 | **Regulatory compliance assistance** | `src/data/services.ts` | `confirmed: false` (hidden) |
| 5 | **Co-management of security controls** | `src/data/services.ts` | `confirmed: false` (hidden) |
| 6 | Partners from the old site (Vulcan, Microsoft, Halcyon, Aetas Global, AWS, OnDefend, Synopsys, Lightstream, Google Cloud): add any of them? The site shows the 7 cybersecurity partners approved on aetas.ai. | `src/data/partner-logos.ts` | not shown |
| 7 | Aetas Global link: `https://www.aetasglobal.com/` (used) or `https://www.aetas-global.com/` (old site) | `src/pages/index.astro` | aetasglobal.com |
| 8 | **Partner Portal URL** (old site: `https://aetassecurity.partnerportal.io`) | `src/data/partner-logos.ts` `partnerPortalUrl` | unset; button hidden |
| 9 | **Booking URL**: `https://outlook.office365.com/owa/calendar/ScheduleaDemo@aetassecurity.com/bookings/` | `src/data/navigation.ts` | in use (from the old site) |
| 10 | Social links: LinkedIn, Facebook | `src/data/navigation.ts` | in use (from the old site) |
| 11 | Legal sign-off: Privacy Policy and Terms & Conditions (the old site's links returned 404) | `src/pages/legal/*` | new draft text |
| 12 | "Decades of industry expertise" claim from the old site | — | not used |
| 13 | New copy review: Expert in the Loop section, radar legend, MSP programme section, FAQ "Does AI act on its own?" | `src/data/approach.ts`, `src/components/ThreatRadar.astro`, `src/pages/partners.astro`, `src/data/service-faqs.ts` | drafted from approved positioning |
| 14 | **Service page copy**: hero titles, "what it covers", "how it works" for the two testing services, "expert oversight", "what you receive", and FAQs beyond the approved focus answers. Check especially: MXDR coverage (endpoints, identity, email, network, cloud environments), the testing process (scope, discovery, testing, reporting, findings review), and deliverables (executive summary, findings with evidence, remediation guidance, findings review session). | `src/data/services.ts` | drafted; live on the branch |
| 15 | Services hub "Which service fits?" rows and closing copy | `src/pages/services/index.astro` | drafted |
| 16 | Homepage "Why Aetas Security" pillars and the engagement steps wording | `src/data/approach.ts` | drafted / adapted from aetas.ai |
| 17 | About page: hero title, principles, engagement model | `src/pages/about.astro`, `src/data/approach.ts` | drafted / adapted from aetas.ai |
| 18 | Contact: "What happens next" steps and the thank-you page text (no response-time promise is made) | `src/data/approach.ts`, `src/pages/contact/thanks.astro` | drafted |
| 19 | **Form delivery activation**: approve sending, the recipient `info@aetassecurity.com`, the sender `forms@notify.aetassecurity.com`, and the Resend account | Hostinger environment, DNS | sending off; form shows the email/booking fallback |
| 20 | Trust content to add once approved: case studies (client approval), certifications or compliance frameworks, an insights hub | — | not shown |

Dropped from the old site: the "Enter" gateway page, cart, broken newsletter form, "Travel Policy" and "Attributions" footer links, and the copy "Automated, Human-led AI-powered systems identify and neutralize threats in real time" (implied autonomous AI).

Resolved: the logo files in `public/` are final; partners are the 7 approved on aetas.ai.
