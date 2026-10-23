"use client";

import { useEffect } from "react";
import { getAdSenseClientId } from "@/lib/ads/adsense-config";
import { cn } from "@/lib/utils";

type AdSlotProps = {
  /** AdSense ad unit slot id (numeric string from AdSense dashboard) */
  slotId: string | undefined;
  className?: string;
  /** Accessible name; visible “Advertisement” label shown above unit */
  label?: string;
};

export function AdSlot({
  slotId,
  className,
  label = "Advertisement",
}: AdSlotProps) {
  const clientId = getAdSenseClientId();

  useEffect(() => {
    if (!clientId || !slotId) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Duplicate push on the same unit; ignore in React strict mode
    }
  }, [clientId, slotId]);

  if (!clientId || !slotId) {
    return null;
  }

  return (
    <aside
      aria-label={label}
      className={cn(
        "my-8 w-full overflow-hidden rounded-lg border border-border bg-muted/20 py-4",
        className,
      )}
    >
      <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex min-h-[90px] justify-center px-2">
        <ins
          className="adsbygoogle block w-full max-w-4xl"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
