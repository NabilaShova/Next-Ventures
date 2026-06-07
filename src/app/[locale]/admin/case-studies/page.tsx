import { prisma } from "@/lib/prisma";

import { ContentListClient } from "../content-list-client";

export default async function CaseStudiesAdminPage() {
  const studies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      client: true,
      industry: true,
      published: true,
      featured: true,
      createdAt: true,
    },
  });

  return (
    <ContentListClient
      title="Case Studies"
      description="Manage client success stories"
      items={studies.map((s) => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        meta: s.industry,
        subtitle: s.client,
        published: s.published,
        featured: s.featured,
        createdAt: s.createdAt.toISOString(),
      }))}
      emptyMessage="No case studies yet."
    />
  );
}
