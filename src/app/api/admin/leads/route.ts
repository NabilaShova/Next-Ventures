import { NextRequest } from "next/server";

import {
  apiSuccess,
  handleApiError,
  zodErrorResponse,
} from "@/lib/api-utils";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateLeadStatusSchema } from "@/lib/validations/admin";

export async function GET() {
  try {
    const { error } = await requireAuth();
    if (error) return error;

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return apiSuccess(leads);
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

    const parsed = updateLeadStatusSchema.safeParse(rest);
    if (!parsed.success) return zodErrorResponse(parsed.error);

    const lead = await prisma.lead.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return apiSuccess(lead);
  } catch (error) {
    return handleApiError(error);
  }
}
