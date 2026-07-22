"use client";

import React, { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useAIWorkspaceStore } from "@/store/ai-workspace-store";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useAIWorkspaceStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-zinc-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search AI Workspace tools, history, settings..."
          className="w-full h-9 pl-9 pr-14 bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-full text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:bg-white dark:focus:bg-zinc-900 transition-all duration-200"
        />

        {searchQuery ? (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 p-0.5 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Clear search</span>
          </button>
        ) : (
          <div className="absolute right-2.5 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-zinc-200/60 dark:bg-zinc-800 text-[10px] font-semibold text-zinc-500 pointer-events-none">
            <kbd className="font-sans">⌘</kbd>
            <kbd className="font-sans">K</kbd>
          </div>
        )}
      </div>
    </div>
  );
}
