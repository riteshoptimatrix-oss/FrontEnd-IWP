"use client";

import React from "react";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { WizardStepper } from "./WizardStepper";
import { WizardNavigation } from "./WizardNavigation";
import { SummaryPanel } from "./SummaryPanel";
import { BusinessInformationForm } from "./BusinessInformationForm";
import { WebsiteTypeSelector } from "./WebsiteTypeSelector";
import { ThemeSelector } from "./ThemeSelector";
import { FeatureSelector } from "./FeatureSelector";
import { ReviewScreen } from "./ReviewScreen";
import { UnsavedChangesModal } from "./UnsavedChangesModal";
import { AnimatePresence } from "framer-motion";

export function Wizard() {
  const { step } = useWebsiteGeneratorStore();

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return <BusinessInformationForm />;
      case 2:
        return <WebsiteTypeSelector />;
      case 3:
        return <ThemeSelector />;
      case 4:
        return <FeatureSelector />;
      case 5:
        return <ReviewScreen />;
      default:
        return <BusinessInformationForm />;
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-24 lg:pb-16 text-slate-900">
      {/* Wizard Header Bar & Stepper */}
      <div className="border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 py-6 shadow-sm sticky top-14 z-20 transition-colors">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                Enterprise Website Generator Wizard
              </h1>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                Configure business metadata, target architecture, visual theme, and interactive feature suites.
              </p>
            </div>
          </div>

          <WizardStepper />
        </div>
      </div>

      {/* Main Body Content: Step Form + Summary Panel */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Step Container */}
          <div className="flex-1 space-y-8 min-w-0">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <AnimatePresence mode="wait">
                <React.Fragment key={step}>{renderStepComponent()}</React.Fragment>
              </AnimatePresence>

              <WizardNavigation />
            </div>
          </div>

          {/* Sticky Summary Panel */}
          <SummaryPanel />
        </div>
      </div>

      {/* Draft Reset Confirmation Modal */}
      <UnsavedChangesModal />
    </div>
  );
}
