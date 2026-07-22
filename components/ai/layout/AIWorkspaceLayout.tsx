"use client";

import React, { useEffect } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { WorkspaceHeader } from "./WorkspaceHeader";
import { ResponsiveDrawer } from "./ResponsiveDrawer";
import { useAIWorkspaceStore } from "@/store/ai-workspace-store";
import { useAuthStore } from "@/lib/auth-store";
import { m } from "framer-motion";

interface AIWorkspaceLayoutProps {
  children: React.ReactNode;
}

export function AIWorkspaceLayout({ children }: AIWorkspaceLayoutProps) {
  const { isSidebarOpen } = useAIWorkspaceStore();
  const { fetchMe, user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      fetchMe();
    }
  }, []);

  return (
    <div className="flex flex-1 w-full relative">
      {/* Desktop/Tablet Sidebar */}
      <Sidebar />

      {/* Mobile Drawer Overlay */}
      <ResponsiveDrawer />

      {/* Main Content Area */}
      <m.div
        initial={false}
        className="flex-1 flex flex-col min-h-full w-full transition-all duration-300"
      >
        {/* Workspace Header (ONE) removed */}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

      </m.div>
    </div>
  );
}
