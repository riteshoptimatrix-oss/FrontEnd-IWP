"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/skeleton";

function PricingSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-96 w-full rounded-2xl" />
      ))}
    </div>
  );
}

export const Pricing = dynamic(
  () => import("@/components/pricing").then((m) => m.Pricing),
  { loading: () => <PricingSkeleton /> },
);
