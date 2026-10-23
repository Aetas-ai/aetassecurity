/**
 * Resources hub content: security advisories, blog posts, and guides written
 * by the Aetas Security team, one Markdown file each in src/content/resources/.
 * Entries with `draft: true` render only in placeholder mode (src/data/site-flags.ts).
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['advisory', 'blog', 'guide']),
    date: z.coerce.date(),
    /** Service pages that list this entry under "Related resources". */
    services: z.array(z.enum(['mxdr', 'incident-response', 'network-security-testing', 'application-security-testing'])).default([]),
    author: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { resources };
