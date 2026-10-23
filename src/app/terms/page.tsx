import { PageContainer } from "@/components/page-container";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata = buildPageMetadata({
  title: "Terms & Disclaimer",
  description:
    "Terms of use and calculator disclaimer for Kwentaloan—not a bank, Pag-IBIG, or loan approval service.",
  path: "/terms",
});

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
