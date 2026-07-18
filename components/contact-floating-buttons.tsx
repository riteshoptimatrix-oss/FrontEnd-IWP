"use client";

import * as React from "react";
import { ArrowUp, Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [showStickyCta, setShowStickyCta] = React.useState(false);

  React.useEffect(() => {
    const handler = () => {
      setShowBackToTop(window.scrollY > 600);
      setShowStickyCta(window.scrollY > 1200);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Sticky CTA bar */}
      <AnimatePresence>
        {showStickyCta && (
          <m.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-card/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.08)] sm:hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <a
                href="tel:+910000000000"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-medium text-white shadow-sm"
              >
                <Phone className="size-4" />
                Call us
              </a>
              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2.5 text-sm font-medium text-[#25D366]"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating buttons (bottom-right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" role="complementary" aria-label="Quick actions">
        <AnimatePresence>
          {showBackToTop && (
            <m.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              type="button"
              aria-label="Back to top"
              onClick={scrollToTop}
              className="flex size-11 items-center justify-center rounded-full border border-border/60 bg-card/90 text-muted-foreground shadow-lg backdrop-blur-md transition-colors duration-200 hover:border-gold/20 hover:text-gold hover:shadow-xl"
            >
              <ArrowUp className="size-4" />
            </m.button>
          )}
        </AnimatePresence>

        <m.a
          href="#meeting"
          aria-label="Schedule a meeting"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex size-11 items-center justify-center rounded-full border border-border/60 bg-card/90 text-muted-foreground shadow-lg backdrop-blur-md transition-colors duration-200 hover:border-gold/20 hover:text-gold hover:shadow-xl"
        >
          <CalendarCheck className="size-4" />
        </m.a>

        <m.a
          href="tel:+910000000000"
          aria-label="Call us"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex size-11 items-center justify-center rounded-full border border-border/60 bg-card/90 text-muted-foreground shadow-lg backdrop-blur-md transition-colors duration-200 hover:border-green-400/30 hover:text-green-600 hover:shadow-xl"
        >
          <Phone className="size-4" />
        </m.a>

        <m.a
          href="https://wa.me/910000000000"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow duration-200 hover:shadow-xl"
        >
          <MessageCircle className="size-5" />
        </m.a>
      </div>
    </>
  );
}
