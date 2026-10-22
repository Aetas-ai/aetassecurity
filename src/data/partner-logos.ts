/**
 * Technology partners listed on the previous aetassecurity.com. Logos and
 * names are published on /partners only after business approval: set
 * `approved: true` once Sir Rob confirms the partner and its artwork
 * (CONTENT-TODO.md). Partners without artwork render as a text name.
 * Artwork reused from aetas.ai keeps its approved proportions.
 */

export interface SvgLogo {
  kind: 'svg';
  name: string;
  website: string;
  viewBox: string;
  /** Rendered box size in em, to keep each mark's approved proportions. */
  width: number;
  height: number;
  paths: { d: string; fill: string }[];
}

export interface ImageLogo {
  kind: 'img';
  name: string;
  website: string;
  src: string;
  width: number;
  height: number;
}

export type PartnerLogo = SvgLogo | ImageLogo;

export interface Partner {
  name: string;
  website?: string;
  logo?: PartnerLogo;
  approved: boolean;
}

const microsoft: SvgLogo = {
  kind: 'svg',
  name: 'Microsoft',
  website: 'https://www.microsoft.com/',
  viewBox: '0 0 256 256',
  width: 1,
  height: 1,
  paths: [
    { fill: '#F1511B', d: 'M121.666 121.666H0V0h121.666z' },
    { fill: '#80CC28', d: 'M256 121.666H134.335V0H256z' },
    { fill: '#00ADEF', d: 'M121.663 256.002H0V134.336h121.663z' },
    { fill: '#FBBC09', d: 'M256 256.002H134.335V134.336H256z' },
  ],
};

const aws: SvgLogo = {
  kind: 'svg',
  name: 'Amazon Web Services',
  website: 'https://aws.amazon.com/',
  viewBox: '0 0 304 182',
  width: 1.67,
  height: 1,
  paths: [
    {
      fill: '#ffffff',
      d: 'm86 66 2 9c0 3 1 5 3 8v2l-1 3-7 4-2 1-3-1-4-5-3-6c-8 9-18 14-29 14-9 0-16-3-20-8-5-4-8-11-8-19s3-15 9-20c6-6 14-8 25-8a79 79 0 0 1 22 3v-7c0-8-2-13-5-16-3-4-8-5-16-5l-11 1a80 80 0 0 0-14 5h-2c-1 0-2-1-2-3v-5l1-3c0-1 1-2 3-2l12-5 16-2c12 0 20 3 26 8 5 6 8 14 8 25v32zM46 82l10-2c4-1 7-4 10-7l3-6 1-9v-4a84 84 0 0 0-19-2c-6 0-11 1-15 4-3 2-4 6-4 11s1 8 3 11c3 2 6 4 11 4zm80 10-4-1-2-3-23-78-1-4 2-2h10l4 1 2 4 17 66 15-66 2-4 4-1h8l4 1 2 4 16 67 17-67 2-4 4-1h9c2 0 3 1 3 2v2l-1 2-24 78-2 4-4 1h-9l-4-1-1-4-16-65-15 64-2 4-4 1h-9zm129 3a66 66 0 0 1-27-6l-3-3-1-2v-5c0-2 1-3 2-3h2l3 1a54 54 0 0 0 23 5c6 0 11-2 14-4 4-2 5-5 5-9l-2-7-10-5-15-5c-7-2-13-6-16-10a24 24 0 0 1 5-34l10-5a44 44 0 0 1 20-2 110 110 0 0 1 12 3l4 2 3 2 1 4v4c0 3-1 4-2 4l-4-2c-6-2-12-3-19-3-6 0-11 0-14 2s-4 5-4 9c0 3 1 5 3 7s5 4 11 6l14 4c7 3 12 6 15 10s5 9 5 14l-3 12-7 8c-3 3-7 5-11 6l-14 2z',
    },
    { fill: '#f90', d: 'M274 144A220 220 0 0 1 4 124c-4-3-1-6 2-4a300 300 0 0 0 263 16c5-2 10 4 5 8z' },
    { fill: '#f90', d: 'M287 128c-4-5-28-3-38-1-4 0-4-3-1-5 19-13 50-9 53-5 4 5-1 36-18 51-3 2-6 1-5-2 5-10 13-33 9-38z' },
  ],
};

