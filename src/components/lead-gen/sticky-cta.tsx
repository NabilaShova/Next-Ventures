"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useAnalytics } from "@/hooks/use-analytics";
import { slideUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 400;

export function StickyCta() {
  const t = useTranslations("common");
  const { locale } = useParams<{ locale: string }>();
  const { scrollY } = useScrollPosition();
  const { trackEvent } = useAnalytics();
  const [dismissed, setDismissed] = useState(false);

  const visible = scrollY > SCROLL_THRESHOLD && !dismissed;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={cn(
            "fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
            "shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
          )}
        >
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
            <p className="hidden text-sm font-medium sm:block">
              Ready to transform your business with AI?
            </p>
            <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end">
              <Button
                asChild
                size="sm"
                onClick={() => trackEvent("sticky_cta_demo_click")}
              >
                <Link href={`/${locale}/contact?intent=demo`}>
                  <Calendar className="h-4 w-4" />
                  {t("scheduleDemo")}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                onClick={() => trackEvent("sticky_cta_solutions_click")}
              >
                <Link href={`/${locale}/solutions`}>{t("viewSolutions")}</Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => {
                  setDismissed(true);
                  trackEvent("sticky_cta_dismiss");
                }}
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
