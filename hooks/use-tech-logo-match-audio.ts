"use client";

import { useCallback, useRef } from "react";

type SoundEffect = "correct" | "wrong" | "victory" | "click" | "tick" | "streak" | "countdown";

export function useTechLogoMatchAudio() {
  const enabled = useRef(false);

  const play = useCallback((_effect: SoundEffect) => {
    if (!enabled.current) return;
  }, []);

  const enable = useCallback(() => {
    enabled.current = true;
  }, []);

  const disable = useCallback(() => {
    enabled.current = false;
  }, []);

  return { play, enable, disable, enabled: enabled.current };
}
