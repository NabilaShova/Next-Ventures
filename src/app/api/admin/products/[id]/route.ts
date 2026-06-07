import { NextRequest } from "next/server";

import {
  apiError,
  apiSuccess,
  handleApiError,
  zodErrorResponse,
} from "@/lib/api-utils";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateProductSchema } from "@/lib/validations/admin";
import { invalidateProductCache } from "@/services/product.service";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        pricingPlans: true,
      },
    });

    if (!product) return apiError("Product not found", 404);
    return apiSuccess(product);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const { id } = await params;
    const body = await request.json();
    const parsed = updateProductSchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return apiError("Product not found", 404);

    const data = parsed.data;
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        imageUrl: data.imageUrl === "" ? null : data.imageUrl,
        videoUrl: data.videoUrl === "" ? null : data.videoUrl,
        demoUrl: data.demoUrl === "" ? null : data.demoUrl,
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
      },
    });

    await invalidateProductCache(existing.slug);
    if (product.slug !== existing.slug) {
      await invalidateProductCache(product.slug);
    }

    return apiSuccess(product);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const { id } = await params;
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return apiError("Product not found", 404);

    await prisma.product.delete({ where: { id } });
    await invalidateProductCache(existing.slug);

    return apiSuccess({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}
