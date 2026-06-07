"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchKey?: keyof T;
  searchPlaceholder?: string;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  searchKey,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let rows = [...data];

    if (search && searchKey) {
      const query = search.toLowerCase();
      rows = rows.filter((row) => {
        const value = row[searchKey];
        return String(value ?? "")
          .toLowerCase()
          .includes(query);
      });
    }

    if (sortKey) {
      rows.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal == null || bVal == null) return 0;
        const cmp = String(aVal).localeCompare(String(bVal), undefined, {
          numeric: true,
        });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return rows;
  }, [data, search, searchKey, sortKey, sortDir]);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {searchKey && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-9"
          />
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border/60 bg-card/50">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-left font-medium text-muted-foreground",
                      col.sortable && "cursor-pointer select-none hover:text-foreground",
                      col.className
                    )}
                    onClick={
                      col.sortable ? () => handleSort(col.key) : undefined
                    }
                  >
                    {col.header}
                    {col.sortable && sortKey === col.key && (
                      <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr
                    key={i}
                    className={cn(
                      "border-b border-border/40 transition-colors last:border-0",
                      onRowClick && "cursor-pointer hover:bg-muted/40"
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn("px-4 py-3", col.className)}
                      >
                        {col.cell(row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {data.length} entries
      </p>
    </div>
  );
}
