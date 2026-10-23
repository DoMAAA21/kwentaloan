import type { Metadata } from "next";
import { HomeLoanCalculator } from "./_components/home-loan-calculator";
import { PageContainer } from "@/components/page-container";
import { getSiteUrl } from "@/lib/site-url";

const pagePath = "/home-loan-calculator";

export const metadata: Metadata = {
  title: "Home Loan Calculator Philippines — Monthly Amortization",
  description:
    "Free Philippine home loan calculator. Estimate monthly amortization, total interest, payoff date, extra principal payments, and an amortization schedule in pesos.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Home Loan Calculator Philippines | Kwentaloan",
    description:
      "Estimate monthly home loan payments, total interest, and amortization for Philippine mortgages—in pesos, no sign-up.",
    url: pagePath,
    type: "website",
    locale: "en_PH",
    siteName: "Kwentaloan",
  },
  keywords: [
    "home loan calculator Philippines",
    "house loan amortization calculator",
    "mortgage calculator Philippines",
    "home loan monthly payment",
    "Pag-IBIG housing loan estimate",
    "extra payment home loan calculator",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomeLoanCalculatorPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${pagePath}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Kwentaloan Home Loan Calculator",
        url: pageUrl,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "PHP",
        },
        description:
          "Philippine home loan calculator for monthly amortization, interest totals, and amortization schedules.",
        inLanguage: "en-PH",
        isAccessibleForFree: true,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Home Loan Calculator",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageContainer>
        <header className="max-w-3xl space-y-4 pb-8">
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">
            Philippine home loan calculator
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Estimate your monthly principal-and-interest payment, see how much
            interest you may pay over the term, optional lump sum payments, and
            a full amortization schedule—using Philippine pesos (₱).
            This is an educational estimate, not a loan offer or financial
            advice.
          </p>
        </header>

        <HomeLoanCalculator />

        <section
          aria-labelledby="calculator-faq-heading"
          className="mt-12 max-w-3xl space-y-4 border-t border-border pt-10"
        >
          <h2 id="calculator-faq-heading" className="font-heading text-2xl font-bold">
            Quick definitions
          </h2>
          <dl className="space-y-4 text-base leading-relaxed">
            <div>
              <dt className="font-semibold">Principal</dt>
              <dd className="text-muted-foreground">
                The amount you borrow—the loan balance before interest.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Interest</dt>
              <dd className="text-muted-foreground">
                The cost of borrowing, calculated on your remaining balance
                each month.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Amortization</dt>
              <dd className="text-muted-foreground">
                Paying the loan over time through scheduled payments that split
                between interest and principal.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Lump sum</dt>
              <dd className="text-muted-foreground">
                A one-time extra payment on top of your regular amortization,
                often called lump sum in the Philippines. It may reduce total
                interest and shorten the term if your lender allows it.
              </dd>
            </div>
          </dl>
        </section>
      </PageContainer>
    </main>
  );
}
