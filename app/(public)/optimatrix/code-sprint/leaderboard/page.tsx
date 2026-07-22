"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LeaderboardTable } from "@/components/codesprint/leaderboard/leaderboard-table";
import { UserRankCard } from "@/components/codesprint/leaderboard/user-rank-card";
import { LeaderboardFilters } from "@/components/codesprint/leaderboard/leaderboard-filters";
import { gamificationApi, LeaderboardEntry, UserRankResponse } from "@/lib/codesprint/gamification-api";
import { useAuthStore } from "@/lib/auth-store";
import { Trophy, RefreshCw } from "lucide-react";

export default function LeaderboardPage() {
  const user = useAuthStore((s) => s.user);
  const [entries, setEntries] = React.useState<LeaderboardEntry[]>([]);
  const [rankData, setRankData] = React.useState<UserRankResponse | undefined>();
  const [loading, setLoading] = React.useState(true);
  const [period, setPeriod] = React.useState("all_time");
  const [metric, setMetric] = React.useState("xp");
  const [language, setLanguage] = React.useState<string | null>(null);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const [lb, rank] = await Promise.all([
        gamificationApi.getLeaderboard({ period, metric, language: language ?? undefined }),
        gamificationApi.getMyRank(metric),
      ]);
      setEntries(lb.entries);
      setRankData(rank);
    } catch (err) {
      console.error("Failed to load leaderboard", err);
    } finally {
      setLoading(false);
    }
  }, [period, metric, language]);

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
              <Trophy className="size-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Leaderboard</h1>
              <p className="text-sm text-muted-foreground">Compete with developers worldwide</p>
            </div>
          </div>
          <button onClick={fetchData} className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted/30">
            <RefreshCw className="size-4" />
          </button>
        </div>

        <div className="space-y-6">
          <UserRankCard data={rankData} metric={metric} loading={loading} />
          <LeaderboardFilters
            period={period}
            metric={metric}
            language={language}
            onPeriodChange={setPeriod}
            onMetricChange={setMetric}
            onLanguageChange={setLanguage}
          />
          <LeaderboardTable
            entries={entries}
            currentUserId={user?.id}
            metric={metric}
            loading={loading}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
