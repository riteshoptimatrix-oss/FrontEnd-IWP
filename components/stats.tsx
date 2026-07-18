"use client";

import * as React from "react";
import { m, useInView } from "framer-motion";

import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/section-title";
import { RevealGroup, Reveal } from "@/components/motion/reveal";
import type { Stat } from "@/lib/data";

function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function AnimatedCounter({ value, label, hint, dark }: Stat & { dark: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const { num, suffix } = parseStatValue(value);
  const [displayed, setDisplayed] = React.useState(0);

  React.useEffect(() => {
    if (!inView || num === 0) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, num]);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center gap-3 text-center"
    >
      <div className={cn(
        "relative rounded-2xl border px-6 py-5 transition-all duration-500",
        dark
          ? "border-white/[0.06] bg-white/[0.04] hover:border-gold/20 hover:bg-gold/[0.06]"
          : "border-border/60 bg-card hover:border-gold/20 hover:shadow-card-hover",
      )}>
        <span className={cn(
          "text-4xl font-semibold tracking-tight sm:text-5xl",
          dark ? "text-white" : "text-foreground",
        )}>
          {inView ? displayed : 0}{suffix}
        </span>
        <span className={cn(
          "mt-1 block text-sm font-medium",
          dark ? "text-white/70" : "text-muted-foreground",
        )}>
          {label}
        </span>
        {hint ? (
          <span className={cn(
            "mt-0.5 block text-xs",
            dark ? "text-white/35" : "text-muted-foreground/60",
          )}>
            {hint}
          </span>
        ) : null}
        {/* Premium glow on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-gold/[0.04] to-transparent" />
      </div>
    </m.div>
  );
}

export interface StatsProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  stats: Stat[];
  tone?: "light" | "dark";
}

export function Stats({
  id,
  eyebrow,
  title,
  description,
  stats,
  tone = "dark",
}: StatsProps) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        dark
          ? "bg-gradient-to-b from-ink to-black text-white"
          : "bg-secondary text-foreground",
      )}
    >
      <Container>
        {(eyebrow || title || description) && (
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className={dark ? "[&_*]:text-white" : undefined}
          />
        )}
        <div className={cn(
          "mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5",
          !dark && "mt-10",
        )}>
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} dark={dark} />
          ))}
        </div>
      </Container>
    </section>
  );
}
