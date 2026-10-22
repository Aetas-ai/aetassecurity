/**
 * How Aetas Security works, shared by the homepage, About, and Contact.
 * Engagement steps and principles adapt approved aetas.ai wording; the rest
 * is drafted copy listed in CONTENT-TODO.md for Sir Rob's review.
 */

export type Pair = [title: string, body: string];

/** Homepage "Why Aetas Security" pillars. */
export const pillars: Pair[] = [
  ['Experienced security professionals', 'Detection, investigation, response, and testing guided by experienced security professionals.'],
  ['Expert in the Loop', 'AI assists the analyst. Containment waits for analyst approval, so no automated action reaches your systems unreviewed.'],
  ['Defined escalation', 'Agreed contacts, escalation paths, and documented activity for every engagement.'],
  ['Technology follows the requirement', 'We align technology from approved partners to your scope, not the other way round.'],
];

/** Expert Human Oversight of AI (Expert in the Loop), as a sequence. */
export const expertSteps: Pair[] = [
  ['AI assists', 'Human Led AI helps correlate detections, summarize activity, and recommend next steps.'],
  ['Analyst reviews', 'A security analyst validates the finding and its context.'],
  ['Analyst approves', 'Containment happens only after analyst approval, through defined escalation paths.'],
  ['Documented', 'Decisions, actions, and outcomes are recorded for your team.'],
];

export const principles: Pair[] = [
  ['Human accountability', 'Human Led AI includes Expert Human Oversight of AI for decisions that affect your systems, accounts, or users.'],
  ['Defined ownership', 'Each engagement identifies responsibilities, review points, handoffs, and escalation paths.'],
  ['Scope before delivery', 'Work begins by clarifying your need, the service boundaries, dependencies, and expected outcomes.'],
  ['Technology follows the requirement', 'Suitable technology is aligned after scope, responsibilities, review points, and escalation paths are clear.'],
];

export const engagementSteps: Pair[] = [
  ['Identify the service', 'Determine whether the requirement is managed detection and response (MXDR), Network Security Testing, or Application Security Testing.'],
  ['Define the work and boundaries', 'Document systems, responsibilities, dependencies, exclusions, and expected handoffs for the selected service.'],
  ['Set ownership and escalation', 'Establish who handles routine work, who reviews exceptions, and where high-impact decisions are escalated.'],
  ['Review delivery within scope', 'Evaluate the agreed work, address recurring blockers, and define any changes with the responsible Aetas Security specialists.'],
];

/** Contact page: what happens after someone gets in touch. */
export const nextSteps: Pair[] = [
  ['We reply', 'A security specialist reviews your request and replies by email.'],
  ['Scoping conversation', 'We discuss your environment, goals, and constraints.'],
  ['Proposed scope', 'You receive a proposed scope with responsibilities, boundaries, and next steps.'],
];
