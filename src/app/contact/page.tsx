import type { Metadata } from "next";
import { PageContainer } from "@/components/page-container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Kwentaloan for questions about the home loan calculator.",
};

export default function ContactPage() {
  return (
    <main>
      <PageContainer>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Contact
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Contact details will be added here.
        </p>
      </PageContainer>
    </main>
  );
}
