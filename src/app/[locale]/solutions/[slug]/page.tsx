import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import { ProductDemo } from "@/components/products/product-demo";
import { ProductFaq } from "@/components/products/product-faq";
import { ProductFeatures } from "@/components/products/product-features";
import { ProductHero } from "@/components/products/product-hero";
import { ProductPricing } from "@/components/products/product-pricing";
import { RoiCalculator } from "@/components/products/roi-calculator";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Link } from "@/i18n/routing";
import { createMetadata } from "@/lib/metadata";
import { getProductBySlug } from "@/services/product.service";
import type { ProductBenefit, ProductFeature, ProductFAQ } from "@/types";

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  const result = await getProductBySlug(slug);
  if (!result) return createMetadata({ title: "Solution Not Found", noIndex: true });

  const { product } = result;
  return createMetadata({
    title: product.name,
    description: product.tagline ?? product.description,
    path: `/${locale}/solutions/${slug}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const result = await getProductBySlug(slug);
  if (!result) notFound();

  const { product } = result;
  const features = (product.features ?? []) as ProductFeature[];
  const benefits = (product.benefits ?? []) as ProductBenefit[];
  const faqs = (product.faqs ?? []) as ProductFAQ[];

  return (
    <>
      <ProductHero
        name={product.name}
        tagline={product.tagline}
        description={product.description}
        category={product.category.name}
        videoUrl={product.videoUrl}
      />

      <section className="section-padding">
        <div className="container-wide space-y-24">
          <ProductFeatures features={features} benefits={benefits} />
          <RoiCalculator />
          <ProductFaq faqs={faqs} productName={product.name} />
          <ProductPricing productName={product.name} productSlug={product.slug} />
          <ProductDemo />
        </div>
      </section>

      <section className="section-padding border-t bg-muted/30">
        <div className="container-wide">
          <MotionWrapper className="text-center">
            <h2 className="heading-md">Ready to get started?</h2>
            <p className="mt-4 text-muted-foreground">
              Book a personalized demo and see {product.name} in action.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={`/book-demo?product=${product.slug}`}>
                  Book Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </MotionWrapper>
        </div>
      </section>
    </>
  );
}
