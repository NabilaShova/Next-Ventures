"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

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
import { useAnalytics } from "@/hooks/use-analytics";
import { useToast } from "@/components/ui/use-toast";

const STORAGE_KEY = "nv_newsletter_dismissed";
const SHOW_DELAY_MS = 15000;

export function NewsletterPopup() {
  const t = useTranslations("footer");
  const { trackEvent } = useAnalytics();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = window.setTimeout(() => {
      setOpen(true);
      trackEvent("newsletter_popup_shown");
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [trackEvent]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
    trackEvent("newsletter_popup_dismiss");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Subscription failed");
      }

      localStorage.setItem(STORAGE_KEY, "1");
      setOpen(false);
      trackEvent("newsletter_popup_subscribe", { email });
      toast({
        title: "Subscribed!",
        description: "You'll receive our latest AI insights weekly.",
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
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">{t("newsletter")}</DialogTitle>
          <DialogDescription className="text-center">
            {t("newsletterDesc")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newsletter-email">Email</Label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Subscribing..." : t("subscribe")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
