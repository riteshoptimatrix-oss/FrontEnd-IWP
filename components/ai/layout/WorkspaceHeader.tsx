"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Menu,
  User as UserIcon,
  Check,
  Sparkles,
  LogOut,
  ChevronDown,
  UserCheck,
} from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { useAIWorkspaceStore } from "@/store/ai-workspace-store";
import { useAuthStore } from "@/lib/auth-store";
import { AnimatePresence, m } from "framer-motion";

export function WorkspaceHeader() {
  const { toggleMobileDrawer } = useAIWorkspaceStore();
  const { user, isAuthenticated, logout, fetchMe } = useAuthStore();
  const router = useRouter();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      fetchMe();
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleSignOut = async () => {
    setShowUserMenu(false);
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-16 lg:top-[76px] z-30 flex h-14 shrink-0 items-center justify-between gap-x-4 border-b border-border bg-background/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 transition-colors text-foreground shadow-sm">
      {/* Left side: Mobile menu toggle + Breadcrumbs */}
      <div className="flex items-center gap-x-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={toggleMobileDrawer}
          className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Open mobile navigation drawer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Breadcrumb />
      </div>

      {/* Right side: Search, Notifications, User Menu */}
      <div className="flex items-center gap-x-3 sm:gap-x-4 shrink-0">
        {/* Notifications Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <m.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 mt-2 w-80 rounded-2xl bg-background border border-border p-4 shadow-xl z-50 text-foreground"
              >
                <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                  <h4 className="text-xs font-bold text-foreground tracking-wide uppercase">
                    Workspace Notifications
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-bold">
                    Active
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3 text-xs">
                    <div className="h-7 w-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">
                        AI Website Generator Engine Ready
                      </p>
                      <p className="text-muted-foreground text-[11px] mt-0.5">
                        Production pipeline active for static website exports.
                      </p>
                    </div>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-5 w-px bg-border hidden sm:block" />

        {/* User Profile Menu */}
        <div className="relative" ref={menuRef}>
          {mounted && user ? (
            <button
              type="button"
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all border border-border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="User Profile Menu"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm overflow-hidden shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.full_name} className="h-full w-full object-cover" />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none pr-1">
                <span className="text-xs font-extrabold text-foreground truncate max-w-[120px]">
                  {user.full_name}
                </span>
                <span className="text-[10px] text-blue-600 font-semibold mt-0.5 capitalize">
                  {user.role || "Architect"}
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
            </button>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              Log In
            </Link>
          )}

          {/* User Menu Dropdown */}
          <AnimatePresence>
            {showUserMenu && user && (
              <m.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-background border border-border p-3 shadow-xl z-50 text-foreground"
              >
                <div className="flex items-center gap-3 p-2 border-b border-border pb-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden shrink-0">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.full_name} className="h-full w-full object-cover" />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-extrabold text-foreground truncate">
                      {user.full_name}
                    </span>
                    <span className="text-[11px] text-muted-foreground truncate">
                      {user.email}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Session Active
                    </span>
                  </div>
                </div>

                <div className="py-2 space-y-1">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-foreground hover:bg-accent hover:text-accent-foreground rounded-xl transition-colors"
                  >
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    My Account Profile
                  </Link>


                </div>

                <div className="border-t border-border pt-2">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="h-4 w-4 text-rose-500" />
                    Sign Out
                  </button>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
