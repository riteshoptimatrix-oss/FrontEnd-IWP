"use client";

import * as React from "react";
import { ArrowUp, Phone, MessageCircle } from "lucide-react";
import { m, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export function StickyContact() {
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" role="complementary" aria-label="Quick contact">
      {/* Back to top */}
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

      {/* Call button */}
      <m.a
        href="tel:+910000000000"
        aria-label="Call us"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex size-11 items-center justify-center rounded-full border border-border/60 bg-card/90 text-muted-foreground shadow-lg backdrop-blur-md transition-colors duration-200 hover:border-green-400/30 hover:text-green-600 hover:shadow-xl"
      >
        <Phone className="size-4" />
      </m.a>

      {/* WhatsApp button */}
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
  );
}
