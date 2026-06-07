"use client";

import { CreditCard } from "lucide-react";

import { AdminShell } from "@/components/admin/admin-shell";
import { DataTable, type Column } from "@/components/admin/data-table";
import { StatsCard } from "@/components/admin/stats-card";
import { formatDateTime } from "@/components/admin/status-badge";
import { Badge } from "@/components/ui/badge";

interface Subscription {
  id: string;
  userEmail: string;
  userName: string | null;
  planName: string;
  productName: string;
  status: string;
  interval: string;
  currentPeriodEnd: string | null;
  createdAt: string;
}

interface SubscriptionsClientProps {
  subscriptions: Subscription[];
  stats: {
    active: number;
    trialing: number;
    canceled: number;
    pastDue: number;
  };
}

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-600",
  TRIALING: "bg-blue-500/10 text-blue-600",
  CANCELED: "bg-red-500/10 text-red-600",
  PAST_DUE: "bg-amber-500/10 text-amber-600",
  INCOMPLETE: "bg-muted text-muted-foreground",
};

export function SubscriptionsClient({
  subscriptions,
  stats,
}: SubscriptionsClientProps) {
  const columns: Column<Subscription>[] = [
    {
      key: "userEmail",
      header: "Customer",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="font-medium">{row.userName ?? row.userEmail}</p>
          <p className="text-xs text-muted-foreground">{row.userEmail}</p>
        </div>
      ),
    },
    {
      key: "productName",
      header: "Product",
      cell: (row) => (
        <div>
          <p>{row.productName}</p>
          <p className="text-xs text-muted-foreground">{row.planName}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <Badge
          variant="outline"
          className={statusStyles[row.status] ?? ""}
        >
          {row.status.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "interval",
      header: "Billing",
      cell: (row) => row.interval,
    },
    {
      key: "currentPeriodEnd",
      header: "Renews",
      cell: (row) =>
        row.currentPeriodEnd ? formatDateTime(row.currentPeriodEnd) : "—",
    },
    {
      key: "createdAt",
      header: "Started",
      sortable: true,
      cell: (row) => formatDateTime(row.createdAt),
    },
  ];

  return (
    <AdminShell
      title="Subscriptions"
      description="Monitor active subscriptions and billing"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Active"
            value={stats.active}
            icon={CreditCard}
          />
          <StatsCard
            title="Trialing"
            value={stats.trialing}
            icon={CreditCard}
          />
          <StatsCard
            title="Past Due"
            value={stats.pastDue}
            icon={CreditCard}
          />
          <StatsCard
            title="Canceled"
            value={stats.canceled}
            icon={CreditCard}
          />
        </div>

        <DataTable
          data={subscriptions as unknown as Record<string, unknown>[]}
          columns={columns as Column<Record<string, unknown>>[]}
          searchKey="userEmail"
          searchPlaceholder="Search by email..."
          emptyMessage="No subscriptions yet."
        />
      </div>
    </AdminShell>
  );
}
