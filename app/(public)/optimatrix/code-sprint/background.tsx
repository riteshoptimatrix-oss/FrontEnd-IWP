"use client";

import { m } from "framer-motion";

export function CodeSprintBackground() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)]" />

        {/* Main rotating gradient */}
        <m.div
          className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/4"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        >
          <div className="h-full w-full rounded-full bg-gradient-to-br from-gold/5 via-transparent to-cyan-300/5 blur-3xl" />
        </m.div>

        {/* Secondary glow */}
        <m.div
          className="absolute right-0 top-1/3 h-[400px] w-[400px]"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        >
          <div className="h-full w-full rounded-full bg-gradient-to-br from-violet-400/5 via-transparent to-gold/5 blur-3xl" />
        </m.div>
      </div>

      {/* Floating code symbols */}
      {["{ }", "< />", "( )", "[ ]", "=>", "&&", "||", "++"].map((symbol, i) => (
        <m.div
          key={symbol}
          aria-hidden
          className="pointer-events-none absolute font-mono text-xs text-gold/10"
          style={{
            left: `${10 + (i * 12) % 80}%`,
            top: `${15 + (i * 17) % 70}%`,
          }}
          animate={{
            y: [0, -20 - (i % 3) * 10, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 4 + (i % 3),
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {symbol}
        </m.div>
      ))}

      {/* Floating shapes */}
      <m.div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[15%] h-16 w-16 rounded-2xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent"
        animate={{ y: [0, -16, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      />
      <m.div
        aria-hidden
        className="pointer-events-none absolute left-[8%] bottom-[20%] h-12 w-12 rounded-xl border border-cyan-200/20 bg-gradient-to-br from-cyan-50/40 to-transparent"
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1 }}
      />
      <m.div
        aria-hidden
        className="pointer-events-none absolute left-[60%] bottom-[30%] h-8 w-8 rounded-lg border border-violet-200/15 bg-gradient-to-br from-violet-50/30 to-transparent"
        animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 2 }}
      />
    </>
  );
}
