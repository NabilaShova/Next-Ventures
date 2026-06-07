import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import { BlogCard } from "@/components/blog/blog-card";
import { BlogFilters } from "@/components/blog/blog-filters";
import { PageHeader } from "@/components/ui/page-header";
import { createMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/services/blog.service";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string;
    search?: string;
    tag?: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;
  return createMetadata({
    title: "Blog",
    description:
      "Insights on AI automation, enterprise strategies, and product updates from the Next Ventures team.",
    path: `/${locale}/blog`,
  });
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = await params;
  const { category, search, tag } = await searchParams;
  setRequestLocale(locale);

  const { posts: allPosts } = await getBlogPosts();

  let posts = [...allPosts];

  if (category && category !== "all") {
    posts = posts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q)
    );
  }

  if (tag) {
    posts = posts.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }

  const categories = [...new Set(allPosts.map((p) => p.category))];
  const allTags = [...new Set(allPosts.flatMap((p) => p.tags))];

  return (
    <>
      <PageHeader
        badge="Blog"
        title="Insights & Updates"
        description="Expert perspectives on AI automation, enterprise strategy, and the future of intelligent business."
      />
      <section className="section-padding">
        <div className="container-wide">
          <Suspense fallback={<div className="h-24 animate-pulse rounded-lg bg-muted" />}>
            <BlogFilters categories={categories} allTags={allTags} />
          </Suspense>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))
            ) : (
              <p className="col-span-full py-16 text-center text-muted-foreground">
                No articles found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
