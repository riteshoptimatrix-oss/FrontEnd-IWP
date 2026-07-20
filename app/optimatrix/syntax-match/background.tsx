"use client";

import { m } from "framer-motion";

const CARD_SYMBOLS = ["{ }", "< />", "( )", "[ ]", "=>", "===", "&&", "||", "++", "--", "?>", "::"];

export function SyntaxMatchBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)]" />

      <m.div
        className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/4"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 50, ease: "linear", repeat: Infinity }}
      >
        <div className="h-full w-full rounded-full bg-gradient-to-br from-gold/5 via-transparent to-cyan-300/5 blur-3xl" />
      </m.div>

      <m.div
        className="absolute right-0 top-1/3 h-[400px] w-[400px]"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        <div className="h-full w-full rounded-full bg-gradient-to-br from-violet-400/5 via-transparent to-gold/5 blur-3xl" />
      </m.div>

      {CARD_SYMBOLS.map((symbol, i) => (
        <m.div
          key={symbol}
          aria-hidden
          className="pointer-events-none absolute font-mono text-xs text-gold/10"
          style={{
            left: `${8 + (i * 9) % 84}%`,
            top: `${10 + (i * 13) % 80}%`,
          }}
          animate={{
            y: [0, -18 - (i % 3) * 8, 0],
            opacity: [0.04, 0.12, 0.04],
          }}
          transition={{
            duration: 4 + (i % 3),
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          {symbol}
        </m.div>
      ))}

      <m.div
        aria-hidden
        className="pointer-events-none absolute right-[12%] top-[18%] h-20 w-14 rounded-2xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent"
        animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      />
      <m.div
        aria-hidden
        className="pointer-events-none absolute left-[10%] bottom-[25%] h-14 w-14 rounded-xl border border-cyan-200/20 bg-gradient-to-br from-cyan-50/40 to-transparent"
        animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
      />
      <m.div
        aria-hidden
        className="pointer-events-none absolute left-[55%] bottom-[35%] h-10 w-16 rounded-lg border border-violet-200/15 bg-gradient-to-br from-violet-50/30 to-transparent"
        animate={{ y: [0, -12, 0], rotate: [0, 7, 0] }}
        transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 2 }}
      />
    </div>
  );
}
