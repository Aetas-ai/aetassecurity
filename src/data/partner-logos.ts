/**
 * Cybersecurity technology partners, the same approved list, artwork, and
 * official links as aetas.ai (src/data/partner-logos.ts `securityPartners`).
 * Keep the two sites in sync when the approved list changes. Partners from
 * the previous aetassecurity.com are listed in CONTENT-TODO.md, not here.
 */

export interface ImageLogo {
  kind: 'img';
  name: string;
  website: string;
  src: string;
  width: number;
  height: number;
}

export type PartnerLogo = ImageLogo;

export const securityPartners: ImageLogo[] = [
  { kind: 'img', name: 'SentinelOne', src: '/partners/sentinelone-logo.png', width: 500, height: 96, website: 'https://www.sentinelone.com/' },
  { kind: 'img', name: 'CrowdStrike', src: '/partners/crowdstrike-logo.svg', width: 164, height: 37, website: 'https://www.crowdstrike.com/' },
  { kind: 'img', name: 'Zscaler', src: '/partners/zscaler-logo.png', width: 300, height: 63, website: 'https://www.zscaler.com/' },
  { kind: 'img', name: 'Qualys', src: '/partners/qualys-logo.png', width: 300, height: 94, website: 'https://www.qualys.com/' },
  { kind: 'img', name: 'Proofpoint', src: '/partners/proofpoint-logo.svg', width: 172, height: 33, website: 'https://www.proofpoint.com/' },
  { kind: 'img', name: 'Abnormal', src: '/partners/abnormal-logo.png', width: 300, height: 52, website: 'https://abnormal.ai/' },
  { kind: 'img', name: 'Sublime Security', src: '/partners/sublime-logo.svg', width: 130, height: 27, website: 'https://sublime.security/' },
];

/** [CONFIRM] MSP partner portal URL (CONTENT-TODO.md); unset hides the button. */
export const partnerPortalUrl: string | undefined = undefined;
