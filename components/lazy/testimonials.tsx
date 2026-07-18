"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/skeleton";

function TestimonialsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-48 w-full rounded-2xl" />
      ))}
    </div>
  );
}

export const Testimonials = dynamic(
  () => import("@/components/testimonials").then((m) => m.Testimonials),
  { loading: () => <TestimonialsSkeleton /> },
);
