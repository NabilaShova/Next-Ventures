"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  CreditCard,
  FileText,
  Package,
  Users,
  Video,
} from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { ChartCard } from "@/components/admin/chart-card";
import { StatsCard } from "@/components/admin/stats-card";
import { LeadStatusBadge, formatDate } from "@/components/admin/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";

interface DashboardPageProps {
  stats: {
    productsCount: number;
    leadsCount: number;
    demoRequestsCount: number;
    contactRequestsCount: number;
    subscriptionsCount: number;
    blogPostsCount: number;
    recentLeads: {
      id: string;
      name: string | null;
      email: string;
      company: string | null;
      status: "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "LOST";
      createdAt: Date;
    }[];
    demoRequestsByMonth: { month: string; count: number }[];
  };
}

export function DashboardClient({ stats }: DashboardPageProps) {
  return (
    <AdminShell
      title="Dashboard"
      description="Overview of your platform metrics and activity"
    >
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          <StatsCard
            title="Products"
            value={stats.productsCount}
            icon={Package}
            description="Total catalog items"
          />
          <StatsCard
            title="Leads"
            value={stats.leadsCount}
            icon={Users}
            description="All captured leads"
          />
          <StatsCard
            title="Demo Requests"
            value={stats.demoRequestsCount}
            icon={Video}
            description="Scheduled demos"
          />
          <StatsCard
            title="Contact Requests"
            value={stats.contactRequestsCount}
            icon={FileText}
            description="Inbound inquiries"
          />
          <StatsCard
            title="Active Subscriptions"
            value={stats.subscriptionsCount}
            icon={CreditCard}
            description="Paying customers"
          />
          <StatsCard
            title="Blog Posts"
            value={stats.blogPostsCount}
            icon={FileText}
            description="Published articles"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <ChartCard
            title="Demo Requests"
            description="Last 6 months"
            className="lg:col-span-3"
          >
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.demoRequestsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <Card className="glass-card lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Leads</CardTitle>
              <Link
                href="/admin/leads"
                className="text-xs font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.recentLeads.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No leads yet
                </p>
              ) : (
                stats.recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-start justify-between gap-3 rounded-xl border border-border/40 p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {lead.name ?? lead.email}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {lead.company ?? lead.email}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(lead.createdAt)}
                      </p>
                    </div>
                    <LeadStatusBadge status={lead.status} />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Manage Products", href: "/admin/products" },
            { label: "Review Leads", href: "/admin/leads" },
            { label: "Demo Requests", href: "/admin/demo-requests" },
            { label: "View Analytics", href: "/admin/analytics" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glass-card flex items-center justify-between p-4 transition-all hover:shadow-glow-sm"
            >
              <span className="text-sm font-medium">{item.label}</span>
              <Badge variant="secondary">Open</Badge>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
