/**
 * Service content for the /services pages, plus the extra capabilities from
 * the previous aetassecurity.com.
 *
 * Approved wording (from the aetas.ai Cybersecurity page) is reused where it
 * exists. Everything else here is drafted copy awaiting Sir Rob's review and
 * is listed in CONTENT-TODO.md. Do not add metrics, certifications, response
 * times, guarantees, customers, or unconfirmed services.
 */
import type { FaqItem } from './service-faqs';
import { demoLink } from './navigation';

export type ServiceSlug = 'mxdr' | 'network-security-testing' | 'application-security-testing';
export type ServiceIconKey = 'mxdr' | 'network' | 'application';
/** Values of the contact form's service picker (src/lib/server/forms.ts). */
export type ServiceFormValue = 'mxdr' | 'network-testing' | 'application-testing';

export interface ServiceDetail {
  slug: ServiceSlug;
  icon: ServiceIconKey;
  formValue: ServiceFormValue;
  group: 'Detection and response' | 'Offensive Security';
  name: string;
  shortName: string;
  /** One line for cards, the hub, and related-service links. */
  summary: string;
  seoTitle: string;
  metaDescription: string;
  ogKey: string;
  heroTitle: string;
  heroLede: string;
  cta: { label: string; href: string; external: boolean };
  focus: string[];
  /** Hero diagram: the process as connected nodes, with an optional highlighted gate after one node. */
  diagram: { nodes: string[]; gate?: { after: number; label: string } };
  coverageTitle: string;
  coverage: { title: string; body: string }[];
  steps: [string, string][];
  oversight: { title: string; body: string };
  deliverables: string[];
  faqs: FaqItem[];
  related: ServiceSlug[];
}

const contactFor = (value: ServiceFormValue) => `/contact?service=${value}`;

