import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-11-20.acacia",
      typescript: true,
    });
  }
  return stripeClient;
}

export async function createCheckoutSession({
  priceId,
  customerId,
  customerEmail,
  successUrl,
  cancelUrl,
  trialDays,
  metadata,
}: {
  priceId: string;
  customerId?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  trialDays?: number;
  metadata?: Record<string, string>;
}) {
  return getStripe().checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    customer: customerId,
    customer_email: customerId ? undefined : customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: trialDays
      ? { trial_period_days: trialDays, metadata }
      : { metadata },
    metadata,
    allow_promotion_codes: true,
  });
}

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
) {
  return getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}
