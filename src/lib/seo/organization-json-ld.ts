import { SITE_NAME, absoluteUrl } from "@/lib/seo/site-metadata";

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description:
      "Free Philippine home loan calculator and home financing education for Filipino homebuyers.",
    areaServed: {
      "@type": "Country",
      name: "Philippines",
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    inLanguage: "en-PH",
    description:
      "Philippine home loan calculator—monthly amortization, interest, and lump sum estimates in pesos.",
  };
}
