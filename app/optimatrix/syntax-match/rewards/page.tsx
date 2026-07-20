"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Zap, Trophy, Brain, Star, Sparkles, Gift,
} from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { getRewards, type RewardsResult } from "@/lib/syntax-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

const TIER_COLORS: Record<string, string> = {
  bronze: "bg-amber-50 text-amber-600 border-amber-200",
  silver: "bg-gray-100 text-gray-500 border-gray-200",
  gold: "bg-yellow-50 text-yellow-600 border-yellow-200",
  diamond: "bg-cyan-50 text-cyan-600 border-cyan-200",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function RewardsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<RewardsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      setData(await getRewards());
    } catch {
      setError("Failed to load rewards.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (!user) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
          <Brain className="size-16 text-muted-foreground/30" />
          <h1 className="text-3xl font-bold tracking-tight">Sign in Required</h1>
          <p className="max-w-md text-muted-foreground">Sign in to view your rewards and XP earnings.</p>
          <Button href="/login" variant="gold" size="lg">Sign In</Button>
          <Button onClick={() => router.push("/optimatrix/syntax-match")} variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Back
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container className="py-10 sm:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 ring-1 ring-gold/15">
                <Gift className="size-6 text-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Rewards</h1>
                <p className="text-sm text-muted-foreground">Your XP earnings and achievements</p>
              </div>
            </div>
          </div>
          <Button href="/optimatrix/syntax-match" variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Back
          </Button>
        </div>

        {loading ? (
          <div className="mt-8 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-16 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="mt-8 flex flex-col items-center gap-4 py-12 text-center">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchData} variant="outline">Retry</Button>
          </div>
        ) : data && data.recent.length === 0 ? (
          <Card className="mt-8">
            <CardHeader className="items-center py-16 text-center">
              <Gift className="size-12 text-muted-foreground/20" />
              <CardTitle className="mt-4">No rewards yet</CardTitle>
              <CardDescription>Play games and complete challenges to earn XP rewards.</CardDescription>
              <Button href="/optimatrix/syntax-match/play" variant="gold" size="sm" className="mt-4">
                <Zap className="size-4" /> Play Now
              </Button>
            </CardHeader>
          </Card>
        ) : (
          <>
            {/* Summary */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="items-center p-5 text-center">
                  <Zap className="size-6 text-gold" />
                  <div className="mt-2 text-2xl font-bold">{data?.total_xp_earned.toLocaleString()}</div>
                  <CardDescription>Total XP Earned</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="items-center p-5 text-center">
                  <Star className="size-6 text-gold" />
                  <div className="mt-2 text-2xl font-bold">{data?.total_rewards}</div>
                  <CardDescription>Total Rewards</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="items-center p-5 text-center">
                  <Trophy className="size-6 text-gold" />
                  <div className="mt-2 text-2xl font-bold">
                    {data?.recent.filter((r) => r.tier === "gold" || r.tier === "diamond").length || 0}
                  </div>
                  <CardDescription>Premium Rewards</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Recent Rewards Timeline */}
            <m.div className="mt-8 space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="mb-4 text-lg font-semibold tracking-tight">Recent Activity</h2>
              {data?.recent.map((reward, i) => (
                <m.div
                  key={reward.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all hover:border-gold/15 sm:p-5">
                    <div className={cn(
                      "flex size-10 items-center justify-center rounded-xl border",
                      TIER_COLORS[reward.tier] || "bg-gold/10 text-gold border-gold/20",
                    )}>
                      {reward.icon === "zap" ? <Zap className="size-5" /> : <Star className="size-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold">{reward.title}</div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {reward.source} &middot; {formatDate(reward.unlocked_at)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gold">+{reward.xp_awarded}</div>
                      <div className="text-[10px] text-muted-foreground">XP</div>
                    </div>
                  </div>
                </m.div>
              ))}
            </m.div>
          </>
        )}
      </Container>
    </Section>
  );
}
