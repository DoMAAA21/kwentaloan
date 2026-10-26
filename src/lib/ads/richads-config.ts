/** RichAds push (onclick) — pub/site from RichAds dashboard. */
export const RICHADS_PUSH_SCRIPT_SRC =
  "https://richinfo.co/richpartners/push/js/rp-cl-ob.js?pubid=1026896&siteid=410935&niche=33";

export function isRichAdsPushEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_RICHADS_PUSH_ENABLED?.trim().toLowerCase();
  if (flag === "false" || flag === "0") {
    return false;
  }
  return true;
}
