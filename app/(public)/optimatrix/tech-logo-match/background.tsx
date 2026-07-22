"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import { technologies } from "@/lib/tech-logo-match-data";

function FloatingLogo({ tech, index }: { tech: typeof technologies[number]; index: number }) {
  const x = (index % 5) * 20 + 10;
  const y = Math.floor(index / 5) * 25 + 5;
  const duration = 6 + (index % 3) * 2;
  const delay = index * 0.7;

  return (
    <m.div
      className="absolute flex size-12 items-center justify-center rounded-xl bg-white/60 p-2.5 shadow-sm ring-1 ring-black/5 backdrop-blur-sm dark:bg-ink/60"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -12, 0],
        rotate: [0, 5, -5, 0],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: tech.svg }} className="size-full [&_svg]:size-full" />
    </m.div>
  );
}

export function TechLogoMatchBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const displayTechs = technologies.slice(0, 10);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
      {displayTechs.map((tech, i) => (
        <FloatingLogo key={tech.id} tech={tech} index={i} />
      ))}
    </div>
  );
}
