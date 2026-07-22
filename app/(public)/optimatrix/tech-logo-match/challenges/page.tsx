"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { ArrowLeft, Brain, Calendar, Star, Clock, Zap } from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { techLogoMatchApi, type ChallengeBase } from "@/lib/tech-logo-match-api";
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
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);
  return <span className="tabular-nums text-muted-foreground">{remaining}</span>;
}

function ChallengeCard({ challenge, isWeekly }: { challenge: ChallengeBase; isWeekly?: boolean }) {
  const pct = challenge.target > 0 ? Math.min((challenge.progress / challenge.target) * 100, 100) : 0;
  return (
    <m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
      className={cn("relative overflow-hidden rounded-xl border p-5 transition-all hover:shadow-md",
        challenge.completed ? "border-emerald-200 bg-emerald-50/30" : "border-border/40 bg-card/50")}>
      {challenge.completed && (
        <div className="absolute right-3 top-3 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">Done</div>
      )}
      <div className="flex items-start gap-3">
        <span className="text-2xl">{isWeekly ? "📅" : "🌤️"}</span>
        <div className="flex-1">
          <p className="text-sm font-semibold">{challenge.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{challenge.description}</p>
          <p className="mt-2 text-[11px] text-gold">Reward: +{challenge.xp_reward} XP</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-2 overflow-hidden rounded-full bg-border/30">
              <m.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5 }}
                className={cn("h-full rounded-full", challenge.completed ? "bg-emerald-500" : "bg-gold")} />
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">
              {challenge.progress}/{challenge.target}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[10px]">
            <Clock className="size-3" /> <Countdown expiresAt={challenge.expires_at} />
          </div>
        </div>
      </div>
    </m.div>
  );
}

export default function TechLogoMatchChallengesPage() {
  const user = useAuthStore((s) => s.user);
  const [daily, setDaily] = useState<ChallengeBase | null>(null);
  const [weekly, setWeekly] = useState<ChallengeBase | null>(null);
  const [dcDone, setDcDone] = useState(false);
  const [wcDone, setWcDone] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    try {
      const [d, w] = await Promise.all([techLogoMatchApi.getDailyChallenge(), techLogoMatchApi.getWeeklyChallenge()]);
      setDaily(d.challenge); setDcDone(d.completed);
      setWeekly(w.challenge); setWcDone(w.completed);
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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Challenges</span>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Daily & Weekly Challenges</h1>
          </div>
          <div className="flex gap-2">
            <Button href="/optimatrix/tech-logo-match/challenge-history" variant="outline" size="sm">
              <Calendar className="size-4" /> History
            </Button>
            <Button href="/optimatrix/tech-logo-match" variant="outline" size="sm"><ArrowLeft className="size-4" /> Back</Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Star className="size-4 text-gold" /> Daily Challenge
            </h2>
            {loading ? (
              <div className="h-40 animate-pulse rounded-xl bg-border/40" />
            ) : daily ? (
              <ChallengeCard challenge={{ ...daily, completed: dcDone }} />
            ) : (
              <Card><CardContent className="p-6 text-center text-sm text-muted-foreground">No daily challenge available.</CardContent></Card>
            )}
          </div>
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Calendar className="size-4 text-gold" /> Weekly Challenge
            </h2>
            {loading ? (
              <div className="h-40 animate-pulse rounded-xl bg-border/40" />
            ) : weekly ? (
              <ChallengeCard challenge={{ ...weekly, completed: wcDone }} isWeekly />
            ) : (
              <Card><CardContent className="p-6 text-center text-sm text-muted-foreground">No weekly challenge available.</CardContent></Card>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
