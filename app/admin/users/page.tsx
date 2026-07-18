"use client";

import * as React from "react";
import {
  Users, Search, Filter, Shield, UserX, UserCheck,
  Trash2, RotateCcw, ChevronDown, Loader2, Eye, X,
} from "lucide-react";
import { adminApi } from "@/lib/admin/api";
import type { AdminUser } from "@/lib/admin/types";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { cn } from "@/lib/utils";

const ROLES = ["", "super_admin", "admin", "moderator", "content_manager", "support", "user"];
const STATUSES = ["", "active", "suspended", "deactivated", "pending"];

const roleColors: Record<string, string> = {
  super_admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  admin: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  moderator: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  content_manager: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  support: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
  user: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  suspended: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  deactivated: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [sortBy, setSortBy] = React.useState("created_at");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("desc");
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [actionLoading, setActionLoading] = React.useState<string | null>(null);
  const [viewUser, setViewUser] = React.useState<AdminUser | null>(null);
  const [roleModal, setRoleModal] = React.useState<AdminUser | null>(null);
  const [newRole, setNewRole] = React.useState("");

  React.useEffect(() => {
    loadUsers();
  }, [page, roleFilter, statusFilter, sortBy, sortOrder]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data: res } = await adminApi.getUsers({
        page,
        limit: 20,
        search,
        role: roleFilter,
        status: statusFilter,
        sort_by: sortBy,
        sort_order: sortOrder,
      });
      setUsers(res.data.users);
      setTotalPages(res.data.total_pages);
      setTotal(res.data.total);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    loadUsers();
  };

  const handleAction = async (userId: string, action: string, reason?: string) => {
    try {
      setActionLoading(userId);
      if (action === "suspend") await adminApi.suspendUser(userId, reason);
      else if (action === "reactivate") await adminApi.reactivateUser(userId);
      else if (action === "delete") {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
          setActionLoading(null);
          return;
        }
        await adminApi.deleteUser(userId);
      } else if (action === "reset-stats") await adminApi.resetUserStats(userId);
      await loadUsers();
    } catch {
      // handle error
    } finally {
      setActionLoading(null);
    }
  };

  const handleRoleChange = async () => {
    if (!roleModal || !newRole) return;
    try {
      setActionLoading(roleModal.id);
      await adminApi.updateUserRole(roleModal.id, newRole);
      setRoleModal(null);
      await loadUsers();
    } catch {
      // handle error
    } finally {
      setActionLoading(null);
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === users.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(users.map((u) => u.id)));
    }
  };

  const columns = [
    {
      key: "full_name",
      header: "User",
      sortable: true,
      sortKey: "full_name",
      render: (item: AdminUser) => (
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gold/10 text-xs font-bold text-gold">
            {item.full_name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-medium">{item.full_name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      sortKey: "role",
      render: (item: AdminUser) => (
        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize", roleColors[item.role] || roleColors.user)}>
          {item.role?.replace("_", " ")}
        </span>
      ),
    },
    {
      key: "account_status",
      header: "Status",
      sortable: true,
      sortKey: "account_status",
      render: (item: AdminUser) => (
        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize", statusColors[item.account_status] || statusColors.user)}>
          {item.account_status}
        </span>
      ),
    },
    {
      key: "created_at",
      header: "Joined",
      sortable: true,
      sortKey: "created_at",
      render: (item: AdminUser) => (
        <span className="text-xs text-muted-foreground">
          {new Date(item.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "last_login",
      header: "Last Login",
      render: (item: AdminUser) => (
        <span className="text-xs text-muted-foreground">
          {item.last_login ? new Date(item.last_login).toLocaleDateString() : "Never"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: AdminUser) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => { setViewUser(item); }}
            className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            title="View"
          >
            <Eye className="size-3.5" />
          </button>
          <button
            onClick={() => { setRoleModal(item); setNewRole(item.role); }}
            className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            title="Change Role"
          >
            <Shield className="size-3.5" />
          </button>
          {item.account_status === "active" ? (
            <button
              onClick={() => handleAction(item.id, "suspend")}
              disabled={actionLoading === item.id}
              className="flex size-7 items-center justify-center rounded-lg text-amber-600 transition-colors hover:bg-amber-50 dark:hover:bg-amber-950/30"
              title="Suspend"
            >
              <UserX className="size-3.5" />
            </button>
          ) : (
            <button
              onClick={() => handleAction(item.id, "reactivate")}
              disabled={actionLoading === item.id}
              className="flex size-7 items-center justify-center rounded-lg text-emerald-600 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
              title="Reactivate"
            >
              <UserCheck className="size-3.5" />
            </button>
          )}
          <button
            onClick={() => handleAction(item.id, "reset-stats")}
            disabled={actionLoading === item.id}
            className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            title="Reset Stats"
          >
            <RotateCcw className="size-3.5" />
          </button>
          <button
            onClick={() => handleAction(item.id, "delete")}
            disabled={actionLoading === item.id}
            className="flex size-7 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
            title="Delete"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="User Management"
        description={`Manage ${total} users across the platform`}
        icon={<Users className="size-5" />}
      />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full rounded-xl border border-border/50 bg-white/80 py-2.5 pl-10 pr-4 text-sm backdrop-blur-xl placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold dark:bg-ink/80"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          className="rounded-xl border border-border/50 bg-white/80 px-3 py-2.5 text-sm backdrop-blur-xl focus:border-gold focus:outline-none dark:bg-ink/80"
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>{r ? r.replace("_", " ").toUpperCase() : "All Roles"}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="rounded-xl border border-border/50 bg-white/80 px-3 py-2.5 text-sm backdrop-blur-xl focus:border-gold focus:outline-none dark:bg-ink/80"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s ? s.toUpperCase() : "All Statuses"}</option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          className="rounded-xl bg-gold px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold/90"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <AdminDataTable
        columns={columns}
        data={users}
        loading={loading}
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={setPage}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={(key, order) => { setSortBy(key); setSortOrder(order); }}
        selectedRows={selected}
        onRowSelect={toggleSelect}
        selectAll={selected.size === users.length && users.length > 0}
        onSelectAll={toggleSelectAll}
        getRowId={(item) => String(item.id || item._id)}
        emptyMessage="No users found"
      />

      {/* View User Modal */}
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-lg rounded-2xl border border-border/50 bg-white p-6 shadow-xl dark:bg-ink">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">User Details</h3>
              <button onClick={() => setViewUser(null)} className="flex size-8 items-center justify-center rounded-lg hover:bg-secondary">
                <X className="size-4" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                ["Name", viewUser.full_name],
                ["Email", viewUser.email],
                ["Role", viewUser.role?.replace("_", " ")],
                ["Status", viewUser.account_status],
                ["Company", viewUser.company || "—"],
                ["Phone", viewUser.phone || "—"],
                ["Joined", new Date(viewUser.created_at).toLocaleDateString()],
                ["Last Login", viewUser.last_login ? new Date(viewUser.last_login).toLocaleString() : "Never"],
                ["Email Verified", viewUser.email_verified ? "Yes" : "No"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-border/30 py-2">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Role Change Modal */}
      {roleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl border border-border/50 bg-white p-6 shadow-xl dark:bg-ink">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Change Role</h3>
              <button onClick={() => setRoleModal(null)} className="flex size-8 items-center justify-center rounded-lg hover:bg-secondary">
                <X className="size-4" />
              </button>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">Assign a new role to {roleModal.full_name}</p>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="mb-4 w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2.5 text-sm dark:bg-ink/80"
            >
              {ROLES.filter(Boolean).map((r) => (
                <option key={r} value={r}>{r.replace("_", " ").toUpperCase()}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRoleModal(null)}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChange}
                disabled={actionLoading === roleModal.id}
                className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-white hover:bg-gold/90 disabled:opacity-50"
              >
                {actionLoading === roleModal.id ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
