"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface CodePreviewProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodePreview({ code, language = "javascript", filename, className }: CodePreviewProps) {
  const lines = code.split("\n");

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "overflow-hidden rounded-xl border border-border/60 bg-[#1e1e1e] shadow-xl dark:border-border/30",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#2d2d2d] px-4 py-2">
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>

        {/* Filename tab */}
        {filename && (
          <div className="ml-2 flex items-center gap-2 rounded-t-md bg-[#1e1e1e] px-3 py-1 text-xs text-gray-400">
            <span className="size-2 rounded-sm bg-[#3b82f6]" />
            {filename}
          </div>
        )}

        {/* Language badge */}
        <div className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-gray-400 uppercase">
          {language}
        </div>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <pre>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {/* Line number */}
              <span className="mr-4 inline-block w-8 select-none text-right text-gray-500/60">
                {i + 1}
              </span>
              {/* Code content */}
              <span className="text-gray-300">{colorizeCode(line, language)}</span>
            </div>
          ))}
        </pre>
      </div>
    </m.div>
  );
}

function colorizeCode(line: string, language: string): React.ReactNode {
  if (!line.trim()) return "\n";

  const patterns: Array<[RegExp, string]> = [
    // Comments
    [/^(\s*\/\/.*)$/, "text-gray-500 italic"],
    [/^(\s*\/\*.*\*\/)$/, "text-gray-500 italic"],
    // Keywords
    [/\b(const|let|var|function|return|if|else|for|while|import|from|export|default|async|await|try|catch|throw|new|class|extends|interface|type|enum|implements|public|private|protected|readonly|static|abstract|get|set|this|super|typeof|instanceof)\b/g, "text-[#c678dd]"],
    // Strings
    [/(".*?"|'.*?'|`.*?`)/g, "text-[#98c379]"],
    // Numbers
    [/\b(\d+\.?\d*)\b/g, "text-[#d19a66]"],
    // Types
    [/\b(string|number|boolean|void|null|undefined|any|never|unknown|Promise|Array|Record|Partial|Required|Omit|Pick)\b/g, "text-[#e5c07b]"],
    // Functions
    [/(\w+)(\s*\()/g, "text-[#61afef]"],
    // Properties
    [/\.(\w+)/g, "text-[#e06c75]"],
    // Operators
    [/(=>|===|!==|&&|\|\||\.\.\.)/g, "text-[#56b6c2]"],
  ];

  let result = line;
  const classNames: string[] = ["text-gray-300"];

  for (const [pattern, className] of patterns) {
    if (pattern.test(line)) {
      classNames.push(className);
    }
  }

  return (
    <span className={classNames.join(" ")}>
      {line}
    </span>
  );
}
