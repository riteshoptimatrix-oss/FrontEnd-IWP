"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const mockAchievements = [
  { icon: "🔥", title: "On Fire", description: "Complete 7 sessions in a row", unlocked: true, rarity: "Common" },
  { icon: "⚡", title: "Speed Demon", description: "Reach 120+ WPM", unlocked: true, rarity: "Rare" },
  { icon: "🎯", title: "Sharpshooter", description: "99% accuracy in a session", unlocked: false, rarity: "Epic" },
  { icon: "🏆", title: "Champion", description: "Reach #1 on leaderboard", unlocked: false, rarity: "Legendary" },
  { icon: "📚", title: "Polyglot", description: "Practice 5+ languages", unlocked: true, rarity: "Rare" },
  { icon: "🌟", title: "Rising Star", description: "Improve WPM by 50%", unlocked: false, rarity: "Epic" },
];

const rarityColors = {
  Common: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  Rare: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  Epic: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  Legendary: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
};

export function AchievementsPreview() {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl border border-border/60 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-ink/80"
    >
      {/* Header */}
      <div className="border-b border-border/40 bg-gradient-to-r from-gold/5 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Achievements</h3>
            <p className="text-sm text-muted-foreground">Unlock badges as you improve</p>
          </div>
          <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
            3/6 Unlocked
          </span>
        </div>
      </div>

      {/* Achievement grid */}
      <div className="grid grid-cols-2 gap-4 p-6">
        {mockAchievements.map((achievement, i) => (
          <m.div
            key={achievement.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className={cn(
              "group relative overflow-hidden rounded-xl border p-4 transition-all duration-300",
              achievement.unlocked
                ? "border-gold/20 bg-gradient-to-br from-gold/5 to-transparent hover:shadow-md"
                : "border-border/40 bg-muted/20 opacity-60 grayscale",
            )}
          >
            {/* Badge icon */}
            <div className={cn(
              "flex size-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300",
              achievement.unlocked
                ? "bg-gold/10 group-hover:scale-110"
                : "bg-muted/50",
            )}>
              {achievement.icon}
            </div>

            <h4 className="mt-3 font-semibold">{achievement.title}</h4>
            <p className="mt-1 text-xs text-muted-foreground">{achievement.description}</p>

            {/* Rarity badge */}
            <span className={cn(
              "mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
              rarityColors[achievement.rarity as keyof typeof rarityColors],
            )}>
              {achievement.rarity}
            </span>

            {/* Locked overlay */}
            {!achievement.unlocked && (
              <div className="absolute right-2 top-2">
                <svg className="size-4 text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            )}
          </m.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="border-t border-border/40 p-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Achievement Progress</span>
          <span>3/6 (50%)</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold-soft transition-all duration-500" style={{ width: "50%" }} />
        </div>
      </div>
    </m.div>
  );
}
