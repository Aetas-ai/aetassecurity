/**
 * Resources hub helpers shared by /resources, article pages, the homepage
 * "Latest from Resources", and service pages. Drafts are included only in
 * placeholder mode, so production builds never render them.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { showPlaceholders } from './site-flags';
import type { ServiceSlug } from './services';

export type Resource = CollectionEntry<'resources'>;
export type ResourceType = Resource['data']['type'];

export const resourceTypes: { type: ResourceType; label: string; plural: string; blurb: string }[] = [
  { type: 'advisory', label: 'Advisory', plural: 'Security advisories', blurb: 'Timely notes on vulnerabilities and active threats, with what to do about them.' },
  { type: 'blog', label: 'Blog', plural: 'Blog', blurb: 'Write-ups from our analysts and testers on what they see in the field.' },
  { type: 'guide', label: 'Guide', plural: 'Guides', blurb: 'Practical guidance for preparing, testing, and responding.' },
];

export const resourceTypeLabel = (type: ResourceType) => resourceTypes.find((item) => item.type === type)?.label ?? type;

export async function getResources(): Promise<Resource[]> {
  const entries = await getCollection('resources', ({ data }) => showPlaceholders || !data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getResourcesForService(slug: ServiceSlug, limit = 3): Promise<Resource[]> {
  return (await getResources()).filter((entry) => entry.data.services.includes(slug)).slice(0, limit);
}

export const formatResourceDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
