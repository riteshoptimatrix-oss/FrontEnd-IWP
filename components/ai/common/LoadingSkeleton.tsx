"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export function LoadingSkeleton({ className, count = 1 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "animate-pulse rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/60",
            className
          )}
        />
      ))}
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <LoadingSkeleton className="h-10 w-10 rounded-xl" />
        <LoadingSkeleton className="h-6 w-16 rounded-full" />
      </div>
      <LoadingSkeleton className="h-5 w-3/4 rounded-md" />
      <LoadingSkeleton className="h-4 w-full rounded-md" />
      <LoadingSkeleton className="h-4 w-2/3 rounded-md" />
    </div>
  );
}
