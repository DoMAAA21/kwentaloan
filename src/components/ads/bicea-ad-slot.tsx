import {
  BICEA_AD_CONTAINER_ID,
  isBiceaAdEnabled,
} from "@/lib/ads/bicea-config";
import { cn } from "@/lib/utils";

type BiceaAdSlotProps = {
  className?: string;
  label?: string;
};

export function BiceaAdSlot({
  className,
  label = "Advertisement",
}: BiceaAdSlotProps) {
  if (!isBiceaAdEnabled()) {
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
        <div id={BICEA_AD_CONTAINER_ID} className="w-full max-w-4xl" />
      </div>
    </aside>
  );
}
