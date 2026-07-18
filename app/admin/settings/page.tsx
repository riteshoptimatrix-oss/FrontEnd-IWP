"use client";

import * as React from "react";
import {
  Settings, Loader2, Save, Plus, Trash2, X,
} from "lucide-react";
import { adminApi } from "@/lib/admin/api";
import type { SystemSetting } from "@/lib/admin/types";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  const [settings, setSettings] = React.useState<SystemSetting[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [editing, setEditing] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState("");

  React.useEffect(() => { loadSettings(); }, [category]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const { data: res } = await adminApi.getSettings(category || undefined);
      setSettings(res.data);
    } catch {} finally { setLoading(false); }
  };

  const handleSave = async (key: string, value: string, settingCategory: string) => {
    try {
      setSaving(true);
      const parsed = JSON.parse(value);
      await adminApi.updateSetting(key, parsed, settingCategory);
      setEditing(null);
      loadSettings();
    } catch (e) {
      alert("Invalid JSON. Please check your input.");
    } finally { setSaving(false); }
  };

  const categories = [...new Set(settings.map((s) => s.category))];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Platform Settings" description="Configure system parameters" icon={<Settings className="size-5" />} />

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setCategory("")}
          className={cn("rounded-xl px-4 py-2 text-sm font-medium transition-colors", !category ? "bg-gold text-white" : "border border-border hover:bg-secondary")}>
          All
        </button>
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)}
            className={cn("rounded-xl px-4 py-2 text-sm font-medium capitalize transition-colors", c === category ? "bg-gold text-white" : "border border-border hover:bg-secondary")}>
            {c.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="size-6 animate-spin text-gold" />
        </div>
      ) : (
        <div className="space-y-4">
          {settings.map((setting) => (
            <div key={setting._id} className="rounded-2xl border border-border/50 bg-white/80 p-5 backdrop-blur-xl dark:bg-ink/80">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{setting.key.replace(/_/g, " ").toUpperCase()}</h3>
                  <p className="text-xs text-muted-foreground">Category: {setting.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Updated: {new Date(setting.updated_at).toLocaleDateString()}</span>
                  {editing === setting.key ? (
                    <button onClick={() => setEditing(null)} className="flex size-7 items-center justify-center rounded-lg hover:bg-secondary"><X className="size-3.5" /></button>
                  ) : (
                    <button onClick={() => { setEditing(setting.key); setEditValue(JSON.stringify(setting.value, null, 2)); }} className="flex size-7 items-center justify-center rounded-lg hover:bg-secondary"><Settings className="size-3.5" /></button>
                  )}
                </div>
              </div>
              {editing === setting.key ? (
                <div className="space-y-3">
                  <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} rows={10}
                    className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 font-mono text-xs dark:bg-ink/80" />
                  <div className="flex justify-end">
                    <button onClick={() => handleSave(setting.key, editValue, setting.category)} disabled={saving}
                      className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-medium text-white hover:bg-gold/90 disabled:opacity-50">
                      <Save className="size-3.5" /> {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              ) : (
                <pre className="max-h-40 overflow-auto rounded-xl bg-secondary/30 p-3 text-xs">
                  {JSON.stringify(setting.value, null, 2)}
                </pre>
              )}
            </div>
          ))}
          {settings.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">No settings found</p>
          )}
        </div>
      )}
    </div>
  );
}
