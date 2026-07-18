"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ChallengeCalendarProps {
  activeDates: string[];
}

export function ChallengeCalendar({ activeDates }: ChallengeCalendarProps) {
  const dateSet = new Set(activeDates);
  const today = new Date();
  const days: { date: string; active: boolean; isToday: boolean }[] = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    days.push({ date: dateStr, active: dateSet.has(dateStr), isToday: i === 0 });
  }

  const weeks: typeof days[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="rounded-2xl border border-border/40 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:bg-ink/80">
      <h4 className="mb-2 text-xs font-medium text-muted-foreground">Challenge Days (Last 30)</h4>
      <div className="inline-flex gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                className={cn(
                  "size-3 rounded-[2px]",
                  day.isToday && "ring-1 ring-gold/50",
                  day.active ? "bg-gold" : "bg-muted/30",
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
