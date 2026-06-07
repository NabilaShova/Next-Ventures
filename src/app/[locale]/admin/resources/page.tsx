import { prisma } from "@/lib/prisma";

import { ContentListClient } from "../content-list-client";

export default async function ResourcesAdminPage() {
  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
      downloadCount: true,
      published: true,
      createdAt: true,
    },
  });

  return (
    <ContentListClient
      title="Resources"
      description="Manage downloadable resources and assets"
      items={resources.map((r) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        meta: r.type,
        subtitle: `${r.downloadCount} downloads`,
        published: r.published,
        featured: false,
        createdAt: r.createdAt.toISOString(),
      }))}
      emptyMessage="No resources yet."
    />
  );
}
