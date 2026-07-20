"use client";

import { m } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Floating blurred orbs                                              */
/* ------------------------------------------------------------------ */

const ORBS = [
  { size: 350, x: "5%", y: "8%", delay: 0, duration: 12, amplitude: 14 },
  { size: 250, x: "78%", y: "6%", delay: 1.5, duration: 14, amplitude: 10 },
  { size: 300, x: "72%", y: "78%", delay: 0.8, duration: 11, amplitude: 18 },
  { size: 200, x: "10%", y: "82%", delay: 2, duration: 13, amplitude: 12 },
  { size: 180, x: "48%", y: "4%", delay: 0.5, duration: 10, amplitude: 8 },
];

/* ------------------------------------------------------------------ */
/*  Subtle floating particles                                          */
/* ------------------------------------------------------------------ */

const PARTICLES = [
  { size: 3, x: "20%", y: "30%", delay: 0, duration: 12, dx: 20, dy: -15 },
  { size: 2, x: "45%", y: "20%", delay: 0.5, duration: 15, dx: -15, dy: 10 },
  { size: 4, x: "70%", y: "40%", delay: 1, duration: 11, dx: 18, dy: -12 },
  { size: 2, x: "85%", y: "60%", delay: 1.5, duration: 14, dx: -12, dy: 18 },
  { size: 3, x: "10%", y: "65%", delay: 2, duration: 13, dx: 15, dy: 10 },
  { size: 2, x: "55%", y: "75%", delay: 0.8, duration: 16, dx: -20, dy: -8 },
  { size: 3, x: "30%", y: "85%", delay: 1.2, duration: 10, dx: 12, dy: -18 },
  { size: 2, x: "90%", y: "25%", delay: 0.3, duration: 13.5, dx: -10, dy: 15 },
  { size: 4, x: "40%", y: "50%", delay: 1.8, duration: 12.5, dx: 15, dy: 12 },
  { size: 2, x: "65%", y: "80%", delay: 2.2, duration: 14.5, dx: -18, dy: -10 },
  { size: 3, x: "15%", y: "45%", delay: 0.7, duration: 11.5, dx: -14, dy: 16 },
  { size: 2, x: "75%", y: "15%", delay: 1.3, duration: 13, dx: 22, dy: -10 },
];

export function SplashBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ffffff 0%, oklch(0.985 0.003 260) 50%, #ffffff 100%)",
        }}
      />

      {ORBS.map((orb, i) => (
        <m.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle at center, oklch(0.65 0.2 260 / 0.035), transparent 70%)`,
            filter: "blur(60px)",
            willChange: "transform",
          }}
          animate={{
            y: [0, -orb.amplitude, 0],
            x: [0, i % 2 === 0 ? orb.amplitude * 0.5 : -orb.amplitude * 0.5, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {PARTICLES.map((p, i) => (
        <m.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-ink"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            opacity: 0.12,
            willChange: "transform",
          }}
          animate={{
            x: [0, p.dx, 0],
            y: [0, p.dy, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
