"use client";

import React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface WorkspaceCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function WorkspaceCard({
  children,
  className,
  hoverEffect = true,
  onClick,
}: WorkspaceCardProps) {
  return (
    <m.div
      whileHover={hoverEffect ? { y: -3, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-5 sm:p-6 shadow-sm transition-all duration-200",
        hoverEffect && "hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md cursor-pointer",
        className
      )}
    >
      {children}
    </m.div>
  );
}
