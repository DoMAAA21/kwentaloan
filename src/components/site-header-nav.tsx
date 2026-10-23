"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { RiCloseLine, RiMenuLine } from "@remixicon/react";
import { MainNav, MainNavLinks } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      {menuOpen ? (
        <div
          className="fixed inset-0 z-40 bg-foreground/25 md:hidden"
          aria-hidden
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <div className="relative z-50 mx-auto w-full max-w-6xl px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Kwentaloan home"
            className="font-logo text-xl font-bold leading-none tracking-tight text-foreground rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Kwenta<span className="text-[#0055AA] text-2xl">LOAN</span>
          </Link>

          <MainNav className="hidden md:block" />

          <Button
            type="button"
            variant="outline"
            className="size-11 md:hidden [&_svg]:size-6"
            aria-expanded={menuOpen}
            aria-controls={panelId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <RiCloseLine aria-hidden />
            ) : (
              <RiMenuLine aria-hidden />
            )}
          </Button>
        </div>

        <div
          id={panelId}
          className={cn(
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-200 ease-out",
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
          )}
          aria-hidden={!menuOpen}
          {...(!menuOpen ? { inert: true as const } : {})}
        >
          <nav aria-label="Main" className="border-t border-border pt-3 pb-2">
            <MainNavLinks
              variant="mobile"
              onNavigate={() => setMenuOpen(false)}
            />
          </nav>
        </div>
      </div>
    </>
  );
}
