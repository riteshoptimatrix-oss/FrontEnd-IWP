"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Zap, Clock, CheckCircle2, Brain, Sparkles,
  Target, Flame,
} from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import {
  getDailyChallenge, getWeeklyChallenge,
  type DailyChallengeResult, type WeeklyChallengeResult,
} from "@/lib/syntax-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

function Countdown({ expiresAt }: { expiresAt: string }) {
  const [remaining, setRemaining] = useState("");
  useEffect(() => {
    const update = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) { setRemaining("Expired"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(`${h}h ${m}m ${s}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);
  return <span className="tabular-nums">{remaining}</span>;
}

export default function ChallengesPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [daily, setDaily] = useState<DailyChallengeResult | null>(null);
  const [weekly, setWeekly] = useState<WeeklyChallengeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const [d, w] = await Promise.all([getDailyChallenge(), getWeeklyChallenge()]);
      setDaily(d);
      setWeekly(w);
    } catch {
      setError("Failed to load challenges.");
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
          <p className="max-w-md text-muted-foreground">Sign in to access daily and weekly challenges.</p>
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
                <Target className="size-6 text-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Challenges</h1>
                <p className="text-sm text-muted-foreground">Complete challenges to earn bonus XP</p>
              </div>
            </div>
          </div>
          <Button href="/optimatrix/syntax-match" variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Back
          </Button>
        </div>

        {loading ? (
          <div className="mt-8 space-y-6">
            <div className="skeleton h-48 rounded-2xl" />
            <div className="skeleton h-48 rounded-2xl" />
          </div>
        ) : error ? (
          <div className="mt-8 flex flex-col items-center gap-4 py-12 text-center">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchData} variant="outline">Retry</Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Daily Challenge */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-3 flex items-center gap-2">
                <Zap className="size-4 text-gold" />
                <h2 className="text-lg font-semibold tracking-tight">Daily Challenge</h2>
              </div>
              <ChallengeCard
                challenge={daily?.challenge ?? null}
                progress={daily?.progress ?? 0}
                completed={daily?.completed ?? false}
                type="daily"
              />
            </m.div>

            {/* Weekly Challenge */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="mb-3 flex items-center gap-2">
                <Flame className="size-4 text-gold" />
                <h2 className="text-lg font-semibold tracking-tight">Weekly Challenge</h2>
              </div>
              <ChallengeCard
                challenge={weekly?.challenge ?? null}
                progress={weekly?.progress ?? 0}
                completed={weekly?.completed ?? false}
                type="weekly"
              />
            </m.div>
          </div>
        )}
      </Container>
    </Section>
  );
}

function ChallengeCard({
  challenge, progress, completed, type,
}: {
  challenge: any;
  progress: number;
  completed: boolean;
  type: string;
}) {
  if (!challenge) {
    return (
      <Card>
        <CardHeader className="items-center py-12 text-center">
          <Clock className="size-10 text-muted-foreground/20" />
          <CardTitle className="mt-3 text-sm">No challenge today</CardTitle>
          <CardDescription>Check back later for a new challenge.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={cn(completed && "ring-2 ring-emerald-400/40")}>
      <CardHeader className="p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{challenge.title}</CardTitle>
              {completed && <CheckCircle2 className="size-4 text-emerald-500" />}
            </div>
            <CardDescription className="mt-1">{challenge.description}</CardDescription>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-1 text-xs font-semibold text-gold">
            <Sparkles className="size-3" /> +{challenge.xp_reward} XP
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-secondary/70">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                completed ? "bg-emerald-500" : "bg-gold",
              )}
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3" />
          <Countdown expiresAt={challenge.expires_at} />
        </div>

        {completed && (
          <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
            <CheckCircle2 className="size-3" /> Completed
          </div>
        )}

        <Button
          href="/optimatrix/syntax-match/play"
          variant={completed ? "outline" : "gold"}
          size="sm"
          className="mt-4"
        >
          <Zap className="size-4" />
          {completed ? "Play Again" : "Play Now"}
        </Button>
      </CardHeader>
    </Card>
  );
}
