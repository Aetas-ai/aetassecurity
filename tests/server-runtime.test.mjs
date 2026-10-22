import assert from 'node:assert/strict';
import test from 'node:test';
import {
  canonicalLocation,
  createSecureRequestListener,
  invalidEnvironmentVariables,
  legacyRedirectLocation,
  shouldRedirectToCanonical,
} from '../scripts/server-runtime.mjs';

const validWebhookEnvironment = {
  FORM_CSRF_SECRET: 'c'.repeat(32),
  FORM_DELIVERY_URL: 'https://forms.example.com/aetas-security',
  FORM_DELIVERY_BEARER_TOKEN: 't'.repeat(20),
};

const validResendEnvironment = {
  FORM_DELIVERY_ENABLED: 'true',
  FORM_CSRF_SECRET: 'c'.repeat(32),
  RESEND_API_KEY: 're_test_not_a_real_key',
  FORM_SENDER_EMAIL: 'forms@notify.aetassecurity.com',
  CONTACT_RECIPIENT_EMAIL: 'info@aetassecurity.com',
};

test('delivery is disabled by default even when credentials are saved', () => {
  assert.deepEqual(invalidEnvironmentVariables({}), []);
  assert.deepEqual(invalidEnvironmentVariables({ ...validResendEnvironment, FORM_DELIVERY_ENABLED: 'false' }), []);
  assert.deepEqual(invalidEnvironmentVariables({ FORM_DELIVERY_ENABLED: false, RESEND_API_KEY: 'incomplete' }), []);
  assert.deepEqual(invalidEnvironmentVariables({ ...validResendEnvironment, FORM_DELIVERY_ENABLED: 'yes' }), ['FORM_DELIVERY_ENABLED']);
});

test('requires a complete valid webhook configuration when enabled', () => {
  assert.deepEqual(invalidEnvironmentVariables({ ...validWebhookEnvironment, FORM_DELIVERY_ENABLED: 'true' }), []);
  assert.deepEqual(invalidEnvironmentVariables({
    FORM_DELIVERY_ENABLED: 'true', FORM_CSRF_SECRET: 'short',
    FORM_DELIVERY_URL: 'http://forms.example.com', FORM_DELIVERY_BEARER_TOKEN: '',
  }), ['FORM_CSRF_SECRET', 'FORM_DELIVERY_URL', 'FORM_DELIVERY_BEARER_TOKEN']);
});

test('requires an explicit sender, recipient, key and CSRF secret for Resend', () => {
  assert.deepEqual(invalidEnvironmentVariables(validResendEnvironment), []);
  assert.deepEqual(invalidEnvironmentVariables({ ...validResendEnvironment, FORM_DELIVERY_ENABLED: true }), []);
  for (const name of ['RESEND_API_KEY', 'FORM_SENDER_EMAIL', 'CONTACT_RECIPIENT_EMAIL', 'FORM_CSRF_SECRET']) {
    assert.deepEqual(invalidEnvironmentVariables({ ...validResendEnvironment, [name]: '' }), [name]);
  }
  assert.deepEqual(invalidEnvironmentVariables({ ...validResendEnvironment, RESEND_API_KEY: 'wrong-provider-key' }), ['RESEND_API_KEY']);
  assert.deepEqual(invalidEnvironmentVariables({ ...validResendEnvironment, CONTACT_RECIPIENT_EMAIL: 'info@aetassecurity.com\r\nBcc: attacker@example.com' }), ['CONTACT_RECIPIENT_EMAIL']);
  assert.deepEqual(invalidEnvironmentVariables({ FORM_DELIVERY_ENABLED: 'true' }), ['FORM_CSRF_SECRET', 'RESEND_API_KEY', 'FORM_SENDER_EMAIL', 'CONTACT_RECIPIENT_EMAIL']);
});

test('rejects mixed Resend and webhook channels when enabled', () => {
  assert.deepEqual(invalidEnvironmentVariables({ ...validWebhookEnvironment, ...validResendEnvironment }), [
    'RESEND_API_KEY', 'FORM_DELIVERY_URL', 'FORM_DELIVERY_BEARER_TOKEN',
  ]);
});

