"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Search, Filter, ChevronLeft, ChevronRight,
  Brain, Star, Clock, Zap,
} from "lucide-react";

import { useAuthStore } from "@/lib/auth-store";
import { getHistory, type GameHistoryItem, type GameHistoryResult } from "@/lib/syntax-match-api";
import { syntaxQuestions } from "@/lib/syntax-match-questions";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/card";
import { cn } from "@/lib/utils";

const DIFFICULTIES = ["all", "easy", "medium", "hard"] as const;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function SyntaxMatchHistoryPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<GameHistoryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const LIMIT = 15;

  const fetchHistory = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string | number> = {
        page,
        limit: LIMIT,
        sort_by: sortBy,
        sort_order: sortOrder,
      };
      if (language !== "all") params.language = language;
      if (difficulty !== "all") params.difficulty = difficulty;
      const res = await getHistory(params as any);
      setData(res);
    } catch {
      setError("Failed to load game history.");
    } finally {
      setLoading(false);
    }
  }, [user, page, language, difficulty, sortBy, sortOrder]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 1;

  if (!user) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
          <Brain className="size-16 text-muted-foreground/30" />
          <h1 className="text-3xl font-bold tracking-tight">Sign in Required</h1>
          <p className="max-w-md text-muted-foreground">
            Sign in to view your Syntax Match game history.
          </p>
          <Button href="/login" variant="gold" size="lg">
            Sign In
          </Button>
          <Button onClick={() => router.push("/optimatrix/syntax-match")} variant="outline" size="sm">
            <ArrowLeft className="size-4" />
            Back
          </Button>
        </Container>
      </Section>
    );
  }

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
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Game History</h1>
                <p className="text-sm text-muted-foreground">
                  {data ? `${data.total} game${data.total !== 1 ? "s" : ""} played` : "Loading..."}
                </p>
              </div>
            </div>
          </div>
          <Button href="/optimatrix/syntax-match/dashboard" variant="outline" size="sm">
            <ArrowLeft className="size-4" />
            Dashboard
          </Button>
        </div>

        {/* ── Filters ── */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 shadow-sm">
            <Search className="size-4 text-muted-foreground" />
            <select
              value={language}
              onChange={(e) => { setLanguage(e.target.value); setPage(1); }}
              className="border-none bg-transparent text-sm outline-none"
              aria-label="Filter by language"
            >
              <option value="all">All Languages</option>
              {syntaxQuestions.map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 shadow-sm">
            <Filter className="size-4 text-muted-foreground" />
            <select
              value={difficulty}
              onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
              className="border-none bg-transparent text-sm outline-none"
              aria-label="Filter by difficulty"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d} className="capitalize">
                  {d === "all" ? "All Difficulties" : d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-2 shadow-sm">
            <span className="text-xs text-muted-foreground">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-none bg-transparent text-sm outline-none"
              aria-label="Sort by"
            >
              <option value="created_at">Date</option>
              <option value="accuracy">Accuracy</option>
              <option value="stars">Stars</option>
              <option value="moves">Moves</option>
              <option value="completion_time_seconds">Time</option>
            </select>
            <button
              onClick={() => setSortOrder((o) => (o === "desc" ? "asc" : "desc"))}
              className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label={`Sort ${sortOrder === "desc" ? "ascending" : "descending"}`}
            >
              {sortOrder === "desc" ? "↓" : "↑"}
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        {loading ? (
          <div className="mt-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-16 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="mt-8 flex flex-col items-center gap-4 py-12 text-center">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchHistory} variant="outline" size="sm">Retry</Button>
          </div>
        ) : data && data.games.length === 0 ? (
          <Card className="mt-8">
            <CardHeader className="items-center py-16 text-center">
              <Brain className="size-12 text-muted-foreground/20" />
              <CardTitle className="mt-4">No games found</CardTitle>
              <CardDescription>
                {language !== "all" || difficulty !== "all"
                  ? "Try changing your filters."
                  : "Play your first Syntax Match game to see history here."}
              </CardDescription>
              <Button href="/optimatrix/syntax-match/play" variant="gold" size="sm" className="mt-4">
                <Zap className="size-4" />
                Play Now
              </Button>
            </CardHeader>
          </Card>
        ) : (
          <>
            <div className="mt-6 space-y-2">
              {data?.games.map((game) => (
                <div
                  key={game.id}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all duration-200 hover:border-gold/15 sm:gap-4 sm:p-5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/8 text-sm font-bold capitalize text-gold">
                    {game.language.slice(0, 2)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold capitalize">{game.language}</span>
                      <span className={cn(
                        "rounded px-1.5 py-0.5 text-[10px] font-medium capitalize",
                        game.difficulty === "easy" && "bg-emerald-50 text-emerald-600",
                        game.difficulty === "medium" && "bg-amber-50 text-amber-600",
                        game.difficulty === "hard" && "bg-red-50 text-red-600",
                      )}>
                        {game.difficulty}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {formatDate(game.created_at)}
                    </div>
                  </div>

                  <div className="hidden items-center gap-3 text-xs text-muted-foreground md:flex">
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {formatTime(game.completion_time_seconds)}
                    </div>
                    <span>{game.moves} moves</span>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold">{game.accuracy}%</div>
                    <div className="text-xs text-muted-foreground">acc</div>
                  </div>

                  <div className="text-sm">
                    {[1, 2, 3].map((s) => (
                      <span key={s} className={s <= game.stars ? "text-gold" : "text-muted-foreground/20"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Pagination ── */}
            {data && data.total > LIMIT && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
                  aria-label="Next page"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </Section>
  );
}
