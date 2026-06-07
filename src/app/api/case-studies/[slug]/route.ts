import { NextRequest } from "next/server";
import {
  apiError,
  apiSuccess,
  handleApiError,
} from "@/lib/api-utils";
import { getCaseStudyBySlug } from "@/services/case-study.service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return apiError("Slug is required", 400);
    }

    const result = await getCaseStudyBySlug(slug);

    if (!result) {
      return apiError("Case study not found", 404);
    }

    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
