import { NextRequest } from "next/server";
import {
  apiError,
  apiSuccess,
  handleApiError,
  zodErrorResponse,
} from "@/lib/api-utils";
import { trackEventSchema } from "@/lib/validations/api";
import {
  getAnalyticsSummary,
  trackEvent,
} from "@/services/analytics.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = trackEventSchema.safeParse(body);

    if (!parsed.success) {
      return zodErrorResponse(parsed.error);
    }

    const result = await trackEvent(parsed.data);
    return apiSuccess(result, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const daysParam = request.nextUrl.searchParams.get("days");
    const days = daysParam ? parseInt(daysParam, 10) : 30;

    if (isNaN(days) || days < 1 || days > 365) {
      return apiError("Days must be between 1 and 365", 400);
    }

    const summary = await getAnalyticsSummary(days);
    return apiSuccess(summary);
  } catch (error) {
    return handleApiError(error);
  }
}
