"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Mail, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useAnalytics } from "@/hooks/use-analytics";
import { scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

const actions = [
  { key: "demo", icon: Calendar, href: "/contact?intent=demo", labelKey: "scheduleDemo" as const },
  { key: "email", icon: Mail, href: `mailto:${siteConfig.contact.email}`, labelKey: "contactUs" as const, external: true },
  { key: "phone", icon: Phone, href: `tel:${siteConfig.contact.phone.replace(/\D/g, "")}`, labelKey: "contactUs" as const, external: true },
] as const;

export function FloatingContact() {
  const t = useTranslations("common");
  const { locale } = useParams<{ locale: string }>();
  const { trackEvent } = useAnalytics();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-20 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col gap-2"
          >
            {actions.map(({ key, icon: Icon, href, labelKey, ...rest }) => {
              const isExternal = "external" in rest;
              const className = cn(
                "flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-float transition-colors hover:bg-muted"
              );

              if (isExternal) {
                return (
                  <a
                    key={key}
                    href={href}
                    className={className}
                    onClick={() => trackEvent("floating_contact_click", { action: key })}
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {t(labelKey)}
                  </a>
                );
              }

              return (
                <Link
                  key={key}
                  href={`/${locale}${href}`}
                  className={className}
                  onClick={() => {
                    setOpen(false);
                    trackEvent("floating_contact_click", { action: key });
                  }}
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {t(labelKey)}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-glow transition-transform hover:scale-105",
          open && "rotate-0"
        )}
        onClick={() => {
          setOpen((prev) => !prev);
          trackEvent(open ? "floating_contact_close" : "floating_contact_open");
        }}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}
