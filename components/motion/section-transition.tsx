"use client";

import * as React from "react";
import { m, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  revealVariants,
  viewportOnce,
  sectionVariants,
  type RevealType,
} from "@/lib/animations";

interface SectionTransitionProps extends React.ComponentPropsWithoutRef<"div"> {
  delay?: number;
  variant?: RevealType;
}

const variantSequence: RevealType[] = [
  "fade-up",
  "scale-in",
  "blur-in",
  "zoom-in",
  "fade-left",
  "fade-right",
  "clip-path",
  "rotate-in",
];

let variantIndex = 0;

function getNextVariant(): RevealType {
  const v = variantSequence[variantIndex % variantSequence.length];
  variantIndex++;
  return v;
}

export function SectionTransition({
  children,
  delay = 0,
  variant,
  className,
  ...props
}: SectionTransitionProps) {
  const reduce = useReducedMotion();
  const [v] = React.useState(() => variant || getNextVariant());

  if (reduce) {
    return <div className={cn(className)} {...props}>{children}</div>;
  }

  return (
    <m.div
      className={cn(className)}
      variants={revealVariants[v]}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay, ...((revealVariants[v].visible as { transition?: object })?.transition || {}) }}
      {...(props as any)}
    >
      {children}
    </m.div>
  );
}
