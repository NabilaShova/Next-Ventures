"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { GlassCard } from "@/components/shared/glass-card";
import { GradientBackground } from "@/components/shared/gradient-background";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { staticProducts } from "@/data/products";
import { Link } from "@/i18n/routing";

const featuredProducts = staticProducts.filter((p) => p.featured).slice(0, 6);

export function SolutionsPreview() {
  const tCommon = useTranslations("common");

  return (
    <section className="relative section-padding" aria-labelledby="solutions-heading">
      <GradientBackground variant="section" />

      <div className="container-wide relative">
        <SectionHeader
          badge="Solutions"
          title="Featured products"
          description="Production-ready AI agents and SaaS platforms — deploy in days, not months."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <Link href={`/solutions/${product.slug}`} className="group block h-full">
                <GlassCard hover className="flex h-full flex-col p-6 sm:p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {product.category.name}
                    </Badge>
                    <Sparkles
                      className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    id={index === 0 ? "solutions-heading" : undefined}
                    className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors"
                  >
                    {product.name}
                  </h3>

                  {product.tagline && (
                    <p className="mt-2 text-sm font-medium text-primary/80">
                      {product.tagline}
                    </p>
                  )}

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {product.description}
                  </p>

                  <div className="mt-6 flex items-center gap-1 text-sm font-medium text-primary">
                    View product
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button asChild size="lg" variant="outline" className="glass">
            <Link href="/solutions">
              {tCommon("viewSolutions")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
