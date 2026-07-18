"use client";

import * as React from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CharState } from "@/lib/codesprint/types";

interface TypingEditorProps {
  lines: string[];
  charStates: CharState[];
  currentIndex: number;
  lineStartIndices: number[];
  isStarted: boolean;
  isFinished: boolean;
  isPaused: boolean;
  onKey: (key: string) => boolean;
  className?: string;
}

export function TypingEditor({
  lines,
  charStates,
  currentIndex,
  lineStartIndices,
  isStarted,
  isFinished,
  isPaused,
  onKey,
  className,
}: TypingEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const currentLine = getCurrentLine(currentIndex, lineStartIndices);

  const focusEditor = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    focusEditor();
    const handleClick = () => focusEditor();
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [focusEditor]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (isFinished || isPaused) {
        e.preventDefault();
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        onKey("Tab");
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        onKey("Enter");
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        onKey("Backspace");
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        onKey(e.key);
      }
    },
    [onKey, isFinished, isPaused],
  );

  const scrollToLine = useCallback(
    (line: number) => {
      const editor = editorRef.current;
      if (!editor) return;
      const lineEl = editor.querySelector(`[data-line="${line}"]`);
      if (lineEl) {
        const editorRect = editor.getBoundingClientRect();
        const lineRect = lineEl.getBoundingClientRect();
        const offset = lineRect.top - editorRect.top;
        const editorHeight = editor.clientHeight;
        if (offset > editorHeight * 0.6 || offset < 0) {
          editor.scrollTo({
            top: editor.scrollTop + offset - editorHeight * 0.3,
            behavior: "smooth",
          });
        }
      }
    },
    [],
  );

  useEffect(() => {
    scrollToLine(currentLine);
  }, [currentLine, scrollToLine]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-zinc-800/80 bg-[#0d0d12] font-mono text-sm shadow-2xl shadow-black/40",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-zinc-800/60 bg-[#111118] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="ml-3 flex items-center gap-2 text-xs">
          <span className="rounded-md bg-zinc-800/80 px-2.5 py-0.5 text-zinc-500 font-medium">code-sprint.ts</span>
          {isStarted && !isFinished && (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              typing
            </span>
          )}
          {isFinished && (
            <span className="flex items-center gap-1.5 text-gold">
              <span className="size-1.5 rounded-full bg-gold" />
              completed
            </span>
          )}
        </div>
      </div>

      {/* Editor area */}
      <div
        ref={editorRef}
        className="relative max-h-[500px] overflow-auto p-0"
        onClick={focusEditor}
      >
        {/* Hidden textarea */}
        <textarea
          ref={textareaRef}
          className="absolute inset-0 z-10 size-full cursor-default opacity-0"
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {/* Code display */}
        <div className="p-4 leading-[1.8]">
          {lines.map((line, lineIdx) => {
            const lineStart = lineStartIndices[lineIdx] ?? 0;
            const isCurrentLine = lineIdx === currentLine;

            return (
              <div
                key={lineIdx}
                data-line={lineIdx}
                className={cn(
                  "flex transition-all duration-200",
                  isCurrentLine && !isFinished && "bg-gold/[0.04] border-l-2 border-gold/40 -ml-[2px] pl-[2px]",
                )}
              >
                {/* Line number */}
                <span
                  className={cn(
                    "mr-6 inline-block w-8 select-none text-right text-zinc-700 transition-colors",
                    isCurrentLine && !isFinished && "text-zinc-500",
                  )}
                >
                  {lineIdx + 1}
                </span>

                {/* Code characters */}
                <span className="flex-1 whitespace-pre">
                  {renderLineChars(line, lineStart, charStates, currentIndex, isFinished)}
                  {isCurrentLine && !isFinished && line.length === 0 && (
                    <Cursor />
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Pause overlay */}
        <AnimatePresence>
          {isPaused && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-md"
            >
              <div className="text-center">
                <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-2xl bg-zinc-800/80 border border-zinc-700/50">
                  <span className="text-3xl">⏸</span>
                </div>
                <p className="text-lg font-semibold text-zinc-200">Paused</p>
                <p className="mt-1 text-sm text-zinc-500">Press any key to resume</p>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Finished overlay */}
        <AnimatePresence>
          {isFinished && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-md"
            >
              <div className="text-center">
                <div className="mx-auto mb-3 flex size-16 items-center justify-center rounded-2xl bg-gold/10 border border-gold/20">
                  <span className="text-3xl">🎉</span>
                </div>
                <p className="text-lg font-semibold text-zinc-200">Completed!</p>
                <p className="mt-1 text-sm text-zinc-500">Press restart to try again</p>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function renderLineChars(
  line: string,
  lineStart: number,
  charStates: CharState[],
  currentIndex: number,
  isFinished: boolean,
): React.ReactNode {
  if (line.length === 0) return <Cursor />;

  const chars: React.ReactNode[] = [];
  for (let i = 0; i < line.length; i++) {
    const globalIdx = lineStart + i;
    const state = charStates[globalIdx] || "pending";
    const char = line[i];

    if (globalIdx === currentIndex && !isFinished) {
      chars.push(
        <span key={i} className="relative inline-block">
          <span className="relative z-10">{char}</span>
          <Cursor />
        </span>,
      );
    } else if (state === "correct") {
      chars.push(
        <span key={i} className="text-emerald-400/90">{char}</span>,
      );
    } else if (state === "incorrect") {
      chars.push(
        <span key={i} className="bg-red-500/20 text-red-400 rounded-[1px]">{char}</span>,
      );
    } else {
      chars.push(
        <span key={i} className="text-zinc-500">{char}</span>,
      );
    }
  }

  return chars;
}

function Cursor() {
  return (
    <span className="inline-block w-[2px] -translate-y-[1px] animate-pulse bg-gold" style={{ height: "1.2em" }} />
  );
}

function getCurrentLine(index: number, lineStartIndices: number[]): number {
  for (let i = lineStartIndices.length - 1; i >= 0; i--) {
    if (index >= lineStartIndices[i]) return i;
  }
  return 0;
}

const useRef = React.useRef;
const useCallback = React.useCallback;
const useEffect = React.useEffect;
