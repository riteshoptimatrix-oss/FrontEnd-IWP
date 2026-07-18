"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/skeleton";

function PortfolioGridSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <Skeleton className="mx-auto h-10 w-64" />
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-full" />
        ))}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="aspect-video w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export const PortfolioGrid = dynamic(
  () => import("@/components/portfolio-grid").then((m) => m.PortfolioGrid),
  { loading: () => <PortfolioGridSkeleton /> },
);
