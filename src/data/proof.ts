/**
 * Proof content: metrics, threat statistics, customer logos, testimonials,
 * case studies, recognitions, the pricing note, and the announcement bar.
 *
 * Every list is empty until real, approved content exists (CONTENT-TODO.md,
 * rows 16 to 28). Empty lists render labelled slots in placeholder mode
 * (src/data/site-flags.ts) and nothing on the live site. Never fill these
 * with invented or illustrative figures, names, or quotes.
 */

export interface Stat {
  /** The figure as displayed, e.g. "120+". */
  value: string;
  label: string;
  /** How the figure is measured (shown as a footnote), e.g. "Engagements delivered since 2023". */
  definition?: string;
  /** Citation for third-party statistics. */
  source?: { label: string; href?: string };
}

export interface CustomerLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface CaseStudy {
  title: string;
  /** Sector or organization type, e.g. "Regional healthcare provider". */
  client: string;
  summary: string;
  outcome: string;
  href?: string;
}

export interface Recognition {
  /** Certification, compliance framework, or award name. */
  name: string;
  detail: string;
}

/** Practice metrics for the homepage stat band (CONTENT-TODO.md #16). */
export const practiceStats: Stat[] = [];

/** Sourced third-party threat statistics for "Why it matters" (CONTENT-TODO.md #17). */
export const threatStats: Stat[] = [];

/** Customer logos, each with written permission (CONTENT-TODO.md #18). */
export const customerLogos: CustomerLogo[] = [];

/** Named testimonials, each with written permission (CONTENT-TODO.md #19). */
export const testimonials: Testimonial[] = [];

/** Case studies, each approved by the client (CONTENT-TODO.md #20). */
export const caseStudies: CaseStudy[] = [];

/** Certifications held, frameworks supported, awards (CONTENT-TODO.md #21). */
export const recognitions: Recognition[] = [];

/** How engagements are priced, in plain words (CONTENT-TODO.md #22). */
export const pricingNote: string | undefined = undefined;

/** Optional site-wide announcement above the header (CONTENT-TODO.md #27). */
export const announcement: { text: string; href: string; label: string } | undefined = undefined;
