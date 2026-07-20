"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, User, Trophy, Star, Target, Clock, Flame,
  Zap, Brain, Medal,
} from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { techLogoMatchApi, type ProfileResult } from "@/lib/tech-logo-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/card";
import { cn } from "@/lib/utils";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  } catch { return iso; }
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-border/40", className)} />;
}

function StatItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card/30 px-4 py-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
        <Icon className="size-5 text-gold" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default function TechLogoMatchProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [data, setData] = useState<ProfileResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true); setError(null);
    try {
      const res = await techLogoMatchApi.getProfile();
      setData(res);
    } catch {
      setError("Failed to load profile. Please try again.");
    } finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  if (!user) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
          <User className="size-16 text-muted-foreground/30" />
          <h1 className="text-3xl font-bold tracking-tight">Sign in Required</h1>
          <p className="max-w-md text-muted-foreground">Sign in to view your Tech Logo Match profile.</p>
          <Button href="/login" variant="gold" size="lg">Sign In</Button>
          <Button onClick={() => router.push("/optimatrix/tech-logo-match")} variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Back
          </Button>
        </Container>
      </Section>
    );
  }

  if (loading) {
    return (
      <Section>
        <Container className="py-10">
          <Skeleton className="mb-4 size-20 rounded-full" />
          <Skeleton className="mb-8 h-6 w-48" />
          <div className="grid gap-3 sm:grid-cols-2">{[1,2,3,4,5,6].map((i) => <Skeleton key={i} className="h-16" />)}</div>
        </Container>
      </Section>
    );
  }

  if (error || !data) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-red-500">{error || "No data"}</p>
          <Button onClick={fetchProfile} variant="outline" size="sm">Retry</Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-gradient-to-b from-violet-500/[0.02] via-background to-background">
      <Container className="py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Profile</span>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Player Profile</h1>
          </div>
          <Button href="/optimatrix/tech-logo-match" variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Back
          </Button>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5 text-3xl font-bold text-gold ring-2 ring-gold/20">
            {data.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{data.full_name}</h2>
            <p className="text-sm text-muted-foreground">{data.email}</p>
            <p className="mt-1 text-xs text-muted-foreground/60">
              Registered {formatDate(data.registered)}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <StatItem icon={Trophy} label="Games Played" value={String(data.games_played)} />
          <StatItem icon={Medal} label="Games Won (3★)" value={String(data.games_won)} />
          <StatItem icon={Target} label="Overall Accuracy" value={`${data.overall_accuracy}%`} />
          <StatItem icon={Star} label="Best Score" value={String(data.best_score)} />
          <StatItem icon={Clock} label="Best Response Time" value={data.best_response_time ? `${data.best_response_time}s` : "—"} />
          <StatItem icon={Flame} label="Current Streak" value={`${data.current_streak} days`} />
          <StatItem icon={Flame} label="Longest Streak" value={`${data.longest_streak} days`} />
          <StatItem icon={Star} label="Total Stars" value={String(data.total_stars)} />
          <StatItem icon={Brain} label="Best Difficulty" value={data.favorite_difficulty ? data.favorite_difficulty.charAt(0).toUpperCase() + data.favorite_difficulty.slice(1) : "—"} />
        </div>

        {data.favorite_category && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <StatItem icon={Zap} label="Favorite Category" value={data.favorite_category} />
            <StatItem icon={Medal} label="Favorite Mode" value={data.favorite_difficulty ? data.favorite_difficulty.charAt(0).toUpperCase() + data.favorite_difficulty.slice(1) : "—"} />
          </div>
        )}

        {data.games_played === 0 && (
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <Trophy className="size-12 text-muted-foreground/20" />
            <p className="text-muted-foreground">No games played yet. Start playing to build your profile!</p>
            <Button href="/optimatrix/tech-logo-match/play" variant="gold" size="sm">
              <Zap className="size-4" /> Play Now
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}
