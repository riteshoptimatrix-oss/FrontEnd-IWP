"use client";

import { motion } from "framer-motion";

export function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
        <span>Progress</span>
        <span className="tabular-nums">
          {Math.min(current, total)} / {total}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-border/40">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-gold/80 to-gold"
        />
      </div>
    </div>
  );
}
