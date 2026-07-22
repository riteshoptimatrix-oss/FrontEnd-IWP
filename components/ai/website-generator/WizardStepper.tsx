"use client";

import React from "react";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { WizardStepNumber } from "@/types/website-generator";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS: { number: WizardStepNumber; label: string }[] = [
  { number: 1, label: "Business Info" },
  { number: 2, label: "Website Type" },
  { number: 3, label: "Theme" },
  { number: 4, label: "Features" },
  { number: 5, label: "Review" },
];

export function WizardStepper() {
  const { step: currentStep, setStep, validateCurrentStep } = useWebsiteGeneratorStore();

  const handleStepClick = (targetStep: WizardStepNumber) => {
    // Can always go backwards or to next if current step valid
    if (targetStep < currentStep) {
      setStep(targetStep);
    } else if (targetStep === currentStep + 1) {
      if (validateCurrentStep()) {
        setStep(targetStep);
      }
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Desktop & Tablet Stepper */}
      <nav aria-label="Wizard Steps Progress" className="w-full">
        <ol className="flex items-center justify-between w-full">
          {STEPS.map((s, idx) => {
            const isCompleted = s.number < currentStep;
            const isActive = s.number === currentStep;

            return (
              <li
                key={s.number}
                className="flex-1 flex items-center relative group"
              >
                {/* Step Connector Line */}
                {idx > 0 && (
                  <div
                    className={cn(
                      "absolute top-4 left-[-50%] right-[50%] h-0.5 transition-colors duration-300 z-0",
                      isCompleted || isActive
                        ? "bg-zinc-900 dark:bg-zinc-100"
                        : "bg-zinc-200 dark:bg-zinc-800"
                    )}
                  />
                )}

                <button
                  type="button"
                  onClick={() => handleStepClick(s.number)}
                  disabled={s.number > currentStep + 1}
                  className={cn(
                    "relative z-10 flex flex-col items-center mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full p-1 transition-all select-none",
                    s.number > currentStep + 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                  )}
                >
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 shadow-sm",
                      isCompleted
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : isActive
                        ? "bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950"
                        : "bg-white dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800"
                    )}
                  >
                    {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : s.number}
                  </div>

                  <span
                    className={cn(
                      "text-[11px] font-semibold mt-1.5 hidden sm:block whitespace-nowrap transition-colors",
                      isActive
                        ? "text-zinc-900 dark:text-zinc-100 font-bold"
                        : isCompleted
                        ? "text-zinc-700 dark:text-zinc-300"
                        : "text-zinc-400"
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
