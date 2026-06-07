"use client";

import { AdminShell } from "@/components/admin/admin-shell";
import { DataTable, type Column } from "@/components/admin/data-table";
import { formatDateTime } from "@/components/admin/status-badge";
import { Badge } from "@/components/ui/badge";

interface ContentItem {
  id: string;
  title: string;
  slug: string;
  meta: string;
  subtitle: string;
  published: boolean;
  featured: boolean;
  createdAt: string;
}

interface ContentListClientProps {
  title: string;
  description: string;
  items: ContentItem[];
  emptyMessage: string;
}

export function ContentListClient({
  title,
  description,
  items,
  emptyMessage,
}: ContentListClientProps) {
  const columns: Column<ContentItem>[] = [
    {
      key: "title",
      header: "Title",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="font-medium">{row.title}</p>
          <p className="text-xs text-muted-foreground">{row.slug}</p>
        </div>
      ),
    },
    {
      key: "meta",
      header: "Category / Type",
      cell: (row) => row.meta,
    },
    {
      key: "subtitle",
      header: "Details",
      cell: (row) => (
        <span className="text-muted-foreground">{row.subtitle}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <div className="flex gap-1">
          {row.published ? (
            <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">
              Published
            </Badge>
          ) : (
            <Badge variant="outline">Draft</Badge>
          )}
          {row.featured && (
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              Featured
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      cell: (row) => formatDateTime(row.createdAt),
    },
  ];

  return (
    <AdminShell title={title} description={description}>
      <DataTable
        data={items as unknown as Record<string, unknown>[]}
        columns={columns as Column<Record<string, unknown>>[]}
        searchKey="title"
        searchPlaceholder="Search..."
        emptyMessage={emptyMessage}
      />
    </AdminShell>
  );
}
