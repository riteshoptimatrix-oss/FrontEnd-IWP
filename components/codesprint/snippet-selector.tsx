"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { allLanguages, getSnippets, getRandomSnippet } from "@/lib/codesprint/snippets";
import type { DifficultyLevel, TimerDuration, Snippet, PlayConfig } from "@/lib/codesprint/types";

interface SnippetSelectorProps {
  config: PlayConfig;
  onSelect: (snippet: Snippet, config: PlayConfig) => void;
}

export function SnippetSelector({ config, onSelect }: SnippetSelectorProps) {
  const [selectedLang, setSelectedLang] = React.useState(config.language);
  const [selectedCategory, setSelectedCategory] = React.useState(config.category);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<DifficultyLevel>(config.difficulty);

  const currentLang = allLanguages.find((l) => l.id === selectedLang);
  const categories = currentLang?.categories || [];
  const snippets = getSnippets(selectedLang, selectedCategory, selectedDifficulty);

  const handleRandom = () => {
    const snippet = getRandomSnippet(selectedLang, selectedCategory, selectedDifficulty);
    if (snippet) {
      onSelect(snippet, {
        language: selectedLang,
        category: selectedCategory,
        difficulty: selectedDifficulty,
        duration: config.duration,
      });
    }
  };

  const handleSnippetSelect = (snippet: Snippet) => {
    onSelect(snippet, {
      language: selectedLang,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      duration: config.duration,
    });
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200/80 bg-white/60 p-6 shadow-lg backdrop-blur-xl"
    >
      {/* Language tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-5">
        {allLanguages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => {
              setSelectedLang(lang.id);
              setSelectedCategory(lang.categories[0]?.name || "");
            }}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300",
              selectedLang === lang.id
                ? "text-white shadow-sm scale-105"
                : "bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-slate-100 ring-1 ring-slate-200",
            )}
            style={selectedLang === lang.id ? { backgroundColor: lang.color } : {}}
          >
            {lang.name}
          </button>
        ))}
      </div>

      {/* Category tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={cn(
              "rounded-xl border px-4 py-1.5 text-xs font-semibold transition-all duration-300",
              selectedCategory === cat.name
                ? "border-blue-300 bg-blue-50 text-blue-600 shadow-sm"
                : "border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-900 hover:bg-white hover:border-slate-300",
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Difficulty + Random */}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <div className="flex gap-1.5 rounded-xl bg-slate-50/50 p-1 border border-slate-200">
          {(["easy", "medium", "hard"] as DifficultyLevel[]).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={cn(
                "rounded-lg border px-4 py-1.5 text-xs font-semibold capitalize transition-all duration-300",
                selectedDifficulty === diff
                  ? diff === "easy"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm"
                    : diff === "medium"
                      ? "border-amber-200 bg-amber-50 text-amber-600 shadow-sm"
                      : "border-red-200 bg-red-50 text-red-600 shadow-sm"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-white",
              )}
            >
              {diff}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        <button
          onClick={handleRandom}
          className="rounded-xl border border-gold/40 bg-gold/5 px-5 py-2 text-sm font-bold text-yellow-600 transition-all duration-300 hover:bg-gold/10 hover:shadow-md hover:-translate-y-0.5"
        >
          🎲 Play Random
        </button>
      </div>

      {/* Snippet list */}
      <div className="mt-6 max-h-[400px] space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {snippets.length === 0 ? (
          <div className="py-12 text-center text-sm font-medium text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
            No snippets available for this combination.
          </div>
        ) : (
          snippets.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => handleSnippetSelect(snippet)}
              className="group w-full rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-300 hover:border-gold/50 hover:bg-slate-50 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-yellow-600 transition-colors">{snippet.title}</div>
                  <div className="mt-2 font-mono text-xs text-slate-500 line-clamp-1 group-hover:text-slate-600">
                    {snippet.content.split("\n")[0]}
                  </div>
                </div>
                <span className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold text-yellow-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
                  Start Mission →
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </m.div>
  );
}
