import { NextRequest } from "next/server";

import {
  apiError,
  apiSuccess,
  handleApiError,
  zodErrorResponse,
} from "@/lib/api-utils";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createProductSchema } from "@/lib/validations/admin";
import { invalidateProductCache } from "@/services/product.service";

export async function GET() {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const products = await prisma.product.findMany({
      include: {
        category: { select: { id: true, name: true, slug: true } },
        _count: { select: { pricingPlans: true } },
      },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });

    return apiSuccess(products);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const body = await request.json();
    const parsed = createProductSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const data = parsed.data;
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline,
        description: data.description,
        longDescription: data.longDescription,
        type: data.type,
        featured: data.featured,
        published: data.published,
        imageUrl: data.imageUrl || null,
        videoUrl: data.videoUrl || null,
        demoUrl: data.demoUrl || null,
        categoryId: data.categoryId,
        order: data.order,
        features: data.features,
        benefits: data.benefits,
        integrations: data.integrations,
        faqs: data.faqs,
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    await invalidateProductCache(product.slug);
    return apiSuccess(product, 201);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint")
    ) {
      return apiError("Product slug already exists", 409);
    }
    return handleApiError(error);
  }
}
