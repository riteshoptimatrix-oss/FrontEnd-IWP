"use client";

import * as React from "react";

/**
 * Returns true once the window has scrolled past `threshold` pixels.
 * Drives the navbar's transparent -> solid transition.
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
