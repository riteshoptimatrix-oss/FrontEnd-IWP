"use client";

import { m } from "framer-motion";
import { ArrowLeft, LayoutGrid, Timer } from "lucide-react";
import { DIFFICULTIES, type Difficulty } from "@/hooks/use-syntax-match-game";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

export interface DifficultySelectorProps {
  language: string;
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const difficultyStyles: Record<string, { color: string; bg: string; ring: string }> = {
  easy: { color: "text-emerald-600", bg: "bg-emerald-50", ring: "ring-emerald-200" },
  medium: { color: "text-amber-600", bg: "bg-amber-50", ring: "ring-amber-200" },
  hard: { color: "text-red-600", bg: "bg-red-50", ring: "ring-red-200" },
};

export function DifficultySelector({ language, onSelect, onBack }: DifficultySelectorProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-4 py-12">
      <m.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Step 2
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Choose Difficulty
        </h2>
        <p className="mt-3 text-muted-foreground">
          <span className="font-medium text-foreground">{language}</span> &middot; Select your challenge level
        </p>
      </m.div>

      <div className="grid w-full gap-4 sm:grid-cols-3">
        {DIFFICULTIES.map((diff, i) => {
          const styles = difficultyStyles[diff.id];
          return (
            <m.button
              key={diff.id}
              onClick={() => onSelect(diff)}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  styles.bg,
                )}
              />

              <div className="relative">
                <div
                  className={cn(
                    "flex size-12 items-center justify-center rounded-xl text-lg font-bold ring-1",
                    styles.bg,
                    styles.color,
                    styles.ring,
                  )}
                >
                  {diff.label[0]}
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-tight">{diff.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {diff.pairs} pairs &middot; {diff.pairs * 2} cards
                </p>

                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <LayoutGrid className="size-3.5" />
                    <span>{diff.pairs} pairs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Timer className="size-3.5" />
                    <span>{diff.previewTime}s preview</span>
                  </div>
                </div>
              </div>
            </m.button>
          );
        })}
      </div>

      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="size-4" />
          Back to Languages
        </Button>
      </m.div>
    </div>
  );
}
