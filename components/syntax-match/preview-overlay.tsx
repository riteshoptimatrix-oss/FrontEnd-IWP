"use client";

import { m, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

export interface PreviewOverlayProps {
  visible: boolean;
  countdown: number;
}

export function PreviewOverlay({ visible, countdown }: PreviewOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="preview-overlay"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-2xl bg-background/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <m.div
            className="flex flex-col items-center gap-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex size-16 items-center justify-center rounded-2xl bg-gold/10 ring-1 ring-gold/20">
              <Eye className="size-7 text-gold" />
            </div>

            <h3 className="text-xl font-semibold tracking-tight">Memorize the Cards</h3>
            <p className="text-sm text-muted-foreground">
              Cards will flip automatically after the countdown
            </p>

            <m.div
              key={countdown}
              className="mt-2 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-3xl font-bold text-white shadow-premium"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {countdown}
            </m.div>

            <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground/50">
              Seconds remaining
            </p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
