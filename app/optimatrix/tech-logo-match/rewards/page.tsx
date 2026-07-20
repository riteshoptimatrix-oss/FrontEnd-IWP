"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Brain, Gift, Zap, Star, Crown } from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { techLogoMatchApi, type RewardsResult, type LevelInfo } from "@/lib/tech-logo-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) { return <div className={cn("animate-pulse rounded-lg bg-border/40", className)} />; }

export default function TechLogoMatchRewardsPage() {
  const user = useAuthStore((s) => s.user);
  const [rewards, setRewards] = useState<RewardsResult | null>(null);
  const [level, setLevel] = useState<LevelInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    try {
      const [r, l] = await Promise.all([techLogoMatchApi.getRewards(), techLogoMatchApi.getPlayerLevel()]);
      setRewards(r); setLevel(l);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetch(); }, [fetch]);

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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Rewards</span>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">XP & Rewards</h1>
          </div>
          <Button href="/optimatrix/tech-logo-match" variant="outline" size="sm"><ArrowLeft className="size-4" /> Back</Button>
        </div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
        )}

        {!loading && level && (
          <Card className="mb-6 border-gold/20">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 text-2xl">
                    {level.rank_icon || "⭐"}
                  </span>
                  <div>
                    <p className="text-lg font-bold">Level {level.level}</p>
                    <p className="text-xs text-muted-foreground">{level.rank}</p>
                    <p className="text-[10px] text-gold">{level.current_xp.toLocaleString()} / {level.xp_for_next.toLocaleString()} XP</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="rounded-xl border border-border/40 bg-background/60 px-4 py-2 text-center">
                    <p className="text-xs text-muted-foreground">XP</p>
                    <p className="text-lg font-bold tabular-nums">{level.current_xp.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl border border-border/40 bg-background/60 px-4 py-2 text-center">
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <p className="text-lg font-bold tabular-nums">{Math.round(level.progress)}%</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-border/30">
                <m.div initial={{ width: 0 }} animate={{ width: `${level.progress}%` }}
                  transition={{ duration: 0.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold" />
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && rewards && (
          <>
            <div className="mb-4 flex items-center gap-2">
              <Gift className="size-4 text-gold" />
              <h2 className="text-lg font-semibold">Recent Rewards</h2>
            </div>
            {rewards.recent_rewards.length === 0 ? (
              <Card><CardContent className="p-6 text-center text-sm text-muted-foreground">
                No rewards yet. Play games to earn XP!
              </CardContent></Card>
            ) : (
              <div className="space-y-1.5">
                {rewards.recent_rewards.map((r, i) => (
                  <m.div key={r.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                    className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/30 px-4 py-3 text-sm">
                    <Zap className="size-5 shrink-0 text-gold" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{r.reason}</p>
                      <p className="text-[10px] text-muted-foreground">{new Date(r.created_at).toLocaleDateString()} · {r.created_at}</p>
                    </div>
                    <span className="shrink-0 font-semibold text-gold tabular-nums">+{r.xp} XP</span>
                  </m.div>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </Section>
  );
}
