"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AchievementCard } from "./achievement-card";

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

interface AchievementGridProps {
  achievements: Achievement[];
  loading?: boolean;
}

const categories = [
  { value: "all", label: "All" },
  { value: "milestone", label: "Milestones" },
  { value: "accuracy", label: "Accuracy" },
  { value: "speed", label: "Speed" },
  { value: "streak", label: "Streaks" },
  { value: "language", label: "Languages" },
  { value: "difficulty", label: "Difficulty" },
  { value: "level", label: "Levels" },
];

export function AchievementGrid({ achievements, loading }: AchievementGridProps) {
  const [activeCategory, setActiveCategory] = React.useState("all");

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-muted/30" />
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted/30" />
          ))}
        </div>
      </div>
    );
  }

  const filtered = activeCategory === "all"
    ? achievements
    : achievements.filter((a) => a.category === activeCategory);

  const unlocked = filtered.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              activeCategory === cat.value
                ? "bg-gold/10 text-gold"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">
        {unlocked} / {filtered.length} unlocked
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((a) => (
          <AchievementCard key={a.key} achievement={a} />
        ))}
      </div>
    </div>
  );
}
