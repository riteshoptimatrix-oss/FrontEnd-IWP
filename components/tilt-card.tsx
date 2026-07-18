"use client";

import { type ReactNode, useRef, useCallback } from "react";
import { m, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  perspective?: number;
  tiltDegree?: number;
}

export function TiltCard({
  children,
  className = "",
  perspective = 800,
  tiltDegree = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`perspective(${perspective}px) rotateX(${springY}deg) rotateY(${springX}deg)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      x.set(deltaX * tiltDegree);
      y.set(-deltaY * tiltDegree);
    },
    [tiltDegree, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className={className}
    >
      {children}
    </m.div>
  );
}
