import type { Metadata } from "next";
import { PageContainer } from "@/components/page-container";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Kwentaloan — a free Philippine home loan calculator for estimating mortgage payments.",
};

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
