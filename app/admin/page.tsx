"use client";

import * as React from "react";
import {
  Users, UserCheck, UserPlus, FileCode, Trophy,
  Target, Zap, Award, TrendingUp, Server, Activity,
  Database, ArrowUpRight, Loader2,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { adminApi } from "@/lib/admin/api";
import type { DashboardStats } from "@/lib/admin/types";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const { data: res } = await adminApi.getDashboardStats();
      setStats(res.data);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail || "Failed to load dashboard";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-gold" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-destructive">Error</p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <button
            onClick={loadStats}
            className="mt-4 rounded-xl bg-gold px-4 py-2 text-sm font-medium text-white hover:bg-gold/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const langData = stats.language_distribution.map((l) => ({
    name: l.language.charAt(0).toUpperCase() + l.language.slice(1),
    count: l.count,
  }));

  const growthData = stats.user_growth_data.map((g) => ({
    date: new Date(g.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    users: g.count,
  }));

  const activityData = stats.activity_data.map((a) => ({
    date: new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    sessions: a.sessions,
    users: a.unique_users,
  }));

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Admin Dashboard"
        description="Overview of your CodeSprint platform"
      />

      {/* Status Badges */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Server", status: stats.server_status, icon: Server },
          { label: "API", status: stats.api_status, icon: Activity },
          { label: "Database", status: stats.database_status, icon: Database },
        ].map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-2 rounded-xl border border-border/50 bg-white/80 px-3 py-2 backdrop-blur-xl dark:bg-ink/80"
          >
            <s.icon className="size-4 text-muted-foreground" />
            <span className="text-xs font-medium">{s.label}</span>
            <span
              className={cn(
                "size-2 rounded-full",
                s.status === "operational" || s.status === "connected"
                  ? "bg-emerald-500"
                  : "bg-red-500",
              )}
            />
            <span className="text-xs capitalize text-muted-foreground">{s.status}</span>
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          title="Total Users"
          value={stats.total_users.toLocaleString()}
          icon={Users}
          description="All registered users"
        />
        <AdminStatCard
          title="Active Today"
          value={stats.active_users_today.toLocaleString()}
          icon={UserCheck}
          description="Logged in today"
        />
        <AdminStatCard
          title="New This Week"
          value={stats.new_registrations.toLocaleString()}
          icon={UserPlus}
          description="New registrations"
        />
        <AdminStatCard
          title="Completed Tests"
          value={stats.completed_tests.toLocaleString()}
          icon={FileCode}
          description="All typing sessions"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          title="Challenges Done"
          value={stats.daily_challenges_completed.toLocaleString()}
          icon={Trophy}
          description="Daily challenges completed"
        />
        <AdminStatCard
          title="Avg Accuracy"
          value={`${stats.average_accuracy}%`}
          icon={Target}
          description="Platform average"
        />
        <AdminStatCard
          title="Avg WPM"
          value={stats.average_wpm.toFixed(1)}
          icon={Zap}
          description="Words per minute"
        />
        <AdminStatCard
          title="Certificates"
          value={stats.certificates_issued.toLocaleString()}
          icon={Award}
          description="Issued certificates"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <div className="rounded-2xl border border-border/50 bg-white/80 p-5 backdrop-blur-xl dark:bg-ink/80">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="size-4 text-gold" />
            <h3 className="text-sm font-semibold">User Growth (30 days)</h3>
          </div>
          <div className="h-[280px]">
            {growthData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0 0 0 / 0.06)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid oklch(0 0 0 / 0.06)",
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(12px)",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#c48a2a"
                    fill="oklch(0.546 0.245 262 / 0.1)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No growth data available
              </div>
            )}
          </div>
        </div>

        {/* Language Distribution */}
        <div className="rounded-2xl border border-border/50 bg-white/80 p-5 backdrop-blur-xl dark:bg-ink/80">
          <div className="mb-4 flex items-center gap-2">
            <FileCode className="size-4 text-gold" />
            <h3 className="text-sm font-semibold">Language Distribution</h3>
          </div>
          <div className="h-[280px]">
            {langData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={langData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0 0 0 / 0.06)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid oklch(0 0 0 / 0.06)",
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(12px)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" fill="#c48a2a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No language data available
              </div>
            )}
          </div>
        </div>

        {/* Activity Chart */}
        <div className="rounded-2xl border border-border/50 bg-white/80 p-5 backdrop-blur-xl dark:bg-ink/80 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="size-4 text-gold" />
            <h3 className="text-sm font-semibold">Activity Overview (30 days)</h3>
          </div>
          <div className="h-[280px]">
            {activityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0 0 0 / 0.06)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid oklch(0 0 0 / 0.06)",
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(12px)",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="#c48a2a"
                    strokeWidth={2}
                    dot={false}
                    name="Sessions"
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={false}
                    name="Unique Users"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No activity data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