function createResponse() {
  return {
    bodyEnded: false,
    headers: new Map(),
    headersSent: false,
    statusCode: 200,
    destroy() {
      this.destroyed = true;
    },
    end() {
      this.bodyEnded = true;
      this.headersSent = true;
    },
    setHeader(name, value) {
      this.headers.set(name, value);
    },
  };
}

test('accepts only the canonical HTTPS host', () => {
  assert.equal(shouldRedirectToCanonical({
    headers: {
      'x-forwarded-host': 'www.aetassecurity.com',
      'x-forwarded-proto': 'https',
    },
    socket: {},
  }), false);

  assert.equal(shouldRedirectToCanonical({
    headers: {
      host: 'attacker.example',
      'x-forwarded-proto': 'https',
    },
    socket: {},
  }), true);
});

test('canonical redirects cannot be influenced by a protocol-relative target', () => {
  assert.equal(
    canonicalLocation('//attacker.example/redirected?value=1'),
    'https://www.aetassecurity.com/redirected?value=1',
  );
});

test('the request wrapper applies security headers before delegating', async () => {
  let delegated = false;
  const response = createResponse();
  const listener = createSecureRequestListener(
    async () => {
      delegated = true;
    },
    {
      'Content-Security-Policy': "default-src 'self'",
      'X-Content-Type-Options': 'nosniff',
    },
  );

  await listener({
    headers: {
      'x-forwarded-host': 'www.aetassecurity.com',
      'x-forwarded-proto': 'https',
    },
    socket: {},
    url: '/',
  }, response);

  assert.equal(delegated, true);
  assert.equal(response.headers.get('Content-Security-Policy'), "default-src 'self'");
  assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
});

test('the request wrapper returns a fixed canonical redirect before Astro', async () => {
  let delegated = false;
  const response = createResponse();
  const listener = createSecureRequestListener(
    async () => {
      delegated = true;
    },
    { 'X-Content-Type-Options': 'nosniff' },
  );

  await listener({
    headers: {
      host: 'attacker.example',
      'x-forwarded-proto': 'https',
    },
    socket: {},
    url: '//attacker.example/contact?topic=security',
  }, response);

  assert.equal(delegated, false);
  assert.equal(response.statusCode, 308);
  assert.equal(response.headers.get('Location'), 'https://www.aetassecurity.com/contact?topic=security');
  assert.equal(response.bodyEnded, true);
});

test('the bare domain redirects to the www canonical host', () => {
  assert.equal(shouldRedirectToCanonical({
    headers: { host: 'aetassecurity.com', 'x-forwarded-proto': 'https' },
    socket: {},
  }), true);
});

test('legacy Squarespace paths map to fixed canonical targets', () => {
  assert.equal(legacyRedirectLocation('/home'), 'https://www.aetassecurity.com/');
  assert.equal(legacyRedirectLocation('/home/'), 'https://www.aetassecurity.com/');
  assert.equal(legacyRedirectLocation('/contactus?ref=old'), 'https://www.aetassecurity.com/contact');
  assert.equal(legacyRedirectLocation('/cart'), 'https://www.aetassecurity.com/');
  assert.equal(legacyRedirectLocation('//attacker.example/home'), 'https://www.aetassecurity.com/');
  assert.equal(legacyRedirectLocation('/'), undefined);
  assert.equal(legacyRedirectLocation('/contact'), undefined);
  assert.equal(legacyRedirectLocation('/homepage'), undefined);
  assert.equal(legacyRedirectLocation('/constructor'), undefined);
});

test('the request wrapper answers legacy paths with a 301 before Astro', async () => {
  let delegated = false;
  const response = createResponse();
  const listener = createSecureRequestListener(
    async () => {
      delegated = true;
    },
    { 'X-Content-Type-Options': 'nosniff' },
  );

  await listener({
    headers: { host: 'aetassecurity.com', 'x-forwarded-proto': 'http' },
    socket: {},
    url: '/contactus',
  }, response);

  assert.equal(delegated, false);
  assert.equal(response.statusCode, 301);
  assert.equal(response.headers.get('Location'), 'https://www.aetassecurity.com/contact');
  assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
});
