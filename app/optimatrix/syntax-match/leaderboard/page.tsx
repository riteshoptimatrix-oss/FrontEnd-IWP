"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Trophy, Medal, Users, Zap, Brain,
  BarChart3, Target, Clock, Flame, Gamepad2,
} from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import {
  getLeaderboard, getMyRank,
  type LeaderboardResult, type PlayerRank, type LeaderboardEntry,
} from "@/lib/syntax-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

const METRICS = [
  { label: "XP", value: "xp", icon: Zap },
  { label: "Games", value: "games", icon: Gamepad2 },
  { label: "Accuracy", value: "accuracy", icon: Target },
  { label: "Streak", value: "streak", icon: Flame },
] as const;

const SCOPES = [
  { label: "Overall", value: "overall" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JS", value: "javascript" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "next.js" },
  { label: "TypeScript", value: "typescript" },
  { label: "Angular", value: "angular" },
  { label: "Vue", value: "vue" },
  { label: "Dart", value: "dart" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Medal className="size-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="size-5 text-gray-400" />;
  if (rank === 3) return <Medal className="size-5 text-amber-600" />;
  return <span className="w-5 text-center text-sm font-bold text-muted-foreground/50">{rank}</span>;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<LeaderboardResult | null>(null);
  const [myRank, setMyRank] = useState<PlayerRank | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metric, setMetric] = useState("xp");
  const [scope, setScope] = useState("overall");
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [lb, rank] = await Promise.all([
        getLeaderboard({ metric, scope, page, limit: 50 }),
        user ? getMyRank() : Promise.resolve(null),
      ]);
      setData(lb);
      setMyRank(rank);
    } catch {
      setError("Failed to load leaderboard.");
    } finally {
      setLoading(false);
    }
  }, [metric, scope, page, user]);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { setPage(1); }, [metric, scope]);

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  return (
    <Section>
      <Container className="py-10 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 ring-1 ring-gold/15">
                <Trophy className="size-6 text-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Leaderboard</h1>
                <p className="text-sm text-muted-foreground">Compete with other players</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button href="/optimatrix/syntax-match" variant="outline" size="sm">
              <ArrowLeft className="size-4" /> Back
            </Button>
            <Button href="/optimatrix/syntax-match/play" variant="gold" size="sm">
              <Zap className="size-4" /> Play
            </Button>
          </div>
        </div>

        {/* My Rank */}
        {myRank && (
          <Card className="mt-6">
            <CardHeader className="flex-row items-center gap-4 p-4 sm:p-5">
              <Users className="size-5 text-gold" />
              <div>
                <CardTitle className="text-sm">Your Rank</CardTitle>
                <CardDescription>
                  #{myRank.rank} of {myRank.total_players} players &middot; {myRank.score.toLocaleString()} XP
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Metric Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {METRICS.map((m) => (
            <button
              key={m.value}
              onClick={() => setMetric(m.value)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                metric === m.value
                  ? "bg-gold text-white shadow-sm"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <m.icon className="size-3.5" /> {m.label}
            </button>
          ))}
        </div>

        {/* Scope Filter */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {SCOPES.map((s) => (
            <button
              key={s.value}
              onClick={() => setScope(s.value)}
              className={cn(
                "rounded-md px-2 py-1 text-[10px] font-medium transition-all capitalize",
                scope === s.value
                  ? "bg-gold/15 text-gold ring-1 ring-gold/30"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        {loading ? (
          <div className="mt-6 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton h-14 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="mt-6 flex flex-col items-center gap-4 py-12 text-center">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchData} variant="outline">Retry</Button>
          </div>
        ) : data && data.entries.length === 0 ? (
          <Card className="mt-6">
            <CardHeader className="items-center py-16 text-center">
              <Users className="size-12 text-muted-foreground/20" />
              <CardTitle className="mt-4">No entries yet</CardTitle>
              <CardDescription>Play games to appear on the leaderboard.</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <m.div className="mt-6 space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {data?.entries.map((entry, i) => (
              <div
                key={entry.user_id}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border border-border/60 p-4 shadow-sm transition-all sm:p-5",
                  entry.rank <= 3 ? "bg-gradient-to-r from-gold/[0.04] to-transparent border-gold/10" : "bg-card",
                  user && entry.user_id === user.id && "ring-2 ring-gold/30",
                )}
              >
                <div className="flex w-8 justify-center">
                  <RankIcon rank={entry.rank} />
                </div>

                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-xs font-bold capitalize text-foreground/60">
                  {entry.rank_name?.[0] || "P"}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      Player
                      {user && entry.user_id === user.id && (
                        <span className="ml-1.5 text-[10px] text-gold">(You)</span>
                      )}
                    </span>
                    <span className="rounded bg-secondary/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      Lv.{entry.level} {entry.rank_name}
                    </span>
                  </div>
                </div>

                <div className="hidden items-center gap-4 text-xs text-muted-foreground md:flex">
                  <span>{entry.games_played} games</span>
                  <span>{entry.accuracy}%</span>
                  {metric === "xp" && <span>{entry.streak}d streak</span>}
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold tabular-nums">
                    {metric === "accuracy" ? `${entry.score}%` : Math.round(entry.score).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-muted-foreground capitalize">{metric}</div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground disabled:opacity-30"
                >
                  ←
                </button>
                <span className="text-xs text-muted-foreground">Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground disabled:opacity-30"
                >
                  →
                </button>
              </div>
            )}
          </m.div>
        )}
      </Container>
    </Section>
  );
}
