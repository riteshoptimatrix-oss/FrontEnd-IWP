"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Column {
  key: string;
  header: string;
  render?: (item: any) => React.ReactNode;
  className?: string;
  sortable?: boolean;
  sortKey?: string;
}

interface AdminDataTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  page?: number;
  totalPages?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: string, order: "asc" | "desc") => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  emptyMessage?: string;
  onRowClick?: (item: any) => void;
  selectedRows?: Set<string>;
  onRowSelect?: (id: string) => void;
  selectAll?: boolean;
  onSelectAll?: () => void;
  getRowId?: (item: any) => string;
  bulkActions?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AdminDataTable({
  columns,
  data,
  loading,
  page = 1,
  totalPages = 1,
  total = 0,
  onPageChange,
  onSort,
  sortBy,
  sortOrder = "desc",
  emptyMessage = "No data found",
  onRowClick,
  selectedRows,
  onRowSelect,
  selectAll,
  onSelectAll,
  getRowId,
  bulkActions,
}: AdminDataTableProps) {
  const handleSort = (key: string) => {
    if (!onSort || !key) return;
    const newOrder = sortBy === key && sortOrder === "asc" ? "desc" : "asc";
    onSort(key, newOrder);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-white/80 backdrop-blur-xl dark:bg-ink/80">
      {bulkActions && selectedRows && selectedRows.size > 0 && (
        <div className="flex items-center gap-3 border-b border-border/50 bg-gold/5 px-4 py-3">
          <span className="text-sm font-medium">{selectedRows.size} selected</span>
          {bulkActions}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-secondary/30">
              {selectedRows && (
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={onSelectAll}
                    className="size-4 rounded border-border accent-gold"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider",
                    col.sortable && "cursor-pointer select-none hover:text-foreground",
                    col.className,
                  )}
                  onClick={() => col.sortable && col.sortKey && handleSort(col.sortKey)}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortBy === col.sortKey && (
                      <span className="text-gold">{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectedRows ? 1 : 0)} className="px-4 py-12 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" />
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectedRows ? 1 : 0)} className="px-4 py-12 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, idx) => {
                const id = getRowId ? getRowId(item) : String((item as Record<string, unknown>)._id || idx);
                return (
                  <tr
                    key={id}
                    className={cn(
                      "transition-colors hover:bg-secondary/30",
                      onRowClick && "cursor-pointer",
                      selectedRows?.has(id) && "bg-gold/5",
                    )}
                    onClick={() => onRowClick?.(item)}
                  >
                    {selectedRows && (
                      <td className="w-10 px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedRows.has(id)}
                          onChange={() => onRowSelect?.(id)}
                          className="size-4 rounded border-border accent-gold"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className={cn("px-4 py-3", col.className)}>
                        {col.render
                          ? col.render(item)
                          : String(item[col.key] ?? "—")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border/50 px-4 py-3">
          <span className="text-xs text-muted-foreground">
            Showing page {page} of {totalPages} ({total} total)
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange?.(1)}
              disabled={page <= 1}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
            >
              <ChevronsLeft className="size-4" />
            </button>
            <button
              onClick={() => onPageChange?.(page - 1)}
              disabled={page <= 1}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="px-3 text-sm font-medium">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => onPageChange?.(page + 1)}
              disabled={page >= totalPages}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              onClick={() => onPageChange?.(totalPages)}
              disabled={page >= totalPages}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
            >
              <ChevronsRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
