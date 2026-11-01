import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible,
  Fredoka,
  Geist_Mono,
} from "next/font/google";
import { GoogleAnalytics } from "@/components/google-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import { JsonLd } from "@/lib/seo/json-ld";
import {
  organizationJsonLd,
  webSiteJsonLd,
} from "@/lib/seo/organization-json-ld";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo/site-metadata";
import { getAdSenseClientId } from "@/lib/ads/adsense-config";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

const adSenseClientId = getAdSenseClientId();

/** Legibility-focused typeface (Braille Institute); used for body and headings. */
const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Rounded wordmark for Kwentaloan logo. */
const fredokaLogo = Fredoka({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} — Philippine Home Loan Calculator`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "finance",
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Philippine Home Loan Calculator`,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Philippine Home Loan Calculator`,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        atkinson.variable,
        geistMono.variable,
        fredokaLogo.variable,
      )}
    >
      <head>
        {adSenseClientId ? (
          <>
            <meta name="google-adsense-account" content={adSenseClientId} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseClientId}`}
              crossOrigin="anonymous"
            />
          </>
        ) : null}
      </head>
      <body className="flex min-h-full flex-col">
        <GoogleAnalytics />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [organizationJsonLd(), webSiteJsonLd()],
          }}
        />
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
