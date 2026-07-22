"use client";

import * as React from "react";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { m, useMotionValue, useSpring, useTransform, useScroll, useTransform as useTransform2 } from "framer-motion";

import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { Reveal } from "@/components/motion/reveal";

function FloatingShape({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <m.div
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      animate={{
        y: [0, -24, 0],
        opacity: [0.4, 0.7, 0.4],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 7,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

function FloatingParticle({
  className,
  delay = 0,
  xDrift = 0,
}: {
  className: string;
  delay?: number;
  xDrift?: number;
}) {
  return (
    <m.div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", className)}
      animate={{
        y: [0, -40, 0],
        x: [0, xDrift, 0],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayedText, setDisplayedText] = React.useState("");
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50 + Math.random() * 40);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className={cn("inline", className)}>
      {displayedText}
      <span
        className="ml-0.5 inline-block h-[1.1em] w-[2px] bg-gold"
        style={{ animation: "typing-cursor 1s ease-in-out infinite" }}
      />
    </span>
  );
}

function FloatingTechIcon({
  icon: Icon,
  className,
  delay = 0,
  label,
}: {
  icon: any;
  className: string;
  delay?: number;
  label: string;
}) {
  return (
    <m.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute flex items-center justify-center rounded-2xl border border-white/20 bg-white/60 p-3 shadow-lg backdrop-blur-md",
        className,
      )}
      animate={{
        y: [0, -16, 0],
        x: [0, 6, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 5 + Math.random() * 3,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    >
      <Icon className="size-5 text-gold/70" aria-hidden />
      <span className="sr-only">{label}</span>
    </m.div>
  );
}

export interface HeroProps {
  eyebrow?: string;
  title?: React.ReactNode;
  highlight?: string;
  description?: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  trustNote?: string;
  className?: string;
}

export function Hero({
  eyebrow = "IndiaWebProgrammer",
  title = "We engineer",
  highlight = "premium digital experiences",
  description = "India Web Programmers is your end-to-end partner for high-performance websites, products and platforms — crafted with precision, accessibility and scale in mind.",
  primaryLabel = "Start a project",
  primaryHref = "/contact-us",
  secondaryLabel = "Explore services",
  secondaryHref = "/services",
  trustNote = "Trusted by ambitious teams across the globe",
  className,
}: HeroProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const parallaxX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY],
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative flex min-h-screen items-center overflow-hidden",
        "bg-gradient-to-b from-white via-blue-50/20 to-white",
        className,
      )}
    >
      {/* Animated gradient orbs */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute -top-48 right-0 h-[700px] w-[700px] opacity-30"
        style={{ x: parallaxX, y: parallaxY }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 15, 0],
        }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="h-full w-full rounded-full bg-gradient-to-br from-gold/25 via-gold/8 to-transparent blur-3xl" />
      </m.div>

      <m.div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-48 h-[600px] w-[600px] opacity-20"
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 2 }}
      >
        <div className="h-full w-full rounded-full bg-gradient-to-tr from-cyan-300/25 via-gold/5 to-transparent blur-3xl" />
      </m.div>

      <m.div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/3 h-[400px] w-[400px] opacity-15"
        style={{ x: useTransform(springX, [-0.5, 0.5], [-15, 15]), y: useTransform(springY, [-0.5, 0.5], [-15, 15]) }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -8, 0],
        }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, delay: 4 }}
      >
        <div className="h-full w-full rounded-full bg-gradient-to-br from-violet-300/15 via-gold/5 to-transparent blur-3xl" />
      </m.div>

      {/* Floating shapes */}
      <FloatingShape className="right-[15%] top-[15%] h-24 w-24 rounded-3xl border border-gold/15 bg-gold/[0.04] shadow-lg backdrop-blur-sm" delay={0} />
      <FloatingShape className="left-[8%] top-[25%] h-16 w-16 rounded-2xl border border-cyan-200/25 bg-cyan-50/40 shadow-lg" delay={1.5} />
      <FloatingShape className="right-[25%] bottom-[20%] h-12 w-12 rounded-xl border border-gold/15 bg-gold/[0.04] shadow" delay={3} />
      <FloatingShape className="left-[20%] bottom-[15%] h-20 w-20 rounded-3xl border border-violet-200/20 bg-violet-50/30 shadow-lg" delay={2} />

      {/* Floating tech icons */}
      <FloatingTechIcon icon={Sparkles} className="right-[12%] top-[20%] hidden md:flex" delay={0} label="AI" />
      <FloatingTechIcon icon={Check} className="left-[15%] bottom-[25%] hidden lg:flex" delay={1.5} label="Quality" />

      {/* Floating particles */}
      <FloatingParticle className="left-[20%] top-[30%] h-1.5 w-1.5 bg-gold/40" delay={0} xDrift={8} />
      <FloatingParticle className="right-[30%] top-[20%] h-1 w-1 bg-cyan-400/40" delay={1} xDrift={-6} />
      <FloatingParticle className="left-[40%] top-[60%] h-2 w-2 bg-gold/30" delay={2} xDrift={10} />
      <FloatingParticle className="right-[20%] top-[50%] h-1.5 w-1.5 bg-cyan-400/30" delay={3} xDrift={-8} />
      <FloatingParticle className="left-[60%] top-[25%] h-1 w-1 bg-gold/20" delay={1.5} xDrift={5} />
      <FloatingParticle className="right-[15%] top-[65%] h-1.5 w-1.5 bg-violet-400/25" delay={2.5} xDrift={-7} />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />

      <m.div style={{ opacity: heroOpacity, scale: heroScale }} className="contents">
        <Container className="relative z-10">
          <div className="flex flex-col items-start gap-8 py-32 lg:max-w-[58%] xl:max-w-[52%]">
            <Reveal type="fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gradient-to-r from-gold/10 to-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-gold shadow-sm backdrop-blur-sm">
                <Sparkles className="size-3.5" aria-hidden />
                {eyebrow}
              </span>
            </Reveal>

            <Reveal type="fade-up" delay={0.05}>
              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                {title}{" "}
                <span className="text-gradient-premium">{highlight}</span>
              </h1>
            </Reveal>

            <Reveal type="fade-up" delay={0.1}>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                {description}
              </p>
            </Reveal>

            <Reveal type="fade-up" delay={0.15}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={primaryHref} variant="gold" size="lg" className="text-base">
                  {primaryLabel}
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button href={secondaryHref} variant="outline" size="lg" className="text-base">
                  {secondaryLabel}
                </Button>
              </div>
            </Reveal>

            {trustNote ? (
              <Reveal type="fade" delay={0.2}>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground/60">
                  <span className="flex size-5 items-center justify-center rounded-full bg-green-50 shadow-sm">
                    <Check className="size-3 text-green-600" />
                  </span>
                  {trustNote}
                </div>
              </Reveal>
            ) : null}
          </div>

          {/* Premium decorative mockup */}
          <Reveal type="scale-in" delay={0.25} className="absolute right-0 top-1/2 hidden -translate-y-1/2 xl:block">
            <m.div
              className="relative h-[560px] w-[560px]"
              style={{ x: useTransform(springX, [-0.5, 0.5], [8, -8]), y: useTransform(springY, [-0.5, 0.5], [8, -8]) }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            >
              {/* Main card */}
              <div className="absolute inset-0 rounded-[44px] border border-gold/10 bg-gradient-to-br from-white via-blue-50/20 to-white shadow-elevated">
                {/* Window controls */}
                <div className="flex items-center gap-1.5 px-6 pt-5">
                  <span className="size-3 rounded-full bg-rose-400/70" />
                  <span className="size-3 rounded-full bg-amber-400/70" />
                  <span className="size-3 rounded-full bg-emerald-400/70" />
                </div>
                {/* Mock content */}
                <div className="mt-6 space-y-4 px-6">
                  <div className="flex gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-soft text-white text-sm font-bold shadow-sm">IWP</span>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-gold/20 to-gold/5" />
                      <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-gold/15 to-gold/5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent p-3">
                      <div className="h-2 w-1/3 rounded-full bg-gold/20" />
                      <div className="mt-2 h-6 w-full rounded-lg bg-gradient-to-r from-gold/15 to-gold/5" />
                    </div>
                    <div className="rounded-xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent p-3">
                      <div className="h-2 w-1/3 rounded-full bg-gold/20" />
                      <div className="mt-2 h-6 w-full rounded-lg bg-gradient-to-r from-gold/15 to-gold/5" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent p-3">
                    <div className="h-2 w-1/4 rounded-full bg-gold/20" />
                    <div className="mt-2 flex gap-2">
                      <div className="h-4 w-16 rounded-md bg-gradient-to-r from-gold/15 to-gold/5" />
                      <div className="h-4 w-12 rounded-md bg-gradient-to-r from-cyan-100/50 to-cyan-50/30" />
                      <div className="h-4 w-14 rounded-md bg-gradient-to-r from-gold/10 to-gold/5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card 1 - Satisfaction */}
              <m.div
                className="absolute -right-8 top-12 rounded-2xl border border-gold/10 bg-white/90 p-4 shadow-card backdrop-blur-md"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-50 to-green-100 text-green-600 text-sm font-bold shadow-sm">98%</span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Satisfaction</p>
                    <p className="text-[10px] text-muted-foreground">Client rating</p>
                  </div>
                </div>
              </m.div>

              {/* Floating card 2 - Years */}
              <m.div
                className="absolute -left-6 bottom-24 rounded-2xl border border-gold/10 bg-white/90 p-4 shadow-card backdrop-blur-md"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex size-2.5 rounded-full bg-green-500 shadow-sm" />
                  <span className="text-sm font-medium text-foreground">12+ years</span>
                </div>
              </m.div>

              {/* Floating card 3 - Projects */}
              <m.div
                className="absolute -right-4 bottom-16 rounded-2xl border border-gold/10 bg-white/90 p-4 shadow-card backdrop-blur-md"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 text-gold text-xs font-bold shadow-sm">350+</span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Projects</p>
                    <p className="text-[10px] text-muted-foreground">Delivered</p>
                  </div>
                </div>
              </m.div>
            </m.div>
          </Reveal>
        </Container>
      </m.div>

      {/* Scroll indicator */}
      <Reveal type="fade" delay={0.5} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <m.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Scroll</span>
          <div className="h-10 w-5 rounded-full border border-border/50 flex items-start justify-center p-1">
            <m.div
              className="h-2 w-1 rounded-full bg-gold/40"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
        </m.div>
      </Reveal>
    </section>
  );
}
