"use client";

import * as React from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  velocity: number;
}

export function useMousePosition() {
  const [pos, setPos] = React.useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
    velocity: 0,
  });

  const lastPos = React.useRef({ x: 0, y: 0, time: 0 });
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        const dt = Math.max(e.timeStamp - lastPos.current.time, 1);
        const velocity = Math.sqrt(dx * dx + dy * dy) / dt;

        setPos({
          x: e.clientX,
          y: e.clientY,
          normalizedX: e.clientX / window.innerWidth,
          normalizedY: e.clientY / window.innerHeight,
          velocity: Math.min(velocity * 10, 1),
        });

        lastPos.current = { x: e.clientX, y: e.clientY, time: e.timeStamp };
      });
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return pos;
}
