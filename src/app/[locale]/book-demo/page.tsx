import { setRequestLocale } from "next-intl/server";

import { DemoForm } from "@/components/demo/demo-form";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";

interface BookDemoPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BookDemoPageProps) {
  const { locale } = await params;
  return createMetadata({
    title: "Book a Demo",
    description:
      "Schedule a personalized demo of our enterprise AI solutions. See how AI can transform your business.",
    path: `/${locale}/book-demo`,
  });
}

export default async function BookDemoPage({ params }: BookDemoPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        badge="Demo"
        title="Book Your Personalized Demo"
        description="See our AI solutions in action. Our team will tailor the demo to your specific use case and industry."
      />

      <section className="section-padding">
        <div className="container-wide">
          <Card className="mx-auto max-w-2xl">
            <CardContent className="p-6 sm:p-8">
              <DemoForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
