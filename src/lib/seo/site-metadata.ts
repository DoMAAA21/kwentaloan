import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const SITE_NAME = "Kwentaloan";

export const DEFAULT_DESCRIPTION =
  "Free Philippine home loan calculator. Estimate monthly amortization, total interest, lump sum payments, and mortgage schedules in pesos (₱)—no sign-up.";

/** Indexable marketing and policy routes for sitemap generation. */
export const INDEXABLE_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/home-loan-calculator", priority: 0.95 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.5 },
  { path: "/privacy", priority: 0.4 },
  { path: "/terms", priority: 0.4 },
];

type PageMetadataOptions = {
  title: string;
  description: string;
  /** Path only, e.g. `/about` */
  path: string;
  keywords?: string[];
  /** Set true for pages that should not appear in search results */
  noIndex?: boolean;
};

/** Consistent title, canonical, Open Graph, and Twitter metadata per route. */
export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const { title, description, path, keywords, noIndex = false } = options;
  const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "");

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      locale: "en_PH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path === "/") {
    return base;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
