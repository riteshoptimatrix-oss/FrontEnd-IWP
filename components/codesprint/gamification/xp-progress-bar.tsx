"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { getProgressToNext, getTitleForLevel } from "@/lib/codesprint/level-system";
import { Star } from "lucide-react";

interface XPProgressBarProps {
  xp: number;
  level: number;
  loading?: boolean;
}

export function XPProgressBar({ xp, level, loading }: XPProgressBarProps) {
  if (loading) {
    return <div className="h-20 animate-pulse rounded-2xl bg-muted/30" />;
  }

  const { progress, xpInLevel, xpNeeded, nextLevel } = getProgressToNext(xp);
  const title = getTitleForLevel(level);

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/40 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:bg-ink/80"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-gold/10">
            <Star className="size-6 text-gold" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Level {level}</div>
            <div className="text-lg font-bold text-gold">{title}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total XP</div>
          <div className="font-mono text-2xl font-bold tabular-nums text-gold">{xp.toLocaleString()}</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span>{xpInLevel} / {xpNeeded} XP</span>
          <span>Level {nextLevel}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-muted/30">
          <m.div
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-soft"
          />
        </div>
      </div>
    </m.div>
  );
}
