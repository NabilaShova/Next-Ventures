import {
  apiSuccess,
  handleApiError,
} from "@/lib/api-utils";
import { getCaseStudies } from "@/services/case-study.service";

export async function GET() {
  try {
    const result = await getCaseStudies();
    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
