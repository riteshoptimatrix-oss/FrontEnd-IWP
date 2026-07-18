"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, Search, Home } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserAvatarMenu } from "@/components/user-avatar-menu";
import { CommandPalette } from "@/components/command-palette";

export function DashboardHeader() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-border/50 bg-white/80 px-6 backdrop-blur-xl dark:bg-ink/80">
        <div className="flex items-center gap-2">
          <div className="size-8 animate-pulse rounded-lg bg-muted" />
          <div className="hidden h-4 w-40 animate-pulse rounded bg-muted sm:block" />
        </div>
      </header>
    );
  }

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
        <ThemeToggle />
        <Link
          href="/dashboard/notifications"
          className="relative inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
            3
          </span>
        </Link>
        <UserAvatarMenu />
      </div>
    </header>
  );
}
