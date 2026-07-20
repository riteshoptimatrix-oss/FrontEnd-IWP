"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Technology } from "@/lib/tech-logo-match-data";

export function TechnologyCard({ tech, index }: { tech: Technology; index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="group relative"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-transparent via-gold/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gold/20 group-hover:shadow-md sm:p-6">
        <div
          className={cn(
            "flex size-16 items-center justify-center rounded-xl bg-gradient-to-br p-3 ring-1 ring-black/5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md",
            tech.bgColor,
          )}
          dangerouslySetInnerHTML={{ __html: tech.svg }}
        />
        <div className="text-center">
          <h3 className="text-sm font-semibold">{tech.name}</h3>
          <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground line-clamp-2">
            {tech.description}
          </p>
        </div>
        <span className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium",
          tech.difficulty === 1 && "bg-emerald-50 text-emerald-600",
          tech.difficulty === 2 && "bg-amber-50 text-amber-600",
          tech.difficulty === 3 && "bg-red-50 text-red-600",
        )}>
          {"●".repeat(tech.difficulty)}{"○".repeat(3 - tech.difficulty)}
        </span>
      </div>
    </m.div>
  );
}
