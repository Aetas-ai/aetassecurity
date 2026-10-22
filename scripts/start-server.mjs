import { readFileSync } from 'node:fs';
import { createServer as createHttpServer } from 'node:http';
import { createServer as createHttpsServer } from 'node:https';
import { createSecureRequestListener, loadGeneratedSecurityHeaders } from './server-runtime.mjs';

let securityHeaders;
try {
  securityHeaders = await loadGeneratedSecurityHeaders();
} catch {
  console.error('[startup] Missing or invalid generated security headers. Run npm run build first.');
  process.exit(1);
}

process.env.ASTRO_NODE_AUTOSTART = 'disabled';
// The build copies this file to dist/server/entry.mjs and renames the Astro
// adapter entry it wraps to astro-entry.mjs (see security-headers-integration.mjs).
const { handler, options } = await import('./astro-entry.mjs');
const port = process.env.PORT ? Number(process.env.PORT) : options.port;
const configuredHost = process.env.HOST ?? options.host;
const host = typeof configuredHost === 'boolean'
  ? (configuredHost ? '0.0.0.0' : 'localhost')
  : configuredHost;

if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
  console.error('[startup] PORT must be an integer between 1 and 65535.');
  process.exit(1);
}

const certificatePath = process.env.SERVER_CERT_PATH;
const keyPath = process.env.SERVER_KEY_PATH;
if (Boolean(certificatePath) !== Boolean(keyPath)) {
  console.error('[startup] SERVER_CERT_PATH and SERVER_KEY_PATH must be configured together.');
  process.exit(1);
}

const listener = createSecureRequestListener(handler, securityHeaders);
const server = certificatePath && keyPath
  ? createHttpsServer({
      cert: readFileSync(certificatePath),
      key: readFileSync(keyPath),
    }, listener)
  : createHttpServer(listener);

server.headersTimeout = 15_000;
server.keepAliveTimeout = 5_000;
server.maxHeadersCount = 100;
server.requestTimeout = 30_000;

server.on('clientError', (_error, socket) => {
  if (socket.writable) socket.end('HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n');
});

server.on('error', () => {
  console.error('[server] listener_failed');
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.info(`[server] listening on ${host}:${port}`);
});

let shuttingDown = false;
function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.info(`[server] ${signal.toLowerCase()}_received`);

  const forceClose = setTimeout(() => {
    server.closeAllConnections();
  }, 10_000);
  forceClose.unref();

  server.close((error) => {
    clearTimeout(forceClose);
    if (error) {
      console.error('[server] shutdown_failed');
      process.exitCode = 1;
    }
  });
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));
