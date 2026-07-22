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
  Filter,
  ArrowRight,
  Sparkles,
  Inbox
} from "lucide-react";
import { Container } from "@/components/container";
import { useNotificationStore, type Notification, type NotificationType } from "@/lib/notification-store";
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
  { value: "ai", label: "AI Assistant" },
  { value: "projects", label: "Projects" },
  { value: "security", label: "Security & Account" },
];

export default function NotificationsPage() {
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

  // Hydration protection & mock loading state to demonstrate loading state/skeleton
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredNotifications = React.useMemo(() => {
    return notifications.filter((n) => {
      // Search matching
      const matchesSearch =
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Filter matching
      if (activeFilter === "all") return true;
      if (activeFilter === "unread") return !n.read;
      if (activeFilter === "security") return n.type === "security" || n.type === "account";
      return n.type === activeFilter;
    });
  }, [notifications, activeFilter, searchQuery]);

  // Pagination calculation
  const totalItems = filteredNotifications.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedNotifications = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNotifications.slice(start, start + itemsPerPage);
  }, [filteredNotifications, currentPage]);

  // Adjust page if items reduce
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleMarkAllRead = () => {
    markAllRead();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100 py-12">
      <Container className="max-w-5xl px-4">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Notification Center
            </h1>
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
              Stay informed with your account audit logs, security alerts, and AI insights.
            </p>
          </div>
          {notifications.some((n) => !n.read) && (
            <button
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-2 rounded-xl bg-gold/10 px-4 py-2 text-sm font-semibold text-gold border border-gold/30 hover:bg-gold/20 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-all duration-300 self-start sm:self-center"
            >
              <Check className="size-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Toolbar (Search & Filter Tabs) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 rounded-2xl bg-slate-950/60 p-1 border border-slate-800/80 backdrop-blur-xl">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveFilter(tab.value);
                  setCurrentPage(1);
                }}
                className={cn(
                  "rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300",
                  activeFilter === tab.value
                    ? "bg-slate-800 text-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-slate-700/50"
                    : "border-transparent text-slate-500 hover:text-slate-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-800/80 bg-slate-950/50 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 backdrop-blur-xl focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Notifications List Container */}
        <div className="space-y-4">
          {isLoading ? (
            // Skeleton State
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex items-start gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/30 p-5 backdrop-blur-sm"
              >
                <div className="size-10 rounded-xl bg-slate-800" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-slate-800 rounded w-1/4" />
                  <div className="h-3 bg-slate-800 rounded w-3/4" />
                  <div className="h-2 bg-slate-800 rounded w-12" />
                </div>
              </div>
            ))
          ) : paginatedNotifications.length === 0 ? (
            // Premium Empty State
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-3xl border border-slate-800/80 bg-slate-900/10 backdrop-blur-xl"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gold/10 blur-2xl rounded-full scale-150 animate-pulse" />
                <div className="relative flex size-20 items-center justify-center rounded-3xl bg-gold/5 ring-4 ring-gold/10 text-gold border border-gold/20">
                  <Inbox className="size-10" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-100">Clean Slate!</h3>
              <p className="mt-2 text-sm text-slate-400 max-w-[320px] leading-relaxed">
                {searchQuery
                  ? "We couldn't find any notifications matching your query. Try searching for something else."
                  : "You're all caught up. No notifications found in this filter."}
              </p>
            </m.div>
          ) : (
            // Notifications List
            <AnimatePresence mode="popLayout">
              {paginatedNotifications.map((n) => {
                const Icon = TYPE_ICONS[n.type] || Info;
                return (
                  <m.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={cn(
                      "group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/30 p-5 backdrop-blur-xl transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-black/40",
                      !n.read && "border-blue-500/20 bg-blue-950/10"
                    )}
                  >
                    {/* Visual left bar for unread notifications */}
                    {!n.read && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                    )}

                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <span className={cn("mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border shadow-sm", TYPE_COLORS[n.type])}>
                        <Icon className="size-5" />
                      </span>

                      {/* Content */}
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={cn("text-base font-semibold text-slate-100", !n.read && "font-bold text-slate-50")}>
                            {n.title}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-2 py-0.5 rounded bg-slate-800/80">
                            {n.type === "ai" ? "AI Assistant" : n.type}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed pr-6">
                          {n.description}
                        </p>
                        <span className="text-[11px] text-slate-500 font-medium block">
                          {new Date(n.created_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center border-t border-slate-800/60 pt-3 sm:pt-0 sm:border-0 w-full sm:w-auto justify-end">
                      {!n.read && (
                        <button
                          onClick={() => markAsRead(n.id)}
                          className="inline-flex size-9 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
                          title="Mark as read"
                        >
                          <Check className="size-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(n.id)}
                        className="inline-flex size-9 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-200"
                        title="Delete notification"
                      >
                        <Trash2 className="size-4" />
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
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl border border-slate-800/80 bg-slate-950/40 text-sm font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-slate-400 px-3">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl border border-slate-800/80 bg-slate-950/40 text-sm font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
