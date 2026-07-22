"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Globe,
  Download,
  History,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { useAIWorkspaceStore } from "@/store/ai-workspace-store";
import { NavItem } from "@/types/ai";

const menuItems: NavItem[] = [
  { name: "Dashboard", href: "/ai/dashboard", icon: LayoutDashboard },
  { name: "Website Generator", href: "/ai/website-generator", icon: Globe },
  { name: "Downloads", href: "/ai/downloads", icon: Download },
  { name: "History", href: "/ai/history", icon: History },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useAIWorkspaceStore();

  return (
    <aside
      aria-label="Workspace Sidebar"
      className="hidden md:flex flex-col sticky top-16 lg:top-[76px] h-[calc(100vh-64px)] lg:h-[calc(100vh-76px)] z-40 bg-background border-r border-border transition-all duration-300 select-none text-foreground shrink-0"
      style={{ width: isSidebarOpen ? "256px" : "72px" }}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border shrink-0 bg-background">
        <Link
          href="/ai/dashboard"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/30">
            <Sparkles className="h-5 w-5" />
          </div>

          <AnimatePresence initial={false}>
            {isSidebarOpen && (
              <m.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="font-extrabold text-foreground text-sm tracking-tight block">
                  IWP AI Suite
                </span>
                <span className="text-[10px] text-blue-600 font-bold tracking-wide uppercase block -mt-0.5">
                  Production Workspace
                </span>
              </m.div>
            )}
          </AnimatePresence>
        </Link>

        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeftOpen className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 bg-background">
        {menuItems.map((item) => {
          const isActive =
            item.href === "/ai/dashboard"
              ? pathname === "/ai/dashboard" || pathname === "/ai"
              : pathname.startsWith(item.href);

          return (
            <SidebarItem
              key={item.href}
              item={item}
              isActive={isActive}
              isCollapsed={!isSidebarOpen}
            />
          );
        })}
      </nav>

      {/* Footer info badge */}
      {isSidebarOpen && (
        <div className="p-3 border-t border-border shrink-0 bg-background">
          <div className="rounded-xl bg-muted p-3 border border-border">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-foreground">
                Production
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium mt-1">
              Workspace Active
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
