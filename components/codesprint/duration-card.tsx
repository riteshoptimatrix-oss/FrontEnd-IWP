"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Duration } from "@/lib/codesprint-data";

interface DurationCardProps {
  duration: Duration;
  selected?: boolean;
  onSelect?: (id: string) => void;
  index?: number;
}

export function DurationCard({ duration, selected = false, onSelect, index = 0 }: DurationCardProps) {
  return (
    <m.button
      type="button"
      onClick={() => onSelect?.(duration.id)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative flex flex-col items-center overflow-hidden rounded-2xl border p-6 text-center transition-all duration-300",
        selected
          ? "border-gold/30 bg-white shadow-lg ring-2 ring-gold/20 dark:bg-ink/80"
          : "border-border/60 bg-white/80 hover:border-gold/20 hover:shadow-card-hover dark:bg-ink/80",
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

      {/* Timer icon */}
      <div className={cn(
        "flex size-12 items-center justify-center rounded-xl transition-all duration-300",
        selected
          ? "bg-gold/15 text-gold"
          : "bg-muted/50 text-muted-foreground group-hover:bg-gold/10 group-hover:text-gold",
      )}>
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      </div>

      <div className={cn(
        "mt-3 text-2xl font-bold transition-colors",
        selected ? "text-gold" : "text-foreground",
      )}>
        {duration.label}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{duration.description}</div>
    </m.button>
  );
}
