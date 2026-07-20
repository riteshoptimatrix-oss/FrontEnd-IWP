"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { technologies } from "@/lib/tech-logo-match-data";

export function PreviewCard({
  logoId, name, description, index,
}: {
  logoId: string;
  name: string;
  description: string;
  index: number;
}) {
  const tech = technologies.find((t) => t.id === logoId);

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group"
    >
      <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-md sm:p-5">
        <div className={cn(
          "flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br p-3 ring-1 ring-black/5 transition-all duration-300 group-hover:scale-110",
          tech?.bgColor,
        )}>
          {tech && <div dangerouslySetInnerHTML={{ __html: tech.svg }} />}
        </div>
        <div className="flex flex-1 items-center gap-3">
          <div className="flex-1">
            <div className="text-sm font-semibold">{name}</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">{description}</div>
          </div>
          <m.div
            className="flex size-8 items-center justify-center rounded-full bg-gold/10 text-xs text-gold"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            ↓
          </m.div>
          <div className="shrink-0 text-right">
            <div className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
              {name}
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}
