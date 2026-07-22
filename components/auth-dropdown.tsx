"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  LayoutDashboard,
  Bell,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { cn } from "@/lib/utils";

export function AuthDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuthStore();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!user) return null;

  // Get initials for avatar
  const initials = user.full_name
    ? user.full_name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "U";

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Premium Profile Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={cn(
          "group flex items-center gap-2.5 rounded-xl border border-slate-200/50 bg-white/40 px-3 py-1.5 text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/80 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-slate-800/50 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-900/80",
          isOpen && "bg-white/90 border-slate-300 dark:bg-slate-900/90 dark:border-slate-700"
        )}
      >
        {/* Avatar with Online Indicator */}
        <div className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-sm ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
          {user.avatar ? (
            <img src={user.avatar} alt={user.full_name || "User"} className="size-full rounded-lg object-cover" />
          ) : (
            <span className="text-xs tracking-wide">{initials}</span>
          )}

          {/* Glowing Online Status Indicator */}
          <span
            className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-500 shadow-[0_0_8px_#10b981] dark:border-slate-950"
            aria-hidden="true"
          />
        </div>

        {/* User Name */}
        <span className="max-w-[100px] truncate text-sm font-semibold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {user.full_name || "User"}
        </span>

        {/* Dropdown Arrow */}
        <ChevronDown
          className={cn(
            "size-4 text-slate-400 transition-transform duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute right-0 top-full z-[100] mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-slate-200/60 bg-white/95 p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95 dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
            role="menu"
          >
            {/* Header Section */}
            <div className="flex items-center gap-3 px-3 py-3">
              <div className="relative flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 font-semibold text-white shadow-sm">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.full_name || "User"} className="size-full rounded-lg object-cover" />
                ) : (
                  initials
                )}
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
                  {user.full_name || "User"}
                </span>
                <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                  {user.email}
                </span>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Online</span>
                </div>
              </div>
            </div>

            <div className="mx-2 my-1 h-px bg-slate-200/60 dark:bg-slate-800/60" />

            {/* Redesigned Actions List */}
            <div className="py-1">
              <MenuItem href="/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={() => setIsOpen(false)} />
              <MenuItem href="/dashboard/profile" icon={User} label="My Profile" onClick={() => setIsOpen(false)} />
              <MenuItem href="/dashboard/notifications" icon={Bell} label="Notifications" onClick={() => setIsOpen(false)} />
              <MenuItem href="/dashboard/settings" icon={Settings} label="Settings" onClick={() => setIsOpen(false)} />
            </div>

            <div className="mx-2 my-1 h-px bg-slate-200/60 dark:bg-slate-800/60" />

            {/* Logout */}
            <div className="py-1">
              <button
                onClick={handleLogout}
                role="menuitem"
                className="group flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <LogOut className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5" />
                Sign Out
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItem({
  href,
  icon: Icon,
  label,
  onClick
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      role="menuitem"
      className="group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
    >
      <Icon className="size-4 shrink-0 text-slate-400 transition-colors duration-200 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-blue-400" />
      {label}
    </Link>
  );
}
