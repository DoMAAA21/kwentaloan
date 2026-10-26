import Link from "next/link";
import { AdSlot } from "@/components/ads/ad-slot";
// import { BiceaAdSlot } from "@/components/ads/bicea-ad-slot";
import { PageContainer } from "@/components/page-container";
import { AD_SLOTS } from "@/lib/ads/adsense-config";
import { buttonVariants } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo/site-metadata";
import { cn } from "@/lib/utils";

export const metadata = buildPageMetadata({
  title: "Philippine Home Loan Calculator — Free Amortization in Pesos",
  description:
    "Kwentaloan is a free home loan calculator for the Philippines. Estimate monthly house loan payments, total interest, down payment, lump sum prepayments, and amortization schedules in ₱.",
  path: "/",
  keywords: [
    "home loan calculator Philippines",
    "house loan calculator Philippines",
    "mortgage calculator Philippines",
    "Pag-IBIG housing loan estimate",
    "home loan amortization Philippines",
  ],
});

export default function Home() {
  return (
    <main>
      <PageContainer>
        <header className="max-w-3xl space-y-4">
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">
            Free Philippine home loan calculator
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Kwentaloan helps you estimate{" "}
            <strong className="font-semibold text-foreground">
              monthly home loan amortization
            </strong>
            , total interest, and payoff timelines for property in the
            Philippines—using pesos (₱), with optional down payment and lump sum
            scenarios. No account required.
          </p>
          <Link
            href="/home-loan-calculator"
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
          >
            Use the home loan calculator
          </Link>
        </header>

        <AdSlot slotId={AD_SLOTS.home} label="Advertisement" />
        {/* <BiceaAdSlot /> — Bicea disabled (inappropriate ads) */}

        <section
          aria-labelledby="home-features-heading"
          className="mt-12 max-w-3xl space-y-4 border-t border-border pt-10"
        >
          <h2
            id="home-features-heading"
            className="font-heading text-2xl font-bold"
          >
            What you can calculate
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
            <li>
              Monthly principal-and-interest payment from property price, down
              payment, term, and rate
            </li>
            <li>
              Full amortization schedule (monthly and annual views)
            </li>
            <li>
              Lump sum prepayments and estimated interest savings
            </li>
            <li>
              Rough affordability check from gross income (not a bank approval)
            </li>
          </ul>
          <p className="text-base text-muted-foreground">
            Results are educational estimates only—not offers from Pag-IBIG, banks,
            or other lenders.
          </p>
        </section>
      </PageContainer>
    </main>
  );
}
