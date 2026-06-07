"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Eye, MousePointer } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { ChartCard } from "@/components/admin/chart-card";
import { StatsCard } from "@/components/admin/stats-card";

interface AnalyticsClientProps {
  data: {
    totalEvents: number;
    eventsByType: Record<string, number>;
    topPages: { page: string; count: number }[];
    dailyTrend: { date: string; count: number }[];
    period: { start: string; end: string };
  };
}

const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
];

export function AnalyticsClient({ data }: AnalyticsClientProps) {
  const eventTypeData = Object.entries(data.eventsByType).map(
    ([name, value]) => ({ name, value })
  );

  const dailyData = data.dailyTrend.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  const pageViews = data.eventsByType["page_view"] ?? 0;
  const clicks = data.eventsByType["click"] ?? 0;

  return (
    <AdminShell
      title="Analytics"
      description="Track user behavior and site performance"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatsCard
            title="Total Events"
            value={data.totalEvents}
            icon={Activity}
            description="Last 30 days"
          />
          <StatsCard
            title="Page Views"
            value={pageViews}
            icon={Eye}
            description="Tracked page views"
          />
          <StatsCard
            title="Clicks"
            value={clicks}
            icon={MousePointer}
            description="User interactions"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Daily Activity" description="Events over time">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    fill="url(#colorCount)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Events by Type" description="Event distribution">
            <div className="h-72">
              {eventTypeData.length === 0 ? (
                <p className="flex h-full items-center justify-center text-muted-foreground">
                  No event data yet
                </p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={eventTypeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {eventTypeData.map((_, i) => (
                        <Cell
                          key={i}
                          fill={CHART_COLORS[i % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </ChartCard>
        </div>

        <ChartCard title="Top Pages" description="Most visited pages">
          <div className="h-72">
            {data.topPages.length === 0 ? (
              <p className="flex h-full items-center justify-center text-muted-foreground">
                No page data yet
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.topPages} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                  <YAxis
                    type="category"
                    dataKey="page"
                    width={120}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--accent))"
                    radius={[0, 6, 6, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartCard>
      </div>
    </AdminShell>
  );
}
