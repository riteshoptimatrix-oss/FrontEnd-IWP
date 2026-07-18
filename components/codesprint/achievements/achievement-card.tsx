"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { getTierColors } from "@/lib/codesprint/level-system";
import { Award, Lock } from "lucide-react";

interface Achievement {
  key: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  tier: string;
  xp_reward: number;
  unlocked: boolean;
  unlocked_at?: string;
}

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const tierColors = getTierColors(achievement.tier);

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative rounded-2xl border p-4 transition-all",
        achievement.unlocked
          ? cn(tierColors.bg, "border-current/20 ring-1", tierColors.ring)
          : "border-border/40 bg-white/40 opacity-50 dark:bg-ink/40",
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "flex size-10 items-center justify-center rounded-xl",
          achievement.unlocked ? cn(tierColors.bg, tierColors.text) : "bg-muted/30 text-muted-foreground",
        )}>
          {achievement.unlocked ? (
            <Award className="size-5" />
          ) : (
            <Lock className="size-4" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-sm font-semibold">{achievement.name}</h4>
            <span className={cn("shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-medium capitalize", tierColors.bg, tierColors.text)}>
              {achievement.tier}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{achievement.description}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] text-gold">+{achievement.xp_reward} XP</span>
            {achievement.unlocked && achievement.unlocked_at && (
              <span className="text-[10px] text-muted-foreground">
                {new Date(achievement.unlocked_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </m.div>
  );
}
