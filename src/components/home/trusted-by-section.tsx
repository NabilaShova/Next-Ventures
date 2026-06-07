"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/shared/section-header";
import { siteConfig } from "@/config/site";

export function TrustedBySection() {
  const companies = [...siteConfig.trustedBy, ...siteConfig.trustedBy];

  return (
    <section
      className="relative overflow-hidden border-y border-border/50 bg-muted/10 py-12 sm:py-16"
      aria-label="Trusted by leading companies"
    >
      <SectionHeader
        badge="Trusted By"
        title="Powering enterprise teams worldwide"
        description="From Fortune 500 retailers to fast-growing SaaS companies — teams trust us to deliver AI that works."
        className="!mb-8 sm:!mb-10"
      />

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-32"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-32"
          aria-hidden="true"
        />

        <motion.div
          className="flex w-max gap-8 sm:gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden="true"
        >
          {companies.map((company, index) => (
            <div
              key={`${company}-${index}`}
              className="flex shrink-0 items-center justify-center px-4"
            >
              <div className="flex h-12 min-w-[180px] items-center justify-center rounded-xl border border-border/40 bg-background/50 px-6 backdrop-blur-sm sm:h-14 sm:min-w-[220px]">
                <span className="whitespace-nowrap text-sm font-medium text-muted-foreground/80 sm:text-base">
                  {company}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
