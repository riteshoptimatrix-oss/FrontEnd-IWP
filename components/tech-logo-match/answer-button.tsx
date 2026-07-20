"use client";

import { motion } from "framer-motion";
import type { Technology } from "@/lib/tech-logo-match-data";

type ButtonState = "idle" | "selected-correct" | "selected-wrong" | "revealed";

export function AnswerButton({
  index,
  label,
  state,
  disabled,
  showLogo,
  tech,
  onClick,
}: {
  index: number;
  label: string;
  state: ButtonState;
  disabled: boolean;
  showLogo: boolean;
  tech?: Technology | null;
  onClick: () => void;
}) {
  const stateClasses: Record<ButtonState, string> = {
    idle:
      "border-border/40 bg-background/60 hover:border-gold/40 hover:bg-gold/[0.03] hover:shadow-md",
    "selected-correct":
      "border-emerald-400 bg-emerald-50 shadow-md",
    "selected-wrong":
      "border-red-400 bg-red-50 shadow-md",
    revealed:
      "border-emerald-400 bg-emerald-50/80 shadow-md",
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`group relative flex min-h-[60px] w-full items-center gap-4 rounded-xl border px-5 py-3 text-left text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${stateClasses[state]}`}
      aria-label={`Answer ${index + 1}: ${label}`}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/30 bg-background/60 text-xs font-bold text-muted-foreground">
        {String.fromCharCode(65 + index)}
      </span>

      {showLogo && tech ? (
        <span className="flex items-center gap-3">
          <span
            className="block size-8 shrink-0"
            style={{ color: tech.color }}
            dangerouslySetInnerHTML={{ __html: tech.svg }}
          />
          <span className="font-semibold">{tech.name}</span>
        </span>
      ) : (
        <span className="font-semibold">{label}</span>
      )}

      {state === "selected-correct" && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto text-emerald-500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.span>
      )}

      {state === "selected-wrong" && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto text-red-500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </motion.span>
      )}

      {state === "revealed" && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto text-emerald-500"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.span>
      )}
    </motion.button>
  );
}
