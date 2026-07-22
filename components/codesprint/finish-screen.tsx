"use client";

import * as React from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trophy, Target, Zap, Clock, Hash, CheckCircle2, RotateCcw, LayoutGrid, BarChart3 } from "lucide-react";

interface FinishScreenProps {
  wpm: number;
  accuracy: number;
  cpm: number;
  charactersTyped: number;
  correctCharacters: number;
  incorrectCharacters: number;
  completionTime: number;
  completionPct: number;
  finished: boolean;
  language: string;
  difficulty: string;
  category: string;
  isNewBestWpm?: boolean;
  isNewBestAccuracy?: boolean;
  onPracticeAgain: () => void;
  onChooseAnother: () => void;
}

export function FinishScreen({
  wpm,
  accuracy,
  cpm,
  charactersTyped,
  correctCharacters,
  incorrectCharacters,
  completionTime,
  completionPct,
  finished,
  language,
  difficulty,
  category,
  isNewBestWpm,
  isNewBestAccuracy,
  onPracticeAgain,
  onChooseAnother,
}: FinishScreenProps) {
  const minutes = Math.floor(completionTime / 60);
  const seconds = Math.floor(completionTime % 60);
  const timeDisplay = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  const stats = [
    { icon: Zap, label: "WPM", value: wpm, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
    { icon: Target, label: "Accuracy", value: `${accuracy}%`, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
    { icon: Zap, label: "CPM", value: Math.round(cpm), color: "text-violet-600", bg: "bg-violet-50 border-violet-200" },
    { icon: Hash, label: "Characters", value: charactersTyped, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
    { icon: Clock, label: "Time", value: timeDisplay, color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-200" },
    { icon: CheckCircle2, label: "Completion", value: `${Math.round(completionPct)}%`, color: "text-rose-600", bg: "bg-rose-50 border-rose-200" },
  ];

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
        {/* Header */}
        <div className="relative overflow-hidden border-b border-slate-200 p-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent" />
          <div className="relative">
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200"
            >
              {finished ? (
                <Trophy className="size-8 text-blue-600" />
              ) : (
                <Clock className="size-8 text-blue-600" />
              )}
            </m.div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900">
              {finished ? "Challenge Complete!" : "Time's Up!"}
            </h2>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">{language}</span>
              <span className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 capitalize">{difficulty}</span>
              <span className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">{category}</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        {(isNewBestWpm || isNewBestAccuracy) && (
          <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 px-8 py-4">
            {isNewBestWpm && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                <Trophy className="size-3" />
                New Personal Best WPM!
              </span>
            )}
            {isNewBestAccuracy && (
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                <Target className="size-3" />
                New Best Accuracy!
              </span>
            )}
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 p-6 sm:grid-cols-6">
          {stats.map((stat, i) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-3 text-center",
                stat.bg,
              )}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-white/80">
                <stat.icon className={cn("size-4", stat.color)} />
              </div>
              <div className={cn("text-lg font-bold tabular-nums", stat.color)}>{stat.value}</div>
              <div className="text-[11px] text-slate-500">{stat.label}</div>
            </m.div>
          ))}
        </div>

        {/* Details */}
        <div className="border-t border-slate-200 px-6 py-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Correct characters</span>
            <span className="font-mono font-medium text-emerald-600">{correctCharacters}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Incorrect characters</span>
            <span className="font-mono font-medium text-red-500">{incorrectCharacters}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-slate-200 p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onPracticeAgain}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
            >
              <RotateCcw className="size-4" />
              Practice Again
            </button>
            <button
              onClick={onChooseAnother}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-slate-300 hover:text-slate-800"
            >
              <LayoutGrid className="size-4" />
              Choose Another
            </button>
            <Link
              href="/optimatrix/code-sprint/dashboard"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-slate-300 hover:text-slate-800"
            >
              <BarChart3 className="size-4" />
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </m.div>
  );
}
