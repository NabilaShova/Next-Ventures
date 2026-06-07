"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useParams } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/routing";

const productTypes = [
  "AI_AGENT",
  "SAAS",
  "WEB_APP",
  "MOBILE_APP",
  "AUTOMATION",
  "CUSTOM_ENTERPRISE",
] as const;

interface Category {
  id: string;
  name: string;
}

export default function ProductEditPage() {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    longDescription: "",
    type: "SAAS" as (typeof productTypes)[number],
    categoryId: "",
    featured: false,
    published: true,
    imageUrl: "",
    videoUrl: "",
    demoUrl: "",
    order: 0,
  });

  const fetchData = useCallback(async () => {
    const [productRes, categoriesRes] = await Promise.all([
      fetch(`/api/admin/products/${id}`),
      fetch("/api/admin/categories"),
    ]);
    const productJson = await productRes.json();
    const categoriesJson = await categoriesRes.json();

    if (categoriesJson.success) setCategories(categoriesJson.data);

    if (productJson.success) {
      const p = productJson.data;
      setForm({
        name: p.name,
        slug: p.slug,
        tagline: p.tagline ?? "",
        description: p.description,
        longDescription: p.longDescription ?? "",
        type: p.type,
        categoryId: p.categoryId,
        featured: p.featured,
        published: p.published,
        imageUrl: p.imageUrl ?? "",
        videoUrl: p.videoUrl ?? "",
        demoUrl: p.demoUrl ?? "",
        order: p.order,
      });
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
  }

  if (loading) {
    return (
      <AdminShell title="Edit Product" description="Loading...">
        <p className="text-center text-muted-foreground">Loading product...</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Edit Product" description={form.name}>
      <div className="mx-auto max-w-3xl space-y-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <form onSubmit={handleSave} className="glass-card space-y-6 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={form.tagline}
              onChange={(e) =>
                setForm((f) => ({ ...f, tagline: e.target.value }))
              }
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
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Long Description</Label>
            <Textarea
              id="longDescription"
              value={form.longDescription}
              onChange={(e) =>
                setForm((f) => ({ ...f, longDescription: e.target.value }))
              }
              rows={6}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
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
                  <SelectValue />
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
            <div className="space-y-2">
              <Label htmlFor="order">Order</Label>
              <Input
                id="order"
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                value={form.videoUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, videoUrl: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demoUrl">Demo URL</Label>
              <Input
                id="demoUrl"
                value={form.demoUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, demoUrl: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <Switch
                id="published"
                checked={form.published}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, published: v }))
                }
              />
              <Label htmlFor="published">Published</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="featured"
                checked={form.featured}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, featured: v }))
                }
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
          </div>

          <Button type="submit" disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </AdminShell>
  );
}
