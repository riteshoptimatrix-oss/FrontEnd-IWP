"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Trophy, Target, Flame, Zap, BarChart3, Brain } from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { techLogoMatchApi, type LeaderboardResult, type LeaderboardEntry } from "@/lib/tech-logo-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

const METRICS = [
  { id: "xp", label: "XP", icon: Zap },
  { id: "accuracy", label: "Accuracy", icon: Target },
  { id: "streak", label: "Streak", icon: Flame },
  { id: "score", label: "Score", icon: Trophy },
  { id: "games", label: "Games", icon: BarChart3 },
];

const SCOPES = [
  { id: "overall", label: "Overall" },
  { id: "Frameworks", label: "Frameworks" },
  { id: "Languages", label: "Languages" },
  { id: "Styling", label: "Styling" },
  { id: "Build & Dev Tools", label: "Dev Tools" },
  { id: "Platforms & Services", label: "Platforms" },
];

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-border/40", className)} />;
}

const RANK_COLORS = ["text-amber-400", "text-gray-300", "text-amber-700"];

export default function TechLogoMatchLeaderboardPage() {
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<LeaderboardResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [metric, setMetric] = useState("xp");
  const [scope, setScope] = useState("overall");
  const [page, setPage] = useState(1);

  const fetchLeaderboard = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    try {
      const res = await techLogoMatchApi.getLeaderboard({ metric, scope, page, limit: 20 });
      setData(res);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [user, metric, scope, page]);

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  if (!user) {
    return (
      <Section><Container className="flex flex-col items-center gap-6 py-20 text-center">
        <Brain className="size-16 text-muted-foreground/30" />
        <h1 className="text-3xl font-bold">Sign in Required</h1>
        <Button href="/login" variant="gold" size="lg">Sign In</Button>
      </Container></Section>
    );
  }

  return (
    <Section className="bg-gradient-to-b from-violet-500/[0.02] via-background to-background">
      <Container className="py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Leaderboard</span>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Player Rankings</h1>
          </div>
          <Button href="/optimatrix/tech-logo-match" variant="outline" size="sm"><ArrowLeft className="size-4" /> Back</Button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {METRICS.map((m) => (
            <button key={m.id} onClick={() => { setMetric(m.id); setPage(1); }}
              className={cn("inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
                metric === m.id ? "border-gold/40 bg-gold/10 text-gold" : "border-border/40 bg-background/60 text-muted-foreground hover:bg-accent")}>
              <m.icon className="size-3.5" /> {m.label}
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {SCOPES.map((s) => (
            <button key={s.id} onClick={() => { setScope(s.id); setPage(1); }}
              className={cn("rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-colors",
                scope === s.id ? "border-gold/30 bg-gold/5 text-gold" : "border-border/40 text-muted-foreground hover:bg-accent")}>
              {s.label}
            </button>
          ))}
        </div>

        {loading && <div className="space-y-2">{[1,2,3,4,5].map((i) => <Skeleton key={i} className="h-14" />)}</div>}

        {data && data.entries.length === 0 && !loading && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <Trophy className="size-12 text-muted-foreground/20" />
            <p className="text-muted-foreground">No rankings yet. Be the first to play!</p>
          </div>
        )}

        {data && data.entries.length > 0 && (
          <>
            <div className="space-y-1.5">
              {data.entries.map((entry, i) => {
                const isMe = entry.user_id === user?.id;
                return (
                  <m.div key={entry.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn("flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
                      isMe ? "border-gold/30 bg-gold/[0.03]" : "border-border/40 bg-card/30 hover:bg-accent/30")}>
                    <span className={cn("w-8 text-center text-base font-bold tabular-nums",
                      entry.rank <= 3 ? RANK_COLORS[entry.rank - 1] : "text-muted-foreground")}>
                      {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : entry.rank}
                    </span>
                    <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5 text-xs font-bold text-gold">
                      {entry.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{isMe ? "You" : entry.username}</p>
                      <p className="text-[10px] text-muted-foreground">Lvl {entry.level} · {entry.rank_title}</p>
                    </div>
                    <span className="font-semibold tabular-nums">
                      {metric === "accuracy" ? `${entry.value}%` : Math.round(entry.value).toLocaleString()}
                    </span>
                  </m.div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Page {data.page}</span>
              <div className="flex gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}
                  className="rounded-xl border border-border/40 bg-background/60 px-4 py-2 text-sm transition-colors hover:bg-accent disabled:opacity-40">Previous</button>
                <button onClick={() => setPage((p) => p + 1)} disabled={!data.has_more}
                  className="rounded-xl border border-border/40 bg-background/60 px-4 py-2 text-sm transition-colors hover:bg-accent disabled:opacity-40">Next</button>
              </div>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
