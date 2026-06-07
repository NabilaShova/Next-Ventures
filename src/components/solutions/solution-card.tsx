"use client";

import { ArrowRight, Bot } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Link } from "@/i18n/routing";

interface SolutionCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    tagline: string | null;
    description: string;
    category: { slug: string; name: string };
    featured?: boolean;
  };
  index?: number;
}

export function SolutionCard({ product, index = 0 }: SolutionCardProps) {
  return (
    <MotionWrapper delay={index * 0.08}>
      <div className="group flex h-full flex-col rounded-2xl border bg-card transition-all hover:border-primary/30 hover:shadow-float">
        <div className="flex aspect-[16/10] items-center justify-center rounded-t-2xl bg-gradient-to-br from-brand-500/10 via-background to-accent/10">
          <Bot className="h-12 w-12 text-primary/40 transition-colors group-hover:text-primary" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="secondary">{product.category.name}</Badge>
            {product.featured && <Badge>Featured</Badge>}
          </div>
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.tagline && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.tagline}</p>
          )}
          <p className="mt-3 flex-1 text-sm text-muted-foreground line-clamp-3">
            {product.description}
          </p>
          <Button variant="ghost" className="mt-4 w-full justify-between" asChild>
            <Link href={`/solutions/${product.slug}`}>
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </MotionWrapper>
  );
}
