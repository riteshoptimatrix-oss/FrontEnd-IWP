"use client";

import { m } from "framer-motion";

export function SplashProgress() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 px-6 sm:px-12">
      <div className="mx-auto h-[3px] w-full max-w-sm overflow-hidden rounded-full bg-muted/20">
        <m.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--color-gold-soft), var(--color-gold), var(--color-gold-soft), var(--color-gold-deep))",
            backgroundSize: "300% 100%",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </div>
  );
}
