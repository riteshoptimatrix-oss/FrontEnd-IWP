"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Box, Tags, Package, HelpCircle, Image,
  Upload, ShieldCheck, ArrowLeft, ChevronLeft, ChevronRight,
  Loader2,
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { cn } from "@/lib/utils";

const ADMIN_ROLES = ["super_admin", "admin", "content_manager", "moderator", "support"];

const NAV_ITEMS = [
  { href: "/admin/tech-logo-match", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tech-logo-match/technologies", label: "Technologies", icon: Box },
  { href: "/admin/tech-logo-match/categories", label: "Categories", icon: Tags },
  { href: "/admin/tech-logo-match/packs", label: "Packs", icon: Package },
  { href: "/admin/tech-logo-match/questions", label: "Questions", icon: HelpCircle },
  { href: "/admin/tech-logo-match/assets", label: "Assets", icon: Image },
  { href: "/admin/tech-logo-match/import", label: "Import / Export", icon: Upload },
  { href: "/admin/tech-logo-match/validation", label: "Validation", icon: ShieldCheck },
];

export default function TechLogoMatchAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = user && ADMIN_ROLES.includes(user.role);

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
    else if (!isLoading && user && !isAdmin) router.push("/dashboard");
  }, [isLoading, user, isAdmin, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/30 via-white to-amber-50/20">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 flex h-full flex-col border-r border-border/40 bg-white/80 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-16" : "w-60",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}>
        <div className="flex h-14 items-center border-b border-border/30 px-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent lg:flex"
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
          <div className={cn("flex items-center gap-2 ml-2", collapsed && "lg:hidden")}>
            <span className="text-sm font-semibold">TLM Admin</span>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/admin/tech-logo-match" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
                  active
                    ? "bg-gold/10 text-gold shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  collapsed && "lg:justify-center lg:px-2",
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className={cn("truncate", collapsed && "lg:hidden")}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/30 p-3">
          <Link
            href="/optimatrix/tech-logo-match"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent",
              collapsed && "lg:justify-center",
            )}
          >
            <ArrowLeft className="size-3.5 shrink-0" />
            <span className={collapsed ? "lg:hidden" : ""}>Back to Game</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn("transition-all duration-300", collapsed ? "lg:ml-16" : "lg:ml-60")}>
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/30 bg-white/70 px-4 backdrop-blur-xl lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent"
          >
            <ChevronRight className="size-5" />
          </button>
          <span className="text-sm font-semibold">TLM Admin</span>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
