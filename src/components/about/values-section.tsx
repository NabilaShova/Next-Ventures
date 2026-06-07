"use client";

import { Eye, Heart, Lightbulb, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion-wrapper";
import { companyValues } from "@/data/about";

const iconMap: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  heart: Heart,
  eye: Eye,
  shield: Shield,
};

export function ValuesSection() {
  return (
    <section>
      <MotionWrapper className="mb-12 text-center">
        <h2 className="heading-md">Our Values</h2>
        <p className="mt-4 text-muted-foreground">
          The principles that guide everything we build and every partnership we form.
        </p>
      </MotionWrapper>

      <StaggerContainer className="grid gap-6 sm:grid-cols-2">
        {companyValues.map((value) => {
          const Icon = iconMap[value.icon] ?? Lightbulb;
          return (
            <StaggerItem key={value.title}>
              <div className="flex gap-4 rounded-2xl border bg-card p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
