"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DailyChallengeCard } from "@/components/codesprint/challenges/daily-challenge-card";
import { WeeklyMissionCard } from "@/components/codesprint/challenges/weekly-mission-card";
import { ChallengeCalendar } from "@/components/codesprint/challenges/challenge-calendar";
import { gamificationApi, DailyChallenge, WeeklyMission } from "@/lib/codesprint/gamification-api";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { Flame, Target, CalendarDays, RefreshCw } from "lucide-react";

export default function ChallengesPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const [dailyChallenges, setDailyChallenges] = React.useState<DailyChallenge[]>([]);
  const [weeklyMissions, setWeeklyMissions] = React.useState<WeeklyMission[]>([]);
  const [streakDays, setStreakDays] = React.useState(0);
  const [weekCompleted, setWeekCompleted] = React.useState({ completed: 0, total: 0 });
  const [loading, setLoading] = React.useState(true);
  const [calendarDates, setCalendarDates] = React.useState<string[]>([]);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const [daily, weekly] = await Promise.all([
        gamificationApi.getDailyChallenges(),
        gamificationApi.getWeeklyChallenges(),
      ]);
      setDailyChallenges(daily.challenges);
      setStreakDays(daily.streak_days);
      setWeeklyMissions(weekly.missions);
      setWeekCompleted({ completed: weekly.completed_count, total: weekly.total_count });
      setCalendarDates(daily.challenges.filter((c) => c.completed).map((c) => daily.date));
    } catch (err) {
      console.error("Failed to load challenges", err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  const handleComplete = async (challengeId: string) => {
    const challenge = dailyChallenges.find((c) => c.id === challengeId);
    if (!challenge) return;
    try {
      const result = await gamificationApi.completeChallenge(challengeId, "daily");
      if (result.success) {
        setDailyChallenges((prev) => prev.map((c) => c.id === challengeId ? { ...c, completed: true, completed_at: new Date().toISOString() } : c));
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to complete challenge", err);
    }
  };

  return (
    <div className="relative min-h-dvh bg-gradient-to-br from-surface via-surface-alt to-surface">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-24">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-gold/10">
              <Flame className="size-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Challenges</h1>
              <p className="text-sm text-muted-foreground">Complete daily and weekly challenges</p>
            </div>
          </div>
          <button onClick={fetchData} className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted/30">
            <RefreshCw className="size-4" />
          </button>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Flame className="size-4 text-gold" />
              <span>{streakDays} day streak</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="size-4 text-gold" />
              <span>{weekCompleted.completed}/{weekCompleted.total} weekly</span>
            </div>
          </div>

          <ChallengeCalendar activeDates={calendarDates} />

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Flame className="size-5 text-gold" />
              Daily Challenges
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {dailyChallenges.map((c) => (
                <DailyChallengeCard key={c.id} challenge={c} onComplete={handleComplete} loading={loading} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <CalendarDays className="size-5 text-gold" />
              Weekly Missions
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {weeklyMissions.map((m) => (
                <WeeklyMissionCard key={m.id} mission={m} loading={loading} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
