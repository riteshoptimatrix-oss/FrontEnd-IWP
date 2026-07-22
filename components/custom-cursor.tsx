"use client";

import * as React from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

import { useMousePosition } from "@/hooks/use-mouse-position";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const mouse = useMousePosition();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });
  const springScale = useSpring(cursorScale, { stiffness: 300, damping: 20 });

  React.useEffect(() => {
    cursorX.set(mouse.x);
    cursorY.set(mouse.y);
  }, [mouse.x, mouse.y, cursorX, cursorY]);

  const [isPointer, setIsPointer] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.matches(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
      ) || target.closest('a, button, [role="button"]');
      setIsPointer(!!isClickable);
    };

    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseenter", () => setIsVisible(true));
    window.addEventListener("mouseleave", () => setIsVisible(false));

    setIsVisible(true);

    return () => {
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseenter", () => setIsVisible(true));
      window.removeEventListener("mouseleave", () => setIsVisible(false));
    };
  }, []);

  React.useEffect(() => {
    cursorScale.set(isPointer ? 1.5 : 1);
  }, [isPointer, cursorScale]);

  if (typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <m.div
        className="pointer-events-none fixed z-[9999] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          scale: springScale,
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden
      />
      <m.div
        className="pointer-events-none fixed z-[9998] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/40"
        style={{
          x: springX,
          y: springY,
          scale: springScale,
          opacity: isVisible ? 0.6 : 0,
        }}
        aria-hidden
      />
    </>
  );
}
