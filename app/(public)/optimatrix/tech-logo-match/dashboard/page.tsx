"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Trophy, Brain, Clock, Target, Zap, TrendingUp,
  Calendar, Star, Flame, BarChart3,
} from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { techLogoMatchApi, type DashboardResult } from "@/lib/tech-logo-match-api";
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
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function StarIcons({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <Star key={i} className={cn("size-3", i <= count ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20")} />
      ))}
    </span>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-border/40", className)} />;
}

function StatCard({
  icon: Icon, label, value, sub, color,
}: {
  icon: any; label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 p-4 sm:p-5">
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", color || "bg-gold/10")}>
          <Icon className={cn("size-5", color ? "text-white" : "text-gold")} />
        </div>
        <div className="min-w-0 flex-1">
          <CardTitle className="text-2xl font-bold tabular-nums">{value}</CardTitle>
          <CardDescription className="truncate">{label}</CardDescription>
          {sub && <p className="mt-0.5 text-[10px] text-muted-foreground/60">{sub}</p>}
        </div>
      </CardHeader>
    </Card>
  );
}

export default function TechLogoMatchDashboardPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<DashboardResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true); setError(null);
    try {
      const res = await techLogoMatchApi.getDashboard();
      setData(res);
    } catch {
      setError("Failed to load dashboard. Please try again.");
    } finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  if (!user) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
          <Brain className="size-16 text-muted-foreground/30" />
          <h1 className="text-3xl font-bold tracking-tight">Sign in Required</h1>
          <p className="max-w-md text-muted-foreground">
            Sign in to view your Tech Logo Match dashboard, statistics, and progress.
          </p>
          <Button href="/login" variant="gold" size="lg">Sign In</Button>
          <Button onClick={() => router.push("/optimatrix/tech-logo-match")} variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Back to Tech Logo Match
          </Button>
        </Container>
      </Section>
    );
  }

  if (loading) {
    return (
      <Section>
        <Container className="py-10">
          <Skeleton className="mb-8 h-8 w-48" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28" />)}
          </div>
          <Skeleton className="mt-8 h-64" />
        </Container>
      </Section>
    );
  }

  if (error || !data) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-red-500">{error || "No data available"}</p>
          <Button onClick={fetchDashboard} variant="outline" size="sm">Retry</Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-gradient-to-b from-violet-500/[0.02] via-background to-background">
      <Container className="py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Dashboard</span>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Tech Logo Match</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button href="/optimatrix/tech-logo-match/play" variant="gold" size="sm">
              <Zap className="size-4" /> Play Now
            </Button>
            <Button href="/optimatrix/tech-logo-match" variant="outline" size="sm">
              <ArrowLeft className="size-4" /> Back
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Trophy} label="Total Games" value={String(data.total_games)} color="bg-amber-100 text-amber-600" />
          <StatCard icon={Star} label="Total Stars" value={String(data.total_stars)} color="bg-gold/10 text-gold" />
          <StatCard icon={Target} label="Avg Accuracy" value={`${data.average_accuracy}%`} color="bg-emerald-100 text-emerald-600" />
          <StatCard icon={Flame} label="Current Streak" value={`${data.current_streak} days`} sub={`Best: ${data.longest_streak}`} color="bg-orange-100 text-orange-600" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon={BarChart3} label="Best Score" value={String(data.best_score)} color="bg-blue-100 text-blue-600" />
          <StatCard icon={TrendingUp} label="Highest Accuracy" value={`${data.highest_accuracy}%`} color="bg-purple-100 text-purple-600" />
          <StatCard icon={Clock} label="Fastest Game" value={data.fastest_completion ? formatTime(data.fastest_completion) : "—"} color="bg-cyan-100 text-cyan-600" />
        </div>

        {data.favorite_category && (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="p-4 sm:p-5">
                <CardDescription>Favorite Category</CardDescription>
                <CardTitle className="mt-1 text-lg capitalize">{data.favorite_category}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="p-4 sm:p-5">
                <CardDescription>Favorite Difficulty</CardDescription>
                <CardTitle className="mt-1 text-lg capitalize">{data.favorite_difficulty || "—"}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="p-4 sm:p-5">
                <CardDescription>Favorite Mode</CardDescription>
                <CardTitle className="mt-1 text-lg">{data.favorite_mode?.replace(/-/g, " → ").replace(/\b\w/g, (c) => c.toUpperCase()) || "—"}</CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        {data.recent_games.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold">Recent Games</h2>
            <div className="space-y-2">
              {data.recent_games.map((game, i) => (
                <m.div
                  key={game.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-border/40 bg-card/50 px-4 py-3 text-sm sm:flex-nowrap"
                >
                  <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium capitalize">{game.category}</span>
                  <span className="text-xs capitalize text-muted-foreground">{game.difficulty}</span>
                  <span className="ml-auto font-semibold tabular-nums">{game.score}</span>
                  <span className="text-muted-foreground">{game.accuracy}%</span>
                  <StarIcons count={game.stars} />
                  <span className="text-xs text-muted-foreground">{formatDate(game.created_at)}</span>
                </m.div>
              ))}
            </div>
          </div>
        )}

        {data.recent_games.length === 0 && (
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <Trophy className="size-12 text-muted-foreground/20" />
            <p className="text-muted-foreground">No games played yet. Start your first game!</p>
            <Button href="/optimatrix/tech-logo-match/play" variant="gold" size="sm">
              <Zap className="size-4" /> Play Now
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
