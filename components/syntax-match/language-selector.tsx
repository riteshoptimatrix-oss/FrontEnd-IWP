"use client";

import { m } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { syntaxQuestions } from "@/lib/syntax-match-questions";
import { Button } from "@/components/button";

export interface LanguageSelectorProps {
  onSelect: (language: string) => void;
  onBack: () => void;
}

export function LanguageSelector({ onSelect, onBack }: LanguageSelectorProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 py-12">
      <m.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Step 1
        </span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Choose a Language
        </h2>
        <p className="mt-3 text-muted-foreground">
          Pick the programming language you want to practice.
        </p>
      </m.div>

      <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {syntaxQuestions.map((lang, i) => (
          <m.button
            key={lang.id}
            onClick={() => onSelect(lang.id)}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, oklch(0.546 0.245 262 / 0.03), transparent)`,
              }}
            />
            <h3 className="relative text-lg font-semibold tracking-tight">
              {lang.name}
            </h3>
            <p className="relative mt-1 text-sm text-muted-foreground">
              {lang.pairs.length} syntax pairs
            </p>
            <div className="relative mt-3 flex flex-wrap gap-1.5">
              {lang.pairs.slice(0, 4).map((pair) => (
                <span
                  key={pair.term}
                  className="rounded-md bg-gold/8 px-2 py-0.5 font-mono text-[10px] text-gold"
                >
                  {pair.term}
                </span>
              ))}
              {lang.pairs.length > 4 && (
                <span className="rounded-md bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
                  +{lang.pairs.length - 4}
                </span>
              )}
            </div>
          </m.button>
        ))}
      </div>

      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="size-4" />
          Back to OptiMatrix
        </Button>
      </m.div>
    </div>
  );
}
