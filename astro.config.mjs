// @ts-check
import { defineConfig, envField } from 'astro/config';

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

  // Form delivery stays off until FORM_DELIVERY_ENABLED=true and a complete
  // Resend (or webhook) configuration is set; see HANDOFF.md "Contact form".
  env: {
    schema: {
      FORM_DELIVERY_ENABLED: envField.boolean({
        context: 'server',
        access: 'secret',
        default: false
      }),
      FORM_CSRF_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),
      FORM_DELIVERY_URL: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),
      FORM_DELIVERY_BEARER_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),
      RESEND_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),
      FORM_SENDER_EMAIL: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),
      CONTACT_RECIPIENT_EMAIL: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      })
    }
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/contact/thanks')
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
