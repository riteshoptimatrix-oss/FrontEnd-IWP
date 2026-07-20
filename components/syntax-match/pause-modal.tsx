"use client";

import { m, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/button";

export interface PauseModalProps {
  visible: boolean;
  onResume: () => void;
  onRestart: () => void;
  onExit: () => void;
}

export function PauseModal({ visible, onResume, onRestart, onExit }: PauseModalProps) {
  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="pause"
          className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <m.div
            className="flex flex-col items-center gap-6 px-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <h3 className="text-2xl font-bold tracking-tight">Game Paused</h3>
            <p className="text-sm text-muted-foreground">
              Take a break. Your progress is saved.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={onResume} variant="gold" size="lg">
                <Play className="size-4" />
                Resume
              </Button>
              <Button onClick={onRestart} variant="outline" size="lg">
                <RotateCcw className="size-4" />
                Restart
              </Button>
              <Button onClick={onExit} variant="outline" size="lg">
                <ArrowLeft className="size-4" />
                Exit
              </Button>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
