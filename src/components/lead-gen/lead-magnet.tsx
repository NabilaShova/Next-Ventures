"use client";

import { Download, FileText } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface LeadMagnetProps {
  className?: string;
  title?: string;
  description?: string;
  resourceName?: string;
  downloadUrl?: string;
}

export function LeadMagnet({
  className,
  title = "Enterprise AI Playbook",
  description = "Download our 40-page guide on deploying AI agents, automations, and SaaS platforms at scale.",
  resourceName = "enterprise-ai-playbook",
  downloadUrl = "/downloads/enterprise-ai-playbook.pdf",
}: LeadMagnetProps) {
  const { trackEvent } = useAnalytics();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          source: "lead_magnet",
          metadata: { resource: resourceName },
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Submission failed");
      }

      setUnlocked(true);
      trackEvent("lead_magnet_download", { resource: resourceName, email });
      toast({
        title: "Download ready!",
        description: "Your brochure is ready to download.",
      });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn("overflow-hidden border-primary/20 bg-card-gradient", className)}>
      <CardHeader className="pb-4">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {unlocked ? (
          <Button asChild className="w-full">
            <a
              href={downloadUrl}
              download
              onClick={() => trackEvent("lead_magnet_file_download", { resource: resourceName })}
            >
              <Download className="h-4 w-4" />
              Download Brochure
            </a>
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="magnet-name">Name</Label>
              <Input
                id="magnet-name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="magnet-email">Work email</Label>
              <Input
                id="magnet-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Get Free Download"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
