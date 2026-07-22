"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { m, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

import { AnimatedHeadline } from "./headline";
import { AiSearchBar } from "./ai-search-bar";
import { MagneticButton } from "./magnetic-button";

const HeroCanvasView = dynamic(
  () => import("./hero-scene"),
  { ssr: false }
);

export function HeroSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const mouse = React.useRef({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-white via-blue-50/10 to-white"
    >
      <HeroCanvasView mouse={mouse} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-8 py-32">


          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 w-full max-w-xl"
          >
            <AiSearchBar />
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
          >
            <MagneticButton href="/contact-us" variant="primary">
              Start a project
              <ArrowUpRight className="size-4" />
            </MagneticButton>
            <MagneticButton href="/services" variant="secondary">
              Explore services
            </MagneticButton>
          </m.div>
        </div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <m.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Scroll</span>
          <div className="flex h-10 w-5 items-start justify-center rounded-full border border-border/50 p-1">
            <m.div
              className="h-2 w-1 rounded-full bg-blue-400/40"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
