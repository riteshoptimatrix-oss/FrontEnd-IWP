"use client";

import * as React from "react";
import { m, useInView } from "framer-motion";

import { Container } from "@/components/container";
import { companyStats } from "@/lib/data";

function AnimatedCounter({ value, label, hint }: { value: string; label: string; hint?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = React.useState("0");

  React.useEffect(() => {
    if (!inView) return;
    const num = parseInt(value.replace(/\D/g, ""));
    if (isNaN(num)) { setDisplayed(value); return; }
    const suffix = value.replace(/[0-9]/g, "");
    const duration = 2000;
    const start = performance.now();
    let raf: number;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.floor(eased * num) + suffix);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      <span className="text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">
        {displayed}
      </span>
      <span className="mt-1 text-sm font-medium text-foreground">{label}</span>
      {hint && (
        <span className="mt-0.5 text-xs text-muted-foreground/60">{hint}</span>
      )}
    </m.div>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/15 blur-3xl" />
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {companyStats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
