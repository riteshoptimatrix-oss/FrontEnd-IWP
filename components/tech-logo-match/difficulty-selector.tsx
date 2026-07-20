"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { difficultyLevels, type Category, type DifficultyLevel } from "@/lib/tech-logo-match-data";

export function DifficultySelector({
  category,
  onSelect,
  onBack,
}: {
  category: Category;
  onSelect: (difficulty: DifficultyLevel) => void;
  onBack: () => void;
}) {
  return (
    <div className="w-full max-w-3xl">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="mb-6 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Back to categories
      </motion.button>

      <div className="mb-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-gold"
        >
          Step 2 of 3
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-2 text-3xl font-bold sm:text-4xl"
        >
          Choose Difficulty
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="mt-2 text-muted-foreground"
        >
          {category.label} &middot; Pick your challenge level
        </motion.p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {difficultyLevels.map((diff, i) => (
          <motion.button
            key={diff.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(diff)}
            className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/60 p-5 text-left transition-all hover:border-gold/40 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ backgroundColor: diff.color + "20", color: diff.color }}
                >
                  {diff.label}
                </span>
                <p className="mt-2 text-sm text-muted-foreground">
                  {diff.description}
                </p>
              </div>
              <span
                className="shrink-0 text-2xl font-bold tabular-nums"
                style={{ color: diff.color }}
              >
                {diff.questions}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span>{diff.questions} questions</span>
              <span>{diff.timePerQuestion}s per question</span>
              <span>{diff.scoreMultiplier}x score</span>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border/30">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(diff.questions / 50) * 100}%`,
                  backgroundColor: diff.color,
                }}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-0.5 translate-y-full bg-gradient-to-r from-gold/40 to-gold/80 transition-transform duration-300 group-hover:translate-y-0" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
