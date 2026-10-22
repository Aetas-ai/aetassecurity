// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import securityHeaders from './scripts/security-headers-integration.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.aetassecurity.com',

  security: {
    checkOrigin: true,
    allowedDomains: [
      {
        protocol: 'https',
        hostname: 'www.aetassecurity.com'
      }
    ]
  },

  adapter: node({
    mode: 'standalone',
    staticHeaders: true,
    bodySizeLimit: 64 * 1024
  }),

  // Astro's standard layout: public files in dist/client, the Node bundle and
  // its secure start wrapper (copied by securityHeaders) in dist/server, so a
  // host that keeps only dist/ (Hostinger Node.js apps) can run the server.
  build: {
    client: './client',
    server: './server'
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404')
    }),
    securityHeaders()
  ],

  vite: {
    build: {
      sourcemap: false
    },
    plugins: [tailwindcss()]
  }
});
