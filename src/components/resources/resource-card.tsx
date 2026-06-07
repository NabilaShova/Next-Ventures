"use client";

import { Download, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import type { Resource } from "@/data/resources";

interface ResourceCardProps {
  resource: Resource;
  index?: number;
}

const typeLabels: Record<string, string> = {
  guides: "Guide",
  whitepapers: "Whitepaper",
  templates: "Template",
  prompts: "Prompt Pack",
  playbooks: "Playbook",
  api: "API Docs",
};

export function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  return (
    <MotionWrapper delay={index * 0.08}>
      <div className="group flex h-full flex-col rounded-2xl border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-float">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="secondary">{typeLabels[resource.type] ?? resource.type}</Badge>
        </div>
        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{resource.description}</p>
        <div className="mt-4 flex flex-wrap gap-1">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {[resource.fileSize, resource.pages ? `${resource.pages} pages` : null]
              .filter(Boolean)
              .join(" · ")}
          </span>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </MotionWrapper>
  );
}
