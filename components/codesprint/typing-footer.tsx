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
    <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white/60 p-5 shadow-lg ring-1 ring-black/5 backdrop-blur-xl transition-all">
      {/* Progress bar */}
      <div className="relative h-2 overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold/50 via-gold to-yellow-300 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(234,179,8,0.5)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <StatItem label="WPM" value={wpm} color="text-gold text-xl drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
          <div className="h-8 w-px bg-slate-200" />
          <StatItem label="Accuracy" value={`${accuracy}%`} color="text-emerald-600 text-xl drop-shadow-sm" />
          <div className="h-8 w-px bg-slate-200" />
          <StatItem label="Correct" value={correctChars} color="text-emerald-600/80" />
          <StatItem
            label="Errors"
            value={incorrectChars}
            color={incorrectChars > 0 ? "text-red-600 font-bold" : "text-slate-500"}
          />
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <StatItem label="Typed" value={currentIndex} />
            <StatItem label="Left" value={remaining} />
          </div>
          <span className="flex items-center justify-center rounded-xl bg-slate-50 px-4 py-1.5 font-mono text-sm font-bold text-slate-700 ring-1 ring-slate-200 shadow-sm">
            {Math.round(progress * 100)}%
          </span>
        </div>
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
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">{label}</span>
      <span className={cn("font-mono text-base font-bold tabular-nums transition-colors duration-300", color || "text-slate-700")}>
        {value}
      </span>
    </div>
  );
}
