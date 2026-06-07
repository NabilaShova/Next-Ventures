import { staticCaseStudies, getStaticCaseStudyBySlug } from "@/data/case-studies";
import { withDb } from "@/lib/db-safe";
import { prisma } from "@/lib/prisma";
import { cacheGet, cacheSet } from "@/lib/redis";
import type { CaseStudyResults } from "@/types";

const CACHE_TTL = 3600;
const CACHE_PREFIX = "case-studies";

function normalizeCaseStudy(cs: {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  implementation: string;
  results: unknown;
  revenueIncrease: number | null;
  costReduction: number | null;
  timeSaved: number | null;
  imageUrl: string | null;
  featured: boolean;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}) {
  return {
    ...cs,
    results: cs.results as CaseStudyResults,
    createdAt:
      cs.createdAt instanceof Date
        ? cs.createdAt.toISOString()
        : cs.createdAt,
    updatedAt:
      cs.updatedAt instanceof Date
        ? cs.updatedAt.toISOString()
        : cs.updatedAt,
  };
}

export async function getCaseStudies() {
  const key = `${CACHE_PREFIX}:all`;

  const cached =
    await cacheGet<ReturnType<typeof normalizeCaseStudy>[]>(key);
  if (cached) return { caseStudies: cached, source: "cache" as const };

  const { data: caseStudies, fromDb } = await withDb(
    async () => {
      const results = await prisma.caseStudy.findMany({
        where: { published: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      });
      return results.map(normalizeCaseStudy);
    },
    () => staticCaseStudies.filter((cs) => cs.published)
  );

  await cacheSet(key, caseStudies, CACHE_TTL);
  return {
    caseStudies,
    source: fromDb ? ("database" as const) : ("fallback" as const),
  };
}

export async function getCaseStudyBySlug(slug: string) {
  const key = `${CACHE_PREFIX}:slug:${slug}`;

  const cached =
    await cacheGet<ReturnType<typeof normalizeCaseStudy>>(key);
  if (cached) return { caseStudy: cached, source: "cache" as const };

  const { data: caseStudy, fromDb } = await withDb(
    async () => {
      const found = await prisma.caseStudy.findUnique({
        where: { slug, published: true },
      });
      return found ? normalizeCaseStudy(found) : null;
    },
    () => getStaticCaseStudyBySlug(slug) ?? null
  );

  if (!caseStudy) return null;

  await cacheSet(key, caseStudy, CACHE_TTL);
  return {
    caseStudy,
    source: fromDb ? ("database" as const) : ("fallback" as const),
  };
}
