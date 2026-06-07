import { setRequestLocale } from "next-intl/server";

import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { PageHeader } from "@/components/ui/page-header";
import { createMetadata } from "@/lib/metadata";
import { getCaseStudies } from "@/services/case-study.service";

interface CaseStudiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CaseStudiesPageProps) {
  const { locale } = await params;
  return createMetadata({
    title: "Case Studies",
    description:
      "See how leading enterprises use Next Ventures AI to increase revenue, reduce costs, and automate operations.",
    path: `/${locale}/case-studies`,
  });
}

export default async function CaseStudiesPage({ params }: CaseStudiesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { caseStudies } = await getCaseStudies();

  return (
    <>
      <PageHeader
        badge="Success Stories"
        title="Case Studies"
        description="Real results from real enterprises. See how our AI solutions deliver measurable business impact."
      />
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-8 sm:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={cs.id} caseStudy={cs} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
