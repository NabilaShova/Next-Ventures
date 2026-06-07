import { NextRequest } from "next/server";
import {
  apiSuccess,
  handleApiError,
  zodErrorResponse,
} from "@/lib/api-utils";
import { createDemoRequestSchema } from "@/lib/validations/api";
import { createDemoRequest } from "@/services/lead.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createDemoRequestSchema.safeParse(body);

    if (!parsed.success) {
      return zodErrorResponse(parsed.error);
    }

    const result = await createDemoRequest(parsed.data);
    return apiSuccess(result, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
