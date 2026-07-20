"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Trophy, Brain, Star, Lock } from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { techLogoMatchApi, type AchievementItem, type BadgeItem } from "@/lib/tech-logo-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/card";
import { cn } from "@/lib/utils";

const TIER_COLORS: Record<string, string> = {
  bronze: "text-amber-700 bg-amber-50 border-amber-200",
  silver: "text-gray-500 bg-gray-50 border-gray-300",
  gold: "text-yellow-600 bg-yellow-50 border-yellow-300",
  platinum: "text-cyan-600 bg-cyan-50 border-cyan-300",
  diamond: "text-blue-600 bg-blue-50 border-blue-300",
};
const TIER_LABELS: Record<string, string> = { bronze: "🥉", silver: "🥈", gold: "🥇", platinum: "💿", diamond: "💎" };

function Skeleton({ className }: { className?: string }) { return <div className={cn("animate-pulse rounded-lg bg-border/40", className)} />; }

function AchievementCard({ ach, index }: { ach: AchievementItem; index: number }) {
  return (
    <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}
      className={cn("relative overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md",
        ach.unlocked ? "border-gold/20 bg-card/50" : "border-border/30 bg-card/20 opacity-60")}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{ach.unlocked ? ach.icon : "🔒"}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{ach.title}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{ach.description}</p>
          <p className="mt-1 text-[10px] text-gold">+{ach.xp_reward} XP</p>
          {ach.unlocked && ach.unlocked_at && (
            <p className="mt-0.5 text-[9px] text-muted-foreground/60">
              Unlocked {new Date(ach.unlocked_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </m.div>
  );
}

function BadgeCard({ badge, index }: { badge: BadgeItem; index: number }) {
  return (
    <m.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.03 }}
      className={cn("flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all",
        badge.unlocked ? TIER_COLORS[badge.tier] || "bg-card/50" : "border-border/30 bg-card/20 opacity-50")}>
      <span className={cn("text-3xl", !badge.unlocked && "grayscale")}>{badge.unlocked ? badge.icon : "🔒"}</span>
      <p className="text-xs font-semibold">{badge.name}</p>
      <p className="text-[10px] text-muted-foreground">{badge.description}</p>
      {badge.unlocked && (
        <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-medium border", TIER_COLORS[badge.tier])}>
          {TIER_LABELS[badge.tier] || badge.tier} {badge.tier.charAt(0).toUpperCase() + badge.tier.slice(1)}
        </span>
      )}
    </m.div>
  );
}

export default function TechLogoMatchAchievementsPage() {
  const user = useAuthStore((s) => s.user);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"achievements" | "badges">("achievements");

  const fetch = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    try {
      const [a, b] = await Promise.all([techLogoMatchApi.getAchievements(), techLogoMatchApi.getBadges()]);
      setAchievements(a); setBadges(b);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetch(); }, [fetch]);

  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;
  const unlockedBadges = badges.filter((b) => b.unlocked).length;

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
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Earned</span>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Achievements & Badges</h1>
          </div>
          <Button href="/optimatrix/tech-logo-match" variant="outline" size="sm"><ArrowLeft className="size-4" /> Back</Button>
        </div>

        <div className="mb-6 flex gap-3">
          <button onClick={() => setTab("achievements")}
            className={cn("inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
              tab === "achievements" ? "border-gold/40 bg-gold/10 text-gold" : "border-border/40 bg-background/60 text-muted-foreground hover:bg-accent")}>
            <Star className="size-4" /> Achievements ({unlockedAchievements}/{achievements.length})
          </button>
          <button onClick={() => setTab("badges")}
            className={cn("inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
              tab === "badges" ? "border-gold/40 bg-gold/10 text-gold" : "border-border/40 bg-background/60 text-muted-foreground hover:bg-accent")}>
            <Trophy className="size-4" /> Badges ({unlockedBadges}/{badges.length})
          </button>
        </div>

        {loading && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5,6].map((i) => <Skeleton key={i} className="h-24" />)}
          </div>
        )}

        {!loading && tab === "achievements" && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((ach, i) => <AchievementCard key={ach.id} ach={ach} index={i} />)}
          </div>
        )}

        {!loading && tab === "badges" && (
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {badges.map((badge, i) => <BadgeCard key={badge.id} badge={badge} index={i} />)}
          </div>
        )}
      </Container>
    </Section>
  );
}
