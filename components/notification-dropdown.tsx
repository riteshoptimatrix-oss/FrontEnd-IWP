"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  Bell,
  Check,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  User,
  Shield,
  Folder,
  Bot
} from "lucide-react";
import { useNotificationStore, type Notification } from "@/lib/notification-store";
import { cn } from "@/lib/utils";

const TYPE_ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  account: User,
  security: Shield,
  projects: Folder,
  ai: Bot,
};

const TYPE_COLORS = {
  info: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  success: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  warning: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  error: "text-red-500 bg-red-500/10 border-red-500/20",
  account: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  security: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
  projects: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  ai: "text-gold bg-gold/10 border-gold/20",
};

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    notifications,
    markAsRead,
    markAllRead,
    deleteNotification,
    getUnreadCount,
  } = useNotificationStore();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const unreadCount = mounted ? getUnreadCount() : 0;
  const recentNotifications = notifications.slice(0, 5);

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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative inline-flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
          isOpen && "bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white border-slate-300 dark:border-slate-700"
        )}
        aria-label="Toggle notifications"
        aria-expanded={isOpen}
      >
        <Bell className="size-4.5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900 animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute right-0 top-full z-[100] mt-2 w-80 origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.15)] dark:border-slate-800 dark:bg-slate-950"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllRead()}
                  className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {recentNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900">
                    <Bell className="size-6 text-slate-400" />
                  </div>
                  <span className="mt-3 text-sm font-bold text-slate-900 dark:text-slate-100">All caught up!</span>
                  <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    No new notifications at this time.
                  </span>
                </div>
              ) : (
                recentNotifications.map((n) => {
                  const Icon = TYPE_ICONS[n.type] || Info;
                  return (
                    <div
                      key={n.id}
                      className={cn(
                        "group flex items-start gap-3 p-3 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-900/50",
                        !n.read && "bg-blue-50/20 dark:bg-blue-500/5"
                      )}
                    >
                      {/* Icon */}
                      <span className={cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border", TYPE_COLORS[n.type])}>
                        <Icon className="size-4" />
                      </span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <span className={cn("text-xs font-semibold text-slate-900 dark:text-slate-200 truncate block", !n.read && "font-bold")}>
                            {n.title}
                          </span>
                          {!n.read && (
                            <span className="size-1.5 shrink-0 rounded-full bg-blue-500 mt-1.5" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                          {n.description}
                        </p>
                      </div>

                      {/* Item Actions */}
                      <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!n.read && (
                          <button
                            onClick={() => markAsRead(n.id)}
                            className="flex size-6 items-center justify-center rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                            title="Mark as read"
                          >
                            <Check className="size-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(n.id)}
                          className="flex size-6 items-center justify-center rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 p-2 dark:border-slate-800">
              <Link
                href="/notifications"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                View All Notifications
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
