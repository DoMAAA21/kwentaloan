import Script from "next/script";
import {
  isRichAdsPushEnabled,
  RICHADS_PUSH_SCRIPT_SRC,
} from "@/lib/ads/richads-config";

/** RichAds web push prompt — pairs with public/firebase-messaging-sw.js */
export function RichAdsPushScript() {
  if (!isRichAdsPushEnabled()) {
    return null;
  }

  return (
    <Script
      id="richads-push"
      type="module"
      src={RICHADS_PUSH_SCRIPT_SRC}
      strategy="afterInteractive"
      data-cfasync="false"
    />
  );
}