export const services: ServiceDetail[] = [
  {
    slug: 'mxdr',
    icon: 'mxdr',
    formValue: 'mxdr',
    group: 'Detection and response',
    name: 'Managed Extended Detection and Response (MXDR)',
    shortName: 'MXDR',
    summary: 'Continuous detection, investigation, response, and escalation guided by experienced security professionals.',
    seoTitle: 'Managed Extended Detection and Response (MXDR)',
    metaDescription: 'Aetas Security MXDR: continuous detection, investigation, response, and escalation guided by experienced security professionals, with analyst approval before containment.',
    ogKey: 'mxdr',
    heroTitle: 'Detection and response, guided by security professionals.',
    heroLede: 'Managed Extended Detection and Response (MXDR) provides continuous detection, investigation, response, and escalation guided by experienced security professionals, with analyst approval before containment.',
    cta: { label: demoLink.label, href: demoLink.href, external: true },
    focus: ['Monitor', 'Investigate', 'Respond', 'Document'],
    diagram: { nodes: ['Monitor', 'Investigate', 'Respond', 'Document'], gate: { after: 1, label: 'Analyst approval' } },
    coverageTitle: 'Detection across the places attacks start.',
    coverage: [
      { title: 'Endpoints', body: 'Detections from workstations and servers, investigated with the surrounding process and host activity.' },
      { title: 'Identity', body: 'Suspicious sign-ins and account activity reviewed against what is expected for the account.' },
      { title: 'Email', body: 'Suspicious mailbox activity, such as unexpected forwarding rules, investigated and documented.' },
      { title: 'Network', body: 'Network activity correlated with endpoint and identity signals to show the wider picture.' },
      { title: 'Cloud environments', body: 'Activity across your cloud environments brought into the same detection and response workflow.' },
      { title: 'Escalation paths', body: 'Agreed contacts and escalation steps, so the right people hear about the right events.' },
    ],
    steps: [
      ['Monitor', 'Monitoring and triaging active security detections.'],
      ['Investigate', 'Investigating suspicious endpoint and identity activity.'],
      ['Respond', 'Following defined response and escalation procedures.'],
      ['Document', 'Documenting investigation and response activity.'],
    ],
    oversight: {
      title: 'Analyst approval before containment.',
      body: 'Human Led AI can help correlate detections and summarize activity, but containment actions such as isolating a host or disabling an account happen only after a security analyst approves them, through the escalation paths agreed with your team.',
    },
    deliverables: [
      'Investigated detections, with severity and context',
      'Containment recommendations, actioned after analyst approval',
      'Notifications to your contacts through agreed escalation paths',
      'Documented investigation and response activity',
    ],
    faqs: [
      { question: 'What does MXDR include?', answer: 'Managed Extended Detection and Response (MXDR) provides continuous detection, investigation, response, and escalation guided by experienced security professionals.' },
      { question: 'Does AI contain threats automatically?', answer: 'No. Aetas Security applies Human Led AI with Expert Human Oversight of AI (Expert in the Loop). AI can help correlate and summarize activity, but a security analyst approves containment before it affects your systems or users.' },
      { question: 'What do you need from us to start?', answer: 'We start by agreeing scope: the environments to cover, the security technology already in place, and your escalation contacts and approval rules.' },
    ],
    related: ['network-security-testing', 'application-security-testing'],
  },
  {
    slug: 'network-security-testing',
    icon: 'network',
    formValue: 'network-testing',
    group: 'Offensive Security',
    name: 'Network Security Testing',
    shortName: 'Network Security Testing',
    summary: 'Security testing focused on network exposure, configuration weaknesses, and potential attack paths.',
    seoTitle: 'Network Security Testing',
    metaDescription: 'Aetas Security Network Security Testing: Offensive Security engagements focused on network exposure, configuration weaknesses, and potential attack paths, with documented findings and remediation guidance.',
    ogKey: 'network-testing',
    heroTitle: 'Test your network the way an attacker would.',
    heroLede: 'Network Security Testing is an Offensive Security engagement focused on network exposure, configuration weaknesses, and potential attack paths.',
    cta: { label: 'Scope a test', href: contactFor('network-testing'), external: false },
    focus: ['Network exposure', 'Configuration weaknesses', 'Potential attack paths'],
    diagram: { nodes: ['Scope', 'Discovery', 'Testing', 'Reporting', 'Findings review'], gate: { after: 0, label: 'Rules of engagement agreed' } },
    coverageTitle: 'What a network test examines.',
    coverage: [
      { title: 'External network', body: 'Internet-facing systems and services, tested for weaknesses an outside attacker could find.' },
      { title: 'Internal network', body: 'What an attacker could reach and do from inside your network, within the agreed scope.' },
      { title: 'Configuration', body: 'Network devices, firewalls, and services checked for weak or risky settings.' },
      { title: 'Attack paths', body: 'How individual weaknesses could combine into a route to sensitive systems or data.' },
    ],
    steps: [
      ['Scope and rules of engagement', 'Agree targets, timing, contacts, and anything out of bounds.'],
      ['Discovery', 'Map the systems and services reachable within scope.'],
      ['Testing', 'Security specialists identify weaknesses and safely validate them.'],
      ['Reporting', 'Document findings with evidence, severity, and remediation guidance.'],
      ['Findings review', 'Walk through the results with your team and agree priorities.'],
    ],
    oversight: {
      title: 'Planned and run by security specialists.',
      body: 'Testing follows the agreed scope and rules of engagement, with named contacts on both sides, so it stays controlled and your team knows what is happening and when.',
    },
    deliverables: [
      'An executive summary for leadership',
      'Detailed findings with evidence and severity',
      'Remediation guidance for each finding',
      'A findings review session with your team',
    ],
    faqs: [
      { question: 'What does Network Security Testing focus on?', answer: 'Network exposure, configuration weaknesses, and potential attack paths.' },
      { question: 'How is a test scoped?', answer: 'Together with your team: we agree the networks and systems in scope, timing, contacts, and anything that must not be tested, and record it in the rules of engagement.' },
      { question: 'Will testing disrupt our systems?', answer: 'Testing follows the agreed rules of engagement, including timing and systems to avoid. Any activity with a risk of disruption is discussed with your team before it takes place.' },
    ],
    related: ['application-security-testing', 'mxdr'],
  },
  {
    slug: 'application-security-testing',
    icon: 'application',
    formValue: 'application-testing',
    group: 'Offensive Security',
    name: 'Application Security Testing (Pen Testing)',
    shortName: 'Application Security Testing',
    summary: 'Application security testing focused on identifying and documenting security weaknesses.',
    seoTitle: 'Application Security Testing (Pen Testing)',
    metaDescription: 'Aetas Security Application Security Testing (Pen Testing): Offensive Security engagements that identify and document security weaknesses in your web applications and APIs.',
    ogKey: 'application-testing',
    heroTitle: 'Find the weaknesses in your applications first.',
    heroLede: 'Application Security Testing (Pen Testing) is an Offensive Security engagement focused on identifying and documenting security weaknesses in your applications.',
    cta: { label: 'Scope a test', href: contactFor('application-testing'), external: false },
    focus: ['Web applications', 'APIs', 'Authentication and access control'],
    diagram: { nodes: ['Scope', 'Discovery', 'Testing', 'Reporting', 'Findings review'], gate: { after: 0, label: 'Rules of engagement agreed' } },
    coverageTitle: 'What an application test examines.',
    coverage: [
      { title: 'Web applications', body: 'The application as your users see it, including its business logic.' },
      { title: 'APIs', body: 'The interfaces behind your applications and integrations.' },
      { title: 'Authentication and sessions', body: 'How users sign in, and how their sessions are created, protected, and ended.' },
      { title: 'Access control', body: 'Whether each user role can reach only what it should.' },
      { title: 'Input handling and data exposure', body: 'How the application handles untrusted input and protects sensitive data.' },
    ],
    steps: [
      ['Scope and rules of engagement', 'Agree applications, environments, user roles, timing, and contacts.'],
      ['Discovery', 'Map functionality, user roles, and entry points within scope.'],
      ['Testing', 'Security specialists identify weaknesses and safely validate them.'],
      ['Reporting', 'Document findings with evidence, severity, and steps to reproduce.'],
      ['Findings review', 'Walk through the results with your developers and agree priorities.'],
    ],
    oversight: {
      title: 'Planned and run by security specialists.',
      body: 'Testing follows the agreed scope and rules of engagement, including which environment is tested and which accounts are used, so your development and operations teams know what to expect.',
    },
    deliverables: [
      'An executive summary for leadership',
      'Detailed findings with evidence, severity, and steps to reproduce',
      'Remediation guidance your developers can act on',
      'A findings review session with your team',
    ],
    faqs: [
      { question: 'What does Application Security Testing (Pen Testing) focus on?', answer: 'Identifying and documenting security weaknesses in applications.' },
      { question: 'Do you test production or a test environment?', answer: 'Either can be agreed during scoping. Many teams choose a staging environment that mirrors production; the choice is recorded in the rules of engagement.' },
      { question: 'What do you need from us?', answer: 'Access to the application in scope, test accounts for each user role being tested, and a technical contact for the duration of the test.' },
    ],
    related: ['network-security-testing', 'mxdr'],
  },
];

