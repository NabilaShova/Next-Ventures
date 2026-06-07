"use client";

import {
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import * as LucideIcons from "lucide-react";

import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion-wrapper";
import type { ProductFeature, ProductBenefit, WorkflowStep } from "@/types";

function getIcon(name?: string): LucideIcon {
  if (!name) return CheckCircle2;
  const icon = (LucideIcons as Record<string, LucideIcon>)[name];
  return icon ?? CheckCircle2;
}

interface ProductFeaturesProps {
  features: ProductFeature[];
  benefits?: ProductBenefit[];
  workflow?: WorkflowStep[];
}

export function ProductFeatures({ features, benefits, workflow }: ProductFeaturesProps) {
  const displayFeatures =
    features.length > 0
      ? features
      : [
          { title: "24/7 Autonomous Operation", description: "Runs continuously without human intervention.", icon: "Clock" },
          { title: "Multi-Channel Support", description: "Email, chat, phone, and social media in one agent.", icon: "MessageSquare" },
          { title: "Smart Escalation", description: "Automatically routes complex issues to human agents.", icon: "ArrowUpRight" },
          { title: "Knowledge Base Integration", description: "Learns from your docs, FAQs, and past interactions.", icon: "BookOpen" },
        ];

  const displayWorkflow = workflow ?? [
    { title: "Connect", description: "Integrate with your existing tools in minutes.", icon: "Plug" },
    { title: "Configure", description: "Customize agent behavior, tone, and escalation rules.", icon: "Settings" },
    { title: "Deploy", description: "Go live across all channels with one click.", icon: "Rocket" },
    { title: "Optimize", description: "AI continuously learns and improves performance.", icon: "TrendingUp" },
  ];

  return (
    <div className="space-y-20">
      <section>
        <MotionWrapper className="mb-12 text-center">
          <h2 className="heading-md">Key Features</h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to deploy and scale AI in your enterprise.
          </p>
        </MotionWrapper>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayFeatures.map((feature) => {
            const Icon = getIcon(feature.icon);
            return (
              <StaggerItem key={feature.title}>
                <div className="rounded-2xl border bg-card p-6 h-full">
                  <Icon className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {benefits && benefits.length > 0 && (
        <section>
          <MotionWrapper className="mb-12 text-center">
            <h2 className="heading-md">Business Impact</h2>
          </MotionWrapper>
          <div className="grid gap-6 sm:grid-cols-3">
            {benefits.map((benefit) => (
              <MotionWrapper key={benefit.title}>
                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center">
                  {benefit.metric && (
                    <div className="text-3xl font-bold text-primary">{benefit.metric}</div>
                  )}
                  <h3 className="mt-2 font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </section>
      )}

      <section>
        <MotionWrapper className="mb-12 text-center">
          <h2 className="heading-md">How It Works</h2>
        </MotionWrapper>
        <div className="relative">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-border lg:block" />
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {displayWorkflow.map((step, i) => {
              const Icon = getIcon(step.icon);
              return (
                <StaggerItem key={step.title}>
                  <div className="relative text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-primary">Step {i + 1}</span>
                    <h3 className="mt-2 font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
