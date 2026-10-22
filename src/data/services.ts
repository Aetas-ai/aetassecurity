/**
 * Additional capabilities carried over from the previous aetassecurity.com.
 * Each one renders on the homepage only after business approval: set
 * `confirmed: true` once Sir Rob confirms it (CONTENT-TODO.md).
 */
export interface Capability {
  title: string;
  body: string;
  confirmed: boolean;
}

export const capabilities: Capability[] = [
  {
    title: '24/7 threat monitoring and response',
    body: 'Around-the-clock monitoring, with detected threats investigated and acted on, not just reported.',
    confirmed: false,
  },
  {
    title: 'Proactive incident response',
    body: 'When threats are detected, our team responds, so you never face an attack alone.',
    confirmed: false,
  },
  {
    title: 'Security Operations Center (SOC)',
    body: 'Expert-led monitoring and incident handling by a dedicated team.',
    confirmed: false,
  },
  {
    title: 'Regulatory compliance assistance',
    body: 'Helping you meet regulatory and auditing standards.',
    confirmed: false,
  },
  {
    title: 'Co-management of security controls',
    body: 'Security strategies that fit your specific business requirements, including co-management of security controls.',
    confirmed: false,
  },
];
