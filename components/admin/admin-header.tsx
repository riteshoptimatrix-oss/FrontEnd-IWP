"use client";

import * as React from "react";
import { useAuthStore } from "@/lib/auth-store";
import { Shield, Bell, User } from "lucide-react";

export function AdminHeader() {
  const { user } = useAuthStore();
  const role = user?.role?.replace("_", " ").toUpperCase() || "ADMIN";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 bg-white/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8 dark:bg-ink/80">
      <div className="flex items-center gap-3 pl-14 lg:pl-0">
        <div className="flex items-center gap-2">
          <Shield className="size-5 text-gold" />
          <span className="text-sm font-semibold">CodeSprint Admin</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/50 px-3 py-1.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-gold/10">
            <User className="size-3.5 text-gold" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-medium truncate max-w-[120px]">{user?.full_name}</span>
            <span className="text-[10px] text-muted-foreground">{role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
