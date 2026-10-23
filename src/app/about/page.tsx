import { PageContainer } from "@/components/page-container";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata = buildPageMetadata({
  title: "About Kwentaloan",
  description:
    "Learn about Kwentaloan—a free, independent Philippine home loan calculator for monthly amortization, interest estimates, and lump sum scenarios in pesos.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <PageContainer>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          About Kwentaloan
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Kwentaloan helps Filipinos estimate home-loan payments with clear
          assumptions and no sign-up required. Results are estimates, not bank
          offers or financial advice.
        </p>
      </PageContainer>
    </main>
  );
}
