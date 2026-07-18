"use client";

import { m } from "framer-motion";

export function OptiMatrixBackground() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)]" />
        <m.div
          className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          <div className="h-full w-full rounded-full bg-gradient-to-br from-gold/5 via-transparent to-cyan-300/5 blur-3xl" />
        </m.div>
      </div>

      <m.div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[20%] h-16 w-16 rounded-2xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent"
        animate={{ y: [0, -16, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      />
      <m.div
        aria-hidden
        className="pointer-events-none absolute left-[8%] bottom-[25%] h-12 w-12 rounded-xl border border-cyan-200/20 bg-gradient-to-br from-cyan-50/40 to-transparent"
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1 }}
      />
    </>
  );
}
