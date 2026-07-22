"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const getDisplayName = (segment: string) => {
    switch (segment.toLowerCase()) {
      case "ai":
        return "Workspace";
      case "website-generator":
        return "Website Generator";
      default:
        return segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-sm font-medium">
      <ol className="flex items-center gap-1.5 sm:gap-2 text-zinc-500 dark:text-zinc-400">
        <li className="flex items-center">
          <Link
            href="/ai/dashboard"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Dashboard Home</span>
          </Link>
        </li>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const label = getDisplayName(segment);

          return (
            <li key={href} className="flex items-center gap-1.5 sm:gap-2">
              <ChevronRight className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600 shrink-0" />
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-[140px] sm:max-w-[220px]"
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors truncate max-w-[120px] sm:max-w-[180px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md p-1"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
