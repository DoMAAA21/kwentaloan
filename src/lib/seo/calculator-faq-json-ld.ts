import { absoluteUrl } from "@/lib/seo/site-metadata";

const FAQ_ITEMS = [
  {
    question: "What is a home loan amortization calculator?",
    answer:
      "It estimates your regular monthly payment and how each payment splits between interest and principal over the loan term, using the amount financed, interest rate, and length of the loan.",
  },
  {
    question: "Does this Pag-IBIG housing loan calculator?",
    answer:
      "Kwentaloan is an independent tool, not affiliated with Pag-IBIG Fund. You can enter your own rate and term to model a housing loan scenario, but official Pag-IBIG schedules may differ.",
  },
  {
    question: "What is a lump sum payment on a home loan?",
    answer:
      "A lump sum is a one-time extra payment applied to your loan balance, in addition to your scheduled amortization. If your lender allows it, it may reduce total interest and shorten the loan term.",
  },
  {
    question: "Are property taxes and insurance included?",
    answer:
      "No. This calculator focuses on principal and interest only. Taxes, mortgage insurance, and bank fees are excluded unless you add them separately.",
  },
] as const;

export function calculatorFaqJsonLd() {
  return {
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export { FAQ_ITEMS };

export function calculatorPageJsonLd(pageUrl: string, siteUrl: string) {
  return {
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
          "Philippine home loan calculator for monthly amortization, interest totals, lump sum payments, and amortization schedules.",
        inLanguage: "en-PH",
        isAccessibleForFree: true,
        audience: {
          "@type": "Audience",
          geographicArea: {
            "@type": "Country",
            name: "Philippines",
          },
        },
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
      calculatorFaqJsonLd(),
    ],
  };
}

export function calculatorCanonicalPath() {
  return "/home-loan-calculator";
}

export function calculatorAbsoluteUrl() {
  return absoluteUrl(calculatorCanonicalPath());
}
