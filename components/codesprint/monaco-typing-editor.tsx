"use client";

import * as React from "react";
import { m, AnimatePresence } from "framer-motion";
import Editor, { useMonaco } from "@monaco-editor/react";
import { cn } from "@/lib/utils";

interface MonacoTypingEditorProps {
  language: string;
  isStarted: boolean;
  isFinished: boolean;
  isPaused: boolean;
  onValueChange: (value: string) => void;
  className?: string;
  filename?: string;
}

export function MonacoTypingEditor({
  language,
  isStarted,
  isFinished,
  isPaused,
  onValueChange,
  className,
  filename = "solution.ts"
}: MonacoTypingEditorProps) {
  const monaco = useMonaco();
  const [editorValue, setEditorValue] = React.useState("");
  
  React.useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('enterprise-light', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'comment', fontStyle: 'italic', foreground: '94A3B8' },
          { token: 'keyword', foreground: '2563EB', fontStyle: 'bold' },
          { token: 'string', foreground: '059669' },
          { token: 'number', foreground: 'D97706' },
          { token: 'type', foreground: '7C3AED' },
          { token: 'function', foreground: 'DB2777' },
        ],
        colors: {
          'editor.background': '#ffffff',
          'editor.foreground': '#0f172a',
          'editorLineNumber.foreground': '#94a3b8',
          'editorLineNumber.activeForeground': '#2563eb',
          'editorCursor.foreground': '#2563eb',
          'editor.selectionBackground': '#bfdbfe80',
          'editor.inactiveSelectionBackground': '#e2e8f050',
          'editor.lineHighlightBackground': '#f1f5f980',
          'editorIndentGuide.background': '#f1f5f9',
          'editorIndentGuide.activeBackground': '#cbd5e1',
          'editorWidget.background': '#ffffff',
          'editorWidget.border': '#e2e8f0',
          'editorWidget.shadow': '#00000015',
        }
      });
      monaco.editor.setTheme('enterprise-light');
    }
  }, [monaco]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorValue(value);
      onValueChange(value);
    }
  };

  return (
    <div className={cn("relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl ring-1 ring-black/5", className)}>
      {/* Title bar (Mac Style) */}
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200 bg-slate-50/80 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]/90 ring-1 ring-inset ring-white/10 shadow-sm" />
          <span className="size-3 rounded-full bg-[#febc2e]/90 ring-1 ring-inset ring-white/10 shadow-sm" />
          <span className="size-3 rounded-full bg-[#28c840]/90 ring-1 ring-inset ring-white/10 shadow-sm" />
        </div>
        <div className="ml-3 flex items-center gap-2 text-xs">
          <span className="rounded-lg bg-white px-3 py-1 text-slate-700 font-medium shadow-sm ring-1 ring-inset ring-slate-200">
            {filename}
          </span>
          {isStarted && !isFinished && (
            <span className="ml-2 flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400 ring-2 ring-emerald-400/30" />
              editing
            </span>
          )}
          {isFinished && (
            <span className="ml-2 flex items-center gap-1.5 font-medium text-blue-400">
              <span className="size-1.5 rounded-full bg-blue-400 ring-2 ring-blue-400/30" />
              completed
            </span>
          )}
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="relative flex-1 min-h-0 w-full">
        <Editor
          height="100%"
          language={language === "javascript" ? "typescript" : language}
          value={editorValue}
          onChange={handleEditorChange}
          options={{
            readOnly: isFinished || isPaused,
            minimap: { enabled: true, scale: 0.75 },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', monospace",
            lineHeight: 1.6,
            padding: { top: 20, bottom: 20 },
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            formatOnPaste: true,
            formatOnType: true,
            autoIndent: "full",
            autoClosingBrackets: "always",
            autoClosingQuotes: "always",
            matchBrackets: "always",
            bracketPairColorization: { enabled: true, independentColorPoolPerBracketType: true },
            renderLineHighlight: "all",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            scrollbar: {
              vertical: 'visible',
              horizontal: 'hidden',
              verticalScrollbarSize: 10,
              useShadows: false,
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showClasses: true,
              showFunctions: true,
              showVariables: true,
            }
          }}
        />

        {/* Pause Overlay */}
        <AnimatePresence>
          {isPaused && (
            <m.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-white/60"
            >
              <div className="text-center bg-white p-8 rounded-3xl shadow-2xl ring-1 ring-black/5">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
                  <span className="text-3xl text-gold">⏸</span>
                </div>
                <p className="text-xl font-bold text-slate-900">Paused</p>
                <p className="mt-2 text-sm text-slate-500">Press Esc or click to resume</p>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Finished Overlay */}
        <AnimatePresence>
          {isFinished && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-md"
            >
              <m.div 
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                className="text-center bg-white p-10 rounded-3xl shadow-2xl ring-1 ring-gold/30"
              >
                <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-3xl bg-gold/10 ring-4 ring-gold/5">
                  <span className="text-4xl">🎉</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 text-gradient-gold">Challenge Complete!</p>
                <p className="mt-3 text-sm text-slate-500 max-w-[220px] mx-auto leading-relaxed">
                  Your code has been submitted successfully. Evaluating results...
                </p>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
