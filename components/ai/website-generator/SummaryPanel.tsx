"use client";

import React, { useState } from "react";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { WizardStepNumber } from "@/types/website-generator";
import {
  Building2,
  Globe,
  Palette,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  PieChart,
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function SummaryPanel() {
  const {
    businessInfo,
    selectedWebsiteType,
    selectedTheme,
    selectedFeatures,
    calculateProgress,
    getMissingRequiredFields,
    setStep,
  } = useWebsiteGeneratorStore();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const progress = calculateProgress();
  const missingFields = getMissingRequiredFields();

  if (!mounted) return null;

  const handleJumpToField = (stepNum: WizardStepNumber) => {
    setStep(stepNum);
    setIsMobileOpen(false);
  };

  const summaryContent = (
    <div className="space-y-5">
      {/* Header & Completion Percentage */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <PieChart className="h-4 w-4 text-blue-600" />
            <span>Wizard Completion</span>
          </span>
          <span className="text-xs font-extrabold text-blue-600">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <m.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
          />
        </div>
      </div>

      {/* Summary Groups */}
      <div className="space-y-4 text-xs">
        {/* Business Info */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-blue-600" />
              Company
            </span>
            <button
              type="button"
              onClick={() => handleJumpToField(1)}
              className="text-[11px] font-bold text-blue-600 hover:underline"
            >
              Edit
            </button>
          </div>
          <p className="font-extrabold text-slate-900 truncate">
            {businessInfo.companyName || <span className="text-slate-400 font-normal italic">Not specified</span>}
          </p>
          <p className="text-[11px] text-slate-500">
            {businessInfo.category}
          </p>
        </div>

        {/* Website Type */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-blue-600" />
              Website Type
            </span>
            <button
              type="button"
              onClick={() => handleJumpToField(2)}
              className="text-[11px] font-bold text-blue-600 hover:underline"
            >
              Edit
            </button>
          </div>
          <p className="font-bold text-slate-900">
            {selectedWebsiteType}
          </p>
        </div>

        {/* Theme */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 text-blue-600" />
              Visual Theme
            </span>
            <button
              type="button"
              onClick={() => handleJumpToField(3)}
              className="text-[11px] font-bold text-blue-600 hover:underline"
            >
              Edit
            </button>
          </div>
          <p className="font-bold text-blue-600">
            {selectedTheme} Theme
          </p>
        </div>

        {/* Features Count */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              Selected Features
            </span>
            <button
              type="button"
              onClick={() => handleJumpToField(4)}
              className="text-[11px] font-bold text-blue-600 hover:underline"
            >
              Edit
            </button>
          </div>
          <p className="font-extrabold text-slate-900">
            {selectedFeatures.length} Features Enabled
          </p>
        </div>
      </div>

      {/* Validation Checklist / Readiness Notice */}
      {missingFields.length > 0 ? (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Missing Required Information</span>
          </div>
          <ul className="list-disc list-inside text-[11px] text-amber-800 space-y-0.5 pt-1">
            {missingFields.map((f, idx) => (
              <li key={idx}>{typeof f === 'string' ? f : f.label}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900 flex items-center gap-2 font-bold">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>All required fields complete & ready!</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Summary Panel */}
      <aside className="hidden lg:block w-80 shrink-0">
        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 pb-3 border-b border-slate-200 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            Live Summary
          </h3>
          {summaryContent}
        </div>
      </aside>

      {/* Mobile Collapsible Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-4 shadow-xl">
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-900"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span>Summary & Progress ({progress}%)</span>
          </div>
          {isMobileOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>

        <AnimatePresence>
          {isMobileOpen && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-slate-200 overflow-hidden"
            >
              {summaryContent}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
