"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns true only after the component has mounted on the client.
 * Implemented via useSyncExternalStore (no setState-in-effect) so it is
 * hydration-safe and lint-clean.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
