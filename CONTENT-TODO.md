# Content To Confirm

Items to confirm with Sir Rob before launch. Unconfirmed items stay unpublished: flip the flag (or fill the value) in the named file once approved.

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
| 15 | Trust content to add once approved: case studies (client approval), certifications or compliance frameworks, an insights hub | — | not shown |

Dropped from the old site: the "Enter" gateway page, cart, broken newsletter form, "Travel Policy" and "Attributions" footer links, and the copy "Automated, Human-led AI-powered systems identify and neutralize threats in real time" (implied autonomous AI).

Resolved: the logo files in `public/` are final; partners are the 7 approved on aetas.ai; the five additional services from the old site (around-the-clock threat monitoring and response, proactive incident response, SOC, regulatory compliance assistance, co-management of security controls) are listed on the homepage and services hub with the old site's wording.
