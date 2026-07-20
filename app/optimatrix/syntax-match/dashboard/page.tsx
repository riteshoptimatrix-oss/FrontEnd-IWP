"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Trophy, Brain, Clock, Target, Zap, TrendingUp,
  Calendar, Star, Flame, BarChart3, Sparkles, Gift,
} from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { getDashboard, getPlayerLevel, type DashboardResult, type LevelInfo } from "@/lib/syntax-match-api";
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

export default function SyntaxMatchDashboardPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<DashboardResult | null>(null);
  const [levelInfo, setLevelInfo] = useState<LevelInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [res, lvl] = await Promise.all([
        getDashboard(),
        getPlayerLevel().catch(() => null),
      ]);
      setData(res);
      setLevelInfo(lvl);
    } catch {
      setError("Failed to load dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (!user) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
          <Brain className="size-16 text-muted-foreground/30" />
          <h1 className="text-3xl font-bold tracking-tight">Sign in Required</h1>
          <p className="max-w-md text-muted-foreground">
            Sign in to view your Syntax Match dashboard, statistics, and progress.
          </p>
          <Button href="/login" variant="gold" size="lg">
            Sign In
          </Button>
          <Button onClick={() => router.push("/optimatrix/syntax-match")} variant="outline" size="sm">
            <ArrowLeft className="size-4" />
            Back to Syntax Match
          </Button>
        </Container>
      </Section>
    );
  }

  // ── Star display helper ──
  const StarDisplay = ({ count, size = "base" }: { count: number; size?: string }) => (
    <span className={cn("tabular-nums", size === "lg" && "text-lg")}>
      {[1, 2, 3].map((s) => (
        <span key={s} className={s <= count ? "text-gold" : "text-muted-foreground/20"}>
          ★
        </span>
      ))}
    </span>
  );

  if (loading) {
    return (
      <Section>
        <Container className="py-20">
          <div className="mx-auto flex max-w-4xl flex-col gap-8">
            <div className="skeleton h-10 w-64 rounded-lg" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-28 rounded-2xl" />
              ))}
            </div>
            <div className="skeleton h-64 rounded-2xl" />
          </div>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-destructive">{error}</p>
          <Button onClick={fetchDashboard} variant="outline">
            Retry
          </Button>
        </Container>
      </Section>
    );
  }

  if (!data) return null;

  const stats = data;

  return (
    <Section>
      <Container className="py-10 sm:py-16">
        {/* ── Header ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 text-2xl ring-1 ring-gold/15">
                🧠
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Syntax Match Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user.full_name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button href="/optimatrix/syntax-match/leaderboard" variant="outline" size="sm">
              <Trophy className="size-4" />
              Leaderboard
            </Button>
            <Button href="/optimatrix/syntax-match/achievements" variant="outline" size="sm">
              <Sparkles className="size-4" />
              Achievements
            </Button>
            <Button href="/optimatrix/syntax-match/challenges" variant="outline" size="sm">
              <Target className="size-4" />
              Challenges
            </Button>
            <Button href="/optimatrix/syntax-match/rewards" variant="outline" size="sm">
              <Gift className="size-4" />
              Rewards
            </Button>
            <Button href="/optimatrix/syntax-match/analytics" variant="outline" size="sm">
              <BarChart3 className="size-4" />
              Analytics
            </Button>
            <Button href="/optimatrix/syntax-match/history" variant="outline" size="sm">
              <Clock className="size-4" />
              History
            </Button>
            <Button href="/optimatrix/syntax-match/play" variant="gold" size="sm">
              <Zap className="size-4" />
              Play
            </Button>
          </div>
        </div>

        {/* ── XP & Level Bar ── */}
        {levelInfo && (
          <m.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader className="flex-row items-center gap-4 p-4 sm:p-5">
                <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 ring-1 ring-gold/15">
                  <span className="text-lg font-bold text-gold">{levelInfo.level}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold capitalize">{levelInfo.rank}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {levelInfo.current_xp.toLocaleString()} / {levelInfo.xp_for_next.toLocaleString()} XP
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 rounded-full bg-secondary/70">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold transition-all duration-500"
                      style={{ width: `${Math.min(levelInfo.progress_percent, 100)}%` }}
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </m.div>
        )}

        {/* ── Stats Grid ── */}
        <m.div
          className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="text-center">
            <CardHeader className="items-center gap-1.5 p-5">
              <Trophy className="size-5 text-gold" />
              <div className="text-2xl font-bold">{stats.total_games}</div>
              <CardDescription>Games Played</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader className="items-center gap-1.5 p-5">
              <Target className="size-5 text-gold" />
              <div className="text-2xl font-bold">{stats.average_accuracy}%</div>
              <CardDescription>Avg Accuracy</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader className="items-center gap-1.5 p-5">
              <Flame className="size-5 text-gold" />
              <div className="text-2xl font-bold">{stats.current_streak}</div>
              <CardDescription>Day Streak</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader className="items-center gap-1.5 p-5">
              <Star className="size-5 text-gold" />
              <div className="text-2xl font-bold">
                {Math.round(stats.total_games * 3 > 0 ? (stats.total_stars / Math.max(stats.total_games, 1)) : 0)}
                <span className="text-sm text-muted-foreground/40">/3</span>
              </div>
              <CardDescription>Avg Stars</CardDescription>
            </CardHeader>
          </Card>
        </m.div>

        {/* ── Best Performances & Details ── */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* ── Best Performances ── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Best Performances</h2>
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardHeader className="p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <Target className="size-4 text-emerald-500" />
                    <CardTitle className="text-sm">Best Accuracy</CardTitle>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-emerald-600">
                    {stats.best_accuracy}%
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-gold" />
                    <CardTitle className="text-sm">Fastest Time</CardTitle>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-gold">
                    {stats.fastest_completion ? formatTime(stats.fastest_completion) : "—"}
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-blue-500" />
                    <CardTitle className="text-sm">Best Moves</CardTitle>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-blue-600">
                    {stats.best_moves ?? "—"}
                  </div>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <Flame className="size-4 text-orange-500" />
                    <CardTitle className="text-sm">Longest Streak</CardTitle>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-orange-600">
                    {stats.longest_streak}
                  </div>
                </CardHeader>
              </Card>
            </div>
          </m.div>

          {/* ── Favorites & Summary ── */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Performance Summary</h2>
            <Card>
              <CardContent className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-2">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground/60">
                    Favorite Language
                  </div>
                  <div className="mt-1 text-lg font-semibold">
                    {stats.favorite_language ? (
                      <span className="capitalize">{stats.favorite_language}</span>
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground/60">
                    Favorite Difficulty
                  </div>
                  <div className="mt-1 text-lg font-semibold capitalize">
                    {stats.favorite_difficulty ?? <span className="text-muted-foreground/40">—</span>}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground/60">
                    Total Moves
                  </div>
                  <div className="mt-1 text-lg font-semibold">{stats.total_moves}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground/60">
                    3★ Games
                  </div>
                  <div className="mt-1 text-lg font-semibold">{stats.three_star_games}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground/60">
                    Avg Time
                  </div>
                  <div className="mt-1 text-lg font-semibold">
                    {stats.average_completion_time ? formatTime(Math.round(stats.average_completion_time)) : "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground/60">
                    Avg Moves
                  </div>
                  <div className="mt-1 text-lg font-semibold">
                    {stats.average_moves ? Math.round(stats.average_moves) : "—"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </m.div>
        </div>

        {/* ── Recent Games ── */}
        <m.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Recent Games</h2>
            {stats.total_games > 0 && (
              <Button href="/optimatrix/syntax-match/history" variant="ghost" size="sm">
                View All
              </Button>
            )}
          </div>

          {stats.recent_games.length === 0 ? (
            <Card>
              <CardHeader className="items-center py-12 text-center">
                <Brain className="size-12 text-muted-foreground/20" />
                <CardTitle className="mt-4">No games yet</CardTitle>
                <CardDescription>
                  Complete your first Syntax Match game to see it here.
                </CardDescription>
                <Button href="/optimatrix/syntax-match/play" variant="gold" size="sm" className="mt-4">
                  <Zap className="size-4" />
                  Play Now
                </Button>
              </CardHeader>
            </Card>
          ) : (
            <div className="space-y-2">
              {stats.recent_games.map((game) => (
                <div
                  key={game.id}
                  className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all duration-200 hover:border-gold/15 sm:p-5"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gold/8 text-sm font-bold capitalize text-gold">
                    {game.language.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold capitalize">{game.language}</span>
                      <span className="rounded bg-secondary/80 px-1.5 py-0.5 text-[10px] font-medium capitalize text-muted-foreground">
                        {game.difficulty}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {formatDate(game.created_at)}
                    </div>
                  </div>
                  <div className="hidden items-center gap-4 text-xs text-muted-foreground sm:flex">
                    <span>{formatTime(game.completion_time_seconds)}</span>
                    <span>{game.moves} moves</span>
                    <span>{game.accuracy}%</span>
                  </div>
                  <div className="text-sm">
                    <StarDisplay count={game.stars} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </m.div>

        {/* ── Activity Placeholders ── */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader className="items-center gap-2 p-8 text-center">
              <Calendar className="size-10 text-muted-foreground/20" />
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Coming soon — track your weekly practice habits.</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="items-center gap-2 p-8 text-center">
              <TrendingUp className="size-10 text-muted-foreground/20" />
              <CardTitle>Monthly Activity</CardTitle>
              <CardDescription>Coming soon — view your monthly performance trends.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
