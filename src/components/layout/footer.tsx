"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { footerNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const socialLinks = [
  { href: siteConfig.links.twitter, icon: Twitter, label: "Twitter" },
  { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: siteConfig.links.github, icon: Github, label: "GitHub" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast({ title: "Subscribed!", description: "Welcome to our newsletter." });
        setEmail("");
      } else {
        toast({ title: "Error", description: "Please try again.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="relative border-t border-border/50 bg-muted/30" role="contentinfo">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.06),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="container-wide relative px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent">
                <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-semibold">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-5">
            {(
              Object.entries(footerNav) as [
                keyof typeof footerNav,
                { title: string; href: string }[],
              ][]
            ).map(([key, links]) => (
              <nav key={key} aria-label={`${key} links`}>
                <h3 className="text-sm font-semibold capitalize">{key}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold">{t("newsletter")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t("newsletterDesc")}</p>
            <form
              onSubmit={handleNewsletter}
              className="mt-4 flex flex-col gap-2 sm:flex-row"
              aria-label="Newsletter signup"
            >
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
                className="bg-background/80"
              />
              <Button type="submit" disabled={loading} className="shrink-0">
                {loading ? "…" : t("subscribe")}
              </Button>
            </form>

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg border border-border/50",
                    "bg-background/50 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  )}
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="opacity-50" />

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link href="/book-demo">{tCommon("bookDemo")}</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
