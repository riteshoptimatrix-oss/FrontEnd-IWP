"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAIWorkspaceStore } from "@/store/ai-workspace-store";

export function useAIWorkspace() {
  const pathname = usePathname();
  const {
    isSidebarOpen,
    setSidebarOpen,
    isMobileDrawerOpen,
    setMobileDrawerOpen,
    searchQuery,
    setSearchQuery,
  } = useAIWorkspaceStore();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;

      setIsMobile(mobile);
      setIsTablet(tablet);

      if (mobile) {
        setSidebarOpen(false);
      } else if (tablet) {
        setSidebarOpen(false); // Tablet auto-collapse
      } else {
        setSidebarOpen(true); // Desktop expanded
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMobileDrawerOpen) {
          setMobileDrawerOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileDrawerOpen, setMobileDrawerOpen]);

  return {
    pathname,
    isMobile,
    isTablet,
    isSidebarOpen,
    setSidebarOpen,
    isMobileDrawerOpen,
    setMobileDrawerOpen,
    searchQuery,
    setSearchQuery,
  };
}
