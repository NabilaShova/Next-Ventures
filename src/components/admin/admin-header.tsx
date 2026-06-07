"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  title: string;
  description?: string;
  onMenuClick?: () => void;
  className?: string;
}

export function AdminHeader({
  title,
  description,
  onMenuClick,
  className,
}: AdminHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex flex-col gap-4 border-b border-border/60 bg-background/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </h1>
            {description && (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-56 pl-9 lg:w-72"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </Button>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9 ring-2 ring-primary/20",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
