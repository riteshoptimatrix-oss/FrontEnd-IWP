"use client";

import * as React from "react";
import { m, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export interface ParallaxProps {
  children: React.ReactNode;
  /** Parallax distance in px (applied in both directions). @default 60 */
  distance?: number;
  className?: string;
}

/**
 * Scroll-linked parallax wrapper. Translates its children on the Y axis as
 * the element passes through the viewport. Respects reduced-motion via the
 * global stylesheet rule.
 */
export function Parallax({
  children,
  distance = 60,
  className,
}: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${distance}px`, `${distance}px`],
  );

  return (
    <m.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </m.div>
  );
}
