"use client";

import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { gameModes, type Category, type DifficultyLevel, type GameMode } from "@/lib/tech-logo-match-data";

export function GameModeSelector({
  category,
  difficulty,
  onStart,
  onBack,
}: {
  category: Category;
  difficulty: DifficultyLevel;
  onStart: (cat: Category, diff: DifficultyLevel, mode: GameMode) => void;
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
        Back to difficulty
      </motion.button>

      <div className="mb-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-gold"
        >
          Step 3 of 3
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-2 text-3xl font-bold sm:text-4xl"
        >
          Choose Game Mode
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="mt-2 text-muted-foreground"
        >
          {category.label} &middot; {difficulty.label}
        </motion.p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {gameModes.map((mode, i) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart(category, difficulty, mode)}
            className={`group relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b ${mode.color} p-5 text-left transition-all hover:border-gold/40 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2`}
          >
            <span className="text-2xl">{mode.icon}</span>
            <h3 className="mt-2 text-base font-semibold">{mode.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {mode.description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-md border border-border/30 bg-background/60 px-2 py-0.5">
                {difficulty.questions} questions
              </span>
              <span className="rounded-md border border-border/30 bg-background/60 px-2 py-0.5">
                {difficulty.timePerQuestion}s
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-0.5 translate-y-full bg-gradient-to-r from-gold/40 to-gold/80 transition-transform duration-300 group-hover:translate-y-0" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
