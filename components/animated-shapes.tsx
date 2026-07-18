"use client";

import { m } from "framer-motion";

interface Shape {
  className?: string;
  delay?: number;
  duration?: number;
  xRange?: number[];
  yRange?: number[];
  rotateRange?: number[];
}

function FloatingShape({
  className = "",
  delay = 0,
  duration = 6,
  xRange = [0, 20],
  yRange = [0, -20],
  rotateRange = [0, 8],
}: Shape) {
  return (
    <m.div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      animate={{
        x: xRange,
        y: yRange,
        rotate: rotateRange,
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        delay,
      }}
    />
  );
}

export function ShapesHome() {
  return (
    <>
      <FloatingShape
        className="right-[6%] top-[18%] h-20 w-20 rounded-2xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent shadow-sm"
        duration={7}
      />
      <FloatingShape
        className="left-[5%] top-[40%] h-14 w-14 rounded-xl border border-cyan-200/20 bg-gradient-to-br from-cyan-50/40 to-transparent"
        duration={5}
        delay={1}
        xRange={[0, 15]}
        yRange={[0, 15]}
        rotateRange={[0, -6]}
      />
      <FloatingShape
        className="right-[12%] bottom-[25%] h-10 w-10 rounded-lg border border-violet-200/20 bg-gradient-to-br from-violet-50/30 to-transparent"
        duration={4.5}
        delay={2}
        xRange={[0, -12]}
        yRange={[0, 12]}
        rotateRange={[0, 10]}
      />
    </>
  );
}

export function ShapesAbout() {
  return (
    <>
      <FloatingShape
        className="right-[8%] top-[15%] h-16 w-16 rounded-2xl border border-violet-200/20 bg-gradient-to-br from-violet-50/40 to-transparent"
        duration={6}
        delay={0.3}
      />
      <FloatingShape
        className="left-[4%] top-[50%] h-12 w-12 rounded-xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent"
        duration={5.5}
        delay={1.5}
        xRange={[0, 14]}
        yRange={[0, -14]}
        rotateRange={[0, -7]}
      />
    </>
  );
}

export function ShapesServices() {
  return (
    <>
      <FloatingShape
        className="right-[5%] top-[25%] h-18 w-18 rounded-2xl border border-cyan-200/20 bg-gradient-to-br from-cyan-50/40 to-transparent"
        duration={6.5}
      />
      <FloatingShape
        className="left-[6%] top-[35%] h-10 w-10 rounded-lg border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent"
        duration={4.8}
        delay={0.8}
        xRange={[0, 16]}
        yRange={[0, -12]}
        rotateRange={[0, 9]}
      />
    </>
  );
}

export function ShapesWarm() {
  return (
    <>
      <FloatingShape
        className="right-[10%] top-[20%] h-14 w-14 rounded-2xl border border-amber-200/20 bg-gradient-to-br from-amber-50/40 to-transparent"
        duration={5.5}
      />
      <FloatingShape
        className="left-[7%] bottom-[30%] h-11 w-11 rounded-xl border border-orange-200/20 bg-gradient-to-br from-orange-50/30 to-transparent"
        duration={6}
        delay={1.2}
        xRange={[0, -13]}
        yRange={[0, 13]}
        rotateRange={[0, -8]}
      />
    </>
  );
}

export function ShapesTeal() {
  return (
    <>
      <FloatingShape
        className="right-[7%] top-[22%] h-15 w-15 rounded-2xl border border-teal-200/20 bg-gradient-to-br from-teal-50/40 to-transparent"
        duration={6}
      />
      <FloatingShape
        className="left-[5%] top-[45%] h-10 w-10 rounded-xl border border-emerald-200/20 bg-gradient-to-br from-emerald-50/30 to-transparent"
        duration={5}
        delay={0.5}
        xRange={[0, 12]}
        yRange={[0, -10]}
        rotateRange={[0, 7]}
      />
    </>
  );
}

export function ParticleField() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${4 + (i * 8) % 92}%`,
    top: `${10 + (i * 13) % 80}%`,
    size: 3 + (i % 3) * 2,
    delay: i * 0.4,
    duration: 3 + (i % 3),
  }));

  return (
    <>
      {particles.map((p) => (
        <m.div
          key={p.id}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-gold/20"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
          }}
          animate={{ opacity: [0, 0.6, 0], y: [0, -20, 0] }}
          transition={{
            duration: p.duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </>
  );
}
