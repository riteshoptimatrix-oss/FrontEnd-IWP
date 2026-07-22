"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Container } from "@/components/container";
import { aboutStory } from "@/lib/data";

export function AboutSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-blue-100/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 left-0 h-[400px] w-[400px] rounded-full bg-indigo-100/20 blur-3xl" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              About us
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Engineering the future of{" "}
              <span className="text-blue-600">digital experiences</span>
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {aboutStory}
            </p>
            <div className="mt-2 flex flex-wrap gap-8">
              {[
                { label: "Founded", value: "2013" },
                { label: "Team", value: "45+" },
                { label: "Projects", value: "350+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-blue-100/50 bg-gradient-to-br from-blue-50/50 to-white p-8 shadow-xl shadow-blue-100/20">
              <div className="space-y-4">
                {[
                  { label: "Mission", value: "Deliver world-class digital engineering that scales." },
                  { label: "Approach", value: "Design-led, engineering-driven, performance-obsessed." },
                  { label: "Impact", value: "350+ projects across 20+ countries since 2013." },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-blue-100/30 bg-white/60 p-4 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">{item.label}</p>
                    <p className="mt-1 text-sm text-foreground/80">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div aria-hidden className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl border border-blue-200/30 bg-blue-50/50 backdrop-blur-sm" />
          </m.div>
        </div>
      </Container>
    </section>
  );
}
