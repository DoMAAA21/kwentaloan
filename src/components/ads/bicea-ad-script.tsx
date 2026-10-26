import Script from "next/script";
import { BICEA_AD_SCRIPT_SRC, isBiceaAdEnabled } from "@/lib/ads/bicea-config";

/** Loads the Bicea ad library once per page (before the matching container renders). */
export function BiceaAdScript() {
  if (!isBiceaAdEnabled()) {
    return null;
  }

  return (
    <Script
      id="bicea-ad"
      async
      src={BICEA_AD_SCRIPT_SRC}
      strategy="afterInteractive"
      data-cfasync="false"
    />
  );
}
