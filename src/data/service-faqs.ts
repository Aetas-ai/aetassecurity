/**
 * FAQ sets for ServiceFaqSection. The homepage set is composed from approved
 * copy; per-service FAQs live with each service in src/data/services.ts.
 * Do not add new claims here (HANDOFF.md).
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const homeFaqs: FaqItem[] = [
  {
    question: 'What services does Aetas Security provide?',
    answer: 'Managed Extended Detection and Response (MXDR), and Offensive Security: Network Security Testing and Application Security Testing (Pen Testing).',
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
    question: 'How does an engagement start?',
    answer: 'We identify the service you need, define the scope and boundaries, and agree who owns routine work and where high-impact decisions are escalated.',
  },
];
