"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, FileCode, Trophy, Award,
  BarChart3, ClipboardList, Bell, Settings, Search,
  ChevronLeft, ChevronRight, Menu, X, LogOut, Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth-store";
import { ThemeToggle } from "@/components/theme-toggle";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Snippets", href: "/admin/snippets", icon: FileCode },
  { label: "Challenges", href: "/admin/challenges", icon: Trophy },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Leaderboard", href: "/admin/leaderboard", icon: BarChart3 },
  { label: "Reports", href: "/admin/reports", icon: ClipboardList },
  { label: "Audit Log", href: "/admin/audit-log", icon: Shield },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Search", href: "/admin/search", icon: Search },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const initials = user?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "A";

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        className="fixed left-4 top-4 z-[70] flex size-10 items-center justify-center rounded-xl border border-border bg-white/90 shadow-sm backdrop-blur-lg lg:hidden dark:bg-ink/90"
        aria-label="Toggle admin sidebar"
      >
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

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

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[68] flex flex-col border-r border-border/50 bg-white/90 backdrop-blur-xl transition-all duration-300 ease-out dark:bg-ink/90",
          collapsed ? "w-[72px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className={cn("flex h-16 items-center border-b border-border/50", collapsed ? "justify-center px-2" : "gap-2.5 px-5")}>
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-soft text-xs font-bold text-white shadow-sm">
                A
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold truncate">Admin Panel</span>
                <span className="text-[10px] text-muted-foreground">Enterprise CMS</span>
              </div>
            </Link>
          )}
          {collapsed && (
            <Link href="/admin" className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-soft text-xs font-bold text-white shadow-sm">
              A
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
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin">
          <div className="flex flex-col gap-0.5">
            {adminNavItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
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
          <div className={cn("flex items-center gap-3 rounded-xl px-3 py-2", collapsed && "justify-center px-2")}>
            {!collapsed && <ThemeToggle />}
          </div>
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
              collapsed && "justify-center px-2",
            )}
            title={collapsed ? "Dashboard" : undefined}
          >
            <LayoutDashboard className="size-[18px] shrink-0" />
            {!collapsed && <span>User Dashboard</span>}
          </Link>
          <button
            type="button"
            onClick={async () => {
              await logout();
              window.location.href = "/";
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30",
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
