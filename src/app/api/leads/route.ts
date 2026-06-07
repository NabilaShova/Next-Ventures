import { NextRequest } from "next/server";
import {
  apiSuccess,
  handleApiError,
  zodErrorResponse,
} from "@/lib/api-utils";
import { createLeadSchema } from "@/lib/validations/api";
import { createLead } from "@/services/lead.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createLeadSchema.safeParse(body);

    if (!parsed.success) {
      return zodErrorResponse(parsed.error);
    }

    const result = await createLead(parsed.data);
    return apiSuccess(result, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
