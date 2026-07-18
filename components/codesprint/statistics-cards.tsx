"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProfileStats, LanguageStats, DifficultyStats } from "@/lib/codesprint/api";
import { Trophy, Target, Zap, Clock, Flame, BookOpen, TrendingUp, Star } from "lucide-react";

interface StatisticsCardsProps {
  stats: ProfileStats;
  byLanguage: LanguageStats[];
  byDifficulty: DifficultyStats[];
  loading?: boolean;
}

const langColors: Record<string, string> = {
  html: "bg-orange-500",
  css: "bg-blue-500",
  javascript: "bg-yellow-400",
  react: "bg-cyan-400",
  nextjs: "bg-gray-500",
  typescript: "bg-blue-600",
  dart: "bg-blue-500",
  angular: "bg-red-500",
  vue: "bg-green-400",
};

export function StatisticsCards({ stats, byLanguage, byDifficulty, loading }: StatisticsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted/30" />
        ))}
      </div>
    );
  }

  const overviewCards = [
    { icon: Trophy, label: "Total Tests", value: stats.total_tests, color: "text-gold", bg: "bg-gold/10" },
    { icon: Clock, label: "Practice Hours", value: stats.total_practice_hours.toFixed(1), color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: Zap, label: "Avg WPM", value: stats.avg_wpm, color: "text-gold", bg: "bg-gold/10" },
    { icon: Target, label: "Avg Accuracy", value: `${stats.avg_accuracy}%`, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: Trophy, label: "Best WPM", value: stats.best_wpm, color: "text-amber-500", bg: "bg-amber-500/10" },
    { icon: Target, label: "Best Accuracy", value: `${stats.best_accuracy}%`, color: "text-emerald-600", bg: "bg-emerald-500/10" },
    { icon: Flame, label: "Current Streak", value: `${stats.current_streak}d`, color: "text-orange-500", bg: "bg-orange-500/10" },
    { icon: Flame, label: "Longest Streak", value: `${stats.longest_streak}d`, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  return (
    <div className="space-y-6">
      {/* Overview grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card, i) => (
          <m.div
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-2xl border border-border/40 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:bg-ink/80"
          >
            <div className="flex items-center gap-3">
              <div className={cn("flex size-10 items-center justify-center rounded-xl", card.bg)}>
                <card.icon className={cn("size-5", card.color)} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{card.label}</div>
                <div className={cn("text-xl font-bold tabular-nums", card.color)}>{card.value}</div>
              </div>
            </div>
          </m.div>
        ))}
      </div>

      {/* Language breakdown */}
      {byLanguage.length > 0 && (
        <div className="rounded-2xl border border-border/40 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:bg-ink/80">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="size-4 text-gold" />
            <h3 className="text-sm font-semibold">By Language</h3>
          </div>
          <div className="space-y-3">
            {byLanguage.map((lang) => (
              <div key={lang.language} className="flex items-center gap-3">
                <span className={cn("size-2.5 rounded-full", langColors[lang.language] || "bg-gray-400")} />
                <span className="w-24 text-sm font-medium capitalize">{lang.language}</span>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-muted/40">
                    <div
                      className={cn("h-full rounded-full", langColors[lang.language] || "bg-gray-400")}
                      style={{ width: `${Math.min(100, (lang.tests / (stats.total_tests || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
                <span className="w-12 text-right text-xs text-muted-foreground">{lang.tests} tests</span>
                <span className="w-16 text-right font-mono text-xs font-semibold text-gold">{lang.avg_wpm} avg</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Difficulty breakdown */}
      {byDifficulty.length > 0 && (
        <div className="rounded-2xl border border-border/40 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:bg-ink/80">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="size-4 text-gold" />
            <h3 className="text-sm font-semibold">By Difficulty</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {byDifficulty.map((diff) => (
              <div key={diff.difficulty} className={cn("rounded-xl border p-4 text-center", diff.difficulty === "easy" ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/20" : diff.difficulty === "medium" ? "border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20" : "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20")}>
                <div className="text-sm font-semibold capitalize">{diff.difficulty}</div>
                <div className="mt-2 text-xs text-muted-foreground">{diff.tests} tests</div>
                <div className="mt-1 font-mono text-lg font-bold text-gold">{diff.avg_wpm}</div>
                <div className="text-[11px] text-muted-foreground">avg WPM</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
