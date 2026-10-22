/**
 * Single source of truth for the header, mobile navigation, footer, and
 * contact details. Service names and capability labels follow HANDOFF.md;
 * keep them in sync when approved positioning changes.
 */

export type ServiceKey = 'mxdr' | 'offensive';

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

export const serviceNav: ServiceNavItem[] = [
  {
    key: 'mxdr',
    label: 'MXDR',
    href: '/#mxdr',
    tag: 'Managed Extended Detection and Response',
    blurb: 'Monitor, investigate, respond, and document, with analyst approval before containment.',
    capabilities: [
      { label: 'Managed detection and response', href: '/#mxdr', hint: 'Monitor, Investigate, Respond, Document' },
      { label: 'Expert in the Loop', href: '/#expert-in-the-loop', hint: 'Expert Human Oversight of AI' },
    ],
  },
  {
    key: 'offensive',
    label: 'Offensive Security',
    href: '/#offensive-security',
    tag: 'Security testing',
    blurb: 'Dedicated testing that shows how your networks and applications hold up.',
    capabilities: [
      { label: 'Network Security Testing', href: '/#network-testing', hint: 'Offensive Security' },
      { label: 'Application Security Testing', href: '/#application-testing', hint: 'Pen Testing' },
    ],
  },
];

export const primaryNav: NavLink[] = [
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
export const panelFootLink: NavLink = { label: 'Talk to our team', href: '/contact' };

/** [CONFIRM] social profiles (CONTENT-TODO.md). */
export const social: NavLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/aetassecurity' },
  { label: 'Facebook', href: 'https://www.facebook.com/p/Aetas-Security-61562493912532/' },
];

export const legalLinks: NavLink[] = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms & Conditions', href: '/legal/terms' },
];

export const isActivePath = (currentPath: string, href: string) => {
  const path = href.split('#')[0];
  if (path === '/') return currentPath === '/';
  return currentPath === path || currentPath.startsWith(`${path}/`);
};
