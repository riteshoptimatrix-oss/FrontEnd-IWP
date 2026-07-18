"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/skeleton";

function SchedulerSkeleton() {
  return (
    <div className="space-y-5 rounded-2xl border border-border bg-card p-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
}

export const MeetingScheduler = dynamic(
  () => import("@/components/contact-meeting-scheduler").then((m) => m.MeetingScheduler),
  { loading: () => <SchedulerSkeleton /> },
);
