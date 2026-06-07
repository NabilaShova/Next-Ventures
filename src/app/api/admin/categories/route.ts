import { NextRequest } from "next/server";

import {
  apiError,
  apiSuccess,
  handleApiError,
  zodErrorResponse,
} from "@/lib/api-utils";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  createCategorySchema,
  updateCategorySchema,
} from "@/lib/validations/admin";

export async function GET() {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });

    return apiSuccess(categories);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const body = await request.json();
    const parsed = createCategorySchema.safeParse(body);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const category = await prisma.category.create({ data: parsed.data });
    return apiSuccess(category, 201);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint")
    ) {
      return apiError("Category slug already exists", 409);
    }
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const body = await request.json();
    const { id, ...rest } = body as { id: string; [key: string]: unknown };

    if (!id) return apiError("Category id is required", 400);

    const parsed = updateCategorySchema.safeParse(rest);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const category = await prisma.category.update({
      where: { id },
      data: parsed.data,
    });

    return apiSuccess(category);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const { searchParams } = request.nextUrl;
    const id = searchParams.get("id");
    if (!id) return apiError("Category id is required", 400);

    const count = await prisma.product.count({ where: { categoryId: id } });
    if (count > 0) {
      return apiError("Cannot delete category with products", 409);
    }

    await prisma.category.delete({ where: { id } });
    return apiSuccess({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}
