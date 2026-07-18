"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/skeleton";

function WizardSkeleton() {
  return (
    <div className="space-y-5 rounded-2xl border border-border bg-card p-8">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-40 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
}

export const ProjectWizard = dynamic(
  () => import("@/components/contact-project-wizard").then((m) => m.ProjectWizard),
  { loading: () => <WizardSkeleton /> },
);
