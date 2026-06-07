"use client";

import { useTranslations } from "next-intl";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { GlassCard } from "@/components/shared/glass-card";
import { siteConfig } from "@/config/site";
import type { StatItem } from "@/types";

export function StatsSection() {
  const t = useTranslations("stats");

  const stats: StatItem[] = [
    {
      label: t("enterpriseClients"),
      value: siteConfig.stats.enterpriseClients,
      suffix: "+",
    },
    {
      label: t("projectsDelivered"),
      value: siteConfig.stats.projectsDelivered,
      suffix: "+",
    },
    {
      label: t("automationsBuilt"),
      value: siteConfig.stats.automationsBuilt,
      suffix: "+",
    },
    {
      label: t("hoursSaved"),
      value: siteConfig.stats.hoursSaved,
      suffix: "+",
    },
  ];

  return (
    <section
      className="relative border-y border-border/50 bg-muted/20"
      aria-label="Company statistics"
    >
      <div className="container-wide section-padding !py-12 sm:!py-16">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <GlassCard
              key={stat.label}
              hover
              className="p-6 text-center sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">{stat.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
