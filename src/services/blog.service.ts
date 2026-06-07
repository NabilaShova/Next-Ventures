import {
  getStaticBlogPostBySlug,
  getStaticBlogPostsByCategory,
  staticBlogPosts,
} from "@/data/blog";
import { withDb } from "@/lib/db-safe";
import { prisma } from "@/lib/prisma";
import { cacheGet, cacheSet } from "@/lib/redis";

const CACHE_TTL = 3600;
const CACHE_PREFIX = "blog";

function normalizePost(post: {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  author: string;
  authorAvatar: string | null;
  readingTime: number;
  published: boolean;
  featured: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}) {
  return {
    ...post,
    createdAt:
      post.createdAt instanceof Date
        ? post.createdAt.toISOString()
        : post.createdAt,
    updatedAt:
      post.updatedAt instanceof Date
        ? post.updatedAt.toISOString()
        : post.updatedAt,
  };
}

export async function getBlogPosts() {
  const key = `${CACHE_PREFIX}:all`;

  const cached = await cacheGet<ReturnType<typeof normalizePost>[]>(key);
  if (cached) return { posts: cached, source: "cache" as const };

  const { data: posts, fromDb } = await withDb(
    async () => {
      const results = await prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      });
      return results.map(normalizePost);
    },
    () => staticBlogPosts.filter((p) => p.published)
  );

  await cacheSet(key, posts, CACHE_TTL);
  return {
    posts,
    source: fromDb ? ("database" as const) : ("fallback" as const),
  };
}

export async function getBlogPostBySlug(slug: string) {
  const key = `${CACHE_PREFIX}:slug:${slug}`;

  const cached = await cacheGet<ReturnType<typeof normalizePost>>(key);
  if (cached) return { post: cached, source: "cache" as const };

  const { data: post, fromDb } = await withDb(
    async () => {
      const found = await prisma.blogPost.findUnique({
        where: { slug, published: true },
      });
      return found ? normalizePost(found) : null;
    },
    () => getStaticBlogPostBySlug(slug) ?? null
  );

  if (!post) return null;

  await cacheSet(key, post, CACHE_TTL);
  return {
    post,
    source: fromDb ? ("database" as const) : ("fallback" as const),
  };
}

export async function getBlogPostsByCategory(category: string) {
  const key = `${CACHE_PREFIX}:category:${category.toLowerCase()}`;

  const cached = await cacheGet<ReturnType<typeof normalizePost>[]>(key);
  if (cached) return { posts: cached, source: "cache" as const };

  const { data: posts, fromDb } = await withDb(
    async () => {
      const results = await prisma.blogPost.findMany({
        where: {
          published: true,
          category: { equals: category, mode: "insensitive" },
        },
        orderBy: { createdAt: "desc" },
      });
      return results.map(normalizePost);
    },
    () => getStaticBlogPostsByCategory(category)
  );

  await cacheSet(key, posts, CACHE_TTL);
  return {
    posts,
    source: fromDb ? ("database" as const) : ("fallback" as const),
  };
}
