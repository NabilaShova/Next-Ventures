"use client";

import { motion } from "framer-motion";

import { MotionWrapper } from "@/components/ui/motion-wrapper";

interface TimelineStep {
  title: string;
  description: string;
}

interface CaseStudyTimelineProps {
  steps: TimelineStep[];
}

export function CaseStudyTimeline({ steps }: CaseStudyTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-px" />
      <div className="space-y-12">
        {steps.map((step, i) => (
          <MotionWrapper key={step.title} delay={i * 0.1}>
            <div
              className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden md:block md:w-1/2" />
              <motion.div
                className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2"
                whileInView={{ scale: [0.8, 1.1, 1] }}
                viewport={{ once: true }}
              >
                <span className="text-xs font-bold text-primary">{i + 1}</span>
              </motion.div>
              <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                <div className="rounded-xl border bg-card p-6">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
