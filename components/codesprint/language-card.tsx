"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/codesprint-data";

interface LanguageCardProps {
  language: Language;
  selected?: boolean;
  onSelect?: (id: string) => void;
  index?: number;
}

export function LanguageCard({ language, selected = false, onSelect, index = 0 }: LanguageCardProps) {
  return (
    <m.button
      type="button"
      onClick={() => onSelect?.(language.id)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300",
        selected
          ? "border-gold/30 bg-white shadow-lg ring-2 ring-gold/20 dark:bg-ink/80"
          : "border-border/60 bg-white/80 shadow-sm hover:border-gold/20 hover:shadow-card-hover dark:bg-ink/80",
      )}
    >
      {/* Top accent line */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 transition-opacity duration-300",
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-70",
        )}
        style={{ background: language.color }}
      />

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

      <div className="flex items-start gap-4">
        {/* Language badge */}
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${language.color}15`,
            color: language.color,
          }}
        >
          {language.name.slice(0, 2).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold">{language.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{language.description}</p>
        </div>
      </div>

      {/* Code preview */}
      <div className="mt-4 overflow-hidden rounded-lg bg-ink/5 p-3 font-mono text-xs text-muted-foreground/60 dark:bg-white/5">
        <pre className="whitespace-pre-wrap leading-relaxed">{language.snippetPreview}</pre>
      </div>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ backgroundColor: language.color }}
      />
    </m.button>
  );
}
