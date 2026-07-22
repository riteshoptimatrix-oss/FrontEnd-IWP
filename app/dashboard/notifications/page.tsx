"use client";

import * as React from "react";
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
  Bot,
  Search,
  Inbox
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

const filterTabs = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "ai", label: "AI" },
  { value: "projects", label: "Projects" },
  { value: "security", label: "Security" },
];

export default function DashboardNotificationsPage() {
  const {
    notifications,
    markAsRead,
    markAllRead,
    deleteNotification,
  } = useNotificationStore();

  const [activeFilter, setActiveFilter] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredNotifications = React.useMemo(() => {
    return notifications.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === "all") return true;
      if (activeFilter === "unread") return !n.read;
      if (activeFilter === "security") return n.type === "security" || n.type === "account";
      return n.type === activeFilter;
    });
  }, [notifications, activeFilter, searchQuery]);

  const totalItems = filteredNotifications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedNotifications = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNotifications.slice(start, start + itemsPerPage);
  }, [filteredNotifications, currentPage]);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">Manage your real-time activities and system updates.</p>
        </div>
        {notifications.some((n) => !n.read) && (
          <button
            onClick={() => markAllRead()}
            className="inline-flex items-center gap-2 rounded-xl bg-gold/10 px-4 py-2 text-sm font-semibold text-gold border border-gold/20 hover:bg-gold/20 transition-all duration-200"
          >
            <Check className="size-4" />
            Mark all read
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1 bg-secondary/30 p-1 rounded-xl border border-border/40">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setActiveFilter(tab.value);
                setCurrentPage(1);
              }}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                activeFilter === tab.value
                  ? "bg-white dark:bg-slate-800 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-border/60 bg-white/50 dark:bg-ink/50 py-2 pl-9 pr-3 text-sm focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/20 transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex items-start gap-4 rounded-xl border border-border/40 bg-white/40 dark:bg-ink/40 p-4"
            >
              <div className="size-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              </div>
            </div>
          ))
        ) : paginatedNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-2xl border border-border/40 bg-white/20 dark:bg-ink/20">
            <Inbox className="size-10 text-muted-foreground/30" />
            <h3 className="mt-3 text-sm font-semibold text-foreground">No notifications</h3>
            <p className="mt-1 text-xs text-muted-foreground max-w-[240px]">
              You're all caught up! No notifications found in this view.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {paginatedNotifications.map((n) => {
              const Icon = TYPE_ICONS[n.type] || Info;
              return (
                <m.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className={cn(
                    "group relative flex items-center justify-between gap-4 rounded-xl border border-border/40 bg-white/50 dark:bg-ink/50 p-4 transition-all duration-200 hover:border-border hover:bg-white dark:hover:bg-ink",
                    !n.read && "border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className={cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border", TYPE_COLORS[n.type])}>
                      <Icon className="size-4.5" />
                    </span>
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={cn("text-sm font-medium text-foreground", !n.read && "font-semibold")}>
                          {n.title}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded">
                          {n.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-normal">
                        {n.description}
                      </p>
                      <span className="text-[10px] text-muted-foreground/60 block">
                        {new Date(n.created_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="flex size-7 items-center justify-center rounded-lg bg-secondary hover:bg-slate-200 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground"
                        title="Mark read"
                      >
                        <Check className="size-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(n.id)}
                      className="flex size-7 items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </m.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border border-border/60 bg-white dark:bg-ink/50 text-xs font-semibold disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-xs text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg border border-border/60 bg-white dark:bg-ink/50 text-xs font-semibold disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
