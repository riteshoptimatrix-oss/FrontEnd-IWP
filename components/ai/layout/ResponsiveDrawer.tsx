"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  LayoutDashboard,
  Globe,
  Download,
  History,
} from "lucide-react";
import { useAIWorkspaceStore } from "@/store/ai-workspace-store";
import { NavItem } from "@/types/ai";

const menuItems: NavItem[] = [
  { name: "Dashboard", href: "/ai/dashboard", icon: LayoutDashboard },
  { name: "Website Generator", href: "/ai/website-generator", icon: Globe },
  { name: "Downloads", href: "/ai/downloads", icon: Download },
  { name: "History", href: "/ai/history", icon: History },
];

export function ResponsiveDrawer() {
  const pathname = usePathname();
  const { isMobileDrawerOpen, setMobileDrawerOpen } = useAIWorkspaceStore();

  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  return (
    <AnimatePresence>
      {isMobileDrawerOpen && (
        <div className="fixed top-16 lg:top-[76px] bottom-0 left-0 right-0 z-40 md:hidden flex">
          {/* Backdrop Overlay */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed top-16 lg:top-[76px] bottom-0 left-0 right-0 bg-zinc-950/60 backdrop-blur-sm"
          />

          {/* Drawer Slide-in Panel */}
          <m.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="relative flex flex-col w-4/5 max-w-xs h-full bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold shadow-sm">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                  AI Workspace
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close mobile navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/ai/dashboard"
                    ? pathname === "/ai/dashboard" || pathname === "/ai"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-400 text-center">
              India Web Programmers AI
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
