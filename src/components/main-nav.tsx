"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavActive, mainNav } from "@/lib/navigation";

const desktopLinkClassName =
  "rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

const mobileLinkClassName =
  "block rounded-md px-3 py-3.5 text-base font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

type MainNavLinksProps = {
  className?: string;
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function MainNavLinks({
  className,
  variant = "desktop",
  onNavigate,
}: MainNavLinksProps) {
  const pathname = usePathname();
  const isMobile = variant === "mobile";

  return (
    <ul
      className={cn(
        isMobile ? "flex flex-col gap-1" : "flex flex-row items-center gap-0",
        className,
      )}
    >
      {mainNav.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                isMobile ? mobileLinkClassName : desktopLinkClassName,
                active
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground",
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Desktop-only main navigation (md and up). */
export function MainNav({ className }: { className?: string }) {
  return (
    <nav aria-label="Main" className={className}>
      <MainNavLinks variant="desktop" />
    </nav>
  );
}
