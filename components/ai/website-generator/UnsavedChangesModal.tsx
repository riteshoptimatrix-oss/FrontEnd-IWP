"use client";

import React from "react";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { AlertTriangle, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

export function UnsavedChangesModal() {
  const { isDraftModalOpen, setIsDraftModalOpen, clearDraft } =
    useWebsiteGeneratorStore();

  return (
    <AnimatePresence>
      {isDraftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDraftModalOpen(false)}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="relative w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl z-10 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-900/40">
                <AlertTriangle className="h-5 w-5" />
              </div>

              <button
                type="button"
                onClick={() => setIsDraftModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Clear Wizard Draft Data?
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                This action will reset all form fields, website type selections, chosen themes, and selected features back to default empty states. This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setIsDraftModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-colors"
              >
                Keep Draft
              </button>

              <button
                type="button"
                onClick={clearDraft}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
              >
                Yes, Clear Draft
              </button>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
