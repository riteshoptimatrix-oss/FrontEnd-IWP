import * as React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Reveal } from "@/components/motion/reveal";

export interface CTACtaProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  primaryVariant?: "gold" | "shimmer" | "default" | "outline" | "secondary" | "ghost" | "link";
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTA({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  primaryVariant = "gold",
  secondaryLabel,
  secondaryHref,
  className,
}: CTACtaProps) {
  return (
    <section className={cn("py-16 sm:py-24", className)}>
      <Reveal type="scale" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink via-ink-soft to-ink px-6 py-16 text-center shadow-premium sm:px-12 sm:py-24">
          {/* Animated gradient orbs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl"
          />

          {/* Subtle grid overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid-white [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          />

          <div className="relative flex flex-col items-center gap-6">
            {eyebrow ? (
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/80">
                {eyebrow}
              </span>
            ) : null}
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description ? (
              <p className="max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                {description}
              </p>
            ) : null}
            {(primaryHref || secondaryHref) && (
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                {primaryHref && (
                  <Button href={primaryHref} variant={primaryVariant} size="lg">
                    {primaryLabel ?? "Get Started"}
                    <ArrowRight />
                  </Button>
                )}
                {secondaryHref && (
                  <Button href={secondaryHref} variant="outline" size="lg" className="border-white/15 text-white hover:bg-white/10 hover:text-white">
                    {secondaryLabel ?? "Learn More"}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
