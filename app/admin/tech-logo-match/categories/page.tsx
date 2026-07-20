"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Edit3, Trash2, Loader2, X, Search } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

import { techLogoMatchAdminApi } from "@/lib/tech-logo-match-admin/api";
import type { CategoryItem } from "@/lib/tech-logo-match-admin/types";
import { cn } from "@/lib/utils";

export default function CategoriesAdminPage() {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"create" | "edit" | "delete" | null>(null);
  const [editing, setEditing] = useState<Partial<CategoryItem>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try { const result = await techLogoMatchAdminApi.listCategories(search); setItems(result); }
    catch { /* ignore */ }
    finally { setLoading(false); }
  }, [search]);

  useEffect(() => { fetch(); }, [fetch]);

  const openCreate = () => { setEditing({ name: "", description: "", icon: "", display_order: 0 }); setModal("create"); };
  const openEdit = (item: CategoryItem) => { setEditing({ ...item }); setModal("edit"); setSelectedId(item.id); };
  const openDelete = (id: string) => { setSelectedId(id); setModal("delete"); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === "create") await techLogoMatchAdminApi.createCategory(editing);
      else if (modal === "edit" && selectedId) await techLogoMatchAdminApi.updateCategory(selectedId, editing);
      setModal(null); fetch();
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try { await techLogoMatchAdminApi.deleteCategory(selectedId); setModal(null); fetch(); }
    catch { /* ignore */ }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-sm text-muted-foreground">Organize technologies into categories.</p>
        </div>
        <button onClick={openCreate}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110">
          <Plus className="size-4" /> Add Category
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories..." className="w-full rounded-xl border border-border/40 bg-background/60 py-2 pl-9 pr-3 text-sm outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20" />
      </div>

      {loading && <div className="space-y-2">{[1,2,3].map((i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-border/30" />)}</div>}

      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-muted-foreground">No categories found.</p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-border/30 bg-white/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 bg-border/10">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Icon</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Technologies</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((cat) => (
                <tr key={cat.id} className="border-b border-border/20 transition-colors hover:bg-accent/30">
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">{cat.description || "-"}</td>
                  <td className="px-4 py-3">{cat.icon || "-"}</td>
                  <td className="px-4 py-3 tabular-nums">{cat.display_order}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">{cat.technology_count}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(cat)} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent"><Edit3 className="size-3.5" /></button>
                    <button onClick={() => openDelete(cat.id)} className="rounded-lg p-1.5 text-red-500 transition-colors hover:bg-red-50"><Trash2 className="size-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {(modal === "create" || modal === "edit") && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm" onClick={() => setModal(null)}>
            <m.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-border/40 bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold">{modal === "create" ? "Add Category" : "Edit Category"}</h2>
                <button onClick={() => setModal(null)} className="rounded-lg p-1 text-muted-foreground hover:bg-accent"><X className="size-4" /></button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Name *</label>
                  <input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Description</label>
                  <textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2}
                    className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Icon (emoji)</label>
                  <input value={editing.icon || ""} onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                    className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Display Order</label>
                  <input type="number" min={0} value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-lg border border-border/50 bg-background px-3 py-2 text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setModal(null)} className="rounded-xl border border-border/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">Cancel</button>
                <button onClick={handleSave} disabled={saving || !editing.name}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gold px-5 py-2 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:opacity-50">
                  {saving && <Loader2 className="size-4 animate-spin" />}
                  Save
                </button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete dialog */}
      {modal === "delete" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm" onClick={() => setModal(null)}>
          <m.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-2xl border border-border/40 bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Delete Category</h3>
            <p className="mt-2 text-sm text-muted-foreground">Delete this category? Technologies assigned to it will not be deleted.</p>
            <div className="mt-5 flex justify-end gap-3">
              <button onClick={() => setModal(null)} className="rounded-xl border border-border/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">Cancel</button>
              <button onClick={handleDelete} className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:brightness-110">Delete</button>
            </div>
          </m.div>
        </div>
      )}
    </div>
  );
}
