"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/skeleton";

function TeamGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}

export const TeamGrid = dynamic(
  () => import("@/components/team-grid").then((m) => m.TeamGrid),
  { loading: () => <TeamGridSkeleton /> },
);
