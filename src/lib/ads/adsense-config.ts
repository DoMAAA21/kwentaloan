/** ca-pub-XXXXXXXXXXXXXXXX — from AdSense → Account → Account information */
export function getAdSenseClientId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();
  return id || undefined;
}

export function isAdSenseEnabled(): boolean {
  return Boolean(getAdSenseClientId());
}

/** Display ad unit slot IDs from AdSense → Ads → By ad unit */
export const AD_SLOTS = {
  calcTop: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CALC_TOP?.trim(),
  calcMid: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CALC_MID?.trim(),
  content: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT?.trim(),
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME?.trim(),
} as const;
