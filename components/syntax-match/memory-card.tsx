"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CardData } from "@/hooks/use-syntax-match-game";

export interface MemoryCardProps {
  card: CardData;
  onClick: (id: string) => void;
  disabled: boolean;
  index: number;
}

const variants = {
  hidden: { rotateY: 0 },
  revealed: { rotateY: 180 },
};

const matchedPulse = {
  scale: [1, 1.04, 1],
  boxShadow: [
    "0 0 0 0 oklch(0.546 0.245 262 / 0)",
    "0 0 0 8px oklch(0.546 0.245 262 / 0.15)",
    "0 0 0 0 oklch(0.546 0.245 262 / 0)",
  ],
};

export function MemoryCard({ card, onClick, disabled, index }: MemoryCardProps) {
  const isRevealed =
    card.state === "preview" ||
    card.state === "selected" ||
    card.state === "matched";

  const isMatched = card.state === "matched";
  const isIncorrect = card.state === "incorrect";
  const clickable = card.state === "hidden" && !disabled;

  return (
    <m.button
      onClick={() => clickable && onClick(card.id)}
      disabled={!clickable}
      aria-label={
        isRevealed
          ? `Card: ${card.content}`
          : "Hidden card"
      }
      aria-pressed={isRevealed}
      className={cn(
        "group relative aspect-[3/4] w-full cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        !clickable && "cursor-default",
      )}
      style={{ perspective: "800px" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        ...(isMatched ? matchedPulse : {}),
      }}
      transition={{
        opacity: { duration: 0.4, delay: index * 0.03 },
        y: { duration: 0.4, delay: index * 0.03 },
        ...(isMatched ? { duration: 1.5, repeat: Infinity } : {}),
      }}
    >
      <m.div
        className="relative size-full"
        style={{ transformStyle: "preserve-3d" }}
        variants={variants}
        initial="hidden"
        animate={isRevealed ? "revealed" : "hidden"}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── Back face (visible when card is hidden) ── */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-xl border-2 border-gold/15 bg-gradient-to-br from-gold/5 to-gold/10 shadow-sm",
            "backface-hidden",
          )}
        >
          <span className="select-none text-2xl font-bold tracking-tight text-gold/30">
            IWP
          </span>
        </div>

        {/* ── Front face (visible when card is revealed) ── */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 p-2 shadow-sm",
            "backface-hidden",
            "[transform:rotateY(180deg)]",
            isMatched &&
              "border-gold/40 bg-gradient-to-br from-gold/[0.08] to-gold/[0.03] shadow-gold/20",
            isIncorrect && "border-red-300 bg-red-50/50",
            !isMatched &&
              !isIncorrect &&
              "border-border/70 bg-card",
          )}
        >
          <span
            className={cn(
              "select-none text-center text-xs font-semibold leading-tight sm:text-sm",
              card.type === "term" ? "text-foreground" : "text-muted-foreground",
              card.type === "definition" && "font-mono",
            )}
          >
            {card.content}
          </span>
          <span className="mt-1.5 select-none text-[10px] uppercase tracking-wider text-muted-foreground/40">
            {card.type === "term" ? "Concept" : "Syntax"}
          </span>
        </div>
      </m.div>

      {/* ── Incorrect shake ── */}
      {isIncorrect && (
        <m.div
          className="absolute inset-0 rounded-xl"
          aria-hidden
          animate={{ x: [0, -6, 6, -6, 6, 0] }}
          transition={{ duration: 0.35 }}
        />
      )}
    </m.button>
  );
}
