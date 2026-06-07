"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
  variant?: "hero" | "section" | "cta";
}

export function GradientBackground({
  className,
  variant = "section",
}: GradientBackgroundProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <motion.div
        className={cn(
          "absolute rounded-full blur-3xl",
          variant === "hero" && "left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 bg-brand-500/20",
          variant === "section" && "right-0 top-1/4 h-[400px] w-[400px] bg-accent/10",
          variant === "cta" && "left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/25"
        )}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={cn(
          "absolute rounded-full blur-3xl",
          variant === "hero" && "bottom-0 left-0 h-[400px] w-[500px] bg-accent/15",
          variant === "section" && "bottom-0 left-1/4 h-[300px] w-[300px] bg-brand-500/10",
          variant === "cta" && "right-0 top-0 h-[350px] w-[350px] bg-accent/20"
        )}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,hsl(var(--background)/0.8))]" />
    </div>
  );
}
