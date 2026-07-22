"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Container } from "@/components/container";
import { whyChooseUs } from "@/lib/data";

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-48 bottom-0 h-[600px] w-[600px] rounded-full bg-blue-100/20 blur-3xl" />
      <Container>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            Why India Web Programmers
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Built different.{" "}
            <span className="text-blue-600">Deliberately better.</span>
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            We don't cut corners. Here's what sets us apart.
          </p>
        </m.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {whyChooseUs.map((item, i) => {
            const Icon = item.icon;
            return (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-blue-100/30 bg-white/50 p-7 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-blue-200/50 hover:shadow-xl hover:shadow-blue-100/20"
              >
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </m.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
