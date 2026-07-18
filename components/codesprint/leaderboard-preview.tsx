"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const mockLeaderboard = [
  { rank: 1, name: "Alex Chen", language: "TypeScript", wpm: 142, accuracy: 98.5, avatar: "AC" },
  { rank: 2, name: "Sarah Kim", language: "React", wpm: 138, accuracy: 97.2, avatar: "SK" },
  { rank: 3, name: "Marcus Johnson", language: "JavaScript", wpm: 135, accuracy: 96.8, avatar: "MJ" },
  { rank: 4, name: "Priya Patel", language: "Python", wpm: 131, accuracy: 95.4, avatar: "PP" },
  { rank: 5, name: "David Lee", language: "TypeScript", wpm: 128, accuracy: 94.9, avatar: "DL" },
];

const rankColors = {
  1: "from-yellow-400 to-amber-500",
  2: "from-gray-300 to-gray-400",
  3: "from-orange-400 to-orange-500",
  4: "from-blue-400 to-blue-500",
  5: "from-purple-400 to-purple-500",
};

export function LeaderboardPreview() {
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
            <h3 className="text-lg font-semibold">Top Performers</h3>
            <p className="text-sm text-muted-foreground">This week&apos;s fastest typists</p>
          </div>
          <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
            🏆 Global
          </span>
        </div>
      </div>

      {/* Leaderboard list */}
      <div className="divide-y divide-border/40">
        {mockLeaderboard.map((entry, i) => (
          <m.div
            key={entry.rank}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/30"
          >
            {/* Rank */}
            <div className={cn(
              "flex size-10 items-center justify-center rounded-xl bg-gradient-to-br font-bold text-white shadow-sm",
              rankColors[entry.rank as keyof typeof rankColors],
            )}>
              {entry.rank}
            </div>

            {/* Avatar */}
            <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5 text-sm font-semibold text-gold">
              {entry.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{entry.name}</div>
              <div className="text-xs text-muted-foreground">{entry.language}</div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className="font-mono text-sm font-semibold text-gold">{entry.wpm}</div>
              <div className="text-xs text-muted-foreground">WPM</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm font-semibold text-emerald-500">{entry.accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
          </m.div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-border/40 p-4 text-center">
        <span className="text-xs text-muted-foreground">
          🏆 Global rankings refresh every hour
        </span>
      </div>
    </m.div>
  );
}
