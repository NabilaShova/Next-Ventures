"use client";

import { useCallback, useEffect, useState } from "react";
import type { RequestStatus } from "@prisma/client";

import { AdminShell } from "@/components/admin/admin-shell";
import { DataTable, type Column } from "@/components/admin/data-table";
import {
  RequestStatusBadge,
  formatDateTime,
} from "@/components/admin/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactRequest {
  id: string;
  company: string;
  name: string;
  email: string;
  phone: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
  status: RequestStatus;
  createdAt: string;
}

const statuses: RequestStatus[] = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export default function ContactRequestsPage() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/admin/contact-requests");
    const json = await res.json();
    if (json.success) setRequests(json.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function updateStatus(id: string, status: RequestStatus) {
    await fetch("/api/admin/contact-requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
  }

  const columns: Column<ContactRequest>[] = [
    {
      key: "name",
      header: "Contact",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      key: "company",
      header: "Company",
      sortable: true,
      cell: (row) => row.company,
    },
    {
      key: "message",
      header: "Message",
      cell: (row) => (
        <span className="line-clamp-2 max-w-xs text-muted-foreground">
          {row.message}
        </span>
      ),
    },
    {
      key: "budget",
      header: "Budget",
      cell: (row) => row.budget ?? "—",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <Select
          value={row.status}
          onValueChange={(v) => updateStatus(row.id, v as RequestStatus)}
        >
          <SelectTrigger className="h-8 w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "createdAt",
      header: "Submitted",
      sortable: true,
      cell: (row) => formatDateTime(row.createdAt),
    },
  ];

  return (
    <AdminShell
      title="Contact Requests"
      description="Manage inbound contact form submissions"
    >
      {loading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : (
        <DataTable
          data={requests as unknown as Record<string, unknown>[]}
          columns={columns as Column<Record<string, unknown>>[]}
          searchKey="company"
          searchPlaceholder="Search by company..."
        />
      )}
    </AdminShell>
  );
}
