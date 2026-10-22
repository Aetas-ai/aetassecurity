# Content To Confirm

Items to confirm with Sir Rob before launch. Unconfirmed items stay unpublished: flip the flag (or fill the value) in the named file once approved.

| # | Item | Where | Current state |
|---|---|---|---|
| 1 | **24/7 threat monitoring and response** | `src/data/services.ts` | `confirmed: false` (hidden) |
| 2 | **Proactive incident response** | `src/data/services.ts` | `confirmed: false` (hidden) |
| 3 | **SOC** (expert-led monitoring and incident handling) | `src/data/services.ts` | `confirmed: false` (hidden) |
| 4 | **Regulatory compliance assistance** | `src/data/services.ts` | `confirmed: false` (hidden) |
| 5 | **Co-management of security controls** | `src/data/services.ts` | `confirmed: false` (hidden) |
| 6 | **Partner list and logo approval**: Qualys, Vulcan, Microsoft, Halcyon, Aetas Global, AWS, OnDefend, SentinelOne, Abnormal, Synopsys, Lightstream, Zscaler, Google Cloud | `src/data/partner-logos.ts` | all `approved: false`; the grid is hidden until at least one is approved |
| 7 | Is Vulcan still a current partner (Vulcan Cyber was acquired by Tenable)? | `src/data/partner-logos.ts` | listed, unapproved |
| 8 | Synopsys has no link on the old site; should it link anywhere? | `src/data/partner-logos.ts` | no website |
| 9 | Aetas Global link: `https://www.aetasglobal.com/` (used) or `https://www.aetas-global.com/` (old site) | `src/data/partner-logos.ts`, `src/pages/index.astro` | aetasglobal.com |
| 10 | Logo artwork for partners without files (Vulcan, Halcyon, Aetas Global, OnDefend, Synopsys, Lightstream) | `public/partners/` | render as text names if approved |
| 11 | **Partner Portal URL** (old site: `https://aetassecurity.partnerportal.io`) | `src/data/partner-logos.ts` `partnerPortalUrl` | unset; button hidden |
| 12 | **Booking URL**: `https://outlook.office365.com/owa/calendar/ScheduleaDemo@aetassecurity.com/bookings/` | `src/data/navigation.ts` | in use (from the old site) |
| 13 | **Official logo files** `AS-LOGO-RGB_HORIZONTAL-ALL_WHITE` and `ICON-WHITE` | `public/logo.png`, `public/icon.png`, then `npm run og:generate` | temporary versions generated from the colour master |
| 14 | Social links: LinkedIn, Facebook | `src/data/navigation.ts` | in use (from the old site) |
| 15 | Legal sign-off: Privacy Policy and Terms & Conditions (the old site's links returned 404) | `src/pages/legal/*` | new draft text |
| 16 | "Decades of industry expertise" claim from the old site | — | not used |
| 17 | New copy review: Expert in the Loop section, MSP programme section, contact card text, FAQ "Does AI act on its own?" | `src/pages/index.astro`, `partners.astro`, `contact.astro`, `src/data/service-faqs.ts` | drafted from approved positioning |

Dropped from the old site: the "Enter" gateway page, cart, broken newsletter form, "Travel Policy" and "Attributions" footer links, and the copy "Automated, Human-led AI-powered systems identify and neutralize threats in real time" (implied autonomous AI).
