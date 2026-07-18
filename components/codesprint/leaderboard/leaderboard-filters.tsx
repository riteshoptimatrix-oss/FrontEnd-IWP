"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LeaderboardFiltersProps {
  period: string;
  metric: string;
  language: string | null;
  onPeriodChange: (v: string) => void;
  onMetricChange: (v: string) => void;
  onLanguageChange: (v: string | null) => void;
}

const periods = [
  { value: "all_time", label: "All Time" },
  { value: "month", label: "This Month" },
  { value: "week", label: "This Week" },
  { value: "today", label: "Today" },
];

const metrics = [
  { value: "xp", label: "Total XP" },
  { value: "wpm", label: "Best WPM" },
  { value: "accuracy", label: "Avg Accuracy" },
  { value: "streak", label: "Current Streak" },
  { value: "tests", label: "Total Tests" },
];

const languages = [
  { value: null, label: "All Languages" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "dart", label: "Dart" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue" },
];

export function LeaderboardFilters({ period, metric, language, onPeriodChange, onMetricChange, onLanguageChange }: LeaderboardFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={period}
        onChange={(e) => onPeriodChange(e.target.value)}
        className="rounded-xl border border-border/40 bg-white/80 px-3 py-2 text-sm backdrop-blur-sm dark:bg-ink/80"
      >
        {periods.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
      </select>
      <select
        value={metric}
        onChange={(e) => onMetricChange(e.target.value)}
        className="rounded-xl border border-border/40 bg-white/80 px-3 py-2 text-sm backdrop-blur-sm dark:bg-ink/80"
      >
        {metrics.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
      </select>
      <select
        value={language ?? ""}
        onChange={(e) => onLanguageChange(e.target.value || null)}
        className="rounded-xl border border-border/40 bg-white/80 px-3 py-2 text-sm backdrop-blur-sm dark:bg-ink/80"
      >
        {languages.map((l) => <option key={l.value ?? ""} value={l.value ?? ""}>{l.label}</option>)}
      </select>
    </div>
  );
}
