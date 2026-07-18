"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

const filterTabs = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "ai_reports", label: "AI Reports" },
  { value: "project_updates", label: "Projects" },
  { value: "security_alerts", label: "Security" },
];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = React.useState("all");

  return (
    <div className="space-y-8">
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">You&apos;re all caught up!</p>
      </m.div>

      {/* Filters */}
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveFilter(tab.value)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeFilter === tab.value
                  ? "bg-gold text-white shadow-sm"
                  : "border border-border bg-white/80 text-muted-foreground hover:bg-secondary dark:bg-ink/80",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </m.div>

      {/* Notification list */}
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="flex flex-col items-center py-12">
              <Bell className="size-12 text-muted-foreground/30" />
              <p className="mt-4 text-muted-foreground">No notifications yet</p>
              <p className="text-sm text-muted-foreground/60">You&apos;ll see notifications here when there&apos;s activity on your account</p>
            </div>
          </CardContent>
        </Card>
      </m.div>
    </div>
  );
}
