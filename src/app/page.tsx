import Link from "next/link";
import { PageContainer } from "@/components/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main>
      <PageContainer>
        <header className="max-w-2xl space-y-4">
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">
            Kwentaloan
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Free tools to estimate Philippine home loan payments, interest, and
            amortization—in pesos, with no sign-up.
          </p>
          <Link
            href="/home-loan-calculator"
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
          >
            Open home loan calculator
          </Link>
        </header>
      </PageContainer>
    </main>
  );
}
