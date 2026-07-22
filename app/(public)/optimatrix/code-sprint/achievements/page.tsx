"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AchievementGrid } from "@/components/codesprint/achievements/achievement-grid";
import { gamificationApi, Achievement } from "@/lib/codesprint/gamification-api";
import { useAuthStore } from "@/lib/auth-store";
import { Award, RefreshCw } from "lucide-react";

export default function AchievementsPage() {
  const user = useAuthStore((s) => s.user);
  const [achievements, setAchievements] = React.useState<Achievement[]>([]);
  const [unlockedCount, setUnlockedCount] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await gamificationApi.getAchievements();
      setAchievements(data.achievements);
      setUnlockedCount(data.total_unlocked);
      setTotalCount(data.total_available);
    } catch (err) {
      console.error("Failed to load achievements", err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  return (
    <div className="relative min-h-dvh bg-gradient-to-br from-surface via-surface-alt to-surface">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-24">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-gold/10">
              <Award className="size-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Achievements</h1>
              <p className="text-sm text-muted-foreground">
                {unlockedCount} / {totalCount} unlocked
              </p>
            </div>
          </div>
          <button onClick={fetchData} className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted/30">
            <RefreshCw className="size-4" />
          </button>
        </div>

        <AchievementGrid achievements={achievements} loading={loading} />
      </main>
      <Footer />
    </div>
  );
}
