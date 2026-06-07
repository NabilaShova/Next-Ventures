"use client";

import {
  BarChart3,
  BookOpen,
  Briefcase,
  CreditCard,
  FileText,
  FolderTree,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Package,
  Settings,
  Users,
  Video,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

const navItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Products", href: "/admin/products", icon: Package },
  { title: "Categories", href: "/admin/categories", icon: FolderTree },
  { title: "Leads", href: "/admin/leads", icon: Users },
  { title: "Demo Requests", href: "/admin/demo-requests", icon: Video },
  { title: "Contact Requests", href: "/admin/contact-requests", icon: Mail },
  { title: "Blog", href: "/admin/blog", icon: FileText },
  { title: "Case Studies", href: "/admin/case-studies", icon: Briefcase },
  { title: "Resources", href: "/admin/resources", icon: BookOpen },
  { title: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const localePrefix = pathname.match(/^\/(en|bn)/)?.[0] ?? "";

  function isActive(href: string) {
    const fullPath = `${localePrefix}${href}`;
    if (href === "/admin") {
      return pathname === fullPath || pathname === `${fullPath}/`;
    }
    return pathname.startsWith(fullPath);
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-shrink-0 flex-col border-r border-border/60 bg-card/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border/60 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent text-sm font-bold text-white">
              NV
            </div>
            <div>
              <p className="text-sm font-semibold">{siteConfig.name}</p>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-primary/10 text-primary shadow-glow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", active && "text-primary")} />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/60 p-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <MessageSquare className="h-4 w-4" />
            Back to Site
          </Link>
        </div>
      </aside>
    </>
  );
}
