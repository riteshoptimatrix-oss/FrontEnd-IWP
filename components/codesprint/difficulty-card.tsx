"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/codesprint-data";

interface DifficultyCardProps {
  difficulty: Difficulty;
  selected?: boolean;
  onSelect?: (id: string) => void;
  index?: number;
}

const difficultyFeatures = {
  easy: ["Short, simple snippets", "Common syntax patterns", "Great for beginners"],
  medium: ["Real-world code blocks", "Moderate complexity", "Intermediate developers"],
  hard: ["Production-grade code", "Advanced patterns & idioms", "Expert challenge"],
};

const difficultyIcons = {
  easy: "🟢",
  medium: "🟡",
  hard: "🔴",
};

export function DifficultyCard({ difficulty, selected = false, onSelect, index = 0 }: DifficultyCardProps) {
  return (
    <m.button
      type="button"
      onClick={() => onSelect?.(difficulty.id)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all duration-300",
        selected
          ? `${difficulty.borderColor} bg-white shadow-lg dark:bg-ink/80`
          : "border-border/60 bg-white/80 hover:shadow-card-hover dark:bg-ink/80",
      )}
    >
      {/* Selection indicator */}
      {selected && (
        <div className="absolute right-3 top-3">
          <span className="flex size-5 items-center justify-center rounded-full bg-gold text-white">
            <svg className="size-3" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{difficultyIcons[difficulty.id]}</span>
        <div className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold ${difficulty.bgColor} ${difficulty.color}`}>
          {difficulty.label}
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold">{difficulty.label} Level</h3>
      <p className="mt-2 text-sm text-muted-foreground">{difficulty.description}</p>

      {/* Features list */}
      <ul className="mt-4 space-y-2">
        {difficultyFeatures[difficulty.id].map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-1 rounded-full bg-current opacity-40" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Bottom accent */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-1 transition-opacity duration-300",
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-50",
        )}
        style={{
          background: difficulty.id === "easy" ? "#10B981" : difficulty.id === "medium" ? "#F59E0B" : "#EF4444",
        }}
      />
    </m.button>
  );
}
