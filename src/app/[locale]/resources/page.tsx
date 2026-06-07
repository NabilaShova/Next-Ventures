import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { ResourcesFilter } from "@/components/resources/resources-filter";
import { PageHeader } from "@/components/ui/page-header";
import { createMetadata } from "@/lib/metadata";

interface ResourcesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ResourcesPageProps) {
  const { locale } = await params;
  return createMetadata({
    title: "Resources",
    description:
      "Free guides, whitepapers, templates, prompt libraries, and playbooks for enterprise AI adoption.",
    path: `/${locale}/resources`,
  });
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        badge="Resources"
        title="Resource Library"
        description="Free guides, whitepapers, templates, and AI prompt libraries to accelerate your AI journey."
      />
      <section className="section-padding">
        <div className="container-wide">
          <Suspense fallback={<div className="h-24 animate-pulse rounded-lg bg-muted" />}>
            <ResourcesFilter />
          </Suspense>
        </div>
      </section>
    </>
  );
}
