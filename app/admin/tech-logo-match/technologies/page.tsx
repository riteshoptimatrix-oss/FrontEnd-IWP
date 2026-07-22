"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus, Search, Archive, RotateCcw, Trash2, Edit3,
  Loader2, ChevronLeft, ChevronRight, X,
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

import { techLogoMatchAdminApi } from "@/lib/tech-logo-match-admin/api";
import type { TechnologyItem, PaginatedTechnologies } from "@/lib/tech-logo-match-admin/types";
import { cn } from "@/lib/utils";

type ModalMode = "create" | "edit" | "delete" | "archive" | "restore" | null;

const DIFFICULTIES = ["beginner", "easy", "medium", "hard", "expert"];

function TechForm({ data, onChange, categories }: {
  data: Partial<TechnologyItem>;
  onChange: (d: Partial<TechnologyItem>) => void;
  categories: string[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Official Name *</label>
        <input value={data.official_name || ""} onChange={(e) => onChange({ ...data, official_name: e.target.value })}
          className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20" />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Short Name *</label>
        <input value={data.short_name || ""} onChange={(e) => onChange({ ...data, short_name: e.target.value })}
          className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20" />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Category *</label>
        <input value={data.category || ""} onChange={(e) => onChange({ ...data, category: e.target.value })}
          list="cat-list"
          className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20" />
        <datalist id="cat-list">{categories.map((c) => <option key={c} value={c} />)}</datalist>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Difficulty</label>
        <select value={data.difficulty || "beginner"} onChange={(e) => onChange({ ...data, difficulty: e.target.value })}
          className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20">
          {DIFFICULTIES.map((d) => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
        </select>
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <label className="text-xs font-medium text-muted-foreground">Description</label>
        <textarea value={data.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })}
          rows={3}
          className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20" />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Aliases (comma separated)</label>
        <input value={(data.aliases || []).join(", ")} onChange={(e) => onChange({ ...data, aliases: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
          className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20" />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Official URL</label>
        <input value={data.official_url || ""} onChange={(e) => onChange({ ...data, official_url: e.target.value })}
          className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20" />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Display Order</label>
        <input type="number" min={0} value={data.display_order ?? 0} onChange={(e) => onChange({ ...data, display_order: parseInt(e.target.value) || 0 })}
          className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20" />
      </div>
    </div>
  );
}

function ConfirmDialog({ open, title, message, confirmLabel, variant, onConfirm, onCancel }: {
  open: boolean; title: string; message: string; confirmLabel?: string;
  variant?: "danger" | "warning"; onConfirm: () => void; onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onCancel}>
      <m.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm rounded-2xl border border-border/40 bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <div className="mt-5 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-xl border border-border/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">Cancel</button>
          <button onClick={onConfirm}
            className={cn("rounded-xl px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110",
              variant === "danger" ? "bg-red-500" : "bg-gold")}>{confirmLabel || "Confirm"}</button>
        </div>
      </m.div>
    </div>
  );
}

export default function TechnologiesAdminPage() {
  const [data, setData] = useState<PaginatedTechnologies | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const [modal, setModal] = useState<ModalMode>(null);
  const [editing, setEditing] = useState<Partial<TechnologyItem>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false) ;

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await techLogoMatchAdminApi.listTechnologies({ page, limit: 20, search, status: filterStatus, difficulty: filterDifficulty });
      setData(res);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [page, search, filterStatus, filterDifficulty]);

  const fetchCategories = useCallback(async () => {
    try {
      const cats = await techLogoMatchAdminApi.listCategories();
      setCategories(cats.map((c) => c.name));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetch(); fetchCategories(); }, [fetch, fetchCategories]);

  const openCreate = () => { setEditing({ difficulty: "beginner", status: "active", display_order: 0, aliases: [] }); setModal("create"); };
  const openEdit = (item: TechnologyItem) => { setEditing({ ...item }); setModal("edit"); setSelectedId(item.id); };
  const openDelete = (id: string) => { setSelectedId(id); setModal("delete"); };
  const openArchive = (id: string) => { setSelectedId(id); setModal("archive"); };
  const openRestore = (id: string) => { setSelectedId(id); setModal("restore"); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === "create") {
        await techLogoMatchAdminApi.createTechnology(editing);
      } else if (modal === "edit" && selectedId) {
        await techLogoMatchAdminApi.updateTechnology(selectedId, editing);
      }
      setModal(null); fetch();
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try { await techLogoMatchAdminApi.deleteTechnology(selectedId); setModal(null); fetch(); }
    catch { /* ignore */ }
  };

  const handleArchive = async () => {
    if (!selectedId) return;
    try { await techLogoMatchAdminApi.archiveTechnology(selectedId); setModal(null); fetch(); }
    catch { /* ignore */ }
  };

  const handleRestore = async () => {
    if (!selectedId) return;
    try { await techLogoMatchAdminApi.restoreTechnology(selectedId); setModal(null); fetch(); }
    catch { /* ignore */ }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (!data) return;
    if (selected.size === data.technologies.length) { setSelected(new Set()); }
    else { setSelected(new Set(data.technologies.map((t) => t.id))); }
  };

  const handleBulkDelete = async () => {
    for (const id of selected) {
      try { await techLogoMatchAdminApi.deleteTechnology(id); } catch { /* ignore */ }
    }
    setSelected(new Set()); fetch();
  };

  const handleBulkArchive = async () => {
    for (const id of selected) {
      try { await techLogoMatchAdminApi.archiveTechnology(id); } catch { /* ignore */ }
    }
    setSelected(new Set()); fetch();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Technologies</h1>
          <p className="text-sm text-muted-foreground">Manage technology definitions, logos, and metadata.</p>
        </div>
        <button onClick={openCreate}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110">
          <Plus className="size-4" /> Add Technology
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search technologies..."
            className="w-full rounded-xl border border-border/40 bg-background/60 py-2 pl-9 pr-3 text-sm outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20" />
        </div>
        <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
          className="rounded-xl border border-border/40 bg-background/60 px-3 py-2 text-xs outline-none focus:border-gold/40">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
        <select value={filterDifficulty} onChange={(e) => { setFilterDifficulty(e.target.value); setPage(1); }}
          className="rounded-xl border border-border/40 bg-background/60 px-3 py-2 text-xs outline-none focus:border-gold/40">
          <option value="">All Difficulty</option>
          {DIFFICULTIES.map((d) => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
        </select>
        {selected.size > 0 && (
          <div className="flex items-center gap-2 rounded-xl bg-gold/5 px-3 py-1.5 text-xs">
            <span className="font-medium">{selected.size} selected</span>
            <button onClick={handleBulkArchive} className="text-amber-600 hover:underline">Archive</button>
            <button onClick={handleBulkDelete} className="text-red-500 hover:underline">Delete</button>
            <button onClick={() => setSelected(new Set())} className="text-muted-foreground hover:underline">Clear</button>
          </div>
        )}
      </div>

      {/* Table */}
      {loading && (
        <div className="space-y-2">{[1,2,3,4,5].map((i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-border/30" />)}</div>
      )}

      {data && data.technologies.length === 0 && !loading && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-muted-foreground">No technologies found.</p>
          <button onClick={openCreate} className="text-sm font-medium text-gold hover:underline">Add your first technology</button>
        </div>
      )}

      {data && data.technologies.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-border/30 bg-white/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-border/10">
                  <th className="w-10 px-3 py-3 text-left">
                    <input type="checkbox" checked={selected.size === data.technologies.length && data.technologies.length > 0}
                      onChange={toggleAll} className="rounded border-border/50" />
                  </th>
                  <th className="px-3 py-3 text-left font-medium text-muted-foreground">Name</th>
                  <th className="px-3 py-3 text-left font-medium text-muted-foreground">Category</th>
                  <th className="px-3 py-3 text-left font-medium text-muted-foreground">Difficulty</th>
                  <th className="px-3 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-3 py-3 text-left font-medium text-muted-foreground">Order</th>
                  <th className="px-3 py-3 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.technologies.map((t) => (
                  <tr key={t.id} className={cn("border-b border-border/20 transition-colors hover:bg-accent/30", t.status === "archived" && "opacity-50")}>
                    <td className="px-3 py-3">
                      <input type="checkbox" checked={selected.has(t.id)} onChange={() => toggleSelect(t.id)} className="rounded border-border/50" />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        {t.logo_url ? (
                          <img src={t.logo_url} alt={t.short_name} className="size-7 shrink-0 rounded-lg border border-border/30 bg-white object-contain p-0.5" />
                        ) : (
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/30 bg-border/20 text-[9px] font-bold text-muted-foreground">
                            {t.short_name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-medium">{t.official_name}</p>
                          <p className="text-[10px] text-muted-foreground">{t.short_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-lg bg-border/20 px-2 py-0.5 text-[11px]">{t.category}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs capitalize">{t.difficulty}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium",
                        t.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-500")}>{t.status}</span>
                    </td>
                    <td className="px-3 py-3 text-xs tabular-nums">{t.display_order}</td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(t)} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent"><Edit3 className="size-3.5" /></button>
                        {t.status === "active" ? (
                          <button onClick={() => openArchive(t.id)} className="rounded-lg p-1.5 text-amber-600 transition-colors hover:bg-amber-50"><Archive className="size-3.5" /></button>
                        ) : (
                          <button onClick={() => openRestore(t.id)} className="rounded-lg p-1.5 text-emerald-600 transition-colors hover:bg-emerald-50"><RotateCcw className="size-3.5" /></button>
                        )}
                        <button onClick={() => openDelete(t.id)} className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50"><Trash2 className="size-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-border/30 px-4 py-3 text-sm">
            <span className="text-muted-foreground">{data.total} total</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}
                className="rounded-lg border border-border/40 p-1.5 transition-colors hover:bg-accent disabled:opacity-40"><ChevronLeft className="size-4" /></button>
              <span className="tabular-nums">Page {data.page} of {Math.ceil(data.total / data.limit)}</span>
              <button onClick={() => setPage((p) => p + 1)} disabled={!data.has_more}
                className="rounded-lg border border-border/40 p-1.5 transition-colors hover:bg-accent disabled:opacity-40"><ChevronRight className="size-4" /></button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {(modal === "create" || modal === "edit") && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm" onClick={() => setModal(null)}>
            <m.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl rounded-2xl border border-border/40 bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold">{modal === "create" ? "Add Technology" : "Edit Technology"}</h2>
                <button onClick={() => setModal(null)} className="rounded-lg p-1 text-muted-foreground hover:bg-accent"><X className="size-4" /></button>
              </div>
              <TechForm data={editing} onChange={setEditing} categories={categories} />
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setModal(null)} className="rounded-xl border border-border/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gold px-5 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50">
                  {saving && <Loader2 className="size-4 animate-spin" />}
                  {modal === "create" ? "Create" : "Save"}
                </button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmDialog open={modal === "delete"} title="Delete Technology" variant="danger"
        message="This will permanently delete this technology. This action cannot be undone."
        confirmLabel="Delete" onConfirm={handleDelete} onCancel={() => setModal(null)} />
      <ConfirmDialog open={modal === "archive"} title="Archive Technology" variant="warning"
        message="This technology will be hidden from the game but can be restored later."
        confirmLabel="Archive" onConfirm={handleArchive} onCancel={() => setModal(null)} />
      <ConfirmDialog open={modal === "restore"} title="Restore Technology"
        message="Restore this technology to make it visible in the game again."
        confirmLabel="Restore" onConfirm={handleRestore} onCancel={() => setModal(null)} />
    </div>
  );
}
