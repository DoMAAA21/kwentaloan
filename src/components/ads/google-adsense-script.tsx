import Script from "next/script";
import { getAdSenseClientId } from "@/lib/ads/adsense-config";

/** Loads the AdSense library once per page (required before ad units render). */
export function GoogleAdSenseScript() {
  const clientId = getAdSenseClientId();

  if (!clientId) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
