"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2, Flame, Zap, Star as LucideStar, Trophy, Sparkles } from "lucide-react";
import type { GameResult } from "@/hooks/use-tech-logo-match-game";
import type { SaveStatus } from "./game-board";
import type { FinishGameResult } from "@/lib/tech-logo-match-api";
import { cn } from "@/lib/utils";

function Star({ filled, delay }: { filled: boolean; delay: number }) {
  return (
    <motion.svg
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: filled ? 1 : 0.3, rotate: 0 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill={filled ? "#fbbf24" : "none"}
      stroke={filled ? "#f59e0b" : "#d1d5db"}
      strokeWidth="1.5"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </motion.svg>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/20 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export function ResultModal({
  result,
  saveStatus,
  saveResult,
  saveError,
  onPlayAgain,
  onNewCategory,
  onHome,
}: {
  result: GameResult;
  saveStatus: SaveStatus;
  saveResult: FinishGameResult | null;
  saveError: string | null;
  onPlayAgain: () => void;
  onNewCategory: () => void;
  onHome: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/40 bg-background shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.03] to-transparent" />

        <div className="relative px-8 pb-8 pt-10 text-center">
          {result.perfect && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mb-2"
            >
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                Perfect Round!
              </span>
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold"
          >
            {result.stars === 3
              ? "Excellent!"
              : result.stars === 2
                ? "Very Good!"
                : "Completed!"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-1 text-sm text-muted-foreground"
          >
            {result.mode.title} &middot; {result.difficulty.label}
          </motion.p>

          <div className="mt-4 flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <Star key={i} filled={i <= result.stars} delay={0.4 + i * 0.15} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 grid grid-cols-2 gap-x-6 gap-y-1 rounded-xl bg-accent/30 p-4 text-left"
          >
            <StatRow label="Final Score" value={result.score.toLocaleString()} />
            <StatRow label="Accuracy" value={`${result.accuracy}%`} />
            <StatRow label="Correct" value={`${result.correct}/${result.total}`} />
            <StatRow label="Wrong" value={String(result.wrong)} />
            <StatRow label="Best Streak" value={`${result.bestStreak}x`} />
            <StatRow label="Avg Time" value={`${result.avgTime}s`} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4"
          >
            {saveStatus === "saving" && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Saving your game...
              </div>
            )}
            {saveStatus === "saved" && saveResult && (
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <CheckCircle className="size-4" />
                  Saved
                </span>
                <span className="text-muted-foreground">
                  Game #{saveResult.total_games}
                </span>
                {saveResult.current_streak >= 2 && (
                  <span className="inline-flex items-center gap-1 text-gold">
                    <Flame className="size-4" />
                    {saveResult.current_streak} day streak
                  </span>
                )}
              </div>
            )}
            {saveStatus === "error" && (
              <div className="flex items-center justify-center gap-2 text-sm text-red-500">
                <XCircle className="size-4" />
                {saveError || "Failed to save"}
              </div>
            )}

            {saveStatus === "saved" && saveResult && (saveResult.xp_awarded > 0 || saveResult.level_up || saveResult.new_achievements.length > 0 || saveResult.new_badges.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.3 }}
                className="mt-3 rounded-xl border border-gold/20 bg-gold/[0.02] p-3 text-left"
              >
                {saveResult.xp_awarded > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="size-4 text-gold" />
                    <span className="font-semibold text-gold">+{saveResult.xp_awarded} XP</span>
                    {saveResult.level_up && (
                      <span className="inline-flex items-center gap-1 text-emerald-600">
                        <Sparkles className="size-3.5" /> Level Up! (Level {saveResult.level})
                      </span>
                    )}
                  </div>
                )}
                {saveResult.new_achievements.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Achievements Unlocked</p>
                    {saveResult.new_achievements.map((a) => (
                      <div key={a.id} className="flex items-center gap-2 text-xs">
                        <LucideStar className="size-3.5 text-gold" />
                            <span className="font-medium">{a.icon} {a.title}</span>
                        <span className="ml-auto text-gold">+{a.xp_reward} XP</span>
                      </div>
                    ))}
                  </div>
                )}
                {saveResult.new_badges.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Badges Unlocked</p>
                    {saveResult.new_badges.map((b) => (
                      <div key={b.id} className="flex items-center gap-2 text-xs">
                        <Trophy className="size-3.5 text-gold" />
                        <span className="font-medium">{b.icon} {b.name}</span>
                        <span className="ml-auto text-[10px] uppercase text-muted-foreground">{b.tier}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={onPlayAgain}
              className="rounded-xl bg-gradient-to-r from-gold to-gold/80 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Play Again
            </button>
            <button
              onClick={onNewCategory}
              className="rounded-xl border border-border/40 bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              New Category
            </button>
            <button
              onClick={onHome}
              className="rounded-xl border border-border/40 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Back Home
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
