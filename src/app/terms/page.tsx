import type { Metadata } from "next";
import { PageContainer } from "@/components/page-container";

export const metadata: Metadata = {
  title: "Terms & Disclaimer",
  description:
    "Terms of use and disclaimer for the Kwentaloan home loan calculator.",
};

export default function TermsPage() {
  return (
    <main>
      <PageContainer>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Terms & Disclaimer
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Terms of use and calculator disclaimer will be published here.
        </p>
      </PageContainer>
    </main>
  );
}
