"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TypingSessionRecord } from "@/lib/codesprint/api";

interface HistoryTableProps {
  sessions: TypingSessionRecord[];
  loading?: boolean;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-emerald-500/10 text-emerald-600",
  medium: "bg-amber-500/10 text-amber-600",
  hard: "bg-red-500/10 text-red-600",
};

const langColors: Record<string, string> = {
  html: "bg-orange-500/10 text-orange-600",
  css: "bg-blue-500/10 text-blue-600",
  javascript: "bg-yellow-400/10 text-yellow-700",
  react: "bg-cyan-400/10 text-cyan-600",
  nextjs: "bg-gray-500/10 text-gray-600",
  typescript: "bg-blue-600/10 text-blue-700",
  dart: "bg-blue-500/10 text-blue-600",
  angular: "bg-red-500/10 text-red-600",
  vue: "bg-green-400/10 text-green-700",
};

export function HistoryTable({ sessions, loading }: HistoryTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-xl bg-muted/30" />
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-border/40 bg-white/60 p-12 text-center backdrop-blur-sm dark:bg-ink/60">
        <div className="text-4xl">📝</div>
        <h3 className="mt-4 text-lg font-semibold">No Sessions Yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Complete your first typing challenge to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/40 bg-white/80 shadow-lg backdrop-blur-sm dark:bg-ink/80">
      {/* Header */}
      <div className="border-b border-border/40 bg-gradient-to-r from-gold/5 to-transparent px-6 py-4">
        <h3 className="text-lg font-semibold">Recent Sessions</h3>
        <p className="text-sm text-muted-foreground">Your latest typing attempts</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/40 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-3">Language</th>
              <th className="px-6 py-3">Difficulty</th>
              <th className="px-6 py-3">WPM</th>
              <th className="px-6 py-3">Accuracy</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {sessions.map((session, i) => {
              const date = new Date(session.created_at);
              const timeDisplay = formatDuration(session.completion_time);
              return (
                <m.tr
                  key={session.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="transition-colors hover:bg-muted/20"
                >
                  <td className="px-6 py-3">
                    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", langColors[session.language] || "bg-muted/40 text-muted-foreground")}>
                      {session.language}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", difficultyColors[session.difficulty] || "bg-muted/40 text-muted-foreground")}>
                      {session.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="font-mono text-sm font-semibold text-gold">{session.wpm}</span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={cn("font-mono text-sm font-semibold", session.accuracy >= 95 ? "text-emerald-500" : session.accuracy >= 80 ? "text-amber-500" : "text-red-500")}>
                      {session.accuracy}%
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-sm text-muted-foreground">{timeDisplay}</span>
                  </td>
                  <td className="px-6 py-3">
                    {session.finished ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-500">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        Complete
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-500">
                        <span className="size-1.5 rounded-full bg-amber-500" />
                        Partial
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-sm text-muted-foreground">{formatDate(date)}</span>
                  </td>
                </m.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
