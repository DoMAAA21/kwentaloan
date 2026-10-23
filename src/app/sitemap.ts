import type { MetadataRoute } from "next";
import { absoluteUrl, INDEXABLE_ROUTES } from "@/lib/seo/site-metadata";

/** Fixed date avoids prerender instability; update when publishing major content. */
const LAST_CONTENT_UPDATE = "2026-03-23";

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: path === "/home-loan-calculator" ? "weekly" : "monthly",
    priority,
  }));
}
