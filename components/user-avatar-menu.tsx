"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import {
  LogOut, User, Settings, LayoutDashboard, Shield, Bell,
  ChevronDown, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore, type User as UserType } from "@/lib/auth-store";

export function UserAvatarMenu() {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    router.push("/");
  };

  if (!user) return null;

  const initials = user.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-border/50 bg-white/80 py-1.5 pl-1.5 pr-2.5 transition-all hover:bg-white dark:bg-ink/80 dark:hover:bg-ink"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.full_name}
            className="size-8 rounded-lg object-cover"
          />
        ) : (
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-soft text-xs font-bold text-white">
            {initials}
          </span>
        )}
        <span className="hidden text-sm font-medium md:inline">{user.full_name}</span>
        <ChevronDown
          className={cn(
            "size-3.5 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border/60 bg-white/95 shadow-[0_16px_60px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl dark:bg-ink/95 dark:shadow-[0_16px_60px_-12px_rgba(0,0,0,0.5)]"
          >
            {/* User info header */}
            <div className="border-b border-border/50 px-4 py-3">
              <p className="text-sm font-semibold truncate">{user.full_name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>

            {/* Nav links */}
            <div className="p-1.5">
              <DropdownLink
                href="/dashboard"
                icon={<LayoutDashboard className="size-4" />}
                label="Dashboard"
                onClick={() => setOpen(false)}
              />
              <DropdownLink
                href="/dashboard/profile"
                icon={<User className="size-4" />}
                label="Profile"
                onClick={() => setOpen(false)}
              />
              <DropdownLink
                href="/dashboard/settings"
                icon={<Settings className="size-4" />}
                label="Settings"
                onClick={() => setOpen(false)}
              />
              <DropdownLink
                href="/dashboard/notifications"
                icon={<Bell className="size-4" />}
                label="Notifications"
                onClick={() => setOpen(false)}
              />
              <DropdownLink
                href="/dashboard/optimatrix-score"
                icon={<Zap className="size-4" />}
                label="OptiMatrix"
                onClick={() => setOpen(false)}
              />
              <DropdownLink
                href="/dashboard/security"
                icon={<Shield className="size-4" />}
                label="Security"
                onClick={() => setOpen(false)}
              />
            </div>

            {/* Logout */}
            <div className="border-t border-border/50 p-1.5">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <LogOut className="size-4" />
                Sign Out
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownLink({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-gold/8 text-gold"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
