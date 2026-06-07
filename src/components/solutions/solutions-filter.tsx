"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const categories = [
  { value: "all", label: "All" },
  { value: "ai-agents", label: "AI Agents" },
  { value: "saas", label: "SaaS" },
  { value: "mobile-apps", label: "Mobile Apps" },
  { value: "automation", label: "Automation" },
  { value: "custom-enterprise", label: "Custom" },
];

interface SolutionsFilterProps {
  className?: string;
}

export function SolutionsFilter({ className }: SolutionsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const currentCategory = searchParams.get("category") ?? "all";
  const currentSort = searchParams.get("sort") ?? "name";

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
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.value}
              value={cat.value}
              className="rounded-full border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search solutions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </form>

        <Select
          value={currentSort}
          onValueChange={(v) => updateParams({ sort: v })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="featured">Featured First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
