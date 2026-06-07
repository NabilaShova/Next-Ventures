"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface ProductHeroProps {
  name: string;
  tagline: string | null;
  description: string;
  category: string;
  videoUrl?: string | null;
}

export function ProductHero({
  name,
  tagline,
  description,
  category,
  videoUrl,
}: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="container-wide relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4">{category}</Badge>
            <h1 className="heading-lg">{name}</h1>
            {tagline && (
              <p className="mt-4 text-xl text-primary font-medium">{tagline}</p>
            )}
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="shadow-glow-sm" asChild>
                <Link href="/book-demo">
                  Book Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card aspect-video flex items-center justify-center overflow-hidden">
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  title={`${name} demo`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="flex flex-col items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                  aria-label="Play demo video"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <span className="text-sm">Watch Product Demo</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
