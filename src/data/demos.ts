/**
 * Simulated data for the code-rendered MXDR demo.
 *
 * Rules: every value is illustrative. Use reserved example domains
 * (*.example.com), documentation IP ranges (192.0.2.0/24, 198.51.100.0/24,
 * 203.0.113.0/24), generic roles, and relative times. Do not add vendor or
 * product names, client names, or performance claims that could read as
 * real Aetas Security results. See HANDOFF.md "Code-rendered demos".
 */

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export interface MxdrAlert {
  id: string;
  severity: Severity;
  title: string;
  source: 'Endpoint' | 'Identity' | 'Email' | 'Network';
  asset: string;
  age: string;
  timeline: readonly [string, string, string, string, string];
}

export const mxdrStages = ['Detect', 'Triage', 'Investigate', 'Contain', 'Report'] as const;

export const mxdrAlerts: MxdrAlert[] = [
  {
    id: 'DET-7731',
    severity: 'high',
    title: 'Encoded script execution',
    source: 'Endpoint',
    asset: 'ws-14.corp.example.com',
    age: '2m',
    timeline: [
      'Detection raised for an encoded script launched by an office document.',
      'Severity confirmed High. Three related events correlated on the same host.',
      'Process chain reviewed. Outbound connection to 198.51.100.24 identified.',
      'Host isolation recommended. Analyst approved containment.',
      'Client contact notified with summary, scope, and recommended next steps.',
    ],
  },
  {
    id: 'DET-7729',
    severity: 'medium',
    title: 'Sign-in from unfamiliar location',
    source: 'Identity',
    asset: 'user-0142@example.com',
    age: '9m',
    timeline: [
      'Sign-in flagged from a location not seen for this account.',
      'Severity set Medium. No matching travel or VPN record found.',
      'Session details and recent mailbox activity reviewed.',
      'Session revoked and password reset requested. Analyst approved.',
      'Account owner and client contact informed. Case documented.',
    ],
  },
  {
    id: 'DET-7724',
    severity: 'critical',
    title: 'Rapid file rename pattern',
    source: 'Endpoint',
    asset: 'fs-02.corp.example.com',
    age: '14m',
    timeline: [
      'Detection raised for mass file renames on a file server share.',
      'Severity raised to Critical. Escalation path started immediately.',
      'Originating account and process identified; spread limited to one share.',
      'Account disabled and host isolated. Analyst approved containment.',
      'Client incident contact briefed. Recovery steps handed to the client team.',
    ],
  },
  {
    id: 'DET-7718',
    severity: 'low',
    title: 'New mailbox forwarding rule',
    source: 'Email',
    asset: 'shared-inbox@example.com',
    age: '31m',
    timeline: [
      'New external forwarding rule detected on a shared mailbox.',
      'Severity set Low. Rule created by a known administrator account.',
      'Rule destination and creator activity reviewed.',
      'Rule confirmed as approved change. No containment required.',
      'Finding documented and closed with the approval reference.',
    ],
  },
];
