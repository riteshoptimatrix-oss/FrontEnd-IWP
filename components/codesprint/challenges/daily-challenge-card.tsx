"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { Zap, CheckCircle2, Clock } from "lucide-react";

interface DailyChallenge {
  id: string;
  language: string;
  category: string;
  difficulty: string;
  duration_seconds: number;
  xp_reward: number;
  bonus_xp: number;
  title: string;
  description: string;
  completed: boolean;
  completed_at?: string;
}

interface DailyChallengeCardProps {
  challenge: DailyChallenge;
  onComplete: (id: string) => void;
  loading?: boolean;
}

const difficultyColors = {
  easy: "bg-emerald-500/10 text-emerald-500",
  medium: "bg-amber-500/10 text-amber-500",
  hard: "bg-red-500/10 text-red-500",
};

export function DailyChallengeCard({ challenge, onComplete, loading }: DailyChallengeCardProps) {
  if (loading) {
    return <div className="h-32 animate-pulse rounded-2xl bg-muted/30" />;
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border p-4 transition-all",
        challenge.completed
          ? "border-emerald-500/20 bg-emerald-500/5"
          : "border-border/40 bg-white/80 shadow-sm hover:shadow-md dark:bg-ink/80",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", difficultyColors[challenge.difficulty as keyof typeof difficultyColors])}>
              {challenge.difficulty}
            </span>
            <span className="text-[10px] text-muted-foreground">{challenge.language}</span>
          </div>
          <h4 className="mt-2 text-sm font-semibold">{challenge.title}</h4>
          <p className="mt-1 text-xs text-muted-foreground">{challenge.description}</p>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              <span>{Math.floor(challenge.duration_seconds / 60)}min</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gold">
              <Zap className="size-3" />
              <span>+{challenge.xp_reward} XP</span>
            </div>
            {challenge.bonus_xp > 0 && (
              <span className="text-[10px] text-emerald-500">+{challenge.bonus_xp} bonus</span>
            )}
          </div>
        </div>
        <div className="ml-3">
          {challenge.completed ? (
            <CheckCircle2 className="size-8 text-emerald-500" />
          ) : (
            <button
              onClick={() => onComplete(challenge.id)}
              className="rounded-xl bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold/20"
            >
              Start
            </button>
          )}
        </div>
      </div>
    </m.div>
  );
}
