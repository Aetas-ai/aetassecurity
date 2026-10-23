/**
 * FAQ sets for ServiceFaqSection. The homepage set is composed from approved
 * copy, plus drafted answers on containment approval and breaches
 * (CONTENT-TODO.md #8); per-service FAQs live with each service in
 * src/data/services.ts. Do not add new claims here (HANDOFF.md).
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    question: 'What services does Aetas Security provide?',
    answer: 'Managed Extended Detection and Response (MXDR), Incident Response, and Offensive Security: Network Security Testing and Application Security Testing (Pen Testing). We also help with regulatory compliance and the co-management of security controls.',
  },
  {
    question: 'What is Offensive Security?',
    answer: 'Offensive Security evaluates network and application defenses through dedicated testing engagements: Network Security Testing and Application Security Testing (Pen Testing).',
  },
  {
    question: 'Does AI act on its own?',
    answer: 'No. Aetas Security applies Human Led AI with Expert Human Oversight of AI (Expert in the Loop): security analysts review AI-assisted findings and approve containment before it affects your systems or users.',
  },
  {
    question: 'Who approves containment actions?',
    answer: 'A security analyst, through the escalation paths agreed with your team. Actions such as isolating a host or disabling an account do not happen without analyst approval.',
  },
  {
    question: 'What should we do if we think we have been breached?',
    answer: 'Contact us straight away by phone or email, or start from the Incident Response page. Avoid powering off or wiping affected systems: disconnecting them from the network is usually safer and preserves evidence.',
  },
  {
    question: 'How does an engagement start?',
    answer: 'We identify the service you need, define the scope and boundaries, and agree who owns routine work and where high-impact decisions are escalated.',
  },
];
