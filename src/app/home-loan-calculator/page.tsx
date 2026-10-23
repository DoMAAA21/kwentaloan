import { AdSlot } from "@/components/ads/ad-slot";
import { AD_SLOTS } from "@/lib/ads/adsense-config";
import { HomeLoanCalculator } from "./_components/home-loan-calculator";
import { PageContainer } from "@/components/page-container";
import { JsonLd } from "@/lib/seo/json-ld";
import {
  calculatorAbsoluteUrl,
  calculatorCanonicalPath,
  calculatorPageJsonLd,
  FAQ_ITEMS,
} from "@/lib/seo/calculator-faq-json-ld";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = buildPageMetadata({
  title: "Home Loan Calculator Philippines — Monthly Amortization",
  description:
    "Free Philippine home loan calculator. Estimate monthly amortization, total interest, payoff date, down payment, lump sum prepayments, and a full schedule in pesos (₱).",
  path: calculatorCanonicalPath(),
  keywords: [
    "home loan calculator Philippines",
    "house loan amortization calculator",
    "mortgage calculator Philippines",
    "home loan monthly payment",
    "Pag-IBIG housing loan estimate",
    "lump sum home loan calculator",
    "bank home loan calculator Philippines",
  ],
});

export default function HomeLoanCalculatorPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = calculatorAbsoluteUrl();

  return (
    <main>
      <JsonLd data={calculatorPageJsonLd(pageUrl, siteUrl)} />
      <PageContainer>
        <header className="max-w-3xl space-y-4 pb-8">
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">
            Philippine home loan calculator
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Use this{" "}
            <strong className="font-semibold text-foreground">
              house loan calculator Philippines
            </strong>{" "}
            homebuyers rely on to estimate monthly principal-and-interest
            payments, total interest, down payment impact, optional lump sum
            prepayments, and a printable-style amortization schedule—all in
            Philippine pesos (₱). Educational estimate only; not a loan offer
            or financial advice.
          </p>
        </header>

        <AdSlot slotId={AD_SLOTS.calcTop} label="Advertisement" />

        <HomeLoanCalculator />

        <AdSlot slotId={AD_SLOTS.calcMid} label="Advertisement" />

        <section
          aria-labelledby="how-it-works-heading"
          className="mt-12 max-w-3xl space-y-4 border-t border-border pt-10"
        >
          <h2
            id="how-it-works-heading"
            className="font-heading text-2xl font-bold"
          >
            How this mortgage calculator works
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Enter property price and down payment to get the financed amount,
            then set loan term and annual interest rate. The tool computes a
            fixed-rate monthly payment and builds a month-by-month amortization
            table. Add lump sum entries for dates when you might pay extra
            principal; the schedule and interest totals update automatically.
            Insurance, taxes, and lender fees are not included.
          </p>
        </section>

        <section
          aria-labelledby="calculator-faq-heading"
          className="mt-12 max-w-3xl space-y-4 border-t border-border pt-10"
        >
          <h2 id="calculator-faq-heading" className="font-heading text-2xl font-bold">
            Frequently asked questions
          </h2>
          <dl className="space-y-6 text-base leading-relaxed">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question}>
                <dt className="font-semibold">{item.question}</dt>
                <dd className="mt-1 text-muted-foreground">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <AdSlot slotId={AD_SLOTS.content} label="Advertisement" />

        <section
          aria-labelledby="calculator-definitions-heading"
          className="mt-12 max-w-3xl space-y-4 border-t border-border pt-10"
        >
          <h2
            id="calculator-definitions-heading"
            className="font-heading text-2xl font-bold"
          >
            Key terms
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
