"use client";

import { useState, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, RotateCcw, Sparkles, Trophy, Loader2, CheckCircle2, Award,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { GameResult } from "@/hooks/use-syntax-match-game";
import { useAuthStore } from "@/lib/auth-store";
import { finishGame, type FinishGameResult } from "@/lib/syntax-match-api";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

export interface VictoryModalProps {
  visible: boolean;
  result: GameResult;
  language: string;
  onPlayAgain: () => void;
  onBackToHome: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VictoryModal({
  visible,
  result,
  language,
  onPlayAgain,
  onBackToHome,
}: VictoryModalProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveResult, setSaveResult] = useState<FinishGameResult | null>(null);

  const handleSave = useCallback(async () => {
    if (!user || saveState !== "idle") return;
    setSaveState("saving");
    try {
      const res = await finishGame({
        language: language.toLowerCase(),
        difficulty: result.difficulty,
        completion_time_seconds: result.elapsed,
        moves: result.moves,
        correct_matches: result.correct,
        wrong_matches: result.wrong,
        accuracy: result.accuracy,
        stars: result.stars,
        total_pairs: result.totalPairs,
      });
      setSaveResult(res);
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }, [user, language, result, saveState]);

  const handleViewDashboard = useCallback(() => {
    router.push("/optimatrix/syntax-match/dashboard");
  }, [router]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="victory"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <m.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-elevated sm:p-10"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="pointer-events-none absolute -inset-20 bg-gradient-radial-gold opacity-30" />

            <div className="relative text-center">
              <m.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
              >
                <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 ring-1 ring-gold/20">
                  <Trophy className="size-10 text-gold" />
                </div>
              </m.div>

              <m.div
                className="mt-4 flex items-center justify-center gap-2 text-4xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {[1, 2, 3].map((s) => (
                  <m.span
                    key={s}
                    className={cn(
                      "transition-colors",
                      s <= result.stars ? "text-gold" : "text-muted-foreground/20",
                    )}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + s * 0.12, type: "spring" }}
                  >
                    ★
                  </m.span>
                ))}
              </m.div>

              {result.perfect && (
                <m.div
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gold/15 to-gold/5 px-3.5 py-1 text-xs font-semibold text-gold ring-1 ring-gold/15"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Sparkles className="size-3.5" />
                  Perfect Match!
                </m.div>
              )}

              <m.div
                className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-secondary/50 p-4 sm:grid-cols-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-foreground">
                    {formatTime(result.elapsed)}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    Time
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-foreground">
                    {result.moves}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    Moves
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-foreground">
                    {result.accuracy}%
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    Accuracy
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums text-foreground">
                    {result.correct}/{result.totalPairs}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    Matches
                  </div>
                </div>
              </m.div>

              {/* ── Save status ── */}
              {user && saveState === "idle" && (
                <m.div
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button onClick={handleSave} variant="gold" size="md" className="w-full">
                    <Sparkles className="size-4" />
                    Save Progress
                  </Button>
                </m.div>
              )}

              {saveState === "saving" && (
                <m.div
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Loader2 className="size-4 animate-spin" />
                  Saving your progress...
                </m.div>
              )}

              {saveState === "saved" && saveResult && (
                <m.div
                  className="mt-4 space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* XP Awarded */}
                  <div className="rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 p-4 ring-1 ring-gold/15">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-5 text-gold" />
                        <span className="text-sm font-semibold">XP Earned</span>
                      </div>
                      <span className="text-lg font-bold text-gold">+{saveResult.xp_awarded}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Total XP: {saveResult.total_xp}</span>
                      <span>Level {saveResult.level}{saveResult.level_up ? " ↑" : ""}</span>
                    </div>
                    {saveResult.level_up && (
                      <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-medium text-gold">
                        <Sparkles className="size-3" /> Level Up!
                      </div>
                    )}
                  </div>

                  {/* New Achievements */}
                  {saveResult.new_achievements.length > 0 && (
                    <div className="space-y-2">
                      {saveResult.new_achievements.map((ach) => (
                        <div
                          key={ach.id}
                          className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3"
                        >
                          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-sm">
                            <Trophy className="size-4 text-emerald-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-xs font-semibold text-emerald-800">{ach.title}</div>
                            <div className="text-[10px] text-emerald-600">+{ach.xp_reward} XP</div>
                          </div>
                          <CheckCircle2 className="size-4 text-emerald-500" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* New Badges */}
                  {saveResult.new_badges.length > 0 && (
                    <div className="space-y-2">
                      {saveResult.new_badges.map((badge) => (
                        <div
                          key={badge.id}
                          className="flex items-center gap-3 rounded-xl bg-purple-50 p-3"
                        >
                          <div className="flex size-8 items-center justify-center rounded-lg bg-purple-100 text-lg">
                            <Award className="size-4 text-purple-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-xs font-semibold text-purple-800 capitalize">{badge.name}</div>
                            <div className="text-[10px] capitalize text-purple-600">{badge.tier} badge</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-2 text-xs text-muted-foreground">
                    <span>Games: {saveResult.total_games}</span>
                    <span>Streak: {saveResult.current_streak} days</span>
                  </div>

                  <Button onClick={handleViewDashboard} variant="ghost" size="sm" className="w-full">
                    View Dashboard
                  </Button>
                </m.div>
              )}

              {saveState === "error" && (
                <m.div
                  className="mt-4 flex flex-col items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-sm text-destructive">Failed to save. Try again.</p>
                  <Button onClick={handleSave} variant="outline" size="sm">
                    Retry
                  </Button>
                </m.div>
              )}

              {!user && (
                <m.p
                  className="mt-4 text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Sign in to save your progress and track statistics.
                </m.p>
              )}

              {/* ── Buttons ── */}
              <m.div
                className="mt-5 flex flex-col gap-3 sm:flex-row"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button onClick={onPlayAgain} variant="gold" size="lg" className="flex-1">
                  <RotateCcw className="size-4" />
                  Play Again
                </Button>
                <Button onClick={onBackToHome} variant="outline" size="lg" className="flex-1">
                  <ArrowLeft className="size-4" />
                  Back to Home
                </Button>
              </m.div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
