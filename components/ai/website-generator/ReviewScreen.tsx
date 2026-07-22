"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { startGenerationJob, getBuildProgress } from "@/lib/website-generator-api";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { WizardStepNumber } from "@/types/website-generator";
import {
  Building2,
  Phone,
  MapPin,
  Globe,
  Palette,
  CheckCircle2,
  Edit3,
  Lock,
  Sparkles,
  Mail,
  Clock,
  ShieldCheck,
  Loader2,
  Zap,
} from "lucide-react";
import { TemplateRegistry } from "@/lib/templates/registry";
import { getThemeTokens } from "@/lib/templates/theme-engine";

export function ReviewScreen() {
  const {
    businessInfo,
    selectedWebsiteType,
    selectedTheme,
    selectedFeatures,
    setStep,
    clearDraft,
  } = useWebsiteGeneratorStore();

  const router = useRouter();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [progressMessage, setProgressMessage] = React.useState("");
  const [progressPercentage, setProgressPercentage] = React.useState(0);
  const [error, setError] = React.useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError("");
    setProgressMessage("Starting engine...");
    setProgressPercentage(5);

    try {
      const payload = {
        businessInfo,
        websiteType: selectedWebsiteType,
        theme: selectedTheme,
        selectedFeatures,
      };

      const startRes = await startGenerationJob(payload);
      if (!startRes) throw new Error("Failed to start generation job");

      const jobId = startRes.job_id;

      const pollInterval = setInterval(async () => {
        const progress = await getBuildProgress(jobId);
        if (progress) {
          setProgressMessage(progress.progress_message);
          setProgressPercentage(progress.progress_percentage);

          if (progress.status === "COMPLETED") {
            clearInterval(pollInterval);
            clearDraft();
            router.push("/ai/downloads");
          } else if (progress.status === "FAILED") {
            clearInterval(pollInterval);
            setIsGenerating(false);
            setError(progress.error_message || "Generation failed.");
          }
        }
      }, 1500);
    } catch (err: any) {
      setIsGenerating(false);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  const activeTemplate = TemplateRegistry.getTemplate(selectedWebsiteType || "");
  const activeThemeTokens = getThemeTokens(selectedTheme as any);

  const handleEditStep = (stepNum: WizardStepNumber) => {
    setStep(stepNum);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="border-b border-zinc-200/80 dark:border-zinc-800 pb-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Step 5: Review & Confirmation
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Review your website configuration parameters before initiating future code generation runs.
        </p>
      </div>

      {/* Grid of Summary Blocks */}
      <div className="space-y-6">
        {/* Block 1: Business Overview */}
        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                Business Details
              </h3>
            </div>
            <button
              type="button"
              onClick={() => handleEditStep(1)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-zinc-400 block mb-0.5">Company Name</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                {businessInfo.companyName || "Not provided"}
              </span>
            </div>

            <div>
              <span className="text-zinc-400 block mb-0.5">Category</span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {businessInfo.category || "Not specified"}
              </span>
            </div>

            <div className="sm:col-span-2">
              <span className="text-zinc-400 block mb-0.5">Description</span>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {businessInfo.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>

        {/* Block 2: Contact & Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Contact */}
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                  Contact Channels
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleEditStep(1)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Phone:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{businessInfo.phone || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Email:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{businessInfo.email || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">WhatsApp:</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{businessInfo.whatsapp || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Hours:</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{businessInfo.workingHours || "—"}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                  Address & Location
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleEditStep(1)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-zinc-400 block mb-0.5">Address:</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{businessInfo.fullAddress || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">City / State:</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {businessInfo.city ? `${businessInfo.city}, ${businessInfo.state}` : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Pincode:</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{businessInfo.pincode || "—"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Block 3: Website Type & Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Website Type */}
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                  Website Type
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleEditStep(2)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm shrink-0 border border-amber-200 dark:border-amber-900/40">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
                  {selectedWebsiteType || "Not selected"}
                </span>
                <span className="text-[11px] text-zinc-500">Single selection architecture category</span>
              </div>
            </div>
          </div>

          {/* Theme */}
          <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                  Selected Theme
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleEditStep(3)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-200 dark:border-indigo-900/40">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 block">
                  {selectedTheme || "Not selected"}
                </span>
                <span className="text-[11px] text-zinc-500">Visual design token preset ({activeThemeTokens.isDark ? "Dark Mode" : "Light Mode"})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Template & Page Builder Manifest */}
        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                {activeTemplate.title} Template Manifest
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              {activeTemplate.tag} Design System
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-zinc-400 block mb-1.5 font-medium">Pages to be Built ({activeTemplate.pages.length}):</span>
              <div className="flex flex-wrap gap-1.5">
                {activeTemplate.pages.map((p) => (
                  <span key={p.id} className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-[11px] border border-zinc-200 dark:border-zinc-700">
                    {p.filename}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-zinc-400 block mb-1.5 font-medium">Specialized Category UX Modules:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeTemplate.categoryUX.specializedComponents.map((comp) => (
                  <span key={comp} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300 font-semibold text-[11px] border border-emerald-200 dark:border-emerald-800">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Block 4: Selected Features */}
        <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                Enabled Features ({selectedFeatures.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => handleEditStep(4)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {selectedFeatures.map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium border border-zinc-200 dark:border-zinc-700"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>{feat}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Final CTA Bar */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white p-6 sm:p-8 shadow-xl">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                ) : (
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                )}
                <span>{isGenerating ? "Generation in Progress" : "Configuration Complete"}</span>
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">
                {isGenerating ? progressMessage : "Ready for Generation Engine"}
              </h4>

              {isGenerating ? (
                <div className="mt-3 max-w-md">
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <m.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ ease: "easeOut" }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                  <div className="mt-2 text-right text-xs text-blue-400 font-medium">
                    {progressPercentage}%
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-400 mt-1 max-w-lg">
                  Your website specifications and design preferences have been validated and saved. Click below to start the build.
                </p>
              )}
            </div>

            {!isGenerating && (
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 text-sm font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] w-full sm:w-auto"
                >
                  <Zap className="h-4 w-4" />
                  <span>Start Generation</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </m.div>
  );
}
