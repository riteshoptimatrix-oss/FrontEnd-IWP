"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Search, ChevronDown, Star, Brain, Clock, Filter,
} from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { techLogoMatchApi, type GameHistoryResult, type GameHistoryItem } from "@/lib/tech-logo-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/card";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
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

function GameRow({ game, index }: { game: GameHistoryItem; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex flex-wrap items-center gap-3 rounded-xl border border-border/40 bg-card/50 px-4 py-3 text-sm transition-colors hover:bg-accent/30 sm:flex-nowrap"
    >
      <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium capitalize">{game.category}</span>
      <span className="text-xs capitalize text-muted-foreground">{game.difficulty}</span>
      <span className="hidden text-xs text-muted-foreground sm:inline">{game.mode.replace(/-/g, " ")}</span>
      <span className="ml-auto font-semibold tabular-nums">{game.score}</span>
      <span className="text-muted-foreground">{game.accuracy}%</span>
      <StarIcons count={game.stars} />
      <span className="text-xs text-muted-foreground">{formatTime(game.duration_seconds)}</span>
      <span className="hidden text-xs text-muted-foreground lg:inline">{formatDate(game.created_at)}</span>
    </m.div>
  );
}

export default function TechLogoMatchHistoryPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<GameHistoryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState(-1);
  const [difficulty, setDifficulty] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const limit = 10;

  const fetchHistory = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true); setError(null);
    try {
      const res = await techLogoMatchApi.getGameHistory({
        page, limit, search, sort_by: sortBy, sort_order: sortOrder,
        difficulty: difficulty || undefined,
      });
      setData(res);
    } catch {
      setError("Failed to load history. Please try again.");
    } finally { setLoading(false); }
  }, [user, page, search, sortBy, sortOrder, difficulty]);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  if (!user) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
          <Brain className="size-16 text-muted-foreground/30" />
          <h1 className="text-3xl font-bold tracking-tight">Sign in Required</h1>
          <p className="max-w-md text-muted-foreground">Sign in to view your Tech Logo Match history.</p>
          <Button href="/login" variant="gold" size="lg">Sign In</Button>
          <Button onClick={() => router.push("/optimatrix/tech-logo-match")} variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Back
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-gradient-to-b from-violet-500/[0.02] via-background to-background">
      <Container className="py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">History</span>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Game History</h1>
          </div>
          <Button href="/optimatrix/tech-logo-match" variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Back
          </Button>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full rounded-xl border border-border/40 bg-background/60 py-2.5 pl-10 pr-4 text-sm transition-colors focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-border/40 bg-background/60 px-3 py-2.5 text-sm transition-colors focus:border-gold/40 focus:outline-none"
          >
            <option value="created_at">Date</option>
            <option value="score">Score</option>
            <option value="accuracy">Accuracy</option>
            <option value="stars">Stars</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === -1 ? 1 : -1)}
            className="flex size-10 items-center justify-center rounded-xl border border-border/40 bg-background/60 transition-colors hover:bg-accent"
            aria-label="Toggle sort order"
          >
            <ChevronDown className={cn("size-4 transition-transform", sortOrder === 1 && "rotate-180")} />
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-xl border border-border/40 bg-background/60 px-3 py-2.5 text-sm transition-colors hover:bg-accent"
          >
            <Filter className="size-4" /> Filters
          </button>
        </div>

        {showFilters && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="mb-6 overflow-hidden"
          >
            <div className="flex flex-wrap gap-3 rounded-xl border border-border/40 bg-card/30 p-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
                  className="rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-sm"
                >
                  <option value="">All</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          </m.div>
        )}

        {loading && (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-14" />)}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-red-500">{error}</p>
            <Button onClick={fetchHistory} variant="outline" size="sm">Retry</Button>
          </div>
        )}

        {!loading && !error && data && data.games.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <Clock className="size-12 text-muted-foreground/20" />
            <h3 className="text-lg font-semibold">No Games Yet</h3>
            <p className="max-w-sm text-muted-foreground">Complete your first Tech Logo Match game to see your history here.</p>
            <Button href="/optimatrix/tech-logo-match/play" variant="gold" size="sm">
              Play Now
            </Button>
          </div>
        )}

        {!loading && !error && data && data.games.length > 0 && (
          <>
            <div className="space-y-2">
              {data.games.map((game, i) => (
                <GameRow key={game.id} game={game} index={i} />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {data.games.length} of {data.total} games
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="rounded-xl border border-border/40 bg-background/60 px-4 py-2 text-sm transition-colors hover:bg-accent disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!data.has_more}
                  className="rounded-xl border border-border/40 bg-background/60 px-4 py-2 text-sm transition-colors hover:bg-accent disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
