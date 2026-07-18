"use client";

import * as React from "react";
import {
  FileCode, Search, Plus, Trash2, Copy, Download, Upload,
  Edit3, Loader2, X, ChevronDown,
} from "lucide-react";
import { adminApi } from "@/lib/admin/api";
import type { Snippet } from "@/lib/admin/types";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { cn } from "@/lib/utils";

const LANGUAGES = ["", "html", "css", "javascript", "react", "nextjs", "typescript", "dart", "angular", "vue"];
const DIFFICULTIES = ["", "beginner", "intermediate", "advanced", "expert"];

const langColors: Record<string, string> = {
  html: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  css: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  javascript: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  react: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  nextjs: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
  typescript: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  dart: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  angular: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  vue: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export default function AdminSnippetsPage() {
  const [snippets, setSnippets] = React.useState<Snippet[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [langFilter, setLangFilter] = React.useState("");
  const [diffFilter, setDiffFilter] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [showCreate, setShowCreate] = React.useState(false);
  const [editSnippet, setEditSnippet] = React.useState<Snippet | null>(null);
  const [actionLoading, setActionLoading] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({
    language: "javascript",
    title: "",
    content: "",
    difficulty: "beginner",
    category: "general",
    tags: "",
  });

  React.useEffect(() => { loadSnippets(); }, [page, langFilter, diffFilter]);

  const loadSnippets = async () => {
    try {
      setLoading(true);
      const { data: res } = await adminApi.getSnippets({ page, limit: 20, language: langFilter, difficulty: diffFilter, search });
      setSnippets(res.data.snippets);
      setTotalPages(res.data.total_pages);
      setTotal(res.data.total);
    } catch {} finally { setLoading(false); }
  };

  const resetForm = () => setForm({ language: "javascript", title: "", content: "", difficulty: "beginner", category: "general", tags: "" });

  const handleCreate = async () => {
    try {
      const data = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
      await adminApi.createSnippet(data);
      setShowCreate(false);
      resetForm();
      loadSnippets();
    } catch {}
  };

  const handleUpdate = async () => {
    if (!editSnippet) return;
    try {
      const data = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
      await adminApi.updateSnippet(editSnippet._id, data);
      setEditSnippet(null);
      resetForm();
      loadSnippets();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this snippet?")) return;
    try { setActionLoading(id); await adminApi.deleteSnippet(id); loadSnippets(); } catch {} finally { setActionLoading(null); }
  };

  const handleDuplicate = async (id: string) => {
    try { setActionLoading(id); await adminApi.duplicateSnippet(id); loadSnippets(); } catch {} finally { setActionLoading(null); }
  };

  const handleExport = async () => {
    try {
      const { data: res } = await adminApi.exportSnippets(langFilter || undefined);
      const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `snippets-export-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {}
  };

  const openEdit = (snippet: Snippet) => {
    setForm({
      language: snippet.language,
      title: snippet.title,
      content: snippet.content,
      difficulty: snippet.difficulty,
      category: snippet.category || "general",
      tags: (snippet.tags || []).join(", "),
    });
    setEditSnippet(snippet);
  };

  const columns = [
    {
      key: "title", header: "Title", sortable: true, sortKey: "title",
      render: (item: Snippet) => (
        <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[200px]">{item.content?.substring(0, 60)}...</p>
        </div>
      ),
    },
    {
      key: "language", header: "Language", sortable: true, sortKey: "language",
      render: (item: Snippet) => (
        <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize", langColors[item.language] || "bg-gray-100 text-gray-700")}>
          {item.language}
        </span>
      ),
    },
    {
      key: "difficulty", header: "Difficulty", render: (item: Snippet) => (
        <span className="text-xs capitalize text-muted-foreground">{item.difficulty}</span>
      ),
    },
    {
      key: "category", header: "Category", render: (item: Snippet) => (
        <span className="text-xs text-muted-foreground">{item.category || "—"}</span>
      ),
    },
    {
      key: "created_at", header: "Created", sortable: true, sortKey: "created_at",
      render: (item: Snippet) => <span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</span>,
    },
    {
      key: "actions", header: "Actions",
      render: (item: Snippet) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => openEdit(item)} className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary" title="Edit">
            <Edit3 className="size-3.5" />
          </button>
          <button onClick={() => handleDuplicate(item._id)} disabled={actionLoading === item._id} className="flex size-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary" title="Duplicate">
            <Copy className="size-3.5" />
          </button>
          <button onClick={() => handleDelete(item._id)} disabled={actionLoading === item._id} className="flex size-7 items-center justify-center rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" title="Delete">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ),
    },
  ];

  const SnippetForm = ({ onSave, saveLabel }: { onSave: () => void; saveLabel: string }) => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium">Language</label>
          <select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80">
            {LANGUAGES.filter(Boolean).map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium">Difficulty</label>
          <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80">
            {DIFFICULTIES.filter(Boolean).map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Title</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" placeholder="Snippet title" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Category</label>
        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" placeholder="Category" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Content</label>
        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 font-mono text-xs dark:bg-ink/80" placeholder="Paste code here..." />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium">Tags (comma separated)</label>
        <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" placeholder="tag1, tag2, tag3" />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={() => { setShowCreate(false); setEditSnippet(null); resetForm(); }} className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
        <button onClick={onSave} disabled={!form.title || !form.content} className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-white hover:bg-gold/90 disabled:opacity-50">{saveLabel}</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Snippet Management" description={`Manage ${total} code snippets`} icon={<FileCode className="size-5" />}>
        <button onClick={() => { resetForm(); setShowCreate(true); }} className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-medium text-white hover:bg-gold/90">
          <Plus className="size-4" /> Add Snippet
        </button>
        <button onClick={handleExport} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary">
          <Download className="size-4" /> Export
        </button>
      </AdminPageHeader>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select value={langFilter} onChange={(e) => { setLangFilter(e.target.value); setPage(1); }} className="rounded-xl border border-border/50 bg-white/80 px-3 py-2.5 text-sm dark:bg-ink/80">
          {LANGUAGES.map((l) => <option key={l} value={l}>{l ? l.toUpperCase() : "All Languages"}</option>)}
        </select>
        <select value={diffFilter} onChange={(e) => { setDiffFilter(e.target.value); setPage(1); }} className="rounded-xl border border-border/50 bg-white/80 px-3 py-2.5 text-sm dark:bg-ink/80">
          {DIFFICULTIES.map((d) => <option key={d} value={d}>{d ? d.toUpperCase() : "All Difficulties"}</option>)}
        </select>
      </div>

      <AdminDataTable
        columns={columns}
        data={snippets}
        loading={loading}
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={setPage}
        emptyMessage="No snippets found"
      />

      {(showCreate || editSnippet) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/50 bg-white p-6 shadow-xl dark:bg-ink">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{editSnippet ? "Edit Snippet" : "Create Snippet"}</h3>
              <button onClick={() => { setShowCreate(false); setEditSnippet(null); resetForm(); }} className="flex size-8 items-center justify-center rounded-lg hover:bg-secondary"><X className="size-4" /></button>
            </div>
            <SnippetForm onSave={editSnippet ? handleUpdate : handleCreate} saveLabel={editSnippet ? "Update" : "Create"} />
          </div>
        </div>
      )}
    </div>
  );
}
