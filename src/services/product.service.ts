import type { ProductType } from "@prisma/client";
import {
  filterStaticProducts,
  getStaticProductBySlug,
  staticProducts,
} from "@/data/products";
import { withDb } from "@/lib/db-safe";
import { prisma } from "@/lib/prisma";
import { cacheDelete, cacheGet, cacheSet } from "@/lib/redis";

const CACHE_TTL = 3600;
const CACHE_PREFIX = "products";

export interface ProductFilters {
  category?: string;
  type?: ProductType;
  search?: string;
  featured?: boolean;
}

function cacheKey(suffix: string) {
  return `${CACHE_PREFIX}:${suffix}`;
}

function normalizeProduct(product: {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string;
  longDescription?: string | null;
  type: ProductType;
  featured: boolean;
  published: boolean;
  imageUrl?: string | null;
  videoUrl?: string | null;
  demoUrl?: string | null;
  features: unknown;
  benefits: unknown;
  integrations: unknown;
  faqs: unknown;
  category: { slug: string; name: string };
  pricingPlans?: unknown[];
}) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    tagline: product.tagline,
    description: product.description,
    longDescription: product.longDescription ?? null,
    type: product.type,
    featured: product.featured,
    published: product.published,
    imageUrl: product.imageUrl ?? null,
    videoUrl: product.videoUrl ?? null,
    demoUrl: product.demoUrl ?? null,
    features: product.features,
    benefits: product.benefits,
    integrations: product.integrations,
    faqs: product.faqs,
    category: product.category,
    pricingPlans: product.pricingPlans ?? [],
  };
}

async function fetchProductsFromDb(filters: ProductFilters) {
  const where: Record<string, unknown> = { published: true };

  if (filters.category) {
    where.category = { slug: filters.category };
  }
  if (filters.type) {
    where.type = filters.type;
  }
  if (filters.featured !== undefined) {
    where.featured = filters.featured;
  }
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
      { tagline: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      category: { select: { slug: true, name: true } },
      pricingPlans: {
        select: {
          id: true,
          name: true,
          monthlyPrice: true,
          yearlyPrice: true,
          isPopular: true,
          isEnterprise: true,
        },
      },
    },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });

  return products.map(normalizeProduct);
}

export async function getProducts(filters: ProductFilters = {}) {
  const key = cacheKey(
    `list:${JSON.stringify(filters)}`
  );

  const cached = await cacheGet<ReturnType<typeof normalizeProduct>[]>(key);
  if (cached) return { products: cached, source: "cache" as const };

  const { data: products, fromDb } = await withDb(
    () => fetchProductsFromDb(filters),
    () => filterStaticProducts(filters)
  );

  await cacheSet(key, products, CACHE_TTL);
  return {
    products,
    source: fromDb ? ("database" as const) : ("fallback" as const),
  };
}

export async function getProductBySlug(slug: string) {
  const key = cacheKey(`slug:${slug}`);

  const cached = await cacheGet<ReturnType<typeof normalizeProduct>>(key);
  if (cached) return { product: cached, source: "cache" as const };

  const { data: product, fromDb } = await withDb(
    async () => {
      const found = await prisma.product.findUnique({
        where: { slug, published: true },
        include: {
          category: { select: { slug: true, name: true } },
          pricingPlans: true,
          testimonials: { where: { featured: true }, take: 5 },
        },
      });
      return found ? normalizeProduct(found) : null;
    },
    () => getStaticProductBySlug(slug) ?? null
  );

  if (!product) return null;

  await cacheSet(key, product, CACHE_TTL);
  return {
    product,
    source: fromDb ? ("database" as const) : ("fallback" as const),
  };
}

export async function getFeaturedProducts() {
  return getProducts({ featured: true });
}

export async function searchProducts(query: string) {
  if (!query.trim()) {
    return { products: [], source: "database" as const };
  }

  const key = cacheKey(`search:${query.toLowerCase()}`);

  const cached = await cacheGet<ReturnType<typeof normalizeProduct>[]>(key);
  if (cached) return { products: cached, source: "cache" as const };

  const result = await getProducts({ search: query });
  await cacheSet(key, result.products, CACHE_TTL);

  return result;
}

export async function invalidateProductCache(slug?: string) {
  if (slug) {
    await cacheDelete(cacheKey(`slug:${slug}`));
  }
  // List caches use dynamic keys; individual slug invalidation is sufficient for updates
}

export { staticProducts };
