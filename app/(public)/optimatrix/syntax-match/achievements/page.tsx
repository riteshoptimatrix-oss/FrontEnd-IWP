"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Trophy, Lock, CheckCircle2, Brain, Zap,
  Target, Book, Award, Flame, Code, Layers, TrendingUp, Star,
} from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import {
  getAchievements, getBadges,
  type AchievementItem, type BadgeItem,
} from "@/lib/syntax-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

function AchIcon({ icon }: { icon: string }) {
  const cls = "size-5";
  switch (icon) {
    case "target": return <Target className={cls} />;
    case "trophy": return <Trophy className={cls} />;
    case "book": return <Book className={cls} />;
    case "star": return <Star className={cls} />;
    case "flame": return <Flame className={cls} />;
    case "zap": return <Zap className={cls} />;
    case "trending-up": return <TrendingUp className={cls} />;
    case "code": return <Code className={cls} />;
    case "layers": return <Layers className={cls} />;
    default: return <Award className={cls} />;
  }
}

export default function AchievementsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"achievements" | "badges">("achievements");

  const fetchData = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const [ach, bdg] = await Promise.all([getAchievements(), getBadges()]);
      setAchievements(ach);
      setBadges(bdg);
    } catch {
      setError("Failed to load achievements.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const unlockedAch = achievements.filter((a) => a.unlocked).length;
  const unlockedBadges = badges.filter((b) => b.unlocked).length;

  if (!user) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
          <Brain className="size-16 text-muted-foreground/30" />
          <h1 className="text-3xl font-bold tracking-tight">Sign in Required</h1>
          <p className="max-w-md text-muted-foreground">Sign in to track your achievements and badges.</p>
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
                <Trophy className="size-6 text-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Achievements</h1>
                <p className="text-sm text-muted-foreground">
                  {unlockedAch}/{achievements.length} achievements &middot; {unlockedBadges}/{badges.length} badges
                </p>
              </div>
            </div>
          </div>
          <Button href="/optimatrix/syntax-match" variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Back
          </Button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setTab("achievements")}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all",
              tab === "achievements" ? "bg-gold text-white shadow-sm" : "bg-secondary/50 text-muted-foreground hover:bg-secondary",
            )}
          >
            Achievements ({unlockedAch}/{achievements.length})
          </button>
          <button
            onClick={() => setTab("badges")}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all",
              tab === "badges" ? "bg-gold text-white shadow-sm" : "bg-secondary/50 text-muted-foreground hover:bg-secondary",
            )}
          >
            Badges ({unlockedBadges}/{badges.length})
          </button>
        </div>

        {loading ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-40 rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="mt-6 flex flex-col items-center gap-4 py-12 text-center">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchData} variant="outline">Retry</Button>
          </div>
        ) : tab === "achievements" ? (
          <m.div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {achievements.map((ach) => (
              <Card key={ach.achievement_id} className={cn(!ach.unlocked && "opacity-60")}>
                <CardHeader className="p-4 sm:p-5">
                  <div className="flex items-start justify-between">
                    <div className={cn(
                      "flex size-10 items-center justify-center rounded-lg",
                      ach.unlocked ? "bg-gold/10 text-gold" : "bg-secondary/50 text-muted-foreground",
                    )}>
                      {ach.unlocked ? <AchIcon icon={ach.icon} /> : <Lock className="size-5" />}
                    </div>
                    {ach.unlocked && <CheckCircle2 className="size-4 text-emerald-500" />}
                  </div>
                  <CardTitle className={cn("mt-2 text-sm", ach.unlocked ? "" : "text-muted-foreground")}>
                    {ach.title}
                  </CardTitle>
                  <CardDescription className="text-xs">{ach.description}</CardDescription>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{Math.round(ach.current)}/{Math.round(ach.target)}</span>
                      {ach.unlocked && ach.unlocked_at && (
                        <span>{new Date(ach.unlocked_at).toLocaleDateString()}</span>
                      )}
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-secondary/70">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          ach.unlocked ? "bg-gold" : "bg-muted-foreground/30",
                        )}
                        style={{ width: `${Math.min(ach.progress_percent, 100)}%` }}
                      />
                    </div>
                  </div>
                  {ach.unlocked && (
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold">
                      +{ach.xp_reward} XP
                    </div>
                  )}
                </CardHeader>
              </Card>
            ))}
          </m.div>
        ) : (
          <m.div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {badges.map((badge) => {
              const tierColors: Record<string, string> = {
                bronze: "from-amber-700/10 to-amber-700/5 text-amber-700 border-amber-200",
                silver: "from-gray-400/10 to-gray-400/5 text-gray-500 border-gray-300",
                gold: "from-yellow-500/10 to-yellow-500/5 text-yellow-600 border-yellow-300",
                diamond: "from-cyan-500/10 to-cyan-500/5 text-cyan-600 border-cyan-300",
              };
              return (
                <Card key={badge.id} className={cn(!badge.unlocked && "opacity-50")}>
                  <CardHeader className={cn("p-4 sm:p-5", !badge.unlocked && "grayscale")}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex size-12 items-center justify-center rounded-xl border bg-gradient-to-br",
                        tierColors[badge.tier] || "from-gold/10 to-gold/5",
                      )}>
                        <Award className="size-6" />
                      </div>
                      <div>
                        <CardTitle className={cn("text-sm capitalize", badge.unlocked ? "" : "text-muted-foreground")}>
                          {badge.name}
                        </CardTitle>
                        <CardDescription className="text-[10px] capitalize">{badge.tier} &middot; {badge.category}</CardDescription>
                      </div>
                      {badge.unlocked && <CheckCircle2 className="ml-auto size-4 text-emerald-500" />}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{badge.description}</p>
                    {badge.unlocked && badge.unlocked_at && (
                      <p className="mt-1 text-[10px] text-muted-foreground/60">
                        Unlocked {new Date(badge.unlocked_at).toLocaleDateString()}
                      </p>
                    )}
                  </CardHeader>
                </Card>
              );
            })}
          </m.div>
        )}
      </Container>
    </Section>
  );
}
