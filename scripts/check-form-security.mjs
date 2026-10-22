import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { startFormServer } from '../tests/fixtures/form-server.mjs';

// Uses an isolated built backend and a mock provider; never loads local secrets.
// Run after `npm run build`: node scripts/check-form-security.mjs
const server = await startFormServer(4359);
try {
  const { origin, headers } = server;
  const session = await fetch(origin + '/api/forms/csrf', { headers });
  assert.equal(session.status, 200);
  assert.match(session.headers.get('cache-control'), /no-store/);
  assert.equal(session.headers.get('access-control-allow-origin'), null);
  assert.match(session.headers.get('set-cookie'), /Secure/);
  assert.match(session.headers.get('set-cookie'), /HttpOnly/);
  const cookie = session.headers.get('set-cookie')?.split(';', 1)[0];
  assert.ok(cookie);
  const { token } = await session.json();
  await delay(1_600);

  const values = {
    'csrf-token': token, website: '', 'first-name': 'Aetas', 'last-name': 'Test',
    email: 'visitor@example.com', company: 'Aetas Security',
    service: 'general', message: 'Controlled form-security verification; not a customer request.',
  };
  async function post(data, { source = 'https://www.aetassecurity.com', contentType = 'application/x-www-form-urlencoded' } = {}) {
    return fetch(origin + '/api/forms/contact', {
      method: 'POST', headers: { ...headers, Origin: source, Cookie: cookie, 'Content-Type': contentType },
      body: typeof data === 'string' ? data : new URLSearchParams(data),
      signal: AbortSignal.timeout(10_000),
    });
  }
  const accepted = await post(values);
  assert.equal(accepted.status, 200);
  const acceptedBody = await accepted.json();
  assert.equal(acceptedBody.redirect, '/contact/thanks');
  assert.equal(acceptedBody.reference, accepted.headers.get('x-request-id')); // Email, logs and header share one ID.
  assert.equal(accepted.headers.get('access-control-allow-origin'), null);
  assert.equal((await post(values, { source: 'https://example.invalid' })).status, 403);
  assert.equal((await post({ ...values, 'csrf-token': 'tampered' })).status, 403);
  assert.equal((await post({ ...values, email: 'invalid-address' })).status, 400);
  assert.equal((await post({ ...values, service: 'not-a-service' })).status, 400);
  assert.equal((await post({ ...values, to: 'attacker@example.com' })).status, 400);
  assert.equal((await post(new URLSearchParams(values).toString() + '&email=duplicate@example.com')).status, 400);
  assert.equal((await post('x'.repeat(17 * 1024))).status, 413);
  assert.equal((await post('{}', { contentType: 'application/json' })).status, 415);

  const honeypot = await post({ 'csrf-token': token, website: 'bot.example' });
  assert.equal(honeypot.status, 200);
  assert.match(honeypot.headers.get('cache-control'), /no-store/);

  const rejected = await post({ ...values, message: 'PROVIDER_REJECT_TEST controlled rejection of a notification.' });
  assert.equal(rejected.status, 503);
  const failure = await rejected.json();
  assert.equal(failure.ok, false);
  assert.equal(failure.redirect, undefined);

  // Only verified, well-formed submissions count toward the limit of 8: the
  // accepted and provider-rejected posts above used 2 of them.
  for (let attempt = 3; attempt <= 8; attempt++) assert.equal((await post(values)).status, 200);
  const limited = await post(values);
  assert.equal(limited.status, 429);
  assert.ok(limited.headers.get('retry-after'));
} finally {
  await server.stop();
}

const disabled = await startFormServer(4359, false);
try {
  const session = await fetch(disabled.origin + '/api/forms/csrf', { headers: disabled.headers });
  assert.equal(session.status, 503);
  assert.equal(session.headers.get('set-cookie'), null);
  const response = await fetch(disabled.origin + '/api/forms/contact', {
    method: 'POST',
    headers: { ...disabled.headers, Origin: 'https://www.aetassecurity.com', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ website: 'bot.example' }),
  });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
} finally {
  await disabled.stop();
}
console.info('Built backend checks passed: mocked Resend success/failure, disabled delivery, validation, CSRF, CORS, secure cookies, honeypot and rate limits. No email sent.');
