"use client";

import type { LeadStatus, RequestStatus } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const leadStatusStyles: Record<LeadStatus, string> = {
  NEW: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  CONTACTED: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  QUALIFIED: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  CONVERTED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  LOST: "bg-red-500/10 text-red-600 border-red-500/20",
};

const requestStatusStyles: Record<RequestStatus, string> = {
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  COMPLETED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium capitalize", leadStatusStyles[status])}
    >
      {status.toLowerCase().replace("_", " ")}
    </Badge>
  );
}

export function RequestStatusBadge({ status }: { status: RequestStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium capitalize", requestStatusStyles[status])}
    >
      {status.toLowerCase().replace("_", " ")}
    </Badge>
  );
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
