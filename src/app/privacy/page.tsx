import { PageContainer } from "@/components/page-container";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Kwentaloan privacy policy—how we handle cookies, analytics, advertising, and data when you use our Philippine home loan calculator.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main>
      <PageContainer>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Full privacy policy content will be published here, including
          disclosures for advertising and analytics cookies.
        </p>
      </PageContainer>
    </main>
  );
}
