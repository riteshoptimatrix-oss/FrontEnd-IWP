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
  { id: "easy", label: "Easy", color: "text-emerald-600", activeColor: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  { id: "medium", label: "Medium", color: "text-amber-600", activeColor: "bg-amber-50 text-amber-600 border-amber-200" },
  { id: "hard", label: "Hard", color: "text-red-600", activeColor: "bg-red-50 text-red-600 border-red-200" },
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
    <div className="sticky top-4 z-50 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/60 px-5 py-3 shadow-lg ring-1 ring-black/5 backdrop-blur-xl transition-all">
      {/* Language selector */}
      <div className="relative group">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 pr-9 text-sm font-medium text-slate-700 transition-all hover:bg-white hover:border-slate-300 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20"
        >
          {allLanguages.map((lang) => (
            <option key={lang.id} value={lang.id} className="bg-white text-slate-700">
              {lang.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 group-hover:text-gold transition-colors">
          ▼
        </span>
      </div>

      {/* Category selector */}
      <div className="relative group">
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 pr-9 text-sm font-medium text-slate-700 transition-all hover:bg-white hover:border-slate-300 focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20"
        >
          {categories.map((cat) => (
             <option key={cat} value={cat} className="bg-white text-slate-700">
              {cat}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 group-hover:text-gold transition-colors">
          ▼
        </span>
      </div>

      {/* Divider */}
      <div className="hidden sm:block h-6 w-px bg-slate-200" />

      {/* Difficulty pills */}
      <div className="flex gap-1.5 rounded-xl bg-slate-50/50 p-1 border border-slate-200">
        {difficulties.map((diff) => (
          <button
            key={diff.id}
            onClick={() => onDifficultyChange(diff.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-300",
              difficulty === diff.id
                ? diff.activeColor + " shadow-sm scale-105"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-white",
            )}
          >
            {diff.label}
          </button>
        ))}
      </div>

      {/* Duration pills */}
      <div className="flex gap-1.5 rounded-xl bg-slate-50/50 p-1 border border-slate-200">
        {durations.map((dur) => (
          <button
            key={dur.label}
            onClick={() => onDurationChange(dur.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-300",
              duration === dur.id
                ? "border-blue-300 bg-blue-50 text-blue-600 shadow-sm scale-105"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-white",
            )}
          >
            {dur.label}
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Timer display */}
      <div className="relative group flex items-center justify-center min-w-[100px]">
        {isRunning && (
          <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full transition-opacity opacity-100 animate-pulse" />
        )}
        <div className={cn(
          "relative font-mono text-2xl font-extrabold tabular-nums tracking-wider transition-all duration-300",
          isRunning ? "text-gold drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" : "text-slate-500",
        )}>
          {timerDisplay}
        </div>
      </div>

      {/* Divider */}
      <div className="hidden sm:block h-6 w-px bg-slate-200" />

      {/* Controls */}
      <button
        onClick={onRestart}
        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition-all hover:bg-white hover:text-slate-900 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
        title="Restart (Ctrl+Enter)"
      >
        ↻ Restart
      </button>
      <button
        onClick={onFullscreen}
        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 transition-all hover:bg-white hover:text-slate-900 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
        title="Fullscreen"
      >
        ⛶
      </button>
    </div>
  );
}
