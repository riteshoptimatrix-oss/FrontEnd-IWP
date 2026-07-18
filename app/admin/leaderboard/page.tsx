"use client";

import * as React from "react";
import {
  BarChart3, RefreshCw, AlertTriangle, Trash2, Loader2,
} from "lucide-react";
import { adminApi } from "@/lib/admin/api";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { cn } from "@/lib/utils";

const METRICS = ["xp", "wpm", "accuracy", "tests", "streak"];

export default function AdminLeaderboardPage() {
  const [data, setData] = React.useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [metric, setMetric] = React.useState("xp");
  const [refreshing, setRefreshing] = React.useState(false);
  const [suspicious, setSuspicious] = React.useState<Record<string, unknown>[]>([]);
  const [showSuspicious, setShowSuspicious] = React.useState(false);

  React.useEffect(() => { loadLeaderboard(); }, [metric]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const { data: res } = await adminApi.getLeaderboard(metric, 50);
      setData(res.data);
    } catch {} finally { setLoading(false); }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await adminApi.refreshLeaderboard(METRICS);
      loadLeaderboard();
    } catch {} finally { setRefreshing(false); }
  };

  const handleRemoveInvalid = async () => {
    if (!confirm("Remove all invalid scores (WPM < 0 or > 300, accuracy < 0 or > 100)?")) return;
    try { const { data: res } = await adminApi.removeInvalidScores(); alert(`${res.data.removed} invalid scores removed`); loadLeaderboard(); } catch {}
  };

  const handleDetectSuspicious = async () => {
    try {
      setShowSuspicious(true);
      const { data: res } = await adminApi.detectSuspicious(0.95);
      setSuspicious(res.data);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Leaderboard Management" description="Manage rankings and detect anomalies" icon={<BarChart3 className="size-5" />}>
        <button onClick={handleRefresh} disabled={refreshing} className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-medium text-white hover:bg-gold/90 disabled:opacity-50">
          <RefreshCw className={cn("size-4", refreshing && "animate-spin")} /> Refresh
        </button>
        <button onClick={handleRemoveInvalid} className="flex items-center gap-2 rounded-xl border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
          <Trash2 className="size-4" /> Remove Invalid
        </button>
        <button onClick={handleDetectSuspicious} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary">
          <AlertTriangle className="size-4" /> Detect Suspicious
        </button>
      </AdminPageHeader>

      <div className="flex gap-2">
        {METRICS.map((m) => (
          <button key={m} onClick={() => setMetric(m)}
            className={cn("rounded-xl px-4 py-2 text-sm font-medium capitalize transition-colors", m === metric ? "bg-gold text-white" : "border border-border hover:bg-secondary")}>
            {m}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/50 bg-white/80 backdrop-blur-xl dark:bg-ink/80">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-secondary/30">
              <th className="w-16 px-4 py-3 text-left text-xs font-medium text-muted-foreground">Rank</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">User ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground capitalize">{metric}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {loading ? (
              <tr><td colSpan={3} className="px-4 py-12 text-center"><Loader2 className="mx-auto size-4 animate-spin text-muted-foreground" /></td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={3} className="px-4 py-12 text-center text-muted-foreground">No leaderboard data</td></tr>
            ) : data.map((item, idx) => (
              <tr key={idx} className="hover:bg-secondary/30">
                <td className="px-4 py-3">
                  <span className={cn("flex size-7 items-center justify-center rounded-full text-xs font-bold", idx < 3 ? "bg-gold/10 text-gold" : "bg-secondary text-muted-foreground")}>
                    {idx + 1}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{String(item.user_id || item._id).substring(0, 16)}...</td>
                <td className="px-4 py-3 font-medium">{String(item.score ?? item.xp ?? "—")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSuspicious && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 backdrop-blur-xl dark:bg-amber-950/20">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><AlertTriangle className="size-4 text-amber-600" /> Suspicious Activity ({suspicious.length})</h3>
          {suspicious.length === 0 ? (
            <p className="text-sm text-muted-foreground">No suspicious activity detected</p>
          ) : (
            <div className="space-y-2">
              {suspicious.map((s, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl bg-white/50 px-3 py-2 text-xs dark:bg-ink/50">
                  <span className="font-mono">{String(s.user_id).substring(0, 16)}...</span>
                  <span>Accuracy: {String(s.avg_accuracy)}% | WPM: {String(s.avg_wpm)} | Tests: {String(s.total_tests)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
