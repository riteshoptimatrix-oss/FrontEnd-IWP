"use client";

import * as React from "react";
import {
  Search, Users, FileCode, Award, Trophy, Loader2,
} from "lucide-react";
import { adminApi } from "@/lib/admin/api";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { cn } from "@/lib/utils";

const SEARCH_TYPES = [
  { key: "users", label: "Users", icon: Users },
  { key: "snippets", label: "Snippets", icon: FileCode },
  { key: "certificates", label: "Certificates", icon: Award },
  { key: "challenges", label: "Challenges", icon: Trophy },
];

export default function AdminSearchPage() {
  const [query, setQuery] = React.useState("");
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>(["users", "snippets", "certificates", "challenges"]);
  const [results, setResults] = React.useState<Record<string, unknown[]>>({});
  const [loading, setLoading] = React.useState(false);
  const [searched, setSearched] = React.useState(false);

  const toggleType = (key: string) => {
    setSelectedTypes((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      setSearched(true);
      const { data: res } = await adminApi.globalSearch(query, selectedTypes);
      setResults(res.data);
    } catch {} finally { setLoading(false); }
  };

  const totalResults = Object.values(results).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Global Search" description="Search across all platform data" icon={<Search className="size-5" />} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search users, snippets, certificates, challenges..."
            className="w-full rounded-xl border border-border/50 bg-white/80 py-2.5 pl-10 pr-4 text-sm backdrop-blur-xl placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold dark:bg-ink/80" />
        </div>
        <button onClick={handleSearch} disabled={!query.trim() || loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-2.5 text-sm font-medium text-white hover:bg-gold/90 disabled:opacity-50">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />} Search
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {SEARCH_TYPES.map((t) => (
          <button key={t.key} onClick={() => toggleType(t.key)}
            className={cn("flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-colors",
              selectedTypes.includes(t.key) ? "bg-gold/10 text-gold border border-gold/30" : "border border-border text-muted-foreground hover:bg-secondary")}>
            <t.icon className="size-3.5" /> {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <Loader2 className="size-6 animate-spin text-gold" />
        </div>
      ) : searched ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{totalResults} result{totalResults !== 1 ? "s" : ""} found</p>

          {Object.entries(results).map(([type, items]) => {
            if (!Array.isArray(items) || items.length === 0) return null;
            return (
              <div key={type} className="rounded-2xl border border-border/50 bg-white/80 p-4 backdrop-blur-xl dark:bg-ink/80">
                <h3 className="mb-3 text-sm font-semibold capitalize">{type} ({items.length})</h3>
                <div className="space-y-2">
                  {(items as Record<string, unknown>[]).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl bg-secondary/30 px-3 py-2">
                      <div>
                        <p className="text-sm font-medium">{String(item.full_name || item.title || item.user_name || "Unknown")}</p>
                        <p className="text-xs text-muted-foreground">{String(item.email || item.language || item.verification_code?.toString().substring(0, 20) || item.description?.toString().substring(0, 50) || "")}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{String(item._id || item.id || "").substring(0, 12)}...</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {totalResults === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">No results found for &quot;{query}&quot;</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
