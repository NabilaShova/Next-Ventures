"use client";

import { useEffect, useState } from "react";
import { Gift } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useExitIntent } from "@/hooks/use-exit-intent";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToast } from "@/components/ui/use-toast";

const STORAGE_KEY = "nv_exit_intent_dismissed";

export function ExitIntentPopup() {
  const t = useTranslations("common");
  const { locale } = useParams<{ locale: string }>();
  const { trackEvent } = useAnalytics();
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { hasTriggered } = useExitIntent({
    enabled: enabled && !open,
    delayMs: 5000,
  });

  useEffect(() => {
    setEnabled(!localStorage.getItem(STORAGE_KEY));
  }, []);

  useEffect(() => {
    if (hasTriggered && enabled) {
      setOpen(true);
      trackEvent("exit_intent_popup_shown");
    }
  }, [hasTriggered, enabled, trackEvent]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
    setEnabled(false);
    trackEvent("exit_intent_popup_dismiss");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "exit_intent_popup",
          metadata: { offer: "free_consultation" },
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Submission failed");
      }

      localStorage.setItem(STORAGE_KEY, "1");
      setOpen(false);
      trackEvent("exit_intent_lead_capture", { email });
      toast({
        title: "You're on the list!",
        description: "We'll reach out with your free consultation details.",
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
    <Dialog open={open} onOpenChange={(v) => !v && dismiss()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <Gift className="h-6 w-6 text-accent" />
          </div>
          <DialogTitle className="text-center">Wait — before you go!</DialogTitle>
          <DialogDescription className="text-center">
            Get a free 30-minute AI strategy consultation. Tell us your email and
            we&apos;ll schedule a call with our solutions team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exit-email">Work email</Label>
            <Input
              id="exit-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Claim Free Consultation"}
            </Button>
            <Button variant="ghost" asChild>
              <Link
                href={`/${locale}/contact`}
                onClick={() => trackEvent("exit_intent_contact_click")}
              >
                {t("contactUs")}
              </Link>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
