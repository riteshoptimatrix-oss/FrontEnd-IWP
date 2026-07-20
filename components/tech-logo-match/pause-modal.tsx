"use client";

import { motion } from "framer-motion";

export function PauseModal({
  onResume,
  onRestart,
  onQuit,
}: {
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        className="w-full max-w-sm overflow-hidden rounded-2xl border border-border/40 bg-background p-8 text-center shadow-2xl"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-gold/10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gold">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        </div>

        <h2 className="mt-4 text-2xl font-bold">Game Paused</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Take a break. Your progress is safe.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={onResume}
            className="rounded-xl bg-gradient-to-r from-gold to-gold/80 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Resume
          </button>
          <button
            onClick={onRestart}
            className="rounded-xl border border-border/40 bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Restart
          </button>
          <button
            onClick={onQuit}
            className="rounded-xl px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          >
            Quit Game
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
