"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useScroll, useTransform } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  Bot,
  Bell,
  LogOut,
  LayoutDashboard
} from "lucide-react";

import { useAuthStore } from "@/lib/auth-store";
import { AuthDropdown } from "@/components/auth-dropdown";
import { NotificationDropdown } from "@/components/notification-dropdown";

import { cn } from "@/lib/utils";
import {
  siteConfig,
  servicesMegaMenu,
  industriesMegaMenu,
  portfolioMegaMenu,
  resourcesMegaMenu,
  type MegaMenuItem,
} from "@/lib/site";
import { useScrolled } from "@/hooks/use-scrolled";
import { useActivePath } from "@/hooks/use-active-path";

const navItems = [
  { label: "What We Serve", href: "/what-we-do", hasDropdown: true },
  { label: "Industries", href: "/industries", hasDropdown: true },
  { label: "Engagement Models", href: "/engagement-models" },
  { label: "About Us", href: "/about-us", hasDropdown: false, separatorBefore: true },
  { label: "Opti-Matrix", href: "/optimatrix" },
  { label: "Resources", href: "/resources", hasDropdown: true },
  { label: "IWP AI", href: "/ai", isSpecial: true },
];

const MEGA_MENUS: Record<string, typeof servicesMegaMenu> = {
  "/what-we-do": servicesMegaMenu,
  "/industries": industriesMegaMenu,
  "/about-us": servicesMegaMenu,
  "/resources": resourcesMegaMenu,
};

const NAV_CLOSE_DELAY = 250;

