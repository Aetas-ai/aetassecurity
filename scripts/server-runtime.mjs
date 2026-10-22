import { readFile } from 'node:fs/promises';
import { CANONICAL_HOST, CANONICAL_ORIGIN, legacyRedirect } from './security-policy.mjs';

const REQUIRED_SECURITY_HEADERS = [
  'Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options',
  'Referrer-Policy', 'Permissions-Policy', 'X-Frame-Options',
];

function firstHeaderValue(value) {
  if (Array.isArray(value)) return value[0]?.split(',', 1)[0].trim();
  return value?.split(',', 1)[0].trim();
}

function effectiveHost(request) {
  return (
    firstHeaderValue(request.headers['x-forwarded-host'])
    || firstHeaderValue(request.headers.host)
    || ''
  ).toLowerCase();
}

function effectiveProtocol(request) {
  return (
    firstHeaderValue(request.headers['x-forwarded-proto'])
    || (request.socket?.encrypted ? 'https' : 'http')
  ).toLowerCase();
}

export function shouldRedirectToCanonical(request) {
  const host = effectiveHost(request);
  const protocol = effectiveProtocol(request);
  return protocol !== 'https' || (host !== CANONICAL_HOST && host !== `${CANONICAL_HOST}:443`);
}

/** Fixed canonical target for a legacy Squarespace path, if it is one. */
export function legacyRedirectLocation(requestTarget = '/') {
  let pathname;
  try {
    pathname = new URL(requestTarget, CANONICAL_ORIGIN).pathname;
  } catch {
    return undefined;
  }
  const target = legacyRedirect(pathname);
  return target && new URL(target, CANONICAL_ORIGIN).toString();
}

export function canonicalLocation(requestTarget = '/') {
  try {
    const incoming = new URL(requestTarget, CANONICAL_ORIGIN);
    return new URL(`${incoming.pathname}${incoming.search}`, CANONICAL_ORIGIN).toString();
  } catch {
    return `${CANONICAL_ORIGIN}/`;
  }
}

export async function loadGeneratedSecurityHeaders(
  // Resolved from the deployed copy in dist/server/ (see security-headers-integration.mjs).
  headersPath = new URL('../client/_headers.json', import.meta.url),
) {
  const content = await readFile(headersPath, 'utf8');
  const entries = JSON.parse(content);
  if (!Array.isArray(entries)) throw new TypeError('Generated static headers must be an array.');

  const rootHeaders = entries.find((entry) => entry?.pathname === '/')?.headers;
  if (!Array.isArray(rootHeaders)) {
    throw new TypeError('Generated static headers do not contain the root route.');
  }

  const headers = Object.fromEntries(
    rootHeaders
      .filter((header) => typeof header?.key === 'string' && typeof header?.value === 'string')
      .map((header) => [header.key, header.value]),
  );

  const missing = REQUIRED_SECURITY_HEADERS.filter((name) => !headers[name]);
  if (missing.length > 0) {
    throw new TypeError(`Generated static headers are missing: ${missing.join(', ')}`);
  }

  return Object.fromEntries(
    REQUIRED_SECURITY_HEADERS.map((name) => [name, headers[name]]),
  );
}

export function createSecureRequestListener(
  astroHandler,
  securityHeaders,
  { enforceCanonical = true } = {},
) {
  return async (request, response) => {
    for (const [name, value] of Object.entries(securityHeaders)) {
      response.setHeader(name, value);
    }

    // Legacy paths go straight to their final canonical URL in one hop.
    const legacyLocation = legacyRedirectLocation(request.url);
    if (legacyLocation) {
      response.statusCode = 301;
      response.setHeader('Cache-Control', 'public, max-age=3600');
      response.setHeader('Location', legacyLocation);
      response.end();
      return;
    }

    if (enforceCanonical && shouldRedirectToCanonical(request)) {
      response.statusCode = 308;
      response.setHeader('Cache-Control', 'public, max-age=3600');
      response.setHeader('Location', canonicalLocation(request.url));
      response.end();
      return;
    }

    try {
      await astroHandler(request, response);
    } catch {
      console.error('[server] request_failed');
      if (!response.headersSent) {
        response.statusCode = 500;
        response.setHeader('Cache-Control', 'no-store');
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.end('Internal Server Error');
      } else {
        response.destroy();
      }
    }
  };
}
