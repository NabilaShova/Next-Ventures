"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

import { GradientBackground } from "@/components/shared/gradient-background";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function CtaSection() {
  const tCommon = useTranslations("common");

  return (
    <section className="relative section-padding" aria-labelledby="cta-heading">
      <div className="container-wide">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-brand-950 via-brand-900 to-accent/30 px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <GradientBackground variant="cta" />

          <div className="relative mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Free strategy session included
              </span>
            </motion.div>

            <h2
              id="cta-heading"
              className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl text-balance"
            >
              Ready to transform your business with AI?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base text-white/70 sm:text-lg text-balance">
              Join 250+ enterprise teams using Next Ventures AI to automate
              operations, increase revenue, and ship faster. Book a demo and see
              results in your first week.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-brand-900 shadow-float hover:bg-white/90 sm:w-auto"
              >
                <Link href="/book-demo">
                  {tCommon("bookDemo")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white sm:w-auto"
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-white/50">
              No commitment required · SOC 2 ready · Enterprise support
            </p>
          </div>

          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
