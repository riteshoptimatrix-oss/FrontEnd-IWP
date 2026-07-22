"use client";

import * as React from "react";

import Link from "next/link";
import { Bell, Search, Home } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { siteConfig } from "@/lib/site";
import { UserAvatarMenu } from "@/components/user-avatar-menu";
import { CommandPalette } from "@/components/command-palette";
import { NotificationDropdown } from "@/components/notification-dropdown";

export function DashboardHeader() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return null;

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 bg-white/80 px-6 backdrop-blur-xl dark:bg-ink/80">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Home className="size-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <CommandPalette />
        <NotificationDropdown />
        <UserAvatarMenu />
      </div>
    </header>
  );
}
