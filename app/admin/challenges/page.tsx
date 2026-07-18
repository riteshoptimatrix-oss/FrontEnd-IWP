"use client";

import * as React from "react";
import {
  Trophy, Plus, Archive, Trash2, Loader2, X, Calendar,
} from "lucide-react";
import { adminApi } from "@/lib/admin/api";
import type { Challenge } from "@/lib/admin/types";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { cn } from "@/lib/utils";

const LANGUAGES = ["html", "css", "javascript", "react", "nextjs", "typescript", "dart", "angular", "vue"];
const DIFFICULTIES = ["beginner", "intermediate", "advanced", "expert"];

export default function AdminChallengesPage() {
  const [challenges, setChallenges] = React.useState<Challenge[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [typeFilter, setTypeFilter] = React.useState("");
  const [showCreate, setShowCreate] = React.useState(false);
  const [actionLoading, setActionLoading] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({
    title: "", description: "", type: "daily", language: "javascript",
    category: "general", difficulty: "beginner", duration_seconds: 180,
    xp_reward: 50, bonus_xp: 25, scheduled_date: "",
  });

  React.useEffect(() => { loadChallenges(); }, [page, typeFilter]);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      const params: Record<string, string | number> = { page, limit: 20 };
      if (typeFilter) params.type = typeFilter;
      const { data: res } = await adminApi.getChallenges(params);
      setChallenges(res.data.challenges);
      setTotalPages(res.data.total_pages);
      setTotal(res.data.total);
    } catch {} finally { setLoading(false); }
  };

  const handleCreate = async () => {
    try {
      await adminApi.createChallenge(form);
      setShowCreate(false);
      setForm({ title: "", description: "", type: "daily", language: "javascript", category: "general", difficulty: "beginner", duration_seconds: 180, xp_reward: 50, bonus_xp: 25, scheduled_date: "" });
      loadChallenges();
    } catch {}
  };

  const handleArchive = async (id: string) => {
    try { setActionLoading(id); await adminApi.archiveChallenge(id); loadChallenges(); } catch {} finally { setActionLoading(null); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this challenge?")) return;
    try { setActionLoading(id); await adminApi.deleteChallenge(id); loadChallenges(); } catch {} finally { setActionLoading(null); }
  };

  const columns = [
    {
      key: "title", header: "Challenge",
      render: (item: Challenge) => (
        <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[250px]">{item.description}</p>
        </div>
      ),
    },
    {
      key: "type", header: "Type",
      render: (item: Challenge) => (
        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize", item.type === "weekly" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400")}>
          {item.type || "daily"}
        </span>
      ),
    },
    {
      key: "language", header: "Language",
      render: (item: Challenge) => <span className="text-xs capitalize">{item.language}</span>,
    },
    {
      key: "difficulty", header: "Difficulty",
      render: (item: Challenge) => <span className="text-xs capitalize text-muted-foreground">{item.difficulty}</span>,
    },
    {
      key: "xp_reward", header: "XP",
      render: (item: Challenge) => <span className="text-xs font-medium text-gold">{item.xp_reward}+</span>,
    },
    {
      key: "created_at", header: "Created",
      render: (item: Challenge) => <span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</span>,
    },
    {
      key: "actions", header: "Actions",
      render: (item: Challenge) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => handleArchive(item._id)} disabled={actionLoading === item._id} className="flex size-7 items-center justify-center rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30" title="Archive">
            <Archive className="size-3.5" />
          </button>
          <button onClick={() => handleDelete(item._id)} disabled={actionLoading === item._id} className="flex size-7 items-center justify-center rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" title="Delete">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Challenge Management" description={`Manage ${total} challenges`} icon={<Trophy className="size-5" />}>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-medium text-white hover:bg-gold/90">
          <Plus className="size-4" /> Create Challenge
        </button>
      </AdminPageHeader>

      <div className="flex gap-3">
        {["", "daily", "weekly"].map((t) => (
          <button key={t} onClick={() => { setTypeFilter(t); setPage(1); }}
            className={cn("rounded-xl px-4 py-2 text-sm font-medium transition-colors", !t && !typeFilter || t === typeFilter ? "bg-gold text-white" : "border border-border hover:bg-secondary")}>
            {t ? t.charAt(0).toUpperCase() + t.slice(1) : "All"}
          </button>
        ))}
      </div>

      <AdminDataTable columns={columns} data={challenges} loading={loading} page={page} totalPages={totalPages} total={total} onPageChange={setPage} emptyMessage="No challenges found" />

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border/50 bg-white p-6 shadow-xl dark:bg-ink">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Create Challenge</h3>
              <button onClick={() => setShowCreate(false)} className="flex size-8 items-center justify-center rounded-lg hover:bg-secondary"><X className="size-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80">
                    <option value="daily">Daily</option><option value="weekly">Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">Language</label>
                  <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80">
                    {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">Difficulty</label>
                  <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80">
                    {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium">Duration (s)</label>
                  <input type="number" value={form.duration_seconds} onChange={(e) => setForm({ ...form, duration_seconds: Number(e.target.value) })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">XP Reward</label>
                  <input type="number" value={form.xp_reward} onChange={(e) => setForm({ ...form, xp_reward: Number(e.target.value) })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium">Bonus XP</label>
                  <input type="number" value={form.bonus_xp} onChange={(e) => setForm({ ...form, bonus_xp: Number(e.target.value) })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowCreate(false)} className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
                <button onClick={handleCreate} disabled={!form.title} className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-white hover:bg-gold/90 disabled:opacity-50">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
