"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Clock, CheckCircle2, XCircle, Brain, Zap,
} from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { getChallengeHistory, type ChallengeHistoryItem } from "@/lib/syntax-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/card";
import { cn } from "@/lib/utils";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function ChallengeHistoryPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [challenges, setChallenges] = useState<ChallengeHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      setChallenges(await getChallengeHistory());
    } catch {
      setError("Failed to load challenge history.");
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
          <p className="max-w-md text-muted-foreground">Sign in to view your challenge history.</p>
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
                <Clock className="size-6 text-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Challenge History</h1>
                <p className="text-sm text-muted-foreground">
                  {challenges.filter((c) => c.status === "completed").length} completed
                </p>
              </div>
            </div>
          </div>
          <Button href="/optimatrix/syntax-match/challenges" variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Challenges
          </Button>
        </div>

        {loading ? (
          <div className="mt-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-16 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="mt-8 flex flex-col items-center gap-4 py-12 text-center">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchData} variant="outline">Retry</Button>
          </div>
        ) : challenges.length === 0 ? (
          <Card className="mt-8">
            <CardHeader className="items-center py-16 text-center">
              <Clock className="size-12 text-muted-foreground/20" />
              <CardTitle className="mt-4">No challenges yet</CardTitle>
              <CardDescription>Complete your first daily or weekly challenge to see it here.</CardDescription>
              <Button href="/optimatrix/syntax-match/challenges" variant="gold" size="sm" className="mt-4">
                <Zap className="size-4" /> View Challenges
              </Button>
            </CardHeader>
          </Card>
        ) : (
          <m.div className="mt-8 space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {challenges.map((c, i) => (
              <div
                key={`${c.id}-${i}`}
                className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all hover:border-gold/15 sm:p-5"
              >
                <div className={cn(
                  "flex size-10 items-center justify-center rounded-lg",
                  c.status === "completed" ? "bg-emerald-50 text-emerald-600" : "bg-secondary/50 text-muted-foreground",
                )}>
                  {c.status === "completed" ? <CheckCircle2 className="size-5" /> : <XCircle className="size-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold capitalize">{c.title.replace(/_/g, " ")}</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {c.type} challenge &middot; {formatDate(c.completed_at)}
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-sm font-bold",
                    c.status === "completed" ? "text-gold" : "text-muted-foreground/40",
                  )}>
                    {c.status === "completed" ? `+${c.xp_reward} XP` : "—"}
                  </div>
                  <div className="text-[10px] text-muted-foreground capitalize">{c.status}</div>
                </div>
              </div>
            ))}
          </m.div>
        )}
      </Container>
    </Section>
  );
}
