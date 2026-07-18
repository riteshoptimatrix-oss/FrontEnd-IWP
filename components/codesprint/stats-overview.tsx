"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const mockStats = [
  { label: "Average WPM", value: "87", change: "+12", trend: "up", icon: "⚡" },
  { label: "Accuracy", value: "94.2%", change: "+2.1%", trend: "up", icon: "🎯" },
  { label: "Sessions", value: "142", change: "+8", trend: "up", icon: "📝" },
  { label: "Languages", value: "6", change: "+1", trend: "up", icon: "🌍" },
];

const mockRecentSessions = [
  { language: "React", wpm: 92, accuracy: 96, date: "Today" },
  { language: "TypeScript", wpm: 85, accuracy: 94, date: "Yesterday" },
  { language: "JavaScript", wpm: 88, accuracy: 93, date: "2 days ago" },
];

export function StatsOverview() {
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
            <h3 className="text-lg font-semibold">Your Progress</h3>
            <p className="text-sm text-muted-foreground">Track your improvement over time</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            ↑ Improving
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 p-6">
        {mockStats.map((stat, i) => (
          <m.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="rounded-xl border border-border/40 bg-muted/20 p-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className={cn(
                "text-xs font-medium",
                stat.trend === "up" ? "text-emerald-500" : "text-red-500",
              )}>
                {stat.change}
              </span>
            </div>
          </m.div>
        ))}
      </div>

      {/* Recent sessions */}
      <div className="border-t border-border/40 p-6">
        <h4 className="text-sm font-semibold text-muted-foreground mb-3">Recent Sessions</h4>
        <div className="space-y-3">
          {mockRecentSessions.map((session, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-muted/20 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-gold/10 px-2 py-0.5 text-xs font-medium text-gold">
                  {session.language}
                </span>
                <span className="text-sm text-muted-foreground">{session.date}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-mono font-medium text-gold">{session.wpm} WPM</span>
                <span className="font-mono font-medium text-emerald-500">{session.accuracy}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </m.div>
  );
}
