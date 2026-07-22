"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { QuickActionProps } from "@/types/ai";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  color = "blue",
  badge,
}: QuickActionProps) {
  const getColorClasses = (colorName: string) => {
    switch (colorName) {
      case "blue":
        return "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border-blue-100 dark:border-blue-900/40";
      case "emerald":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40";
      case "purple":
        return "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 border-purple-100 dark:border-purple-900/40";
      case "amber":
        return "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border-amber-100 dark:border-amber-900/40";
      default:
        return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700";
    }
  };

  return (
    <Link href={href} className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl block">
      <m.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
        className="h-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <div
              className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105",
                getColorClasses(color)
              )}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div className="flex items-center gap-1.5">
              {badge && (
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                  {badge}
                </span>
              )}
              <div className="h-7 w-7 rounded-full bg-zinc-50 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>

          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-medium text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
          <span>Explore Tool</span>
          <span className="font-mono">→</span>
        </div>
      </m.div>
    </Link>
  );
}
