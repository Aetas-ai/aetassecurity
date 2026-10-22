/**
 * Single source of truth for the header, mobile navigation, footer, and
 * contact details. Service names and capability labels follow HANDOFF.md;
 * keep them in sync when approved positioning changes.
 */

export type ServiceKey = 'mxdr' | 'offensive' | 'advisory';

export interface NavLink {
  label: string;
  href: string;
  /** Optional expansion shown under the label in the desktop mega menu. */
  hint?: string;
}

export interface ServiceNavItem extends NavLink {
  key: ServiceKey;
  tag: string;
  blurb: string;
  capabilities: NavLink[];
}

// Services menu columns. Every item opens its own service page, or its card on
// the services hub (/services#<id>, ids from `capabilities` in src/data/services.ts).
export const serviceNav: ServiceNavItem[] = [
  {
    key: 'mxdr',
    label: 'MXDR',
    href: '/services/mxdr',
    tag: 'Detection and response',
    blurb: 'Monitor, investigate, respond, and document, with analyst approval before containment.',
    capabilities: [
      { label: 'Threat monitoring and response', href: '/services#threat-monitoring', hint: 'Around the clock' },
      { label: 'Proactive incident response', href: '/services#incident-response' },
      { label: 'Security Operations Center (SOC)', href: '/services#soc' },
    ],
  },
  {
    key: 'offensive',
    label: 'Offensive Security',
    href: '/services#offensive-security',
    tag: 'Security testing',
    blurb: 'Dedicated testing that shows how your networks and applications hold up.',
    capabilities: [
      { label: 'Network Security Testing', href: '/services/network-security-testing', hint: 'Exposure, configuration, attack paths' },
      { label: 'Application Security Testing', href: '/services/application-security-testing', hint: 'Pen Testing' },
    ],
  },
  {
    key: 'advisory',
    label: 'Compliance and co-management',
    href: '/services#more-services',
    tag: 'Advisory',
    blurb: 'Support with regulatory standards and the day-to-day running of your security controls.',
    capabilities: [
      { label: 'Regulatory compliance assistance', href: '/services#compliance' },
      { label: 'Co-management of security controls', href: '/services#co-management' },
    ],
  },
];

export const servicesHubLink: NavLink = { label: 'View all services', href: '/services' };

export const primaryNav: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Partners', href: '/partners' },
  { label: 'Contact', href: '/contact' },
];

/** [CONFIRM] booking URL with Sir Rob (CONTENT-TODO.md). */
export const contact = {
  phone: '+1 (407) 288-8277',
  phoneHref: 'tel:+14072888277',
  email: 'info@aetassecurity.com',
  bookingUrl: 'https://outlook.office365.com/owa/calendar/ScheduleaDemo@aetassecurity.com/bookings/',
};

export const demoLink: NavLink = { label: 'Request a demo', href: contact.bookingUrl };

/** [CONFIRM] social profiles (CONTENT-TODO.md). */
export const social: NavLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aetassecurity' },
  { label: 'Facebook', href: 'https://www.facebook.com/p/Aetas-Security-61562493912532/' },
];

export const legalLinks: NavLink[] = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms & Conditions', href: '/legal/terms' },
];

export const isServicesPath = (currentPath: string) => currentPath === '/services' || currentPath.startsWith('/services/');

export const isActivePath = (currentPath: string, href: string) => {
  const path = href.split('#')[0];
  if (path === '/') return currentPath === '/';
  return currentPath === path || currentPath.startsWith(`${path}/`);
};
