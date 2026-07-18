"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/skeleton";

function FormSkeleton() {
  return (
    <div className="space-y-5 rounded-2xl border border-border bg-card p-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
      <Skeleton className="h-12 w-40" />
    </div>
  );
}

export const SmartContactForm = dynamic(
  () => import("@/components/contact-smart-form").then((m) => m.SmartContactForm),
  { loading: () => <FormSkeleton /> },
);
