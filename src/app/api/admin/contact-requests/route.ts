import { NextRequest } from "next/server";

import {
  apiSuccess,
  handleApiError,
  zodErrorResponse,
} from "@/lib/api-utils";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateRequestStatusSchema } from "@/lib/validations/admin";

export async function GET() {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const requests = await prisma.contactRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess(requests);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const body = await request.json();
    const { id, ...rest } = body as { id: string; [key: string]: unknown };

    const parsed = updateRequestStatusSchema.safeParse(rest);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const contactRequest = await prisma.contactRequest.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return apiSuccess(contactRequest);
  } catch (error) {
    return handleApiError(error);
  }
}
