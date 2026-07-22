"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Container } from "@/components/container";
import { homeTechItems } from "@/lib/data";

export function TechnologiesSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-48 top-0 h-[500px] w-[500px] rounded-full bg-blue-100/15 blur-3xl" />
      <Container>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            Technology Stack
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Modern stack. <span className="text-blue-600">Proven results.</span>
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            The tools and technologies powering our solutions.
          </p>
        </m.div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {homeTechItems.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <m.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col items-center gap-3 rounded-xl border border-blue-100/20 bg-white/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200/40 hover:bg-white/60 hover:shadow-md"
              >
                <Icon className={`size-8 transition-all duration-300 group-hover:scale-110 ${tech.color}`} />
                <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  {tech.name}
                </span>
              </m.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
