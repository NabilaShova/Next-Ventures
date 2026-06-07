"use client";

import { useCallback, useEffect, useState } from "react";
import type { LeadStatus } from "@prisma/client";

import { AdminShell } from "@/components/admin/admin-shell";
import { DataTable, type Column } from "@/components/admin/data-table";
import { formatDateTime } from "@/components/admin/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  phone: string | null;
  source: string | null;
  status: LeadStatus;
  createdAt: string;
}

const statuses: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/admin/leads");
    const json = await res.json();
    if (json.success) setLeads(json.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function updateStatus(id: string, status: LeadStatus) {
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchData();
  }

  const columns: Column<Lead>[] = [
    {
      key: "name",
      header: "Contact",
      sortable: true,
      cell: (row) => (
        <div>
          <p className="font-medium">{row.name ?? "—"}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      key: "company",
      header: "Company",
      sortable: true,
      cell: (row) => row.company ?? "—",
    },
    {
      key: "phone",
      header: "Phone",
      cell: (row) => row.phone ?? "—",
    },
    {
      key: "source",
      header: "Source",
      cell: (row) => row.source ?? "—",
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => (
        <Select
          value={row.status}
          onValueChange={(v) => updateStatus(row.id, v as LeadStatus)}
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
      header: "Date",
      sortable: true,
      cell: (row) => (
        <span className="text-muted-foreground">
          {formatDateTime(row.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <AdminShell title="Leads" description="Manage and track sales leads">
      {loading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : (
        <DataTable
          data={leads as unknown as Record<string, unknown>[]}
          columns={columns as Column<Record<string, unknown>>[]}
          searchKey="email"
          searchPlaceholder="Search by email..."
        />
      )}
    </AdminShell>
  );
}
