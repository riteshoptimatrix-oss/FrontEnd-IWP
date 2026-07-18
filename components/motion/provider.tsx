"use client";

import * as React from "react";
import { LazyMotion, domMax } from "framer-motion";

/**
 * Loads only the subset of Framer Motion features we use (animations,
 * gestures, layout) instead of the full `motion` runtime. Combined with
 * the `m` component everywhere, this meaningfully shrinks the client bundle.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