function MegaMenu({
  data,
  open,
  onMouseEnter,
  onMouseLeave,
}: {
  data: typeof servicesMegaMenu;
  open: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  if (!data) return null;

  return (
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-1/2 z-50 w-[720px] max-w-[calc(100vw-3rem)] -translate-x-1/2 top-[76px] mt-2"
          role="menu"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Invisible Interaction Bridge to prevent hover dead zones */}
          <div className="absolute -top-8 left-0 right-0 h-8 bg-transparent" aria-hidden="true" />
          <div className="overflow-hidden rounded-2xl border border-border/40 bg-white/95 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:bg-slate-900/95 dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)]">
            <div className="p-5">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
                {data.title}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {data.items.map((item) => (
                  <MegaMenuItem key={item.href + item.label} item={item} />
                ))}
              </div>
              {data.featured && data.featured.length > 0 && (
                <div className="mt-3 border-t border-border/40 pt-3">
                  {data.featured.map((item) => (
                    <MegaMenuItem key={item.href + item.label} item={item} featured />
                  ))}
                </div>
              )}
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

function MegaMenuItem({
  item,
  featured,
}: {
  item: MegaMenuItem;
  featured?: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      role="menuitem"
      className={cn(
        "group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
        featured
          ? "hover:bg-blue-50 dark:hover:bg-blue-900/20"
          : "hover:bg-slate-100 dark:hover:bg-slate-800",
      )}
    >
      {Icon && (
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-all duration-200 group-hover/item:bg-blue-200 group-hover/item:shadow-sm dark:bg-blue-900/30 dark:text-blue-400">
          <Icon className="size-[18px]" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground transition-colors group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400">
          {item.label}
        </span>
        {item.description && (
          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground/70">
            {item.description}
          </span>
        )}
      </span>
      <ChevronRight className="mt-1 size-3.5 shrink-0 text-muted-foreground/30 opacity-0 transition-all group-hover/item:translate-x-0.5 group-hover/item:text-blue-600 group-hover/item:opacity-100" />
    </Link>
  );
}

function MobileOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const isActive = useActivePath();
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const { isAuthenticated, logout, user } = useAuthStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) {
      setExpanded(null);
    }
  }, [open]);

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 top-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          <m.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white/98 shadow-[-24px_0_80px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:bg-slate-950/98"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center"
                aria-label={`${siteConfig.name} home`}
              >
                <Image
                  src="/images/logo.png"
                  alt={siteConfig.name}
                  width={84}
                  height={44}
                  className="h-11 w-auto object-contain"
                  priority
                />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
              <div className="flex flex-col gap-0.5">
                {navItems.map((item, i) => {
                  const active = isActive(item.href);
                  const hasMega = item.hasDropdown;
                  const megaOpen = expanded === item.href;

                  return (
                    <m.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                    >
                      {hasMega ? (
                        <div>
                          <button
                            type="button"
                            onClick={() => setExpanded(megaOpen ? null : item.href)}
                            aria-expanded={megaOpen}
                            className={cn(
                              "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                              active
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                : "text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800",
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {item.isSpecial && <Bot className="size-5 text-blue-500" />}
                              {item.label}
                            </span>
                            <ChevronRight
                              className={cn(
                                "size-4 transition-transform duration-200",
                                megaOpen && "rotate-90",
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {megaOpen && MEGA_MENUS[item.href] && (
                              <m.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pt-1 pb-2">
                                  {MEGA_MENUS[item.href].items.map((sub) => {
                                    const SubIcon = sub.icon;
                                    return (
                                      <Link
                                        key={sub.href + sub.label}
                                        href={sub.href}
                                        onClick={onClose}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
                                      >
                                        {SubIcon && (
                                          <SubIcon className="size-4 shrink-0 text-blue-600/70" />
                                        )}
                                        <span>{sub.label}</span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </m.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium transition-colors",
                            active
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                              : "text-muted-foreground hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800",
                          )}
                        >
                          {item.isSpecial && <Bot className="size-5 text-blue-500" />}
                          {item.label}
                        </Link>
                      )}
                    </m.div>
                  );
                })}
              </div>
            </nav>

            <div className="border-t border-border/50 px-6 py-5 flex flex-col gap-3">
              {mounted && isAuthenticated ? (
                <>
                  {user && (
                    <div className="flex items-center gap-3 px-2 py-1.5 border border-border/40 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm mb-1">
                      <div className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-sm">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.full_name} className="size-full rounded-lg object-cover" />
                        ) : (
                          <span className="text-xs">{user.full_name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}</span>
                        )}
                        <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full border border-white bg-emerald-500 dark:border-slate-900" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{user.full_name}</span>
                        <span className="text-[10px] text-slate-500 truncate">{user.email}</span>
                      </div>
                    </div>
                  )}
                  <Link
                    href="/dashboard/profile"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-5 py-3 text-base font-semibold text-foreground transition hover:bg-slate-200 dark:hover:bg-slate-700"
                    onClick={onClose}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-5 py-3 text-base font-semibold text-foreground transition hover:bg-slate-200 dark:hover:bg-slate-700"
                    onClick={onClose}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/notifications"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-5 py-3 text-base font-semibold text-foreground transition hover:bg-slate-200 dark:hover:bg-slate-700"
                    onClick={onClose}
                  >
                    Notifications
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200/50 bg-red-50 dark:bg-red-950/20 dark:border-red-900/30 px-5 py-3 text-base font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-950/40"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-5 py-3 text-base font-semibold text-foreground transition hover:bg-slate-200 dark:hover:bg-slate-700"
                    onClick={onClose}
                  >
                    Log In
                  </Link>

                </>
              )}
            </div>
          </m.aside>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const scrolled = useScrolled(12);
  const isActive = useActivePath();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hoveredMega, setHoveredMega] = React.useState<string | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isAuthenticated, login, user } = useAuthStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const openMega = React.useCallback((href: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setHoveredMega(href);
  }, []);

  const scheduleCloseMega = React.useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setHoveredMega(null);
    }, NAV_CLOSE_DELAY);
  }, []);

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "border-b border-black/5 bg-white/70 shadow-lg shadow-black/[0.03] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[76px] lg:px-8">

          <Link
            href="/"
            className="group flex items-center shrink-0 rounded-xl px-1 py-1 transition-all duration-300 hover:opacity-85"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={107}
              height={56}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
            onMouseLeave={scheduleCloseMega}
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              const hasMega = item.hasDropdown;
              const megaOpen = hoveredMega === item.href && hasMega;

              return (
                <React.Fragment key={item.href}>
                  {item.separatorBefore && (
                    <div className="mx-2 h-5 w-px bg-slate-300 dark:bg-slate-600" aria-hidden />
                  )}
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      if (hasMega) openMega(item.href);
                    }}
                    onMouseLeave={() => {
                      if (hasMega) scheduleCloseMega();
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-haspopup={hasMega ? "true" : undefined}
                      aria-expanded={hasMega ? megaOpen : undefined}
                      className={cn(
                        "relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[14px] font-medium transition-all duration-200",
                        active
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400",
                        item.isSpecial && "text-slate-800"
                      )}
                    >
                      {active && (
                        <m.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-xl bg-blue-50/80 dark:bg-blue-900/20"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      {item.isSpecial && (
                        <span className="relative flex items-center justify-center text-[#3b71fe]">
                          <Bot className="size-5" />
                        </span>
                      )}

                      <span className="relative z-10">{item.label}</span>

                      {hasMega && (
                        <ChevronDown
                          className={cn(
                            "relative z-10 size-3.5 text-slate-400 transition-transform duration-200",
                            megaOpen && "rotate-180 text-blue-600"
                          )}
                        />
                      )}

                    </Link>

                    {hasMega && MEGA_MENUS[item.href] && (
                      <MegaMenu
                        data={MEGA_MENUS[item.href]}
                        open={!!megaOpen}
                        onMouseEnter={() => openMega(item.href)}
                        onMouseLeave={() => scheduleCloseMega()}
                      />
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {(!mounted || !isAuthenticated) ? (
              <>
                <Link
                  href="/login"
                  className="hidden lg:flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Log In
                </Link>

              </>
            ) : (
              <div className="flex items-center gap-3">
                <NotificationDropdown />
                <AuthDropdown />

              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <m.div
          aria-hidden
          style={{ scaleX: progressScale }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-[#3b71fe] to-transparent opacity-40"
        />
      </header>

      <MobileOverlay
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
