"use client";

import React from "react";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { ThemeOption } from "@/types/website-generator";
import { CheckCircle2, Sparkles } from "lucide-react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const THEMES: ThemeOption[] = [
  {
    id: "White",
    title: "White",
    description: "Pristine white canvas with subtle gray borders and high contrast black typography.",
    badge: "Clean & Modern",
    style: {
      navBg: "bg-white border-zinc-200",
      heroBg: "bg-zinc-50 border-zinc-200",
      cardBg: "bg-white border-zinc-200",
      accent: "bg-zinc-900",
      textColor: "text-zinc-900",
      isDark: false,
    },
  },
  {
    id: "Dark",
    title: "Dark",
    description: "Sleek obsidian background with soft white borders and electric neon highlights.",
    badge: "High Contrast",
    style: {
      navBg: "bg-zinc-950 border-zinc-800",
      heroBg: "bg-zinc-900 border-zinc-800",
      cardBg: "bg-zinc-950 border-zinc-800",
      accent: "bg-white",
      textColor: "text-white",
      isDark: true,
    },
  },
  {
    id: "Blue White",
    title: "Blue White",
    description: "Classic SaaS palette featuring clean white layouts and vibrant ocean blue accents.",
    badge: "Popular SaaS",
    style: {
      navBg: "bg-white border-blue-100",
      heroBg: "bg-blue-50/60 border-blue-100",
      cardBg: "bg-white border-blue-100",
      accent: "bg-blue-600",
      textColor: "text-zinc-900",
      isDark: false,
    },
  },
  {
    id: "Corporate",
    title: "Corporate",
    description: "Formal enterprise theme with deep navy header, slate gray sections, and refined look.",
    badge: "Enterprise",
    style: {
      navBg: "bg-slate-900 border-slate-800",
      heroBg: "bg-slate-50 border-slate-200",
      cardBg: "bg-white border-slate-200",
      accent: "bg-slate-900",
      textColor: "text-slate-900",
      isDark: false,
    },
  },
  {
    id: "Startup",
    title: "Startup",
    description: "Vibrant high-energy theme with bold coral accents and modern rounded corners.",
    badge: "High Energy",
    style: {
      navBg: "bg-white border-orange-100",
      heroBg: "bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-200",
      cardBg: "bg-white border-orange-100",
      accent: "bg-orange-600",
      textColor: "text-zinc-900",
      isDark: false,
    },
  },
  {
    id: "Minimal",
    title: "Minimal",
    description: "Monochrome minimalism focusing purely on typography, whitespace, and sharp lines.",
    badge: "Editorial",
    style: {
      navBg: "bg-zinc-100 border-zinc-300",
      heroBg: "bg-white border-zinc-300",
      cardBg: "bg-zinc-50 border-zinc-300",
      accent: "bg-zinc-950",
      textColor: "text-zinc-900",
      isDark: false,
    },
  },
  {
    id: "Luxury",
    title: "Luxury",
    description: "Rich dark theme enhanced with warm champagne gold accents and velvet shadows.",
    badge: "Premium Gold",
    style: {
      navBg: "bg-zinc-950 border-amber-900/40",
      heroBg: "bg-zinc-900 border-amber-900/40",
      cardBg: "bg-zinc-950 border-amber-900/40",
      accent: "bg-amber-500",
      textColor: "text-amber-100",
      isDark: true,
    },
  },
  {
    id: "Glass",
    title: "Glass",
    description: "Modern glassmorphism featuring translucent panels, soft blur effects, and glowing shadows.",
    badge: "Modern UI",
    style: {
      navBg: "bg-white/70 backdrop-blur border-zinc-200",
      heroBg: "bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border-indigo-100",
      cardBg: "bg-white/80 border-indigo-100",
      accent: "bg-indigo-600",
      textColor: "text-zinc-900",
      isDark: false,
    },
  },
  {
    id: "Gradient",
    title: "Gradient",
    description: "Futuristic theme with vivid multi-color gradient heroes and dynamic border glows.",
    badge: "Futuristic",
    style: {
      navBg: "bg-zinc-950 border-purple-900/40",
      heroBg: "bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-blue-900/40 border-purple-800/40",
      cardBg: "bg-zinc-900 border-purple-800/40",
      accent: "bg-gradient-to-r from-purple-500 to-indigo-500",
      textColor: "text-white",
      isDark: true,
    },
  },
];

export function ThemeSelector() {
  const { selectedTheme, selectTheme } = useWebsiteGeneratorStore();

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Step 3: Choose Visual Theme
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Select a design system theme complete with navigation, hero, card, and footer micro-previews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {THEMES.map((theme) => {
          const isSelected = selectedTheme === theme.id;
          const { navBg, heroBg, cardBg, accent, isDark } = theme.style;

          return (
            <m.div
              key={theme.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectTheme(theme.id)}
              className={cn(
                "relative rounded-2xl border p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between select-none overflow-hidden",
                isSelected
                  ? "border-zinc-900 bg-white dark:bg-zinc-900 shadow-xl ring-2 ring-zinc-900 dark:ring-zinc-100"
                  : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {theme.title}
                    </h3>
                    {theme.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                        {theme.badge}
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
                  {theme.description}
                </p>

                {/* Micro UI Section Preview Container */}
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-2.5 space-y-2 bg-zinc-100/50 dark:bg-zinc-950/60">
                  {/* Nav Preview */}
                  <div className={cn("h-6 rounded-lg border px-2 flex items-center justify-between text-[10px]", navBg)}>
                    <div className="h-2 w-12 rounded bg-current opacity-30" />
                    <div className="flex gap-1.5">
                      <div className="h-1.5 w-6 rounded bg-current opacity-20" />
                      <div className="h-1.5 w-6 rounded bg-current opacity-20" />
                    </div>
                  </div>

                  {/* Hero Preview */}
                  <div className={cn("h-16 rounded-lg border p-2 flex flex-col justify-center space-y-1.5", heroBg)}>
                    <div className="h-2.5 w-3/4 rounded bg-current opacity-40" />
                    <div className="h-1.5 w-1/2 rounded bg-current opacity-20" />
                    <div className={cn("h-4 w-14 rounded-md mt-1", accent)} />
                  </div>

                  {/* Cards & Footer Preview */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className={cn("h-10 rounded-lg border p-1.5 space-y-1", cardBg)}>
                      <div className="h-2 w-full rounded bg-current opacity-30" />
                      <div className="h-1.5 w-2/3 rounded bg-current opacity-20" />
                    </div>
                    <div className={cn("h-10 rounded-lg border p-1.5 flex flex-col justify-between", navBg)}>
                      <div className="h-1.5 w-full rounded bg-current opacity-20" />
                      <div className="h-1.5 w-1/2 rounded bg-current opacity-30" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"}>
                  {isSelected ? "Theme Selected" : "Select Theme"}
                </span>
                <Sparkles className={cn("h-4 w-4", isSelected ? "text-amber-500" : "text-zinc-300")} />
              </div>
            </m.div>
          );
        })}
      </div>
    </m.div>
  );
}
