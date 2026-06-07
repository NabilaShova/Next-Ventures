"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  description,
  children,
  action,
  className,
}: ChartCardProps) {
  return (
    <div className={cn("glass-card overflow-hidden", className)}>
      <div className="flex items-start justify-between border-b border-border/60 px-6 py-4">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {description && (
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
