/**
 * Placeholder mode. Proof sections (metrics, customer logos, testimonials,
 * case studies, recognitions) and draft resources show labelled slots so the
 * team can see what goes where before real, approved content exists.
 *
 * On in `astro dev`; off in production builds unless
 * PUBLIC_SHOW_PLACEHOLDERS=true (a staging build). The security-headers
 * integration fails a build that contains placeholder markup while the
 * switch is off, so slots can never reach the live site by accident.
 */
const setting = import.meta.env.PUBLIC_SHOW_PLACEHOLDERS;

export const showPlaceholders = setting === 'true' || (import.meta.env.DEV && setting !== 'false');
