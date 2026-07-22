"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Trophy, Target, Star, Clock, Flame, Brain, Zap,
  TrendingUp, BarChart3, Download, FileSpreadsheet, ChevronDown,
  Search, Filter,
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import {
  techLogoMatchApi,
  type AnalyticsResult,
  type CategoryMetric,
  type ModeMetric,
  type DifficultyMetric,
  type HeatmapEntry,
  type ActivityEntry,
  type InsightEntry,
  type PersonalBest,
  type GameHistoryItem,
} from "@/lib/tech-logo-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-border/40", className)} />;
}

function AnimatedCounter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const step = Math.max(1, Math.floor(value / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(start);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display.toFixed(decimals)}{suffix}</>;
}

function MetricCard({
  icon: Icon, label, value, sub, color, decimals = 0, suffix = "",
}: {
  icon: React.ElementType<{ className?: string }>; label: string; value: number; sub?: string; color?: string; decimals?: number; suffix?: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4 shadow-sm transition-all hover:border-gold/20 hover:shadow-md sm:p-5">
        <div className="absolute right-0 top-0 size-24 translate-x-8 -translate-y-8 rounded-full opacity-[0.03] transition-all group-hover:scale-150" style={{ background: `radial-gradient(circle, ${color || "var(--gold)"}, transparent)` }} />
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardDescription className="text-xs">{label}</CardDescription>
            <CardTitle className="text-2xl font-bold tabular-nums">
              <AnimatedCounter value={value} suffix={suffix} decimals={decimals} />
            </CardTitle>
            {sub && <p className="text-[10px] text-muted-foreground/60">{sub}</p>}
          </div>
          <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", color ? `${color}/10` : "bg-gold/10")}>
            <Icon className={cn("size-4.5", color ? `text-${color}` : "text-gold")} />
          </div>
        </div>
      </div>
    </m.div>
  );
}

function PersonalBestCard({ best, index }: { best: PersonalBest; index: number }) {
  const iconMap: Record<string, React.ElementType<{ className?: string }>> = { trophy: Trophy, target: Target, clock: Clock, flame: Flame, award: Star, folder: BarChart3, zap: Zap };
  const Icon = iconMap[best.icon] || Star;
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/30 px-4 py-3"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/10">
        <Icon className="size-4.5 text-gold" />
      </div>
      <div>
        <p className="text-[10px] text-muted-foreground">{best.label}</p>
        <p className="text-sm font-semibold">{best.value}</p>
      </div>
    </m.div>
  );
}

function CategoryBar({ metric, maxGames }: { metric: CategoryMetric; maxGames: number }) {
  const pct = maxGames > 0 ? (metric.games_played / maxGames) * 100 : 0;
  const barColor = metric.average_accuracy >= 80 ? "bg-emerald-500" : metric.average_accuracy >= 60 ? "bg-amber-500" : "bg-red-400";
  return (
    <div className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent/30">
      <span className="w-28 shrink-0 text-xs font-medium capitalize truncate">{metric.category}</span>
      <div className="flex-1">
        <div className="h-2 w-full overflow-hidden rounded-full bg-border/30">
          <m.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn("h-full rounded-full transition-colors", barColor)}
          />
        </div>
      </div>
      <span className="w-12 text-right text-xs tabular-nums text-muted-foreground">{metric.games_played}</span>
      <span className="w-14 text-right text-xs font-semibold tabular-nums">{metric.average_accuracy}%</span>
      <span className="hidden w-14 text-right text-xs tabular-nums text-muted-foreground sm:inline">{metric.average_score}</span>
    </div>
  );
}

function ModeCard({ metric, index }: { metric: ModeMetric; index: number }) {
  const modeLabel = metric.mode.replace(/-/g, " → ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl border border-border/40 bg-card/30 p-4"
    >
      <p className="text-xs font-medium text-gold">{modeLabel}</p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div><span className="text-muted-foreground">Played</span><p className="font-semibold">{metric.games_played}</p></div>
        <div><span className="text-muted-foreground">Accuracy</span><p className="font-semibold">{metric.average_accuracy}%</p></div>
        <div><span className="text-muted-foreground">Avg Time</span><p className="font-semibold">{metric.average_time}s</p></div>
        <div><span className="text-muted-foreground">Best Score</span><p className="font-semibold">{metric.best_score}</p></div>
      </div>
    </m.div>
  );
}

