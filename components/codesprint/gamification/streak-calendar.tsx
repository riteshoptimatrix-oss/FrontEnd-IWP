"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StreakCalendarProps {
  streakCalendar: string[];
  currentStreak: number;
  longestStreak: number;
  todayPracticed: boolean;
  loading?: boolean;
}

export function StreakCalendar({ streakCalendar, currentStreak, longestStreak, todayPracticed, loading }: StreakCalendarProps) {
  if (loading) {
    return <div className="h-40 animate-pulse rounded-2xl bg-muted/30" />;
  }

  const calendarSet = new Set(streakCalendar);
  const today = new Date();

  const days: { date: string; practiced: boolean; isToday: boolean }[] = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    days.push({
      date: dateStr,
      practiced: calendarSet.has(dateStr),
      isToday: i === 0,
    });
  }

  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="rounded-2xl border border-border/40 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:bg-ink/80">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Streak Activity</h3>
          <p className="text-xs text-muted-foreground">Last 90 days</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="font-mono text-lg font-bold text-gold">{currentStreak}</div>
            <div className="text-[10px] text-muted-foreground">Current</div>
          </div>
          <div className="h-8 w-px bg-border/40" />
          <div className="text-center">
            <div className="font-mono text-lg font-bold text-amber-500">{longestStreak}</div>
            <div className="text-[10px] text-muted-foreground">Longest</div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="inline-flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={cn(
                    "size-3 rounded-[2px] transition-colors",
                    day.isToday && "ring-1 ring-gold/50",
                    day.practiced ? "bg-gold" : "bg-muted/30",
                  )}
                  title={`${day.date}${day.practiced ? " - practiced" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
        <span>Less</span>
        <div className="size-2.5 rounded-[2px] bg-muted/30" />
        <div className="size-2.5 rounded-[2px] bg-gold/30" />
        <div className="size-2.5 rounded-[2px] bg-gold/60" />
        <div className="size-2.5 rounded-[2px] bg-gold" />
        <span>More</span>
      </div>
    </div>
  );
}
