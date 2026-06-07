import { NextRequest } from "next/server";
import {
  apiError,
  apiSuccess,
  handleApiError,
  zodErrorResponse,
} from "@/lib/api-utils";
import { absoluteUrl } from "@/lib/utils";
import { checkoutSchema } from "@/lib/validations/api";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return apiError("Stripe is not configured", 503);
    }

    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return zodErrorResponse(parsed.error);
    }

    const {
      priceId,
      customerEmail,
      customerId,
      trialDays,
      productSlug,
      successUrl,
      cancelUrl,
    } = parsed.data;

    const session = await createCheckoutSession({
      priceId,
      customerId,
      customerEmail,
      trialDays,
      successUrl: successUrl ?? absoluteUrl("/checkout/success"),
      cancelUrl: cancelUrl ?? absoluteUrl("/pricing"),
      metadata: productSlug ? { productSlug } : undefined,
    });

    return apiSuccess({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
