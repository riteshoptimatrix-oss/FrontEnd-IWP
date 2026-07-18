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
      className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-xl"
    >
      {/* Language tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-zinc-800/60 pb-4">
        {allLanguages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => {
              setSelectedLang(lang.id);
              setSelectedCategory(lang.categories[0]?.name || "");
            }}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
              selectedLang === lang.id
                ? "text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/50",
            )}
            style={selectedLang === lang.id ? { backgroundColor: lang.color } : {}}
          >
            {lang.name}
          </button>
        ))}
      </div>

      {/* Category tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={cn(
              "rounded-lg border px-3 py-1 text-xs font-medium transition-all",
              selectedCategory === cat.name
                ? "border-gold/30 bg-gold/10 text-gold"
                : "border-zinc-800 bg-zinc-900/50 text-zinc-600 hover:text-zinc-400 hover:border-zinc-700",
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Difficulty + Random */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex gap-1 rounded-lg bg-zinc-950/50 p-0.5">
          {(["easy", "medium", "hard"] as DifficultyLevel[]).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={cn(
                "rounded-md border px-3 py-1 text-xs font-medium capitalize transition-all",
                selectedDifficulty === diff
                  ? diff === "easy"
                    ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                    : diff === "medium"
                      ? "border-amber-500/30 bg-amber-500/15 text-amber-400"
                      : "border-red-500/30 bg-red-500/15 text-red-400"
                  : "border-zinc-800 text-zinc-600",
              )}
            >
              {diff}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        <button
          onClick={handleRandom}
          className="rounded-lg border border-gold/20 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold transition-colors hover:bg-gold/20 hover:border-gold/30"
        >
          🎲 Random
        </button>
      </div>

      {/* Snippet list */}
      <div className="mt-4 max-h-[300px] space-y-2 overflow-auto">
        {snippets.length === 0 ? (
          <div className="py-8 text-center text-sm text-zinc-600">
            No snippets available for this combination.
          </div>
        ) : (
          snippets.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => handleSnippetSelect(snippet)}
              className="group w-full rounded-xl border border-zinc-800/60 bg-zinc-950/50 p-4 text-left transition-all hover:border-zinc-700 hover:bg-zinc-800/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-300">{snippet.title}</div>
                  <div className="mt-1 font-mono text-xs text-zinc-600 line-clamp-1">
                    {snippet.content.split("\n")[0]}
                  </div>
                </div>
                <span className="rounded-md border border-gold/20 bg-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  Start →
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </m.div>
  );
}
