"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      className={cn(
        "mb-12 sm:mb-16 lg:mb-20",
        isCenter && "mx-auto max-w-3xl text-center",
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {badge && (
        <Badge
          variant="secondary"
          className="mb-4 border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
        >
          {badge}
        </Badge>
      )}
      <h2 className="heading-lg text-balance">{title}</h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base text-muted-foreground sm:text-lg text-balance",
            isCenter && "mx-auto max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
