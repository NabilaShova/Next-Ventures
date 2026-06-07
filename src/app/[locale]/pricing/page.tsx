import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import { PricingComparison } from "@/components/pricing/pricing-comparison";
import { PricingTable } from "@/components/pricing/pricing-table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { pricingFaqs } from "@/config/pricing";
import { Link } from "@/i18n/routing";
import { createMetadata } from "@/lib/metadata";

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PricingPageProps) {
  const { locale } = await params;
  return createMetadata({
    title: "Pricing",
    description:
      "Transparent, scalable pricing for enterprise AI solutions. Start with a 14-day free trial.",
    path: `/${locale}/pricing`,
  });
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        badge="Pricing"
        title="Simple, Transparent Pricing"
        description="Choose the plan that fits your organization. All plans include a 14-day free trial."
      />

      <section className="section-padding">
        <div className="container-wide">
          <PricingTable />
        </div>
      </section>

      <section className="section-padding border-t bg-muted/30">
        <div className="container-wide">
          <MotionWrapper className="mb-12 text-center">
            <h2 className="heading-md">Compare Plans</h2>
          </MotionWrapper>
          <PricingComparison />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <MotionWrapper className="mb-8 text-center">
            <h2 className="heading-md">Pricing FAQ</h2>
          </MotionWrapper>
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            {pricingFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-padding border-t">
        <div className="container-wide">
          <MotionWrapper>
            <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-accent p-8 text-center text-white sm:p-12">
              <h2 className="text-2xl font-bold sm:text-3xl">Need a Custom Enterprise Plan?</h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Get dedicated infrastructure, custom AI training, on-premise deployment,
                and a dedicated success manager.
              </p>
              <Button size="lg" variant="secondary" className="mt-8" asChild>
                <Link href="/contact">
                  Talk to Sales
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </MotionWrapper>
        </div>
      </section>
    </>
  );
}
