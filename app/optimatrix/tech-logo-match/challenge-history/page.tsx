"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Brain, CheckCircle2, XCircle } from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { techLogoMatchApi, type ChallengeHistoryItem } from "@/lib/tech-logo-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) { return <div className={cn("animate-pulse rounded-lg bg-border/40", className)} />; }

export default function TechLogoMatchChallengeHistoryPage() {
  const user = useAuthStore((s) => s.user);
  const [challenges, setChallenges] = useState<ChallengeHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    try {
      const res = await techLogoMatchApi.getChallengeHistory();
      setChallenges(res.challenges);
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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">History</span>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Challenge History</h1>
          </div>
          <div className="flex gap-2">
            <Button href="/optimatrix/tech-logo-match/challenges" variant="outline" size="sm">
              <ArrowLeft className="size-4" /> Challenges
            </Button>
            <Button href="/optimatrix/tech-logo-match" variant="outline" size="sm"><ArrowLeft className="size-4" /> Back</Button>
          </div>
        </div>

        {loading && <div className="space-y-2">{[1,2,3,4,5].map((i) => <Skeleton key={i} className="h-14" />)}</div>}

        {!loading && challenges.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <CheckCircle2 className="size-12 text-muted-foreground/20" />
            <p className="text-muted-foreground">No challenge history yet. Complete a challenge to see it here!</p>
            <Button href="/optimatrix/tech-logo-match/challenges" variant="gold" size="sm">View Challenges</Button>
          </div>
        )}

        {!loading && challenges.length > 0 && (
          <div className="space-y-2">
            {challenges.map((c, i) => (
              <m.div key={c.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/30 px-4 py-3 text-sm">
                {c.completed ? (
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="size-5 shrink-0 text-muted-foreground/40" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{c.title}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {c.type} · {c.challenge_type}
                    {c.completed_at && ` · ${new Date(c.completed_at).toLocaleDateString()}`}
                  </p>
                </div>
                <span className="shrink-0 text-right">
                  {c.completed ? (
                    <span className="font-semibold text-emerald-600">+{c.xp_reward} XP</span>
                  ) : (
                    <span className="text-muted-foreground/60">Incomplete</span>
                  )}
                </span>
              </m.div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
