import { NextRequest } from "next/server";
import {
  apiError,
  apiSuccess,
  handleApiError,
  zodErrorResponse,
} from "@/lib/api-utils";
import { productsQuerySchema } from "@/lib/validations/api";
import { getFeaturedProducts, getProducts } from "@/services/product.service";

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams);
    const parsed = productsQuerySchema.safeParse(params);

    if (!parsed.success) {
      return zodErrorResponse(parsed.error);
    }

    const { category, type, search, featured } = parsed.data;

    if (featured === true) {
      const result = await getFeaturedProducts();
      return apiSuccess(result);
    }

    const result = await getProducts({ category, type, search, featured });
    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
