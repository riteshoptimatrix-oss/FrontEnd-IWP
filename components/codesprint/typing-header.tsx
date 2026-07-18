"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { allLanguages, getCategories } from "@/lib/codesprint/snippets";
import type { DifficultyLevel, TimerDuration } from "@/lib/codesprint/types";

interface TypingHeaderProps {
  language: string;
  difficulty: DifficultyLevel;
  category: string;
  duration: TimerDuration;
  timerDisplay: string;
  isRunning: boolean;
  onLanguageChange: (lang: string) => void;
  onDifficultyChange: (diff: DifficultyLevel) => void;
  onCategoryChange: (cat: string) => void;
  onDurationChange: (dur: TimerDuration) => void;
  onRestart: () => void;
  onFullscreen: () => void;
}

const difficulties: { id: DifficultyLevel; label: string; color: string; activeColor: string }[] = [
  { id: "easy", label: "Easy", color: "text-emerald-400", activeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  { id: "medium", label: "Medium", color: "text-amber-400", activeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  { id: "hard", label: "Hard", color: "text-red-400", activeColor: "bg-red-500/15 text-red-400 border-red-500/30" },
];

const durations: { id: TimerDuration; label: string }[] = [
  { id: 60, label: "1m" },
  { id: 180, label: "3m" },
  { id: 300, label: "5m" },
  { id: null, label: "\u221E" },
];

export function TypingHeader({
  language,
  difficulty,
  category,
  duration,
  timerDisplay,
  isRunning,
  onLanguageChange,
  onDifficultyChange,
  onCategoryChange,
  onDurationChange,
  onRestart,
  onFullscreen,
}: TypingHeaderProps) {
  const categories = getCategories(language);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 backdrop-blur-xl">
      {/* Language selector */}
      <div className="relative">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="appearance-none rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 pr-8 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
        >
          {allLanguages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600">
          ▼
        </span>
      </div>

      {/* Category selector */}
      <div className="relative">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 pr-8 text-sm text-zinc-400 transition-colors hover:border-zinc-700 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600">
          ▼
        </span>
      </div>

      {/* Divider */}
      <div className="h-5 w-px bg-zinc-800" />

      {/* Difficulty pills */}
      <div className="flex gap-1 rounded-lg bg-zinc-950/50 p-0.5">
        {difficulties.map((diff) => (
          <button
            key={diff.id}
            onClick={() => onDifficultyChange(diff.id)}
            className={cn(
              "rounded-md border px-3 py-1 text-xs font-medium transition-all",
              difficulty === diff.id
                ? diff.activeColor + " shadow-sm"
                : "border-transparent text-zinc-600 hover:text-zinc-400",
            )}
          >
            {diff.label}
          </button>
        ))}
      </div>

      {/* Duration pills */}
      <div className="flex gap-1 rounded-lg bg-zinc-950/50 p-0.5">
        {durations.map((dur) => (
          <button
            key={dur.label}
            onClick={() => onDurationChange(dur.id)}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs font-medium transition-all",
              duration === dur.id
                ? "border-gold/30 bg-gold/10 text-gold shadow-sm"
                : "border-transparent text-zinc-600 hover:text-zinc-400",
            )}
          >
            {dur.label}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Timer display */}
      <div className={cn(
        "font-mono text-lg font-bold tabular-nums tracking-wider",
        isRunning ? "text-gold" : "text-zinc-600",
      )}>
        {timerDisplay}
      </div>

      {/* Divider */}
      <div className="h-5 w-px bg-zinc-800" />

      {/* Controls */}
      <button
        onClick={onRestart}
        className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-300"
        title="Restart (Ctrl+Enter)"
      >
        ↻ Restart
      </button>
      <button
        onClick={onFullscreen}
        className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-300"
        title="Fullscreen"
      >
        ⛶
      </button>
    </div>
  );
}
