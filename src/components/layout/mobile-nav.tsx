"use client";

import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect } from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const t = useTranslations("common");
  const pathname = usePathname();

  useEffect(() => {
    onOpenChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />
          <motion.nav
            id="mobile-nav"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border/50 bg-background/95 backdrop-blur-xl lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold"
                onClick={() => onOpenChange(false)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent text-sm font-bold text-white">
                  NV
                </div>
                <span className="text-sm">{siteConfig.name}</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <Accordion type="multiple" className="space-y-1">
                {mainNav.map((item) =>
                  item.children ? (
                    <AccordionItem key={item.href} value={item.href} className="border-none">
                      <AccordionTrigger className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted/50 hover:no-underline">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="pb-2 pl-3">
                        <ul className="space-y-1">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground",
                                  pathname === child.href && "text-primary"
                                )}
                                onClick={() => onOpenChange(false)}
                              >
                                <span className="font-medium text-foreground">{child.title}</span>
                                {child.description && (
                                  <span className="mt-0.5 block text-xs">{child.description}</span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-muted/50",
                        pathname === item.href && "text-primary"
                      )}
                      onClick={() => onOpenChange(false)}
                    >
                      {item.title}
                    </Link>
                  )
                )}
              </Accordion>
            </div>

            <div className="space-y-3 border-t border-border/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link href="/contact" onClick={() => onOpenChange(false)}>
                  {t("contactUs")}
                </Link>
              </Button>
              <Button asChild className="w-full" size="lg">
                <Link href="/book-demo" onClick={() => onOpenChange(false)}>
                  {t("bookDemo")}
                </Link>
              </Button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

export function MobileNavTrigger({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("lg:hidden", className)}
      onClick={onClick}
      aria-label="Open navigation menu"
      aria-expanded={false}
      aria-controls="mobile-nav"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
