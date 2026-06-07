"use client";

import { ArrowRight, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Link } from "@/i18n/routing";
import type { CaseStudyResults } from "@/types";

interface CaseStudyCardProps {
  caseStudy: {
    slug: string;
    title: string;
    client: string;
    industry: string;
    results: CaseStudyResults;
    revenueIncrease: number | null;
    costReduction: number | null;
    featured?: boolean;
  };
  index?: number;
}

export function CaseStudyCard({ caseStudy, index = 0 }: CaseStudyCardProps) {
  return (
    <MotionWrapper delay={index * 0.08}>
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:border-primary/30 hover:shadow-float">
        <div className="aspect-[16/9] bg-gradient-to-br from-brand-500/10 to-accent/10 p-6 flex items-end">
          <div className="flex gap-2">
            <Badge variant="secondary">{caseStudy.industry}</Badge>
            {caseStudy.featured && <Badge>Featured</Badge>}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-sm font-medium text-primary">{caseStudy.client}</p>
          <h3 className="mt-2 text-lg font-semibold group-hover:text-primary transition-colors">
            {caseStudy.title}
          </h3>

          {caseStudy.results.metrics.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {caseStudy.results.metrics.slice(0, 3).map((m) => (
                <div key={m.label} className="rounded-lg bg-muted/50 p-2 text-center">
                  <p className="text-lg font-bold text-primary">{m.value}</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {(caseStudy.revenueIncrease || caseStudy.costReduction) && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              {caseStudy.revenueIncrease && `+${caseStudy.revenueIncrease}% revenue`}
              {caseStudy.revenueIncrease && caseStudy.costReduction && " · "}
              {caseStudy.costReduction && `-${caseStudy.costReduction}% costs`}
            </div>
          )}

          <Button variant="ghost" className="mt-auto pt-4 w-full justify-between" asChild>
            <Link href={`/case-studies/${caseStudy.slug}`}>
              Read case study
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </MotionWrapper>
  );
}
