"use client";

import * as React from "react";
import { m } from "framer-motion";

function AnimatedChar({ char, index }: { char: string; index: number }) {
  return (
    <m.span
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.02,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="inline-block"
    >
      {char === " " ? "\u00A0" : char}
    </m.span>
  );
}

export function AnimatedHeadline() {
  const text = "India Web Programmers — engineering premium digital experiences";
  const chars = text.split("");

  return (
    <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem]">
      {chars.map((char, i) => (
        <AnimatedChar key={i} char={char} index={i} />
      ))}
    </h1>
  );
}
