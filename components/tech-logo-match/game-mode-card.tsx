"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import type { GameMode } from "@/lib/tech-logo-match-data";

export function GameModeCard({ mode, index }: { mode: GameMode; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/20 hover:shadow-md">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", mode.color)} />
        <div className="relative">
          <div className="flex size-14 items-center justify-center rounded-xl bg-secondary/50 text-2xl ring-1 ring-black/5">
            {mode.icon}
          </div>
          <h3 className="mt-4 text-base font-semibold">{mode.title}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {mode.description}
          </p>
        </div>
      </div>
    </m.div>
  );
}
