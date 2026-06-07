"use client";

import { SolutionCard } from "@/components/solutions/solution-card";

interface SolutionsGridProps {
  products: {
    id: string;
    slug: string;
    name: string;
    tagline: string | null;
    description: string;
    category: { slug: string; name: string };
    featured?: boolean;
  }[];
}

export function SolutionsGrid({ products }: SolutionsGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">No solutions found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <SolutionCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
