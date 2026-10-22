/**
 * Homepage FAQs. Every answer is composed from approved copy already on the
 * homepage (HANDOFF.md); do not add new claims here.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const serviceFaqs: Record<'security', FaqItem[]> = {
  security: [
    {
      question: 'What does MXDR include?',
      answer: 'Managed Extended Detection and Response (MXDR) provides continuous detection, investigation, response, and escalation guided by experienced security professionals.',
    },
    {
      question: 'What is Offensive Security?',
      answer: 'Offensive Security evaluates network and application defenses through dedicated testing engagements: Network Security Testing and Application Security Testing (Pen Testing).',
    },
    {
      question: 'What does Network Security Testing focus on?',
      answer: 'Network exposure, configuration weaknesses, and potential attack paths.',
    },
    {
      question: 'What does Application Security Testing (Pen Testing) focus on?',
      answer: 'Identifying and documenting security weaknesses in applications.',
    },
    {
      question: 'Does AI act on its own?',
      answer: 'No. Aetas Security applies Human Led AI with Expert Human Oversight of AI (Expert in the Loop): security analysts review AI-assisted findings and approve containment before it affects your systems or users.',
    },
  ],
};