const googleCloud: SvgLogo = {
  kind: 'svg',
  name: 'Google Cloud',
  website: 'https://cloud.google.com/',
  viewBox: '0 -25 256 256',
  width: 1.27,
  height: 1,
  paths: [
    { fill: '#EA4335', d: 'm170.252 56.819 22.253-22.253 1.483-9.37C153.437-11.677 88.976-7.496 52.42 33.92 42.267 45.423 34.734 59.764 30.717 74.573l7.97-1.123 44.505-7.34 3.436-3.513c19.797-21.742 53.27-24.667 76.128-6.168l7.496.39Z' },
    { fill: '#4285F4', d: 'M224.205 73.918a100.249 100.249 0 0 0-30.217-48.722l-31.232 31.232a55.515 55.515 0 0 1 20.379 44.037v5.544c15.35 0 27.797 12.445 27.797 27.796 0 15.352-12.446 27.485-27.797 27.485h-55.671l-5.466 5.934v33.34l5.466 5.231h55.67c39.93.311 72.553-31.494 72.864-71.424a72.303 72.303 0 0 0-31.793-60.453' },
    { fill: '#34A853', d: 'M71.87 205.796h55.593V161.29H71.87a27.275 27.275 0 0 1-11.399-2.498l-7.887 2.42-22.409 22.253-1.952 7.574c12.567 9.489 27.9 14.825 43.647 14.757' },
    { fill: '#FBBC05', d: 'M71.87 61.425C31.94 61.664-.237 94.228.001 134.159a72.301 72.301 0 0 0 28.222 56.88l32.248-32.246c-13.99-6.322-20.208-22.786-13.887-36.776 6.32-13.99 22.786-20.208 36.775-13.888a27.796 27.796 0 0 1 13.887 13.888l32.248-32.248A72.224 72.224 0 0 0 71.87 61.425' },
  ],
};

const img = (name: string, src: string, width: number, height: number, website: string): ImageLogo => ({ kind: 'img', name, src, width, height, website });

export const partners: Partner[] = [
  { name: 'Qualys', website: 'https://www.qualys.com/', logo: img('Qualys', '/partners/qualys-logo.png', 300, 94, 'https://www.qualys.com/'), approved: false },
  { name: 'Vulcan', website: 'https://vulcan.io/', approved: false },
  { name: 'Microsoft', website: microsoft.website, logo: microsoft, approved: false },
  { name: 'Halcyon', website: 'https://www.halcyon.ai/', approved: false },
  { name: 'Aetas Global', website: 'https://www.aetasglobal.com/', approved: false },
  { name: 'Amazon Web Services', website: aws.website, logo: aws, approved: false },
  { name: 'OnDefend', website: 'https://www.ondefend.com/', approved: false },
  { name: 'SentinelOne', website: 'https://www.sentinelone.com/', logo: img('SentinelOne', '/partners/sentinelone-logo.png', 500, 96, 'https://www.sentinelone.com/'), approved: false },
  { name: 'Abnormal', website: 'https://abnormal.ai/', logo: img('Abnormal', '/partners/abnormal-logo.png', 300, 52, 'https://abnormal.ai/'), approved: false },
  { name: 'Synopsys', approved: false },
  { name: 'Lightstream', website: 'https://lightstream.io/', approved: false },
  { name: 'Zscaler', website: 'https://www.zscaler.com/', logo: img('Zscaler', '/partners/zscaler-logo.png', 300, 63, 'https://www.zscaler.com/'), approved: false },
  { name: 'Google Cloud', website: googleCloud.website, logo: googleCloud, approved: false },
];

export const approvedPartners = partners.filter((partner) => partner.approved);

/** [CONFIRM] MSP partner portal URL (CONTENT-TODO.md); unset hides the button. */
export const partnerPortalUrl: string | undefined = undefined;
