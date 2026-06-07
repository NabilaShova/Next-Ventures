"use client";

import { useCallback, useEffect, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { DataTable, type Column } from "@/components/admin/data-table";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/routing";
import { slugify } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  type: string;
  featured: boolean;
  published: boolean;
  category: { id: string; name: string; slug: string };
  _count?: { pricingPlans: number };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const productTypes = [
  "AI_AGENT",
  "SAAS",
  "WEB_APP",
  "MOBILE_APP",
  "AUTOMATION",
  "CUSTOM_ENTERPRISE",
] as const;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    type: "SAAS" as (typeof productTypes)[number],
    categoryId: "",
  });

  const fetchData = useCallback(async () => {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/categories"),
    ]);
    const productsJson = await productsRes.json();
    const categoriesJson = await categoriesRes.json();
    if (productsJson.success) setProducts(productsJson.data);
    if (categoriesJson.success) setCategories(categoriesJson.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setDialogOpen(false);
      setForm({
        name: "",
        slug: "",
        description: "",
        type: "SAAS",
        categoryId: "",
      });
      fetchData();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    fetchData();
  }

  const columns: Column<Product>[] = [
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
      key: "type",
      header: "Type",
      sortable: true,
      cell: (row) => (
        <Badge variant="secondary" className="font-normal">
          {row.type.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (row) => row.category.name,
    },
    {
      key: "published",
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
      key: "actions",
      header: "",
      className: "w-24",
      cell: (row) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/products/${row.id}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminShell
      title="Products"
      description="Manage your product catalog"
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Product</DialogTitle>
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
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                      value={form.type}
                      onValueChange={(v) =>
                        setForm((f) => ({
                          ...f,
                          type: v as (typeof productTypes)[number],
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {productTypes.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={form.categoryId}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, categoryId: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={!form.categoryId}>
                  Create Product
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : (
          <DataTable
            data={products as unknown as Record<string, unknown>[]}
            columns={columns as Column<Record<string, unknown>>[]}
            searchKey="name"
            searchPlaceholder="Search products..."
          />
        )}
      </div>
    </AdminShell>
  );
}
