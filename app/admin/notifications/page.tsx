"use client";

import * as React from "react";
import {
  Bell, Plus, Trash2, Loader2, Send, X,
} from "lucide-react";
import { adminApi } from "@/lib/admin/api";
import type { AdminNotification } from "@/lib/admin/types";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { cn } from "@/lib/utils";

const NOTIF_TYPES = ["announcement", "maintenance", "challenge"];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = React.useState<AdminNotification[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [showCreate, setShowCreate] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [form, setForm] = React.useState({ title: "", message: "", type: "announcement", target: "all" });

  React.useEffect(() => { loadNotifications(); }, [page]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const { data: res } = await adminApi.getNotifications({ page, limit: 20 });
      setNotifications(res.data.notifications);
      setTotalPages(res.data.total_pages);
      setTotal(res.data.total);
    } catch {} finally { setLoading(false); }
  };

  const handleBroadcast = async () => {
    try {
      setSending(true);
      await adminApi.broadcastNotification(form);
      setShowCreate(false);
      setForm({ title: "", message: "", type: "announcement", target: "all" });
      loadNotifications();
    } catch {} finally { setSending(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this notification?")) return;
    try { await adminApi.deleteNotification(id); loadNotifications(); } catch {}
  };

  const typeColors: Record<string, string> = {
    announcement: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    maintenance: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    challenge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  };

  const columns = [
    {
      key: "title", header: "Notification",
      render: (item: AdminNotification) => (
        <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[300px]">{item.message}</p>
        </div>
      ),
    },
    {
      key: "type", header: "Type",
      render: (item: AdminNotification) => (
        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize", typeColors[item.type] || "bg-gray-100 text-gray-700")}>
          {item.type}
        </span>
      ),
    },
    { key: "target", header: "Target", render: (item: AdminNotification) => <span className="text-xs capitalize text-muted-foreground">{item.target}</span> },
    { key: "sent_at", header: "Sent", render: (item: AdminNotification) => <span className="text-xs text-muted-foreground">{item.sent_at ? new Date(item.sent_at).toLocaleString() : "Pending"}</span> },
    {
      key: "actions", header: "Actions",
      render: (item: AdminNotification) => (
        <div onClick={(e) => e.stopPropagation()}>
          <button onClick={() => handleDelete(item._id)} className="flex size-7 items-center justify-center rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" title="Delete">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Notifications" description={`Broadcast to ${total} recipients`} icon={<Bell className="size-5" />}>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-medium text-white hover:bg-gold/90">
          <Send className="size-4" /> Broadcast
        </button>
      </AdminPageHeader>

      <AdminDataTable columns={columns} data={notifications} loading={loading} page={page} totalPages={totalPages} total={total} onPageChange={setPage} emptyMessage="No notifications sent yet" />

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-border/50 bg-white p-6 shadow-xl dark:bg-ink">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Broadcast Notification</h3>
              <button onClick={() => setShowCreate(false)} className="flex size-8 items-center justify-center rounded-lg hover:bg-secondary"><X className="size-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80">
                    {NOTIF_TYPES.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">Target</label>
                  <select value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80">
                    <option value="all">All Users</option><option value="users">Regular Users</option><option value="premium">Premium Users</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowCreate(false)} className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
                <button onClick={handleBroadcast} disabled={!form.title || !form.message || sending} className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-white hover:bg-gold/90 disabled:opacity-50">
                  {sending ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
