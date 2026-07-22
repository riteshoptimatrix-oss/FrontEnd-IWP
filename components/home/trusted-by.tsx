"use client";

import * as React from "react";
import { m } from "framer-motion";

import { Container } from "@/components/container";
import { clientLogos } from "@/lib/data";

export function TrustedBy() {
  const logos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <m.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/50"
        >
          Trusted by engineering teams
        </m.p>
      </Container>
      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
        <m.div
          className="flex gap-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
          style={{ width: "fit-content" }}
        >
          {logos.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex h-12 w-28 items-center justify-center grayscale transition-all duration-500 hover:grayscale-0"
            >
              <span className="text-lg font-bold tracking-tight text-slate-300 transition-colors hover:text-blue-500">
                {name}
              </span>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
