"use client";

import * as React from "react";
import { m, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { viewportOnce, EASE, staggerFast } from "@/lib/animations";

function CharacterReveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  ...props
}: {
  children: string;
  delay?: number;
  className?: string;
  as?: any;
}) {
  const reduce = useReducedMotion();
  const chars = children.split("");

  if (reduce) {
    const El = Tag as any;
    return <El className={className} {...props}>{children}</El>;
  }

  const MotionTag = m[Tag as keyof typeof m] as any;

  return (
    <MotionTag
      className={cn("inline", className)}
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...props}
    >
      {chars.map((char, i) => (
        <m.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -10 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { duration: 0.4, ease: EASE, delay: delay + i * 0.02 },
            },
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </m.span>
      ))}
    </MotionTag>
  );
}

function WordReveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  ...props
}: {
  children: string;
  delay?: number;
  className?: string;
  as?: any;
}) {
  const reduce = useReducedMotion();
  const words = children.split(" ");

  if (reduce) {
    const El = Tag as any;
    return <El className={className} {...props}>{children}</El>;
  }

  const MotionTag = m[Tag as keyof typeof m] as any;

  return (
    <MotionTag
      className={cn("inline", className)}
      variants={staggerFast}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...props}
    >
      {words.map((word, i) => (
        <m.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.5, ease: EASE, delay: delay + i * 0.05 },
            },
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </m.span>
      ))}
    </MotionTag>
  );
}

export const TextReveal = {
  Char: CharacterReveal,
  Word: WordReveal,
};
