import { setRequestLocale } from "next-intl/server";

import { CtaSection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { SolutionsPreviewSection } from "@/components/home/solutions-preview-section";
import { StatsSection } from "@/components/home/stats-section";
import { TrustedBySection } from "@/components/home/trusted-by-section";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  return createMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: `/${locale}`,
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <TrustedBySection />
      <FeaturesSection />
      <SolutionsPreviewSection />
      <CtaSection />
    </>
  );
}
