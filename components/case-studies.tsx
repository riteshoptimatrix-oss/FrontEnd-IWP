"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";
import { m } from "framer-motion";

import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/button";
import { RevealGroup, Reveal } from "@/components/motion/reveal";
import type { CaseStudy } from "@/lib/data";

interface CaseStudiesProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items: CaseStudy[];
  variant?: "default" | "alt";
}

export function CaseStudies({
  id,
  eyebrow = "Case Studies",
  title = "Real results, real impact",
  description = "A closer look at how we've solved complex challenges for ambitious brands.",
  items,
  variant = "default",
}: CaseStudiesProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24 lg:py-32",
        variant === "alt" ? "bg-secondary/40" : "bg-background",
      )}
    >
      <Container>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3" stagger={0.12}>
          {items.map((study) => (
            <Reveal inGroup key={study.id}>
              <m.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-all duration-300 hover:border-gold/20 hover:shadow-card-hover"
              >
                {/* Header gradient */}
                <div className="relative h-3 w-full bg-gradient-to-r from-gold/20 via-gold/10 to-gold/5" />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Category badge */}
                  <span className="mb-3 inline-flex w-fit items-center rounded-full border border-gold/15 bg-gold/5 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
                    {study.category}
                  </span>

                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {study.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Client: {study.client}
                  </p>

                  {/* Problem / Solution / Result */}
                  <div className="mt-5 space-y-4">
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" aria-hidden />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Challenge</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{study.problem}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Lightbulb className="mt-0.5 size-4 shrink-0 text-blue-500" aria-hidden />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Solution</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{study.solution}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" aria-hidden />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">Result</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{study.result}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tech tags */}
                  <div className="mt-auto pt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {study.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </m.div>
            </Reveal>
          ))}
        </RevealGroup>
        <Reveal type="fade-up" className="mt-10 text-center">
          <Button href="/portfolio" variant="outline" size="lg">
            View all case studies
            <ArrowRight className="size-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
