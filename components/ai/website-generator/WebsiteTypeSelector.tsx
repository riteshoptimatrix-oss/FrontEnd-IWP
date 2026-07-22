"use client";

import React from "react";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { TemplateRegistry } from "@/lib/templates/registry";
import { CATEGORY_ICON_MAP } from "@/lib/templates/design-system";
import { Building, CheckCircle2 } from "lucide-react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const registeredTemplates = TemplateRegistry.getAllTemplates();

export function WebsiteTypeSelector() {
  const { selectedWebsiteType, selectWebsiteType } = useWebsiteGeneratorStore();

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="border-b border-zinc-200/80 dark:border-zinc-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Step 2: Select Category Architecture
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Choose from 30+ Enterprise Template Registries tailored for your specific industry UX.
          </p>
        </div>
        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
          {registeredTemplates.length} Templates Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {registeredTemplates.map((template) => {
          const Icon = CATEGORY_ICON_MAP[template.id] || Building;
          const isSelected =
            (selectedWebsiteType || "").toLowerCase().trim() === template.id ||
            (selectedWebsiteType || "").toLowerCase().trim() === template.title.toLowerCase().trim();

          return (
            <m.div
              key={template.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => selectWebsiteType(template.title)}
              className={cn(
                "relative flex flex-col justify-between p-5 rounded-2xl border cursor-pointer transition-all duration-200 select-none",
                isSelected
                  ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-md ring-1 ring-zinc-900 dark:ring-zinc-100"
                  : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center border shrink-0",
                      isSelected
                        ? "bg-white/10 text-white border-white/20 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border",
                        isSelected
                          ? "bg-white/15 text-white border-white/20 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700"
                          : "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                      )}
                    >
                      {template.tag}
                    </span>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />}
                  </div>
                </div>

                <h3 className="text-sm font-bold tracking-tight mb-1">{template.title}</h3>

                <p
                  className={cn(
                    "text-xs leading-relaxed line-clamp-2",
                    isSelected ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-400"
                  )}
                >
                  {template.description}
                </p>
              </div>

              <div
                className={cn(
                  "mt-4 pt-2.5 border-t text-[11px] font-medium flex items-center justify-between",
                  isSelected
                    ? "border-white/15 text-zinc-300 dark:border-zinc-800 dark:text-zinc-600"
                    : "border-zinc-100 dark:border-zinc-800 text-zinc-400"
                )}
              >
                <span>{template.pages.length} Pages Configured</span>
                <span>→</span>
              </div>
            </m.div>
          );
        })}
      </div>
    </m.div>
  );
}
