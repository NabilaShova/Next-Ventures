import { NextRequest } from "next/server";
import {
  apiSuccess,
  handleApiError,
} from "@/lib/api-utils";
import { getBlogPosts, getBlogPostsByCategory } from "@/services/blog.service";

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");

    if (category) {
      const result = await getBlogPostsByCategory(category);
      return apiSuccess(result);
    }

    const result = await getBlogPosts();
    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
