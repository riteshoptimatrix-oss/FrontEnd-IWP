"use client";

import * as React from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import {
  wizardBusinessTypes,
  wizardProjectTypes,
  wizardFeatures,
  wizardPageCounts,
  wizardBudgetRanges,
  wizardTimelines,
  wizardTechPreferences,
} from "@/lib/data";

interface WizardData {
  businessType: string;
  projectTypes: string[];
  features: string[];
  pageCount: string;
  budget: string;
  timeline: string;
  techStack: string[];
  notes: string;
}

const INITIAL: WizardData = {
  businessType: "",
  projectTypes: [],
  features: [],
  pageCount: "",
  budget: "",
  timeline: "",
  techStack: [],
  notes: "",
};

const STEPS = [
  "Business type",
  "Project type",
  "Features",
  "Pages",
  "Budget",
  "Timeline",
  "Review",
];

function ToggleChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200",
        selected
          ? "border-gold/40 bg-gold/10 text-gold shadow-sm"
          : "border-border/60 bg-card text-foreground/80 hover:border-gold/20 hover:bg-gold/5",
      )}
    >
      {label}
    </button>
  );
}

export function ProjectWizard({ className }: { className?: string }) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState<WizardData>(INITIAL);
  const [submitted, setSubmitted] = React.useState(false);

  const update = (key: keyof WizardData, value: unknown) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const toggleArrayItem = (key: "projectTypes" | "features" | "techStack", item: string) => {
    setData((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item],
      };
    });
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/5 to-transparent p-10 text-center",
          className,
        )}
        role="status"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-white shadow-sm">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h3 className="text-2xl font-semibold">Inquiry submitted!</h3>
        <p className="max-w-sm text-muted-foreground text-sm">
          This is a frontend demo. In production, our team would review your project
          details and reach out within one business day with a tailored proposal.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setData(INITIAL);
            setStep(0);
            setSubmitted(false);
          }}
        >
          Start another
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl border border-border/60 bg-card shadow-card overflow-hidden", className)}>
      {/* Progress bar */}
      <div className="border-b border-border/40 px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="text-xs text-muted-foreground">{STEPS[step]}</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden">
          <m.div
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-soft"
            initial={false}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(i)}
              className={cn(
                "hidden text-[10px] font-medium transition-colors sm:block",
                i === step ? "text-gold" : i < step ? "text-gold/60" : "text-muted-foreground/40",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="px-6 py-8 min-h-[320px]">
        <AnimatePresence mode="wait">
          <m.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-1">What type of business are you?</h3>
                <p className="text-sm text-muted-foreground mb-6">Select one to help us tailor our approach.</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {wizardBusinessTypes.map((bt) => (
                    <button
                      key={bt.id}
                      type="button"
                      onClick={() => update("businessType", bt.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200",
                        data.businessType === bt.id
                          ? "border-gold/40 bg-gold/10 shadow-sm"
                          : "border-border/60 bg-background hover:border-gold/20 hover:bg-gold/5",
                      )}
                    >
                      <bt.icon className={cn("size-5", data.businessType === bt.id ? "text-gold" : "text-muted-foreground")} />
                      <span className="text-sm font-medium">{bt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-1">What are you building?</h3>
                <p className="text-sm text-muted-foreground mb-6">Select all that apply.</p>
                <div className="flex flex-wrap gap-2">
                  {wizardProjectTypes.map((pt) => (
                    <ToggleChip
                      key={pt}
                      label={pt}
                      selected={data.projectTypes.includes(pt)}
                      onClick={() => toggleArrayItem("projectTypes", pt)}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold mb-1">What features do you need?</h3>
                <p className="text-sm text-muted-foreground mb-6">Select all that apply.</p>
                <div className="flex flex-wrap gap-2">
                  {wizardFeatures.map((f) => (
                    <ToggleChip
                      key={f}
                      label={f}
                      selected={data.features.includes(f)}
                      onClick={() => toggleArrayItem("features", f)}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold mb-1">How many pages do you estimate?</h3>
                <p className="text-sm text-muted-foreground mb-6">Pick the closest range.</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {wizardPageCounts.map((pc) => (
                    <button
                      key={pc}
                      type="button"
                      onClick={() => update("pageCount", pc)}
                      className={cn(
                        "rounded-xl border p-4 text-left text-sm font-medium transition-all duration-200",
                        data.pageCount === pc
                          ? "border-gold/40 bg-gold/10 shadow-sm text-gold"
                          : "border-border/60 bg-background hover:border-gold/20 hover:bg-gold/5",
                      )}
                    >
                      {pc}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="text-lg font-semibold mb-1">What&apos;s your budget range?</h3>
                <p className="text-sm text-muted-foreground mb-6">This helps us recommend the right scope.</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {wizardBudgetRanges.map((br) => (
                    <button
                      key={br}
                      type="button"
                      onClick={() => update("budget", br)}
                      className={cn(
                        "rounded-xl border p-4 text-left text-sm font-medium transition-all duration-200",
                        data.budget === br
                          ? "border-gold/40 bg-gold/10 shadow-sm text-gold"
                          : "border-border/60 bg-background hover:border-gold/20 hover:bg-gold/5",
                      )}
                    >
                      {br}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="text-lg font-semibold mb-1">What&apos;s your ideal timeline?</h3>
                <p className="text-sm text-muted-foreground mb-6">Choose what fits best.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {wizardTimelines.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => update("timeline", t.id)}
                      className={cn(
                        "flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200",
                        data.timeline === t.id
                          ? "border-gold/40 bg-gold/10 shadow-sm"
                          : "border-border/60 bg-background hover:border-gold/20 hover:bg-gold/5",
                      )}
                    >
                      <t.icon className={cn("mt-0.5 size-5 shrink-0", data.timeline === t.id ? "text-gold" : "text-muted-foreground")} />
                      <div>
                        <span className="block text-sm font-medium">{t.label}</span>
                        <span className="block text-xs text-muted-foreground">{t.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h3 className="text-lg font-semibold mb-1">Review & submit</h3>
                <p className="text-sm text-muted-foreground mb-6">Check your details and add any final notes.</p>

                {/* Tech preferences */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3">Preferred technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {wizardTechPreferences.map((tp) => (
                      <ToggleChip
                        key={tp.id}
                        label={tp.label}
                        selected={data.techStack.includes(tp.id)}
                        onClick={() => toggleArrayItem("techStack", tp.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-xl border border-border/40 bg-secondary/20 p-4 mb-6">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <FileText className="size-4 text-gold" />
                    Your inquiry summary
                  </h4>
                  <dl className="grid gap-2 text-sm">
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground w-28 shrink-0">Business</dt>
                      <dd className="font-medium">{wizardBusinessTypes.find((b) => b.id === data.businessType)?.label || "—"}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground w-28 shrink-0">Projects</dt>
                      <dd className="font-medium">{data.projectTypes.length ? data.projectTypes.join(", ") : "—"}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground w-28 shrink-0">Features</dt>
                      <dd className="font-medium">{data.features.length ? `${data.features.length} selected` : "—"}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground w-28 shrink-0">Pages</dt>
                      <dd className="font-medium">{data.pageCount || "—"}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground w-28 shrink-0">Budget</dt>
                      <dd className="font-medium">{data.budget || "—"}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground w-28 shrink-0">Timeline</dt>
                      <dd className="font-medium">{wizardTimelines.find((t) => t.id === data.timeline)?.label || "—"}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground w-28 shrink-0">Tech</dt>
                      <dd className="font-medium">{data.techStack.length ? data.techStack.map((t) => wizardTechPreferences.find((tp) => tp.id === t)?.label).join(", ") : "No preference"}</dd>
                    </div>
                  </dl>
                </div>

                {/* Notes */}
                <div className="relative">
                  <textarea
                    id="wizard-notes"
                    rows={3}
                    value={data.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Anything else you'd like us to know?"
                    className="peer w-full rounded-xl border border-input bg-background px-4 pt-6 pb-3 text-sm text-foreground transition-all duration-200 placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-gold/50 resize-y"
                  />
                  <label
                    htmlFor="wizard-notes"
                    className="pointer-events-none absolute left-4 top-4 text-sm text-muted-foreground transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    Additional notes <span className="text-muted-foreground/60">(optional)</span>
                  </label>
                </div>
              </div>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border/40 px-6 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={prev}
          disabled={step === 0}
          className={cn(step === 0 && "invisible")}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        {step < STEPS.length - 1 ? (
          <Button variant="gold" size="sm" onClick={next}>
            Next
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button variant="gold" size="sm" onClick={handleSubmit}>
            <Sparkles className="size-4" />
            Submit inquiry
          </Button>
        )}
      </div>
    </div>
  );
}
