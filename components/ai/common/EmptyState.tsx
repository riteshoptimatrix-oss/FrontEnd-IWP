"use client";

import React, { ComponentType } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { FolderArchive, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = FolderArchive,
  title,
  description,
  actionText,
  actionHref,
  action,
  className,
}: EmptyStateProps) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto my-6 shadow-sm text-slate-900",
        className
      )}
    >
      <div className="h-14 w-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 text-blue-600 shadow-sm">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 tracking-tight">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md leading-relaxed">
        {description}
      </p>

      {actionText && actionHref ? (
        <div className="mt-6 flex items-center justify-center">
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            {actionText}
          </Link>
        </div>
      ) : (
        action && <div className="mt-6 flex items-center justify-center">{action}</div>
      )}
    </m.div>
  );
}
