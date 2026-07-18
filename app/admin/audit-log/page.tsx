"use client";

import * as React from "react";
import { Shield, Loader2, Filter } from "lucide-react";
import { adminApi } from "@/lib/admin/api";
import type { AuditLog } from "@/lib/admin/types";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { cn } from "@/lib/utils";

const ACTIONS = ["", "create", "update", "delete", "suspend", "reactivate", "assign_role", "reset_stats", "broadcast", "login", "settings_change", "certificate_issue", "certificate_revoke", "leaderboard_refresh", "challenge_create", "challenge_archive", "import", "export"];
const RESOURCE_TYPES = ["", "user", "snippet", "category", "challenge", "certificate", "certificate_template", "leaderboard", "settings", "notification", "auth"];

export default function AdminAuditLogPage() {
  const [logs, setLogs] = React.useState<AuditLog[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [actionFilter, setActionFilter] = React.useState("");
  const [resourceFilter, setResourceFilter] = React.useState("");

  React.useEffect(() => { loadLogs(); }, [page, actionFilter, resourceFilter]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const params: Record<string, string | number> = { page, limit: 50 };
      if (actionFilter) params.action = actionFilter;
      if (resourceFilter) params.resource_type = resourceFilter;
      const { data: res } = await adminApi.getAuditLogs(params);
      setLogs(res.data.logs);
      setTotalPages(res.data.total_pages);
      setTotal(res.data.total);
    } catch {} finally { setLoading(false); }
  };

  const actionColors: Record<string, string> = {
    create: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    update: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    delete: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    suspend: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    login: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    broadcast: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  };

  const columns = [
    {
      key: "admin_email", header: "Admin",
      render: (item: AuditLog) => <span className="text-xs font-medium">{item.admin_email || "System"}</span>,
    },
    {
      key: "action", header: "Action",
      render: (item: AuditLog) => (
        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize", actionColors[item.action] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30")}>
          {item.action?.replace(/_/g, " ")}
        </span>
      ),
    },
    {
      key: "resource_type", header: "Resource",
      render: (item: AuditLog) => <span className="text-xs capitalize text-muted-foreground">{item.resource_type?.replace(/_/g, " ")}</span>,
    },
    {
      key: "resource_id", header: "Resource ID",
      render: (item: AuditLog) => <span className="font-mono text-xs text-muted-foreground">{item.resource_id ? `${item.resource_id.substring(0, 12)}...` : "—"}</span>,
    },
    {
      key: "details", header: "Details",
      render: (item: AuditLog) => <span className="text-xs text-muted-foreground">{item.details ? JSON.stringify(item.details).substring(0, 50) : "—"}</span>,
    },
    {
      key: "created_at", header: "Time",
      render: (item: AuditLog) => <span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleString()}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Audit Log" description={`Track ${total} admin actions`} icon={<Shield className="size-5" />} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <select value={actionFilter} onChange={(e) => { setActionFilter(e.target.value); setPage(1); }}
          className="rounded-xl border border-border/50 bg-white/80 px-3 py-2.5 text-sm dark:bg-ink/80">
          {ACTIONS.map((a) => <option key={a} value={a}>{a ? a.replace(/_/g, " ").toUpperCase() : "All Actions"}</option>)}
        </select>
        <select value={resourceFilter} onChange={(e) => { setResourceFilter(e.target.value); setPage(1); }}
          className="rounded-xl border border-border/50 bg-white/80 px-3 py-2.5 text-sm dark:bg-ink/80">
          {RESOURCE_TYPES.map((r) => <option key={r} value={r}>{r ? r.replace(/_/g, " ").toUpperCase() : "All Resources"}</option>)}
        </select>
      </div>

      <AdminDataTable columns={columns} data={logs} loading={loading} page={page} totalPages={totalPages} total={total} onPageChange={setPage} emptyMessage="No audit logs found" />
    </div>
  );
}
