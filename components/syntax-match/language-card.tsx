"use client";

import { m } from "framer-motion";
import type { SyntaxMatchLanguage } from "@/lib/syntax-match-data";
import { cn } from "@/lib/utils";

export interface LanguageCardProps {
  language: SyntaxMatchLanguage;
  index: number;
}

export function LanguageCard({ language, index }: LanguageCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
    >
      <div className="group relative">
        <div
          className="absolute -inset-0.5 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(135deg, ${language.color}15, transparent)` }}
        />
        <div
          className={cn(
            "relative cursor-pointer overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-6",
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-xl text-xl"
              style={{
                backgroundColor: language.bgColor,
                boxShadow: `inset 0 0 0 1px ${language.color}20`,
              }}
            >
              {language.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-base font-semibold tracking-tight">{language.name}</h4>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {language.description}
              </p>
              <div
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs font-medium"
                style={{
                  backgroundColor: `${language.color}0d`,
                  color: language.color,
                }}
              >
                <span className="text-[10px] opacity-60">↔</span>
                {language.matchExample}
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}
