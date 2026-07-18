"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trophy, Medal, Crown } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  display_name: string;
  avatar?: string;
  score: number;
  level: number;
  xp: number;
  title: string;
  best_wpm: number;
  current_streak: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  metric?: string;
  loading?: boolean;
}

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="size-5 text-gold" />;
  if (rank === 2) return <Medal className="size-5 text-gray-400" />;
  if (rank === 3) return <Medal className="size-5 text-amber-600" />;
  return <span className="font-mono text-sm text-muted-foreground">#{rank}</span>;
}

function formatScore(score: number, metric: string) {
  switch (metric) {
    case "wpm": return `${score} WPM`;
    case "accuracy": return `${score}%`;
    case "xp": return score.toLocaleString();
    case "streak": return `${score} days`;
    case "tests": return String(score);
    default: return String(score);
  }
}

export function LeaderboardTable({ entries, currentUserId, metric = "xp", loading }: LeaderboardTableProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-muted/30" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-border/40 bg-white/80 p-12 text-center shadow-sm backdrop-blur-sm dark:bg-ink/80">
        <Trophy className="mx-auto size-12 text-muted-foreground/30" />
        <p className="mt-4 text-sm text-muted-foreground">No leaderboard data yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, i) => (
        <m.div
          key={entry.user_id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.03 }}
          className={cn(
            "flex items-center gap-4 rounded-xl border px-4 py-3 transition-colors",
            entry.user_id === currentUserId
              ? "border-gold/30 bg-gold/5"
              : "border-border/40 bg-white/80 hover:bg-white dark:bg-ink/80 dark:hover:bg-ink",
          )}
        >
          <div className="flex size-10 items-center justify-center">{getRankIcon(entry.rank)}</div>
          <div className="flex size-10 items-center justify-center rounded-full bg-gold/10 font-bold text-gold">
            {entry.level}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{entry.display_name}</div>
            <div className="text-xs text-muted-foreground">{entry.title}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-sm font-bold text-gold">{formatScore(entry.score, metric)}</div>
            <div className="text-[10px] text-muted-foreground">{entry.current_streak}d streak</div>
          </div>
        </m.div>
      ))}
    </div>
  );
}
