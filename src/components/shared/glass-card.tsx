"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hover = false, glow = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-card relative overflow-hidden",
          hover &&
            "transition-all duration-300 hover:border-primary/30 hover:shadow-glow-sm hover:-translate-y-1",
          glow && "shadow-glow-sm",
          className
        )}
        {...props}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent dark:from-white/5" />
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";
