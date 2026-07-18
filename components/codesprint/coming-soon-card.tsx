"use client";

import * as React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ComingSoonFeature } from "@/lib/codesprint-data";

interface ComingSoonCardProps {
  feature: ComingSoonFeature;
  index?: number;
}

export function ComingSoonCard({ feature, index = 0 }: ComingSoonCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border/40 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/15 hover:shadow-card-hover dark:bg-ink/60"
    >
      {/* Hover gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{feature.icon}</span>
          <div className="text-sm font-semibold">{feature.title}</div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
        <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-gold/8 px-2.5 py-0.5 text-[11px] font-medium text-gold ring-1 ring-gold/10">
          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Coming Soon
        </span>
      </div>
    </m.div>
  );
}
