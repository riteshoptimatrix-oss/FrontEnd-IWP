"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Returns a matcher that determines whether a given href is the active route.
 * - Exact match for the home route ("/").
 * - Prefix match for nested routes (e.g. "/services" matches "/services/website-development").
 */
export function useActivePath(): (href: string) => boolean {
  const pathname = usePathname();

  return React.useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );
}
