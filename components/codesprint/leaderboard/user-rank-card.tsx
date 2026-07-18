"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface UserRankResponse {
  current_rank: number;
  previous_rank?: number;
  rank_change?: number;
  top_percentage: number;
  xp: number;
  level: number;
  title: string;
  progress_to_next: number;
  xp_for_next_level: number;
  metric_score: number;
}

interface UserRankCardProps {
  data?: UserRankResponse;
  metric?: string;
  loading?: boolean;
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

export function UserRankCard({ data, metric = "xp", loading }: UserRankCardProps) {
  if (loading) {
    return <div className="h-40 animate-pulse rounded-2xl bg-muted/30" />;
  }
  if (!data) return null;

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gold/20 bg-gold/5 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Your Rank</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold text-gold">#{data.current_rank}</span>
            {data.rank_change !== undefined && data.rank_change !== 0 && (
              <span className={cn("flex items-center gap-0.5 text-xs font-medium",
                data.rank_change > 0 ? "text-emerald-500" : "text-red-500"
              )}>
                {data.rank_change > 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {Math.abs(data.rank_change)}
              </span>
            )}
            {data.rank_change === 0 && (
              <Minus className="size-3 text-muted-foreground" />
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Top {data.top_percentage}%</div>
          <div className="mt-1 font-mono text-lg font-bold">{formatScore(data.metric_score, metric)}</div>
        </div>
      </div>
    </m.div>
  );
}
