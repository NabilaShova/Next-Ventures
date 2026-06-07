import { prisma } from "@/lib/prisma";

import { SubscriptionsClient } from "./subscriptions-client";

export default async function SubscriptionsPage() {
  const subscriptions = await prisma.subscription.findMany({
    include: {
      user: { select: { email: true, name: true } },
      pricingPlan: {
        select: {
          name: true,
          product: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const stats = {
    active: subscriptions.filter((s) => s.status === "ACTIVE").length,
    trialing: subscriptions.filter((s) => s.status === "TRIALING").length,
    canceled: subscriptions.filter((s) => s.status === "CANCELED").length,
    pastDue: subscriptions.filter((s) => s.status === "PAST_DUE").length,
  };

  return (
    <SubscriptionsClient
      subscriptions={subscriptions.map((s) => ({
        id: s.id,
        userEmail: s.user.email,
        userName: s.user.name,
        planName: s.pricingPlan.name,
        productName: s.pricingPlan.product.name,
        status: s.status,
        interval: s.interval,
        currentPeriodEnd: s.currentPeriodEnd?.toISOString() ?? null,
        createdAt: s.createdAt.toISOString(),
      }))}
      stats={stats}
    />
  );
}
