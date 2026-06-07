"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Play,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { GradientBackground } from "@/components/shared/gradient-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

const floatingCards = [
  {
    icon: Bot,
    title: "Support resolved",
    value: "94%",
    delay: 0,
    position: "top-8 -left-4 sm:-left-8",
  },
  {
    icon: TrendingUp,
    title: "Revenue recovered",
    value: "+$42K",
    delay: 0.15,
    position: "top-1/3 -right-4 sm:-right-10",
  },
  {
    icon: Zap,
    title: "Tasks automated",
    value: "1,240",
    delay: 0.3,
    position: "bottom-16 -left-2 sm:-left-6",
  },
];

export function HeroSection() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section
      className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32"
      aria-labelledby="hero-heading"
    >
      <GradientBackground variant="hero" />

      <div className="container-wide relative section-padding !pb-12 sm:!pb-16 lg:!pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge
              variant="secondary"
              className="mb-6 border border-primary/20 bg-primary/10 px-3 py-1 text-primary"
            >
              <Sparkles className="mr-1.5 h-3 w-3" aria-hidden="true" />
              Enterprise AI Platform
            </Badge>

            <h1 id="hero-heading" className="heading-xl text-balance">
              <span className="gradient-text">{t("title")}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg text-balance">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-brand-600 to-accent shadow-glow hover:opacity-90"
              >
                <Link href="/book-demo">
                  {tCommon("bookDemo")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass">
                <Link href="/solutions">
                  <Play className="h-4 w-4" aria-hidden="true" />
                  {tCommon("viewSolutions")}
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-brand-400 to-accent"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span>250+ enterprise clients</span>
              </div>
              <div className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-primary" aria-hidden="true" />
                SOC 2 ready infrastructure
              </span>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="glass-card overflow-hidden border border-white/10 p-1 shadow-float">
                <div className="rounded-xl bg-gradient-to-br from-muted/50 to-background p-4 sm:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-muted-foreground">AI Command Center</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: "Active agents", value: "12", trend: "+3" },
                      { label: "Automations today", value: "847", trend: "+18%" },
                      { label: "Avg. response time", value: "1.2s", trend: "-40%" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center justify-between rounded-lg border border-border/50 bg-background/60 px-4 py-3 backdrop-blur-sm"
                      >
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold tabular-nums">{stat.value}</span>
                          <span className="text-xs font-medium text-green-500">{stat.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 h-24 rounded-lg border border-border/50 bg-gradient-to-r from-brand-500/10 via-accent/10 to-brand-600/10 p-3">
                    <div className="flex h-full items-end gap-1.5">
                      {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-accent"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {floatingCards.map((card) => (
                <motion.div
                  key={card.title}
                  className={`absolute ${card.position} glass-card hidden px-4 py-3 shadow-float sm:block`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + card.delay, duration: 0.5 }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4 + card.delay * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <card.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{card.title}</p>
                        <p className="text-sm font-semibold tabular-nums">{card.value}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
