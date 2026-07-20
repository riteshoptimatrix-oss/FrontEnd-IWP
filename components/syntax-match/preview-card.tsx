"use client";

import { m } from "framer-motion";
import type { SyntaxMatchPreviewPair } from "@/lib/syntax-match-data";
import { cn } from "@/lib/utils";

export interface PreviewCardProps {
  pair: SyntaxMatchPreviewPair;
  index: number;
}

export function PreviewCard({ pair, index }: PreviewCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
    >
      <div className="group relative">
        <div
          className={cn(
            "absolute -inset-0.5 rounded-xl opacity-0 blur transition-opacity duration-400 group-hover:opacity-100",
          )}
          style={{ background: `linear-gradient(135deg, ${pair.color}10, transparent)` }}
        />
        <div className="relative flex items-center gap-3 rounded-xl border border-border/60 bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/15 hover:shadow-card sm:p-4">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
            style={{
              backgroundColor: `${pair.color}0d`,
              color: pair.color,
              boxShadow: `inset 0 0 0 1px ${pair.color}15`,
            }}
          >
            {pair.language.slice(0, 2)}
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <span className="truncate text-sm font-medium">{pair.term}</span>
            <span className="shrink-0 text-xs text-muted-foreground/40">↔</span>
            <span
              className="shrink-0 rounded-md px-2 py-0.5 font-mono text-xs font-semibold"
              style={{
                backgroundColor: `${pair.color}0d`,
                color: pair.color,
              }}
            >
              {pair.match}
            </span>
          </div>
        </div>
      </div>
    </m.div>
  );
}
