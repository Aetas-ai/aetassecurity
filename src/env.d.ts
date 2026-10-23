interface ImportMetaEnv {
  /** "true" shows content placeholders in a production build (src/data/site-flags.ts). */
  readonly PUBLIC_SHOW_PLACEHOLDERS?: string;
}

declare namespace App {
  interface Locals {
    /** Set by src/middleware.ts for /api requests; matches the X-Request-ID header. */
    requestId?: string;
  }
}