export const serviceBySlug = (slug: ServiceSlug) => {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
};

/**
 * Additional services from the previous aetassecurity.com, listed the way that
 * site listed them (heading and one-line description, wording kept close to
 * the original). Shown on the homepage and the services hub.
 */
export interface Capability {
  title: string;
  body: string;
  /** Anchor on the services hub (/services#<id>) and the icon key. */
  id: 'threat-monitoring' | 'incident-response' | 'soc' | 'compliance' | 'co-management';
}

export const capabilities: Capability[] = [
  {
    title: 'Around-the-clock threat monitoring and response',
    body: 'We don’t just detect threats, we act, stopping incidents.',
    id: 'threat-monitoring',
  },
  {
    title: 'Proactive incident response',
    body: 'When threats are detected, we respond, so you never face an attack alone.',
    id: 'incident-response',
  },
  {
    title: 'Security Operations Center (SOC)',
    body: 'Expert-led, round-the-clock monitoring and incident handling by a dedicated team.',
    id: 'soc',
  },
  {
    title: 'Regulatory compliance assistance',
    body: 'Helping you meet regulatory and auditing standards.',
    id: 'compliance',
  },
  {
    title: 'Co-management of security controls',
    body: 'Security strategies personalized to fit your specific business requirements, including co-management of security controls.',
    id: 'co-management',
  },
];
