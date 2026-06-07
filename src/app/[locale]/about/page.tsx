import { setRequestLocale } from "next-intl/server";

import { TeamSection } from "@/components/about/team-section";
import { ValuesSection } from "@/components/about/values-section";
import { PageHeader } from "@/components/ui/page-header";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { companyTimeline } from "@/data/about";
import { createMetadata } from "@/lib/metadata";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  return createMetadata({
    title: "About",
    description:
      "Learn about Next Ventures AI — our mission, team, values, and journey building enterprise AI solutions.",
    path: `/${locale}/about`,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        badge="About Us"
        title="Building the Future of Enterprise AI"
        description="We're on a mission to make AI accessible, practical, and transformative for every enterprise."
      />

      <section className="section-padding">
        <div className="container-wide">
          <MotionWrapper className="mx-auto max-w-3xl text-center">
            <h2 className="heading-md">Our Mission</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              At Next Ventures AI, we believe every enterprise deserves access to
              world-class AI technology. We build AI agents, automation platforms, and
              custom software that deliver measurable ROI — increasing revenue, reducing
              costs, and freeing teams to focus on what matters most.
            </p>
          </MotionWrapper>
        </div>
      </section>

      <section className="section-padding border-t bg-muted/30">
        <div className="container-wide">
          <ValuesSection />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <TeamSection />
        </div>
      </section>

      <section className="section-padding border-t bg-muted/30" id="careers">
        <div className="container-wide">
          <MotionWrapper className="mb-12 text-center">
            <h2 className="heading-md">Our Journey</h2>
          </MotionWrapper>
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2" />
            <div className="space-y-8">
              {companyTimeline.map((item, i) => (
                <MotionWrapper key={item.year} delay={i * 0.1}>
                  <div className="relative flex gap-6 md:justify-center">
                    <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2">
                      <span className="text-xs font-bold text-primary">{item.year.slice(2)}</span>
                    </div>
                    <div className="ml-12 md:ml-0 md:w-1/2 md:pl-12">
                      <p className="text-sm font-medium text-primary">{item.year}</p>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
