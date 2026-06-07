import { NextRequest } from "next/server";
import {
  apiError,
  apiSuccess,
  handleApiError,
} from "@/lib/api-utils";
import { getBlogPostBySlug } from "@/services/blog.service";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return apiError("Slug is required", 400);
    }

    const result = await getBlogPostBySlug(slug);

    if (!result) {
      return apiError("Blog post not found", 404);
    }

    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
