"use client";

import { m } from "framer-motion";

import { cn } from "@/lib/utils";
import { Section } from "@/components/section";
import { SectionTitle } from "@/components/section-title";
import { RevealGroup, Reveal } from "@/components/motion/reveal";
import type { ProcessStep } from "@/lib/data";

export interface StepsListProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  steps: ProcessStep[];
  align?: "left" | "center";
  variant?: "default" | "alt" | "gradient" | "ink";
}

export function StepsList({
  id,
  eyebrow,
  title,
  description,
  steps,
  align = "center",
  variant,
}: StepsListProps) {
  return (
    <Section id={id} variant={variant}>
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        description={description}
        align={align}
      />
      {/* Desktop timeline */}
      <div className="relative mt-16 hidden lg:block">
        {/* Connecting line */}
        <div className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        <RevealGroup className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5" stagger={0.1}>
          {steps.map((step) => (
            <Reveal inGroup key={step.step}>
              <div className="group relative flex flex-col items-center text-center">
                {/* Step number dot */}
                <div className="relative z-10 flex size-16 items-center justify-center rounded-2xl border border-gold/15 bg-gradient-to-br from-gold/10 to-gold/5 text-gold shadow-sm transition-all duration-300 group-hover:border-gold/30 group-hover:shadow-glow-pulse group-hover:scale-105">
                  <span className="text-xl font-bold">{step.step}</span>
                </div>

                {/* Content */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      {/* Mobile/tablet cards */}
      <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden" stagger={0.08}>
        {steps.map((step) => (
          <Reveal inGroup key={step.step}>
            <div className="group relative flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-gold/20 hover:shadow-card-hover">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 text-gold ring-1 ring-gold/10 transition-all duration-300 group-hover:scale-105">
                <span className="text-lg font-bold">{step.step}</span>
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
