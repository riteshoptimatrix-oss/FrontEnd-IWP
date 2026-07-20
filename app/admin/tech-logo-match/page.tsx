"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Box, Tags, Package, HelpCircle, Image, AlertTriangle,
  Layers, TrendingUp, HardDrive, Archive,
} from "lucide-react";

import { techLogoMatchAdminApi } from "@/lib/tech-logo-match-admin/api";
import type { AdminDashboardStats } from "@/lib/tech-logo-match-admin/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

function StatCard({ title, value, icon: Icon, color, subtitle }: {
  title: string; value: string | number; icon: React.ComponentType<{ className?: string }>;
  color: string; subtitle?: string;
}) {
  return (
    <Card className="border-border/40 bg-white/60 backdrop-blur-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", color)}>
          <Icon className="size-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tabular-nums">{typeof value === "number" ? value.toLocaleString() : value}</p>
          {subtitle && <p className="text-[10px] text-muted-foreground/70">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function Skeleton({ className }: { className?: string }) { return <div className={cn("animate-pulse rounded-lg bg-border/30", className)} />; }

export default function TechLogoMatchAdminDashboard() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await techLogoMatchAdminApi.getDashboard();
      setStats(data);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Tech Logo Match Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Content management system for technology data, packs, questions, and assets.
        </p>
      </div>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1,2,3,4,5,6,7,8].map((i) => <Skeleton key={i} className="h-24" />)}
        </div>
      )}

      {stats && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Technologies" value={stats.total_technologies} icon={Box} color="bg-violet-500" />
            <StatCard title="Active" value={stats.active_technologies} icon={Layers} color="bg-emerald-500"
              subtitle={`${stats.archived_technologies} archived`} />
            <StatCard title="Categories" value={stats.total_categories} icon={Tags} color="bg-blue-500" />
            <StatCard title="Packs" value={stats.total_packs} icon={Package} color="bg-amber-500" />
            <StatCard title="Questions" value={stats.total_questions} icon={HelpCircle} color="bg-rose-500" />
            <StatCard title="Assets" value={stats.total_assets} icon={Image} color="bg-cyan-500"
              subtitle={`${(stats.assets_size_bytes / 1024 / 1024).toFixed(1)} MB`} />
            <StatCard title="No Logo" value={stats.technologies_without_logo} icon={AlertTriangle} color="bg-orange-500" />
            <StatCard title="Total Content" value={stats.total_technologies + stats.total_questions + stats.total_assets}
              icon={HardDrive} color="bg-indigo-500" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/40 bg-white/60">
              <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><TrendingUp className="size-4" /> By Difficulty</CardTitle></CardHeader>
              <CardContent>
                {Object.keys(stats.technologies_by_difficulty).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No data</p>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(stats.technologies_by_difficulty)
                      .sort(([,a], [,b]) => b - a)
                      .map(([diff, count]) => {
                        const max = Math.max(...Object.values(stats.technologies_by_difficulty), 1);
                        return (
                          <div key={diff} className="flex items-center gap-3">
                            <span className="w-20 text-xs capitalize text-muted-foreground">{diff}</span>
                            <div className="flex-1 h-2.5 overflow-hidden rounded-full bg-border/30">
                              <div className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold"
                                style={{ width: `${(count / max) * 100}%` }} />
                            </div>
                            <span className="w-8 text-right text-xs tabular-nums font-medium">{count}</span>
                          </div>
                        );
                      })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-white/60">
              <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Archive className="size-4" /> By Category</CardTitle></CardHeader>
              <CardContent>
                {Object.keys(stats.technologies_by_category).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No data</p>
                ) : (
                  <div className="space-y-1.5">
                    {Object.entries(stats.technologies_by_category)
                      .sort(([,a], [,b]) => b - a)
                      .map(([cat, count]) => (
                        <div key={cat} className="flex items-center justify-between rounded-lg bg-border/10 px-3 py-1.5 text-sm">
                          <span className="text-muted-foreground">{cat}</span>
                          <span className="font-medium tabular-nums">{count}</span>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {stats.recent_activity.length > 0 && (
            <Card className="border-border/40 bg-white/60">
              <CardHeader><CardTitle className="text-sm">Recent Activity</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {stats.recent_activity.map((v) => (
                    <div key={v.id} className="flex items-center gap-3 rounded-lg border border-border/20 bg-background/40 px-3 py-2 text-xs">
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[9px] font-medium uppercase",
                        v.action === "create" ? "bg-emerald-50 text-emerald-600" :
                        v.action === "update" ? "bg-blue-50 text-blue-600" :
                        v.action === "delete" ? "bg-red-50 text-red-600" :
                        "bg-gray-50 text-gray-600",
                      )}>{v.action}</span>
                      <span className="font-medium">{v.entity_type}</span>
                      <span className="text-muted-foreground">{new Date(v.changed_at).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
