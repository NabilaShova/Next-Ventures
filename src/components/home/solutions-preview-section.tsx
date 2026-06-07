import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SolutionCard } from "@/components/solutions/solution-card";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Link } from "@/i18n/routing";
import { getFeaturedProducts } from "@/services/product.service";

export async function SolutionsPreviewSection() {
  const t = await getTranslations("common");
  const { products } = await getFeaturedProducts();

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <MotionWrapper>
            <h2 className="heading-md">Featured Solutions</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Pre-built AI agents and platforms ready to deploy in your enterprise.
            </p>
          </MotionWrapper>
          <Button variant="outline" asChild>
            <Link href="/solutions">
              {t("viewSolutions")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product, i) => (
            <SolutionCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
