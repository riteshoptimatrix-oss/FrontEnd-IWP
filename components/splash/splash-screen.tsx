"use client";

import { AnimatePresence, m } from "framer-motion";

import { siteConfig } from "@/lib/site";
import { useSplashScreen } from "@/hooks/use-splash-screen";
import { SplashBackground } from "./splash-background";
import { SplashProgress } from "./splash-progress";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SplashScreen() {
  const visible = useSplashScreen();

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="splash"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          exit={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <SplashBackground />

          <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center sm:gap-7">
            <m.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
            >
              <m.div
                className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-soft to-gold shadow-premium sm:size-24"
                initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              >
                <span className="text-[1.625rem] font-bold tracking-tight text-white sm:text-2xl">
                  {siteConfig.shortName}
                </span>
              </m.div>
            </m.div>

            <m.h1
              className="text-[1.75rem] font-semibold tracking-tight text-ink sm:text-3xl md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
            >
              {siteConfig.name}
            </m.h1>

            <m.p
              className="max-w-sm text-balance text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 1.1 }}
            >
              Building Modern Digital Experiences
            </m.p>

            <m.div
              className="flex items-center gap-3 text-xs font-medium tracking-wide text-muted-foreground/60 sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: 1.4 }}
            >
              <span>AI</span>
              <span className="size-1 rounded-full bg-muted-foreground/20" />
              <span>Web</span>
              <span className="size-1 rounded-full bg-muted-foreground/20" />
              <span>Mobile</span>
              <span className="size-1 rounded-full bg-muted-foreground/20" />
              <span>Cloud</span>
            </m.div>
          </div>

          <SplashProgress />
        </m.div>
      )}
    </AnimatePresence>
  );
}
