"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";

export function GlobalFooter() {
  const pathname = usePathname();

  // Hide root footer on AI workspace routes because AIWorkspaceLayout handles its own padded footer
  if (pathname?.startsWith("/ai")) {
    return null;
  }

  return <Footer />;
}
