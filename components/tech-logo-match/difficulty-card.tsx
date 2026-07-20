"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DifficultyLevel } from "@/lib/tech-logo-match-data";

export function DifficultyCard({ level, index }: { level: DifficultyLevel; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/20 hover:shadow-md">
        <div className="relative">
          <div className="flex items-center justify-between">
            <span className={cn(
              "rounded-lg px-3 py-1 text-xs font-semibold",
              level.bgColor,
            )}>
              {level.label}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">{level.questions} questions</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {level.description}
          </p>
          <div className="mt-4 h-1.5 rounded-full bg-secondary/70">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                backgroundColor: level.color,
                width: level.id === "easy" ? "25%" : level.id === "medium" ? "50%" : level.id === "hard" ? "75%" : "100%",
              }}
            />
          </div>
        </div>
      </div>
    </m.div>
  );
}
