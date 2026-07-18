"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TypingFooterProps {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  currentIndex: number;
  progress: number;
}

export function TypingFooter({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  totalChars,
  currentIndex,
  progress,
}: TypingFooterProps) {
  const remaining = Math.max(0, totalChars - currentIndex);

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="h-1 overflow-hidden rounded-full bg-zinc-900/80 border border-zinc-800/50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold/80 via-gold to-gold-soft transition-all duration-300 ease-out shadow-[0_0_8px_rgba(200,170,80,0.3)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <StatItem label="WPM" value={wpm} color="text-gold" />
        <StatItem label="Accuracy" value={`${accuracy}%`} color="text-emerald-400" />
        <div className="h-4 w-px bg-zinc-800" />
        <StatItem label="Correct" value={correctChars} color="text-emerald-400/70" />
        <StatItem
          label="Errors"
          value={incorrectChars}
          color={incorrectChars > 0 ? "text-red-400" : "text-zinc-600"}
        />
        <div className="h-4 w-px bg-zinc-800" />
        <StatItem label="Typed" value={currentIndex} />
        <StatItem label="Left" value={remaining} />
        <div className="flex-1" />
        <span className="text-[11px] font-medium text-zinc-600 tabular-nums">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] text-zinc-600">{label}</span>
      <span className={cn("font-mono text-sm font-semibold tabular-nums", color || "text-zinc-400")}>
        {value}
      </span>
    </div>
  );
}
