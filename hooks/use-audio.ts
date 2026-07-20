"use client";

import { useCallback, useState } from "react";

export function useAudio() {
  const [enabled, setEnabled] = useState(true);

  const playFlip = useCallback(() => {
    if (!enabled) return;
  }, [enabled]);

  const playMatch = useCallback(() => {
    if (!enabled) return;
  }, [enabled]);

  const playWrong = useCallback(() => {
    if (!enabled) return;
  }, [enabled]);

  const playVictory = useCallback(() => {
    if (!enabled) return;
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((e) => !e);
  }, []);

  return { enabled, toggle, playFlip, playMatch, playWrong, playVictory };
}
