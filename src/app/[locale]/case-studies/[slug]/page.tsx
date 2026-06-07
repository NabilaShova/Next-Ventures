import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import { CaseStudyTimeline } from "@/components/case-studies/case-study-timeline";
import { MetricsChart } from "@/components/case-studies/metrics-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Link } from "@/i18n/routing";
import { createMetadata } from "@/lib/metadata";
import { getCaseStudyBySlug } from "@/services/case-study.service";

interface CaseStudyDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyDetailPageProps) {
  const { locale, slug } = await params;
  const result = await getCaseStudyBySlug(slug);
  if (!result) return createMetadata({ title: "Case Study Not Found", noIndex: true });

  const { caseStudy } = result;
  return createMetadata({
    title: caseStudy.title,
    description: `${caseStudy.client} — ${caseStudy.problem.slice(0, 150)}`,
    path: `/${locale}/case-studies/${slug}`,
  });
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const result = await getCaseStudyBySlug(slug);
  if (!result) notFound();

  const { caseStudy } = result;

  const timelineSteps = [
    { title: "The Challenge", description: caseStudy.problem },
    { title: "Our Solution", description: caseStudy.solution },
    { title: "Implementation", description: caseStudy.implementation },
    {
      title: "Results",
      description: caseStudy.results.highlights.join(". ") + ".",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden section-padding border-b">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="container-wide relative">
          <MotionWrapper>
            <div className="flex gap-2 mb-4">
              <Badge variant="secondary">{caseStudy.industry}</Badge>
              <Badge>{caseStudy.client}</Badge>
            </div>
            <h1 className="heading-lg max-w-3xl">{caseStudy.title}</h1>
          </MotionWrapper>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide space-y-20">
          <div>
            <MotionWrapper className="mb-8">
              <h2 className="heading-md">Key Results</h2>
            </MotionWrapper>
            <MetricsChart metrics={caseStudy.results.metrics} />
          </div>

          {caseStudy.results.highlights.length > 0 && (
            <MotionWrapper>
              <h2 className="heading-md mb-6">Highlights</h2>
              <ul className="grid gap-4 sm:grid-cols-3">
                {caseStudy.results.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-xl border bg-primary/5 p-4 text-sm font-medium"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </MotionWrapper>
          )}

          <div>
            <MotionWrapper className="mb-12 text-center">
              <h2 className="heading-md">Project Timeline</h2>
            </MotionWrapper>
            <CaseStudyTimeline steps={timelineSteps} />
          </div>
        </div>
      </section>

      <section className="section-padding border-t bg-muted/30">
        <div className="container-wide text-center">
          <MotionWrapper>
            <h2 className="heading-md">Ready for similar results?</h2>
            <p className="mt-4 text-muted-foreground">
              Let us show you how AI can transform your business.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/book-demo">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </MotionWrapper>
        </div>
      </section>
    </>
  );
}
