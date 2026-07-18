"use client";

import * as React from "react";
import { m } from "framer-motion";

import { cn } from "@/lib/utils";
import { Section } from "@/components/section";
import { SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";

export interface LogoCloudProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  names: string[];
  variant?: "default" | "alt" | "gradient" | "ink";
}

function LogoRow({ names, reverse = false }: { names: string[]; reverse?: boolean }) {
  const [isPaused, setIsPaused] = React.useState(false);
  const duplicated = [...names, ...names, ...names];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <m.div
        className="flex gap-4"
        animate={isPaused ? {} : { x: reverse ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }}
        transition={{
          x: { duration: 40, ease: "linear", repeat: Infinity },
        }}
      >
        {duplicated.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex h-16 min-w-[160px] shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-card px-6 text-lg font-semibold tracking-tight text-muted-foreground/40 transition-all duration-300 hover:border-gold/20 hover:text-gold hover:shadow-card hover:-translate-y-0.5"
          >
            {name}
          </div>
        ))}
      </m.div>
    </div>
  );
}

export function LogoCloud({
  id,
  eyebrow,
  title,
  description,
  names,
  variant,
}: LogoCloudProps) {
  const half = Math.ceil(names.length / 2);
  const row1 = names.slice(0, half);
  const row2 = names.slice(half);

  return (
    <Section id={id} variant={variant}>
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="mt-14 space-y-4">
        <LogoRow names={row1} />
        <LogoRow names={row2} reverse />
      </div>
    </Section>
  );
}
