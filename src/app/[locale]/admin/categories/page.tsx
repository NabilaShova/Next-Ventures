"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { DataTable, type Column } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  _count: { products: number };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    order: 0,
  });

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/admin/categories");
    const json = await res.json();
    if (json.success) setCategories(json.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setDialogOpen(false);
      setForm({ name: "", slug: "", description: "", order: 0 });
      fetchData();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/admin/categories?id=${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!json.success) alert(json.error);
    else fetchData();
  }

  const columns: Column<Category>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.slug}</p>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      cell: (row) => (
        <span className="line-clamp-2 text-muted-foreground">
          {row.description ?? "—"}
        </span>
      ),
    },
    {
      key: "products",
      header: "Products",
      cell: (row) => row._count.products,
    },
    {
      key: "order",
      header: "Order",
      sortable: true,
      cell: (row) => row.order,
    },
    {
      key: "actions",
      header: "",
      className: "w-16",
      cell: (row) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(row.id)}
          disabled={row._count.products > 0}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      ),
    },
  ];

  return (
    <AdminShell
      title="Categories"
      description="Organize products into categories"
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setForm((f) => ({
                        ...f,
                        name,
                        slug: f.slug || slugify(name),
                      }));
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, slug: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Category
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : (
          <DataTable
            data={categories as unknown as Record<string, unknown>[]}
            columns={columns as Column<Record<string, unknown>>[]}
            searchKey="name"
            searchPlaceholder="Search categories..."
          />
        )}
      </div>
    </AdminShell>
  );
}
