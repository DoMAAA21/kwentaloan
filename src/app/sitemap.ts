import type { MetadataRoute } from "next";
import { absoluteUrl, SITEMAP_ENTRIES } from "@/lib/seo/site-metadata";

/** Fixed date avoids prerender instability; update when publishing major content. */
const LAST_CONTENT_UPDATE = "2026-03-23";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ENTRIES.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: path === "/home-loan-calculator" ? "weekly" : "monthly",
    priority,
  }));
}
