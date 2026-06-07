import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/ui/page-header";
import { SolutionsFilter } from "@/components/solutions/solutions-filter";
import { SolutionsGrid } from "@/components/solutions/solutions-grid";
import { createMetadata } from "@/lib/metadata";
import { getProducts } from "@/services/product.service";

interface SolutionsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string;
    search?: string;
    sort?: string;
  }>;
}

export async function generateMetadata({ params }: SolutionsPageProps) {
  const { locale } = await params;
  return createMetadata({
    title: "Solutions",
    description:
      "Explore our enterprise AI agents, SaaS platforms, automation tools, and custom software solutions.",
    path: `/${locale}/solutions`,
  });
}

export default async function SolutionsPage({
  params,
  searchParams,
}: SolutionsPageProps) {
  const { locale } = await params;
  const { category, search, sort } = await searchParams;
  setRequestLocale(locale);

  const { products: rawProducts } = await getProducts({
    category: category && category !== "all" ? category : undefined,
    search: search || undefined,
  });

  let products = [...rawProducts];
  if (sort === "featured") {
    products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  } else {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <>
      <PageHeader
        badge="Solutions"
        title="Enterprise AI Solutions"
        description="Pre-built AI agents, SaaS platforms, and automation tools ready to deploy in your organization."
      />
      <section className="section-padding">
        <div className="container-wide">
          <Suspense fallback={<div className="h-24 animate-pulse rounded-lg bg-muted" />}>
            <SolutionsFilter />
          </Suspense>
          <div className="mt-12">
            <SolutionsGrid products={products} />
          </div>
        </div>
      </section>
    </>
  );
}
