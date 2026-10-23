import type { Metadata } from "next";
import { PageContainer } from "@/components/page-container";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Guides on Philippine home loans, amortization, interest, and extra payments.",
};

export default function GuidesPage() {
  return (
    <main>
      <PageContainer>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Guides
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Educational articles about home loans in the Philippines will be
          published here.
        </p>
      </PageContainer>
    </main>
  );
}
