"use client";

import { Search, X } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface BlogFiltersProps {
  categories: string[];
  allTags: string[];
  className?: string;
}

export function BlogFilters({ categories, allTags, className }: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const currentCategory = searchParams.get("category") ?? "all";
  const activeTag = searchParams.get("tag");

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams]
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ search: search || null });
  }

  return (
    <div className={cn("space-y-6", className, isPending && "opacity-70")}>
      <Tabs
        value={currentCategory}
        onValueChange={(v) => updateParams({ category: v })}
      >
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          <TabsTrigger
            value="all"
            className="rounded-full border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All
          </TabsTrigger>
          {categories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="rounded-full border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <form onSubmit={handleSearch} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Tags:</span>
        {allTags.slice(0, 10).map((tag) => (
          <Badge
            key={tag}
            variant={activeTag === tag ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => updateParams({ tag: activeTag === tag ? null : tag })}
          >
            {tag}
          </Badge>
        ))}
        {activeTag && (
          <button
            type="button"
            onClick={() => updateParams({ tag: null })}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" /> Clear tag
          </button>
        )}
      </div>
    </div>
  );
}
