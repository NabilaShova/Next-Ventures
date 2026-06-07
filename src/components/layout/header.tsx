"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import { MobileNav, MobileNavTrigger } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-border/50 bg-background/70 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="container-wide flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${siteConfig.name} home`}
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 via-primary to-accent shadow-glow-sm transition-transform group-hover:scale-105">
              <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <span className="hidden font-semibold tracking-tight sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>

          <NavigationMenu className="hidden lg:flex" aria-label="Main navigation">
            <NavigationMenuList>
              {mainNav.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuTrigger className="bg-transparent">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[420px] gap-1 p-3 md:w-[480px]">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="group block select-none rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/80 focus:bg-muted/80"
                              >
                                <div className="text-sm font-medium leading-none group-hover:text-primary">
                                  {child.title}
                                </div>
                                {child.description && (
                                  <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent"
                        )}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle className="hidden sm:inline-flex" />
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/contact">{t("contactUs")}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="hidden bg-gradient-to-r from-brand-600 to-accent shadow-glow-sm hover:opacity-90 sm:inline-flex"
            >
              <Link href="/book-demo">
                {t("bookDemo")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <MobileNavTrigger onClick={() => setMobileOpen(true)} />
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
