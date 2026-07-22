"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { processSteps } from "@/lib/data";

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-48 top-1/2 h-[500px] w-[500px] rounded-full bg-indigo-100/15 blur-3xl" />
      <Container>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            How we work
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            A calm, <span className="text-blue-600">proven process</span>
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Predictable delivery — you always know what's next.
          </p>
        </m.div>

        <div className="relative mt-16">
          <div aria-hidden className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-blue-200 via-blue-100 to-transparent sm:left-1/2 sm:-translate-x-px" />

          <div className="flex flex-col gap-12">
            {processSteps.map((step, i) => (
              <m.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative flex flex-col gap-4 sm:flex-row sm:items-center",
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse",
                )}
              >
                <div className={cn(
                  "flex-1",
                  i % 2 === 0 ? "sm:text-right sm:pr-12" : "sm:text-left sm:pl-12",
                )}>
                  <div className="inline-block rounded-2xl border border-blue-100/30 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-blue-100/20 sm:p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">Step {step.step}</span>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-blue-200 bg-white shadow-sm sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                  <span className="text-sm font-bold text-blue-600">{step.step}</span>
                </div>

                <div className="flex-1 sm:invisible" />
              </m.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
