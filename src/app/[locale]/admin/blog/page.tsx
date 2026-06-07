import { prisma } from "@/lib/prisma";

import { ContentListClient } from "../content-list-client";

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      author: true,
      published: true,
      featured: true,
      createdAt: true,
    },
  });

  return (
    <ContentListClient
      title="Blog Posts"
      description="Manage blog articles and content"
      items={posts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        meta: p.category,
        subtitle: p.author,
        published: p.published,
        featured: p.featured,
        createdAt: p.createdAt.toISOString(),
      }))}
      emptyMessage="No blog posts yet. Seed the database or create posts via Prisma Studio."
    />
  );
}
