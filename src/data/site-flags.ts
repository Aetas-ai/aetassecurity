/**
 * Placeholder mode. Proof sections (metrics, customer logos, testimonials,
 * case studies, recognitions) and draft resources show labelled slots so the
 * team can see what goes where before real, approved content exists.
 *
 * Off everywhere (dev included) unless PUBLIC_SHOW_PLACEHOLDERS=true, so
 * pages read as they will on the live site; turn it on in .env or for a
 * staging build to review the slots. The security-headers integration fails
 * a build that contains placeholder markup while the switch is off, so slots
 * can never reach the live site by accident.
 */
export const showPlaceholders = import.meta.env.PUBLIC_SHOW_PLACEHOLDERS === 'true';
