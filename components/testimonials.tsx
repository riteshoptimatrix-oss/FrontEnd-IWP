"use client";

import * as React from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Section } from "@/components/section";
import { SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/motion/reveal";
import type { Testimonial } from "@/lib/data";

export interface TestimonialsProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items: Testimonial[];
  variant?: "default" | "alt" | "gradient" | "ink";
}

export function Testimonials({
  id,
  eyebrow,
  title,
  description,
  items,
  variant,
}: TestimonialsProps) {
  const [current, setCurrent] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const next = React.useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = React.useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  React.useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const item = items[current];

  return (
    <Section id={id} variant={variant}>
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="mx-auto mt-14 max-w-4xl">
        <Reveal type="fade-up">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elevated">
            {/* Decorative gradient */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gold/[0.04] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-cyan-300/[0.04] blur-3xl" />

            <div className="relative px-8 py-10 sm:px-12 sm:py-14">
              <Quote className="mb-6 size-8 text-gold/30" aria-hidden />

              <div className="relative min-h-[180px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <m.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Stars */}
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-gold text-gold" aria-hidden />
                      ))}
                    </div>

                    <blockquote className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>

                    <div className="mt-8 flex items-center gap-4">
                      <span
                        className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-white text-sm font-semibold shadow-md"
                        aria-hidden
                      >
                        {item.initials}
                      </span>
                      <div className="leading-tight">
                        <p className="text-base font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.role}, {item.company}
                        </p>
                      </div>
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex gap-2">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => {
                        setDirection(i > current ? 1 : -1);
                        setCurrent(i);
                      }}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        i === current
                          ? "w-8 bg-gold"
                          : "w-2 bg-border hover:bg-gold/40",
                      )}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={prev}
                    className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground transition-all duration-200 hover:border-gold/20 hover:text-gold hover:shadow-sm"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={next}
                    className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-card text-muted-foreground transition-all duration-200 hover:border-gold/20 hover:text-gold hover:shadow-sm"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Stacked cards preview below on desktop */}
      <div className="mt-10 hidden gap-4 lg:flex">
        {items.map((t, i) => (
          <m.div
            key={t.name}
            whileHover={{ y: -2 }}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={cn(
              "flex-1 cursor-pointer rounded-2xl border bg-card p-5 transition-all duration-300",
              i === current
                ? "border-gold/20 shadow-card-hover"
                : "border-border/60 hover:border-gold/15 hover:shadow-card",
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-white text-xs font-semibold shadow-sm"
                aria-hidden
              >
                {t.initials}
              </span>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
                <p className="truncate text-xs text-muted-foreground">{t.company}</p>
              </div>
            </div>
          </m.div>
        ))}
      </div>
    </Section>
  );
}
