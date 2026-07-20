"use client";

import { motion } from "framer-motion";

export function GameTimer({
  remaining,
  total,
}: {
  remaining: number;
  total: number;
}) {
  const pct = total > 0 ? (remaining / total) * 100 : 0;
  const urgent = remaining <= 5;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <motion.div
          animate={urgent ? { scale: [1, 1.15, 1] } : {}}
          transition={{ repeat: urgent ? Infinity : 0, duration: 0.6 }}
          className={`text-lg font-bold tabular-nums ${urgent ? "text-red-500" : remaining <= 10 ? "text-amber-500" : "text-foreground"}`}
        >
          {remaining}s
        </motion.div>
      </div>
      <div className="relative h-2 w-20 overflow-hidden rounded-full bg-border/40">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-y-0 left-0 rounded-full transition-colors ${
            urgent ? "bg-red-500" : remaining <= 10 ? "bg-amber-500" : "bg-gold"
          }`}
        />
      </div>
    </div>
  );
}
