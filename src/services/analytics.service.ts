import { withDb } from "@/lib/db-safe";
import { prisma } from "@/lib/prisma";

export interface TrackEventInput {
  event: string;
  page?: string;
  sessionId?: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsSummary {
  totalEvents: number;
  eventsByType: Record<string, number>;
  topPages: { page: string; count: number }[];
  period: { start: string; end: string };
}

export async function trackEvent(input: TrackEventInput) {
  const { data, fromDb } = await withDb(
    async () => {
      const event = await prisma.analyticsEvent.create({
        data: {
          event: input.event,
          page: input.page,
          sessionId: input.sessionId,
          metadata: input.metadata ?? undefined,
        },
      });
      return { event, persisted: true as const };
    },
    () => ({
      event: {
        id: `fallback-${crypto.randomUUID()}`,
        ...input,
        createdAt: new Date().toISOString(),
      },
      persisted: false as const,
    })
  );
  return { ...data, persisted: fromDb ? data.persisted : false };
}

export async function getAnalyticsSummary(days = 30): Promise<AnalyticsSummary> {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);

  const { data } = await withDb(
    async () => {
      const events = await prisma.analyticsEvent.findMany({
        where: { createdAt: { gte: start, lte: end } },
        select: { event: true, page: true },
      });

      const eventsByType: Record<string, number> = {};
      const pageCounts: Record<string, number> = {};

      for (const e of events) {
        eventsByType[e.event] = (eventsByType[e.event] ?? 0) + 1;
        if (e.page) {
          pageCounts[e.page] = (pageCounts[e.page] ?? 0) + 1;
        }
      }

      const topPages = Object.entries(pageCounts)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return {
        totalEvents: events.length,
        eventsByType,
        topPages,
        period: { start: start.toISOString(), end: end.toISOString() },
      };
    },
    () => ({
      totalEvents: 0,
      eventsByType: {},
      topPages: [],
      period: { start: start.toISOString(), end: end.toISOString() },
    })
  );
  return data;
}
