"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Keyboard, RefreshCw } from "lucide-react";

import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { useAuthStore } from "@/lib/auth-store";
import { codesprintApi, type StatisticsResponse, type HistoryResponse } from "@/lib/codesprint/api";
import { AuthGate } from "@/components/codesprint/auth-gate";
import { StatisticsCards } from "@/components/codesprint/statistics-cards";
import { HistoryTable } from "@/components/codesprint/history-table";

function DashboardContent() {
  const { user } = useAuthStore();
  const [stats, setStats] = React.useState<StatisticsResponse | null>(null);
  const [history, setHistory] = React.useState<HistoryResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [historyLoading, setHistoryLoading] = React.useState(true);
  const [filter, setFilter] = React.useState({ language: "", difficulty: "" });

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setHistoryLoading(true);
    try {
      const [statsRes, historyRes] = await Promise.all([
        codesprintApi.getStatistics(),
        codesprintApi.getHistory({ limit: 20 }),
      ]);
      setStats(statsRes);
      setHistory(historyRes);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
      setHistoryLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = React.useCallback(async (type: string, value: string) => {
    const newFilter = { ...filter, [type]: value };
    setFilter(newFilter);
    setHistoryLoading(true);
    try {
      const res = await codesprintApi.getHistory({
        limit: 20,
        language: newFilter.language || undefined,
        difficulty: newFilter.difficulty || undefined,
      });
      setHistory(res);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setHistoryLoading(false);
    }
  }, [filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      <Container className="py-8">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/optimatrix/code-sprint"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to CodeSprint
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-white px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted/50 dark:bg-ink/50"
            >
              <RefreshCw className="size-3.5" />
              Refresh
            </button>
            <Button href="/optimatrix/code-sprint/play" variant="gold" size="sm">
              <Keyboard className="size-4" />
              Start Practice
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Track your typing progress, view history, and analyze your performance.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          <StatisticsCards
            stats={stats?.overall || {
              total_tests: 0,
              total_practice_hours: 0,
              avg_wpm: 0,
              avg_accuracy: 0,
              best_wpm: 0,
              best_accuracy: 0,
              languages_practiced: [],
              current_streak: 0,
              longest_streak: 0,
              personal_records: {
                best_wpm: 0,
                best_accuracy: 0,
                best_cpm: 0,
                longest_session_seconds: 0,
              },
            }}
            byLanguage={stats?.by_language || []}
            byDifficulty={stats?.by_difficulty || []}
            loading={loading}
          />
        </div>

        {/* Filters + History */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold">Session History</h2>
            <div className="flex-1" />

            {/* Filters */}
            <select
              value={filter.language}
              onChange={(e) => handleFilterChange("language", e.target.value)}
              className="appearance-none rounded-lg border border-border/60 bg-white px-3 py-1.5 pr-8 text-xs transition-colors hover:border-gold/30 focus:border-gold focus:outline-none dark:bg-ink/50"
            >
              <option value="">All Languages</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="react">React</option>
              <option value="nextjs">Next.js</option>
              <option value="typescript">TypeScript</option>
              <option value="dart">Dart</option>
              <option value="angular">Angular</option>
              <option value="vue">Vue</option>
            </select>

            <select
              value={filter.difficulty}
              onChange={(e) => handleFilterChange("difficulty", e.target.value)}
              className="appearance-none rounded-lg border border-border/60 bg-white px-3 py-1.5 pr-8 text-xs transition-colors hover:border-gold/30 focus:border-gold focus:outline-none dark:bg-ink/50"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <HistoryTable sessions={history?.sessions || []} loading={historyLoading} />
        </div>

        {/* Quick actions */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/optimatrix/code-sprint/play"
            className="group rounded-2xl border border-border/40 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-card-hover dark:bg-ink/80"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Keyboard className="size-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Start Practice</div>
                <div className="text-xs text-muted-foreground">Begin a new typing challenge</div>
              </div>
            </div>
          </Link>
          <Link
            href="/optimatrix/code-sprint"
            className="group rounded-2xl border border-border/40 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-card-hover dark:bg-ink/80"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                <span className="text-lg">📚</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Browse Languages</div>
                <div className="text-xs text-muted-foreground">See all supported languages</div>
              </div>
            </div>
          </Link>
          <Link
            href="/dashboard"
            className="group rounded-2xl border border-border/40 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-card-hover dark:bg-ink/80"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                <span className="text-lg">📊</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Account Dashboard</div>
                <div className="text-xs text-muted-foreground">Manage your account</div>
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default function CodeSprintDashboardPage() {
  return (
    <AuthGate>
      <DashboardContent />
    </AuthGate>
  );
}
