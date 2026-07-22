"use client";

import * as React from "react";
import { m, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import { Container } from "@/components/container";
import { homeTestimonials } from "@/lib/data";

export function TestimonialsSection() {
  const [current, setCurrent] = React.useState(0);
  const len = homeTestimonials.length;

  const next = React.useCallback(() => setCurrent((c) => (c + 1) % len), [len]);
  const prev = React.useCallback(() => setCurrent((c) => (c - 1 + len) % len), [len]);

  React.useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const testimonial = homeTestimonials[current];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-48 top-1/2 h-[500px] w-[500px] rounded-full bg-blue-100/15 blur-3xl" />
      <Container>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            Kind words
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            What <span className="text-blue-600">clients say</span>
          </h2>
        </m.div>

        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <m.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="rounded-2xl border border-blue-100/30 bg-white/50 p-8 shadow-sm backdrop-blur-sm sm:p-10">
                <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-lg font-bold text-blue-600 shadow-sm">
                  {testimonial.initials}
                </div>
                <blockquote className="text-lg leading-relaxed text-foreground/80 sm:text-xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </m.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex size-10 items-center justify-center rounded-xl border border-blue-200/30 bg-white/60 text-blue-600 backdrop-blur-sm transition-all hover:border-blue-300/50 hover:bg-white/80"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex gap-2">
              {homeTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-blue-500" : "w-2 bg-blue-200"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex size-10 items-center justify-center rounded-xl border border-blue-200/30 bg-white/60 text-blue-600 backdrop-blur-sm transition-all hover:border-blue-300/50 hover:bg-white/80"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
