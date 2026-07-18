"use client";

import * as React from "react";
import {
  ClipboardList, Loader2, Download, Users, BarChart3,
  TrendingUp, Award, UserX,
} from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { adminApi } from "@/lib/admin/api";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { cn } from "@/lib/utils";

const REPORT_TYPES = [
  { key: "user_growth", label: "User Growth", icon: TrendingUp },
  { key: "practice_stats", label: "Practice Stats", icon: BarChart3 },
  { key: "popular_languages", label: "Popular Languages", icon: Users },
  { key: "top_performers", label: "Top Performers", icon: Award },
  { key: "inactive_users", label: "Inactive Users", icon: UserX },
];

export default function AdminReportsPage() {
  const [activeReport, setActiveReport] = React.useState("user_growth");
  const [reportData, setReportData] = React.useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => { generateReport(); }, [activeReport]);

  const generateReport = async () => {
    try {
      setLoading(true);
      const { data: res } = await adminApi.generateReport(activeReport);
      setReportData(res.data);
    } catch {} finally { setLoading(false); }
  };

  const renderChart = () => {
    if (!reportData) return null;

    if (activeReport === "user_growth" && Array.isArray(reportData.data)) {
      const chartData = (reportData.data as { date: string; count: number }[]).map((d) => ({
        date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        users: d.count,
      }));
      return (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0 0 0 / 0.06)" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid oklch(0 0 0 / 0.06)", fontSize: "12px" }} />
            <Line type="monotone" dataKey="users" stroke="#c48a2a" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (activeReport === "popular_languages" && Array.isArray(reportData.data)) {
      const chartData = (reportData.data as { language: string; count: number }[]).map((d) => ({
        name: d.language.charAt(0).toUpperCase() + d.language.slice(1),
        count: d.count,
      }));
      return (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0 0 0 / 0.06)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid oklch(0 0 0 / 0.06)", fontSize: "12px" }} />
            <Bar dataKey="count" fill="#c48a2a" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return (
      <div className="flex h-[350px] items-center justify-center">
        <pre className="max-h-[350px] overflow-auto rounded-xl bg-secondary/30 p-4 text-xs">
          {JSON.stringify(reportData, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Reports" description="Generate and view platform reports" icon={<ClipboardList className="size-5" />} />

      <div className="flex flex-wrap gap-2">
        {REPORT_TYPES.map((r) => (
          <button key={r.key} onClick={() => setActiveReport(r.key)}
            className={cn("flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
              r.key === activeReport ? "bg-gold text-white" : "border border-border hover:bg-secondary")}>
            <r.icon className="size-4" /> {r.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border/50 bg-white/80 p-5 backdrop-blur-xl dark:bg-ink/80">
        {loading ? (
          <div className="flex h-[350px] items-center justify-center">
            <Loader2 className="size-6 animate-spin text-gold" />
          </div>
        ) : renderChart()}
      </div>

      {reportData && (
        <div className="rounded-2xl border border-border/50 bg-white/80 p-5 backdrop-blur-xl dark:bg-ink/80">
          <h3 className="mb-3 text-sm font-semibold">Report Summary</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(reportData).filter(([k]) => k !== "type" && k !== "data").map(([key, value]) => (
              <div key={key} className="rounded-xl bg-secondary/30 px-4 py-3">
                <p className="text-xs text-muted-foreground capitalize">{key.replace(/_/g, " ")}</p>
                <p className="text-lg font-bold">{typeof value === "number" ? value.toLocaleString() : String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