function DifficultyCard({ metric, index }: { metric: DifficultyMetric; index: number }) {
  const colors: Record<string, string> = { easy: "bg-emerald-500", medium: "bg-amber-500", hard: "bg-red-500", expert: "bg-purple-500" };
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-xl border border-border/40 bg-card/30 p-4"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium capitalize">{metric.difficulty}</p>
        <span className={cn("size-2.5 rounded-full", colors[metric.difficulty] || "bg-gray-400")} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div><span className="text-muted-foreground">Played</span><p className="font-semibold">{metric.games_played}</p></div>
        <div><span className="text-muted-foreground">Accuracy</span><p className="font-semibold">{metric.average_accuracy}%</p></div>
        <div><span className="text-muted-foreground">Avg Time</span><p className="font-semibold">{formatTime(metric.average_time)}</p></div>
        <div><span className="text-muted-foreground">Avg Score</span><p className="font-semibold">{metric.average_score}</p></div>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border/30">
        <m.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(metric.success_rate, 100)}%` }}
          transition={{ duration: 0.5 }}
          className={cn("h-full rounded-full", metric.success_rate >= 50 ? "bg-emerald-500" : "bg-amber-500")}
        />
      </div>
      <p className="mt-1 text-[10px] text-muted-foreground">{metric.success_rate}% success rate</p>
    </m.div>
  );
}

function Heatmap({
  data, year, onPrevYear, onNextYear,
}: {
  data: HeatmapEntry[]; year: number; onPrevYear: () => void; onNextYear: () => void;
}) {
  const dayMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((e) => map.set(e.date, e.count));
    return map;
  }, [data]);

  const weeks = useMemo(() => {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    const result: { date: string; count: number; day: number }[][] = [];
    let currentWeek: { date: string; count: number; day: number }[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0];
      const count = dayMap.get(dateStr) || 0;
      currentWeek.push({ date: dateStr, count, day: d.getDay() });
      if (d.getDay() === 6 || d.getTime() === end.getTime()) {
        while (currentWeek.length < 7) currentWeek.unshift({ date: "", count: 0, day: currentWeek.length });
        result.push(currentWeek);
        currentWeek = [];
      }
    }
    return result;
  }, [data, year]);

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  const intensityClass = (count: number) => {
    if (count === 0) return "bg-border/10";
    const ratio = count / maxCount;
    if (ratio > 0.6) return "bg-emerald-500";
    if (ratio > 0.3) return "bg-emerald-400";
    return "bg-emerald-300";
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onPrevYear} className="flex size-7 items-center justify-center rounded-lg border border-border/40 text-xs transition-colors hover:bg-accent">&lt;</button>
          <span className="text-sm font-semibold tabular-nums">{year}</span>
          <button onClick={onNextYear} className="flex size-7 items-center justify-center rounded-lg border border-border/40 text-xs transition-colors hover:bg-accent">&gt;</button>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span>Less</span>
          {[0, 1, 2, 3].map((v) => (
            <div key={v} className={cn("size-3 rounded-sm", intensityClass(v))} />
          ))}
          <span>More</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-1" style={{ minWidth: Math.max(weeks.length * 14, 700) }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((cell, di) => (
                <div
                  key={`${wi}-${di}`}
                  className={cn("size-3 rounded-sm", intensityClass(cell.count))}
                  title={cell.date ? `${cell.date}: ${cell.count} games` : ""}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-3 text-[10px] text-muted-foreground">
        {months.map((m) => <span key={m} className="tabular-nums">{m}</span>)}
      </div>
    </div>
  );
}

function ActivityChart({ data, label, color }: { data: ActivityEntry[]; label: string; color: string }) {
  const maxGames = Math.max(...data.map((d) => d.games), 1);
  return (
    <div>
      <p className="mb-3 text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex items-end gap-1.5 overflow-x-auto pb-2" style={{ minHeight: 80 }}>
        {data.slice(-31).map((entry, i) => {
          const pct = maxGames > 0 ? (entry.games / maxGames) * 100 : 0;
          return (
            <div key={i} className="flex flex-col items-center gap-1" title={`${entry.date}: ${entry.games} games, ${entry.accuracy}%`}>
              <m.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(pct, 4)}%` }}
                transition={{ duration: 0.3, delay: i * 0.01 }}
                className={cn("w-3 min-h-[4px] rounded-sm transition-all hover:opacity-80", color)}
                style={{ height: `${Math.max(pct, 4)}%` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InsightCard({ insight, index }: { insight: InsightEntry; index: number }) {
  const icons: Record<string, string> = { strength: "💪", improvement: "🎯", achievement: "🏆", milestone: "⭐", streak: "🔥", performance: "📊", speed: "⚡", info: "💡" };
  const borders: Record<string, string> = { up: "border-emerald-200 bg-emerald-50/50", down: "border-red-200 bg-red-50/50", neutral: "border-blue-200 bg-blue-50/50" };
  return (
    <m.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn("flex items-start gap-3 rounded-xl border p-3.5", borders[insight.direction] || borders.neutral)}
    >
      <span className="text-lg">{icons[insight.type] || "💡"}</span>
      <p className="text-xs leading-relaxed">{insight.message}</p>
    </m.div>
  );
}

function GameRow({ game, index }: { game: GameHistoryItem; index: number }) {
  const modeLabel = game.mode.replace(/-/g, " → ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <m.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="flex flex-wrap items-center gap-2 rounded-xl border border-border/40 bg-card/30 px-3 py-2.5 text-xs transition-colors hover:bg-accent/30 sm:flex-nowrap sm:gap-3"
    >
      <span className="w-20 shrink-0 text-muted-foreground">{formatDate(game.created_at)}</span>
      <span className="rounded-md bg-accent px-1.5 py-0.5 font-medium capitalize">{game.category}</span>
      <span className="hidden capitalize text-muted-foreground lg:inline">{modeLabel}</span>
      <span className="ml-auto font-semibold tabular-nums">{game.score}</span>
      <span className="tabular-nums">{game.accuracy}%</span>
      <span className="hidden tabular-nums text-muted-foreground sm:inline">{game.avg_time}s</span>
      <span className="inline-flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <Star key={i} className={cn("size-2.5", i <= game.stars ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20")} />
        ))}
      </span>
    </m.div>
  );
}

export default function TechLogoMatchAnalyticsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<AnalyticsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heatmapYear, setHeatmapYear] = useState(new Date().getFullYear());
  const [exporting, setExporting] = useState(false);

  const fetchAnalytics = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true); setError(null);
    try {
      const res = await techLogoMatchApi.getAnalytics();
      setData(res);
    } catch { setError("Failed to load analytics."); }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  const handleExport = useCallback(async (format: "csv" | "json") => {
    setExporting(true);
    try {
      const blob = await techLogoMatchApi.exportAnalytics(format);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tech-logo-match-analytics.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch { setError("Export failed."); }
    finally { setExporting(false); }
  }, []);

  const maxCategoryGames = useMemo(
    () => Math.max(...(data?.categories.map((c) => c.games_played) || [1]), 1),
    [data?.categories],
  );

  if (!user) {
    return (
      <Section><Container className="flex flex-col items-center gap-6 py-20 text-center">
        <Brain className="size-16 text-muted-foreground/30" />
        <h1 className="text-3xl font-bold">Sign in Required</h1>
        <p className="max-w-md text-muted-foreground">Sign in to view your Tech Logo Match analytics.</p>
        <Button href="/login" variant="gold" size="lg">Sign In</Button>
        <Button onClick={() => router.push("/optimatrix/tech-logo-match")} variant="outline" size="sm"><ArrowLeft className="size-4" /> Back</Button>
      </Container></Section>
    );
  }

  if (loading) {
    return (
      <Section><Container className="py-10">
        <Skeleton className="mb-8 h-8 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-28" />)}</div>
        <Skeleton className="mt-8 h-64" />
      </Container></Section>
    );
  }

  if (error) {
    return (
      <Section><Container className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-red-500">{error}</p>
        <Button onClick={fetchAnalytics} variant="outline" size="sm">Retry</Button>
      </Container></Section>
    );
  }

  if (!data) return null;

  const noData = data.total_games === 0;

  return (
    <Section className="bg-gradient-to-b from-violet-500/[0.02] via-background to-background">
      <Container className="py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Analytics</span>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Performance Analytics</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => handleExport("csv")} disabled={exporting || noData} className="inline-flex items-center gap-1.5 rounded-xl border border-border/40 bg-background/60 px-3 py-2 text-xs font-medium transition-colors hover:bg-accent disabled:opacity-40">
              <FileSpreadsheet className="size-3.5" /> CSV
            </button>
            <button onClick={() => handleExport("json")} disabled={exporting || noData} className="inline-flex items-center gap-1.5 rounded-xl border border-border/40 bg-background/60 px-3 py-2 text-xs font-medium transition-colors hover:bg-accent disabled:opacity-40">
              <Download className="size-3.5" /> JSON
            </button>
            <Button href="/optimatrix/tech-logo-match" variant="outline" size="sm"><ArrowLeft className="size-4" /> Back</Button>
          </div>
        </div>

        {noData ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <BarChart3 className="size-16 text-muted-foreground/20" />
            <h2 className="text-xl font-semibold">No Data Yet</h2>
            <p className="max-w-md text-muted-foreground">Complete your first Tech Logo Match game to unlock analytics and performance insights.</p>
            <Button href="/optimatrix/tech-logo-match/play" variant="gold" size="lg"><Zap className="size-4" /> Play Now</Button>
          </div>
        ) : (
          <>
            {/* ── Metric Cards ── */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard icon={Trophy} label="Total Games" value={data.total_games} color="bg-amber-100" />
              <MetricCard icon={Star} label="Total Stars" value={data.total_stars} color="bg-gold/10" />
              <MetricCard icon={Target} label="Overall Accuracy" value={data.overall_accuracy} suffix="%" decimals={1} color="bg-emerald-100" />
              <MetricCard icon={BarChart3} label="Average Score" value={Math.round(data.average_score)} color="bg-blue-100" />
              <MetricCard icon={TrendingUp} label="Highest Score" value={data.highest_score} color="bg-purple-100" />
              <MetricCard icon={Target} label="Average Accuracy" value={data.average_accuracy} suffix="%" decimals={1} color="bg-teal-100" />
              <MetricCard icon={Clock} label="Fastest Game" value={data.fastest_completion ?? 0} color="bg-cyan-100" sub={data.fastest_completion ? formatTime(data.fastest_completion) : "—"} />
              <MetricCard icon={Clock} label="Avg Response Time" value={data.average_response_time} suffix="s" decimals={1} color="bg-sky-100" />
              <MetricCard icon={Flame} label="Current Streak" value={data.current_streak} suffix=" days" color="bg-orange-100" />
              <MetricCard icon={Flame} label="Longest Streak" value={data.longest_streak} suffix=" days" color="bg-rose-100" />
              <MetricCard icon={Zap} label="Favorite Category" value={data.categories.length} color="bg-indigo-100" sub={data.favorite_category || "—"} />
              <MetricCard icon={Brain} label="Favorite Mode" value={data.modes.length} color="bg-violet-100" sub={data.favorite_mode?.replace(/-/g, " → ").replace(/\b\w/g, (c) => c.toUpperCase()) || "—"} />
            </div>

            {/* ── Personal Bests ── */}
            {data.personal_bests.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-semibold flex items-center gap-2"><Trophy className="size-4 text-gold" /> Personal Bests</h2>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {data.personal_bests.map((b, i) => <PersonalBestCard key={b.label} best={b} index={i} />)}
                </div>
              </div>
            )}

            {/* ── Learning Insights ── */}
            {data.insights.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-semibold flex items-center gap-2"><Brain className="size-4 text-gold" /> Learning Insights</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {data.insights.map((insight, i) => <InsightCard key={i} insight={insight} index={i} />)}
                </div>
              </div>
            )}

            {/* ── Category Performance ── */}
            {data.categories.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-semibold">Category Performance</h2>
                <Card>
                  <div className="space-y-1 p-3">
                    <div className="flex items-center gap-3 px-3 pb-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span className="w-28">Category</span>
                      <span className="flex-1">Progress</span>
                      <span className="w-12 text-right">Games</span>
                      <span className="w-14 text-right">Accuracy</span>
                      <span className="hidden w-14 text-right sm:inline">Avg Score</span>
                    </div>
                    {data.categories.map((cat) => <CategoryBar key={cat.category} metric={cat} maxGames={maxCategoryGames} />)}
                  </div>
                </Card>
              </div>
            )}

            {/* ── Mode & Difficulty ── */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {data.modes.length > 0 && (
                <div>
                  <h2 className="mb-4 text-lg font-semibold">Game Mode Analytics</h2>
                  <div className="space-y-3">
                    {data.modes.map((mode, i) => <ModeCard key={mode.mode} metric={mode} index={i} />)}
                  </div>
                </div>
              )}
              {data.difficulties.length > 0 && (
                <div>
                  <h2 className="mb-4 text-lg font-semibold">Difficulty Analytics</h2>
                  <div className="space-y-3">
                    {data.difficulties.map((diff, i) => <DifficultyCard key={diff.difficulty} metric={diff} index={i} />)}
                  </div>
                </div>
              )}
            </div>

            {/* ── Heatmap ── */}
            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="size-4 text-gold" /> Activity Heatmap
              </h2>
              <Card><CardContent className="p-5">
                <Heatmap data={data.heatmap} year={heatmapYear} onPrevYear={() => setHeatmapYear((y) => y - 1)} onNextYear={() => setHeatmapYear((y) => y + 1)} />
              </CardContent></Card>
            </div>

            {/* ── Activity Charts ── */}
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {data.daily_activity.length > 0 && (
                <Card><CardContent className="p-4">
                  <ActivityChart data={data.daily_activity} label="Daily Activity" color="bg-gold" />
                </CardContent></Card>
              )}
              {data.weekly_activity.length > 0 && (
                <Card><CardContent className="p-4">
                  <ActivityChart data={data.weekly_activity} label="Weekly Activity" color="bg-emerald-500" />
                </CardContent></Card>
              )}
              {data.monthly_activity.length > 0 && (
                <Card><CardContent className="p-4">
                  <ActivityChart data={data.monthly_activity} label="Monthly Activity" color="bg-blue-500" />
                </CardContent></Card>
              )}
            </div>

            {/* ── Recent Games ── */}
            {data.recent_games.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-lg font-semibold">Recent Games</h2>
                <div className="space-y-1.5">
                  {data.recent_games.map((game, i) => <GameRow key={game.id} game={game} index={i} />)}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </Section>
  );
}
