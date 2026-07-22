"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { m } from "framer-motion";

interface ComingSoonCardProps {
  title: string;
  description: string;
}

export function ComingSoonCard({ title, description }: ComingSoonCardProps) {
  return (
    <m.div
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-2xl border border-dashed border-border bg-muted/50 p-6 transition-all hover:border-ring h-full flex flex-col items-center text-center justify-center min-h-[200px]"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Sparkles className="h-5 w-5 text-muted-foreground dark:text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-medium text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground dark:text-muted-foreground">
        {description}
      </p>
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          Coming Soon
        </span>
      </div>
    </m.div>
  );
}
