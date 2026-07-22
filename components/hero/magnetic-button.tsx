"use client";

import * as React from "react";
import Link from "next/link";
import { m, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ href, variant = "primary", children, className }: MagneticButtonProps) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      x.set(deltaX * 8);
      y.set(deltaY * 8);
    },
    [],
  );

  const handleMouseLeave = React.useCallback(() => {
    x.set(0);
    y.set(0);
  }, []);

  return (
    <m.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition-shadow duration-300",
        variant === "primary"
          ? "bg-[#3b71fe] text-white shadow-[0_4px_20px_-4px_rgba(59,113,254,0.4)] hover:shadow-[0_8px_32px_-4px_rgba(59,113,254,0.5)]"
          : "border border-blue-200/50 bg-white/80 text-slate-700 shadow-sm backdrop-blur-sm hover:border-blue-300/50 hover:bg-white/90 hover:shadow-md",
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </m.a>
  );
}
