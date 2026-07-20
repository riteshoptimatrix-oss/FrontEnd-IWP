"use client";

import { m } from "framer-motion";
import type { SyntaxMatchDifficulty } from "@/lib/syntax-match-data";
import { cn } from "@/lib/utils";
import { Timer, LayoutGrid } from "lucide-react";

export interface DifficultyCardProps {
  difficulty: SyntaxMatchDifficulty;
  index: number;
}

export function DifficultyCard({ difficulty, index }: DifficultyCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    >
      <div className="group relative">
        <div
          className={cn(
            "absolute -inset-0.5 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100",
            difficulty.id === "easy" && "bg-emerald-400/10",
            difficulty.id === "medium" && "bg-yellow-400/10",
            difficulty.id === "hard" && "bg-red-400/10",
          )}
        />
        <div
          className={cn(
            "relative cursor-pointer overflow-hidden rounded-2xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-7",
            difficulty.borderColor,
          )}
        >
          <div className="flex items-center justify-between">
            <div
              className="flex size-12 items-center justify-center rounded-xl text-lg font-bold ring-1 ring-[color:var(--color-ring)]/20"
              style={{
                backgroundColor: difficulty.bgColor,
                color: difficulty.color,
              }}
            >
              {difficulty.label[0]}
            </div>
            <div
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: difficulty.bgColor,
                color: difficulty.color,
              }}
            >
              {difficulty.cards} cards
            </div>
          </div>

          <h4 className="mt-4 text-lg font-semibold tracking-tight">{difficulty.label}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {difficulty.description}
          </p>

          <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <LayoutGrid className="size-3.5" />
              <span>{difficulty.cards} cards · {difficulty.cards / 2} pairs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Timer className="size-3.5" />
              <span>{difficulty.previewTime}s preview</span>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}
