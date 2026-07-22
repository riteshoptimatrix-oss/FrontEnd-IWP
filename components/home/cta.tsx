"use client";

import * as React from "react";
import { m } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-100/30 via-indigo-100/20 to-transparent blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-48 -top-48 h-[400px] w-[400px] rounded-full bg-blue-100/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -right-48 h-[400px] w-[400px] rounded-full bg-indigo-100/20 blur-3xl" />

      <Container>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/30 bg-white/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 shadow-sm backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            Let's build
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to engineer something{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              exceptional
            </span>
            ?
          </h2>

          <p className="mt-4 max-w-lg text-muted-foreground">
            Tell us about your project and we'll craft a tailored plan to bring it to life.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Start a project
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200/50 bg-white/60 px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-blue-300/50 hover:shadow-md"
            >
              View our work
            </Link>
          </div>
        </m.div>
      </Container>
    </section>
  );
}
