"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { Target, CheckCircle2, Zap } from "lucide-react";

interface WeeklyMission {
  id: string;
  type: string;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  progress_pct: number;
  language?: string;
  xp_reward: number;
  completed: boolean;
}

interface WeeklyMissionCardProps {
  mission: WeeklyMission;
  loading?: boolean;
}

export function WeeklyMissionCard({ mission, loading }: WeeklyMissionCardProps) {
  if (loading) {
    return <div className="h-28 animate-pulse rounded-2xl bg-muted/30" />;
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border p-4 transition-all",
        mission.completed
          ? "border-emerald-500/20 bg-emerald-500/5"
          : "border-border/40 bg-white/80 shadow-sm dark:bg-ink/80",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-gold" />
            {mission.language && (
              <span className="text-[10px] text-muted-foreground">{mission.language}</span>
            )}
          </div>
          <h4 className="mt-1 text-sm font-semibold">{mission.title}</h4>
          <p className="mt-0.5 text-xs text-muted-foreground">{mission.description}</p>
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>{mission.current_value} / {mission.target_value}</span>
              <span>{mission.progress_pct}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted/30">
              <m.div
                initial={{ width: 0 }}
                animate={{ width: `${mission.progress_pct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                  "h-full rounded-full",
                  mission.completed ? "bg-emerald-500" : "bg-gold",
                )}
              />
            </div>
          </div>
        </div>
        <div className="ml-3 flex flex-col items-center gap-1">
          {mission.completed ? (
            <CheckCircle2 className="size-6 text-emerald-500" />
          ) : (
            <span className="flex items-center gap-0.5 text-xs text-gold">
              <Zap className="size-3" />
              +{mission.xp_reward}
            </span>
          )}
        </div>
      </div>
    </m.div>
  );
}
