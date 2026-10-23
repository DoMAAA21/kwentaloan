import { PageContainer } from "@/components/page-container";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Kwentaloan with questions about the Philippine home loan calculator, site feedback, or corrections.",
  path: "/contact",
});

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
