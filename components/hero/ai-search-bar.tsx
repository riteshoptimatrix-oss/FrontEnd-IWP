"use client";

import * as React from "react";
import { Search, Mic, Sparkles } from "lucide-react";
import { m } from "framer-motion";

import { cn } from "@/lib/utils";

const PLACEHOLDER_TEXTS = [
  "Describe your project...",
  "AI-powered web development...",
  "Enterprise digital solutions...",
  "Custom software engineering...",
];

export function AiSearchBar() {
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(true);
  const [charIndex, setCharIndex] = React.useState(0);
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    const currentText = PLACEHOLDER_TEXTS[placeholderIndex];
    if (isTyping) {
      if (charIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 40 + Math.random() * 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, 20);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_TEXTS.length);
          setIsTyping(true);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, isTyping, placeholderIndex]);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="relative flex items-center gap-2 rounded-2xl border border-blue-200/50 bg-white/80 px-5 py-3.5 shadow-[0_8px_32px_-8px_rgba(59,113,254,0.12)] backdrop-blur-xl transition-all duration-300 focus-within:border-blue-300/80 focus-within:shadow-[0_8px_32px_-8px_rgba(59,113,254,0.2)]">
        <Search className="size-5 shrink-0 text-blue-400" />
        <input
          type="text"
          placeholder={displayText}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
          aria-label="AI-powered search"
        />
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-px bg-blue-200/50" aria-hidden />
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg text-blue-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
            aria-label="Voice input"
          >
            <Mic className="size-4" />
          </button>
        </span>
      </div>
    </div>
  );
}
