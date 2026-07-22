"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, User, Settings, Shield, Bell, Zap,
  ChevronLeft, ChevronRight, Menu, X, LogOut, Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth-store";
import { siteConfig } from "@/lib/site";

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Security", href: "/dashboard/security", icon: Shield },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "OptiMatrix Score", href: "/dashboard/optimatrix-score", icon: Zap },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const initials = user?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        className="fixed left-4 top-4 z-[70] flex size-10 items-center justify-center rounded-xl border border-border bg-white/90 shadow-sm backdrop-blur-lg lg:hidden dark:bg-ink/90"
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            className="fixed inset-0 z-[65] bg-black/30 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[68] lg:sticky lg:top-0 lg:h-screen lg:z-[60] flex-shrink-0 flex flex-col border-r border-border/50 bg-white/90 backdrop-blur-xl transition-all duration-300 ease-out dark:bg-ink/90",
          collapsed ? "w-[72px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className={cn("flex h-16 items-center border-b border-border/50", collapsed ? "justify-center px-2" : "gap-2.5 px-5")}>
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-soft text-xs font-bold text-white shadow-sm">
                {siteConfig.shortName}
              </span>
              <span className="text-sm font-semibold truncate">{siteConfig.name}</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/" className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-soft text-xs font-bold text-white shadow-sm">
              {siteConfig.shortName}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="ml-auto hidden size-7 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary lg:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="size-3.5" /> : <ChevronLeft className="size-3.5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Dashboard">
          <div className="flex flex-col gap-0.5">
            {sidebarItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    collapsed && "justify-center px-2",
                    active
                      ? "bg-gold/8 text-gold"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="size-[18px] shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-border/50 p-3 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
              collapsed && "justify-center px-2",
            )}
            title={collapsed ? "Home" : undefined}
          >
            <Home className="size-[18px] shrink-0" />
            {!collapsed && <span>Back to Home</span>}
          </Link>
          <button
            type="button"
            onClick={async () => {
              await logout();
              router.push("/");
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30",
              collapsed && "justify-center px-2",
            )}
            title={collapsed ? "Sign Out" : undefined}
          >
            <LogOut className="size-[18px] shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
