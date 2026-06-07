"use client";

import { AiAssistant } from "@/components/chat/ai-assistant";
import { ExitIntentPopup } from "@/components/lead-gen/exit-intent-popup";
import { FloatingContact } from "@/components/lead-gen/floating-contact";
import { NewsletterPopup } from "@/components/lead-gen/newsletter-popup";
import { StickyCta } from "@/components/lead-gen/sticky-cta";
import { useAnalytics } from "@/hooks/use-analytics";
import { usePathname } from "next/navigation";

const HIDDEN_PATHS = ["/sign-in", "/sign-up", "/admin"];

export function LeadGenWidgets() {
  useAnalytics();
  const pathname = usePathname();

  const hidden = HIDDEN_PATHS.some((p) => pathname.includes(p));
  if (hidden) return null;

  return (
    <>
      <StickyCta />
      <FloatingContact />
      <NewsletterPopup />
      <ExitIntentPopup />
      <AiAssistant />
    </>
  );
}
