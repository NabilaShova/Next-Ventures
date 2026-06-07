import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [
    productsCount,
    leadsCount,
    demoRequestsCount,
    contactRequestsCount,
    subscriptionsCount,
    blogPostsCount,
    recentLeads,
    demoRequestsByMonth,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.lead.count(),
    prisma.demoRequest.count(),
    prisma.contactRequest.count(),
    prisma.subscription.count({ where: { status: "ACTIVE" } }),
    prisma.blogPost.count(),
    prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        status: true,
        createdAt: true,
      },
    }),
    getDemoRequestsChartData(),
  ]);

  return {
    productsCount,
    leadsCount,
    demoRequestsCount,
    contactRequestsCount,
    subscriptionsCount,
    blogPostsCount,
    recentLeads,
    demoRequestsByMonth,
  };
}

async function getDemoRequestsChartData() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const requests = await prisma.demoRequest.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true },
  });

  const months: { month: string; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    months.push({
      month: date.toLocaleDateString("en-US", { month: "short" }),
      count: 0,
    });
  }

  for (const request of requests) {
    const label = request.createdAt.toLocaleDateString("en-US", {
      month: "short",
    });
    const entry = months.find((m) => m.month === label);
    if (entry) entry.count += 1;
  }

  return months;
}

export async function getAnalyticsData(days = 30) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);

  const events = await prisma.analyticsEvent.findMany({
    where: { createdAt: { gte: start, lte: end } },
    select: { event: true, page: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const eventsByType: Record<string, number> = {};
  const pageCounts: Record<string, number> = {};
  const dailyCounts: Record<string, number> = {};

  for (const event of events) {
    eventsByType[event.event] = (eventsByType[event.event] ?? 0) + 1;
    if (event.page) {
      pageCounts[event.page] = (pageCounts[event.page] ?? 0) + 1;
    }
    const day = event.createdAt.toISOString().slice(0, 10);
    dailyCounts[day] = (dailyCounts[day] ?? 0) + 1;
  }

  const dailyTrend = Object.entries(dailyCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const topPages = Object.entries(pageCounts)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalEvents: events.length,
    eventsByType,
    topPages,
    dailyTrend,
    period: { start: start.toISOString(), end: end.toISOString() },
  };
}
