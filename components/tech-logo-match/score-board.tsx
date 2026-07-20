"use client";

import { motion, AnimatePresence } from "framer-motion";

export function ScoreBoard({
  score,
  correct,
  wrong,
  streak,
  total,
}: {
  score: number;
  correct: number;
  wrong: number;
  streak: number;
  total: number;
}) {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground">Score</span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={score}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-w-[3ch] font-bold tabular-nums text-gold"
          >
            {score}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="size-1 rounded-full bg-border/40" />

      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-emerald-500" />
        <span className="tabular-nums text-muted-foreground">{correct}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-red-500" />
        <span className="tabular-nums text-muted-foreground">{wrong}</span>
      </div>

      <div className="size-1 rounded-full bg-border/40" />

      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground">Acc</span>
        <span className="tablular-nums font-medium">{accuracy}%</span>
      </div>

      {streak >= 2 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          key={streak}
          className="flex items-center gap-1 rounded-full bg-gradient-to-r from-gold/20 to-gold/10 px-2.5 py-0.5 text-xs font-bold text-gold"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          {streak}
        </motion.div>
      )}
    </div>
  );
}
