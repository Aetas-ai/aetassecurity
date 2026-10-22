export const CANONICAL_ORIGIN = 'https://www.aetassecurity.com';
export const CANONICAL_HOST = new URL(CANONICAL_ORIGIN).host;

// Legacy Squarespace paths, answered with a 301 by both the Node listener
// (server-runtime.mjs) and the generated .htaccess. Keys must start with "/".
export const REDIRECTS = {
  '/home': '/',
  '/contactus': '/contact',
  '/cart': '/',
};

export function legacyRedirect(pathname) {
  const key = pathname.replace(/\/+$/, '') || '/';
  return Object.hasOwn(REDIRECTS, key) ? REDIRECTS[key] : undefined;
}

export const PERMISSIONS_POLICY = [
  'accelerometer=()',
  'autoplay=(self)',
  'camera=()',
  'display-capture=()',
  'encrypted-media=()',
  'fullscreen=(self)',
  'geolocation=()',
  'gyroscope=()',
  'magnetometer=()',
  'microphone=()',
  'midi=()',
  'payment=()',
  'picture-in-picture=(self)',
  'publickey-credentials-get=()',
  'screen-wake-lock=()',
  'usb=()',
  'web-share=(self)',
  'xr-spatial-tracking=()',
].join(', ');

export function createContentSecurityPolicy(scriptHashes, styleHashes) {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `script-src 'self' ${scriptHashes.join(' ')}`.trim(),
    "script-src-attr 'none'",
    `style-src 'self' ${styleHashes.join(' ')}`.trim(),
    "style-src-attr 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "worker-src 'self'",
    "media-src 'self'",
    "frame-src 'none'",
    "manifest-src 'self'",
    'upgrade-insecure-requests',
  ];

  return directives.join('; ');
}

export function createSecurityHeaders(contentSecurityPolicy) {
  return {
    'Content-Security-Policy': contentSecurityPolicy,
    'Strict-Transport-Security': 'max-age=31536000',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': PERMISSIONS_POLICY,
    'X-Frame-Options': 'DENY',
  };
}
