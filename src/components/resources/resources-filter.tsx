"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

import { ResourceCard } from "@/components/resources/resource-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { resources, resourceTypes } from "@/data/resources";
import type { ResourceType } from "@/data/resources";

export function ResourcesFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") ?? "all") as ResourceType | "all";

  const filtered =
    type === "all" ? resources : resources.filter((r) => r.type === type);

  function setType(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <Tabs value={type} onValueChange={setType} className="mb-8">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {resourceTypes.map((rt) => (
            <TabsTrigger
              key={rt.value}
              value={rt.value}
              className="rounded-full border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {rt.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((resource, i) => (
          <ResourceCard key={resource.id} resource={resource} index={i} />
        ))}
      </div>
    </>
  );
}
