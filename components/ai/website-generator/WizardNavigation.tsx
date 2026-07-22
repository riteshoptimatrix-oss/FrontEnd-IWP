"use client";

import React from "react";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { ArrowLeft, ArrowRight, Save, Trash2, CheckCircle2 } from "lucide-react";

export function WizardNavigation() {
  const {
    step,
    nextStep,
    prevStep,
    saveDraft,
    setIsDraftModalOpen,
    draftSavedAt,
  } = useWebsiteGeneratorStore();

  return (
    <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-zinc-200/80 dark:border-zinc-800">
      {/* Draft Controls */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={saveDraft}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Save className="h-3.5 w-3.5" />
          <span>Save Draft</span>
        </button>

        <button
          type="button"
          onClick={() => setIsDraftModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear Draft</span>
        </button>

        {draftSavedAt && (
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-zinc-400">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
            <span>Saved {draftSavedAt}</span>
          </span>
        )}
      </div>

      {/* Primary Navigation Buttons */}
      <div className="flex items-center gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-zinc-800 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
        )}

        {step < 5 && (
          <button
            type="button"
            onClick={nextStep}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>Continue to Step {step + 1}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
