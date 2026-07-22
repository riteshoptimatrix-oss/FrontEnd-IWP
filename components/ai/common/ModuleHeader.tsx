"use client";

import React, { ComponentType } from "react";
import { m } from "framer-motion";

interface ModuleHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  icon?: ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}

export function ModuleHeader({
  title,
  subtitle,
  description,
  badge,
  icon: Icon,
  action,
}: ModuleHeaderProps) {
  const descText = subtitle || description || "";

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm backdrop-blur-xl transition-all text-slate-900">
      <m.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-sm shrink-0">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                {title}
              </h1>
              {badge && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {badge}
                </span>
              )}
            </div>
            {descText && (
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {descText}
              </p>
            )}
          </div>
        </div>

        {action && <div className="shrink-0 flex items-center gap-3">{action}</div>}
      </m.div>
    </div>
  );
}
