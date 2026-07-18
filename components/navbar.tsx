"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, m, useScroll, useTransform } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  mainNav,
  siteConfig,
  servicesMegaMenu,
  portfolioMegaMenu,
  type MegaMenuItem,
} from "@/lib/site";
import { useAuthStore } from "@/lib/auth-store";
import { useScrolled } from "@/hooks/use-scrolled";
import { useActivePath } from "@/hooks/use-active-path";
import { Button } from "@/components/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandPalette } from "@/components/command-palette";
import { UserAvatarMenu } from "@/components/user-avatar-menu";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MEGA_MENUS: Record<string, typeof servicesMegaMenu> = {
  "/services": servicesMegaMenu,
  "/portfolio": portfolioMegaMenu,
};

const NAV_CLOSE_DELAY = 120;

/* ------------------------------------------------------------------ */
/*  Mega Menu                                                          */
/* ------------------------------------------------------------------ */

function MegaMenu({
  data,
  open,
}: {
  data: typeof servicesMegaMenu;
  open: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-full z-50 mt-3 w-[720px] max-w-[calc(100vw-3rem)] -translate-x-1/2"
          role="menu"
        >
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-white/95 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl dark:bg-ink/95 dark:shadow-[0_24px_80px_-12px_rgba(0,0,0,0.5)]">
            <div className="p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                {data.title}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {data.items.map((item) => (
                  <MegaMenuItem key={item.href + item.label} item={item} />
                ))}
              </div>
              {data.featured && data.featured.length > 0 && (
                <div className="mt-3 border-t border-border/50 pt-3">
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
        "group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors",
        featured
          ? "hover:bg-gold/5"
          : "hover:bg-secondary/80",
      )}
    >
      {Icon && (
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/8 text-gold transition-colors group-hover/item:bg-gold/15">
          <Icon className="size-[18px]" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground transition-colors group-hover/item:text-gold">
          {item.label}
        </span>
        {item.description && (
          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground/70">
            {item.description}
          </span>
        )}
      </span>
      <ChevronRight className="mt-1 size-3.5 shrink-0 text-muted-foreground/30 opacity-0 transition-all group-hover/item:translate-x-0.5 group-hover/item:text-gold group-hover/item:opacity-100" />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Overlay                                                     */
/* ------------------------------------------------------------------ */

function MobileOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const isActive = useActivePath();
  const { isAuthenticated } = useAuthStore();
  const [expanded, setExpanded] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) {
      setExpanded(null);
    }
  }, [open]);

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
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <m.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white/98 shadow-[−24px_0_80px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:bg-ink/98"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-2.5"
                aria-label={`${siteConfig.name} home`}
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-soft text-white text-sm font-bold shadow-sm">
                  {siteConfig.shortName}
                </span>
                <span className="text-sm font-semibold">{siteConfig.name}</span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
              <div className="flex flex-col gap-0.5">
                {mainNav.map((item, i) => {
                  const active = isActive(item.href);
                  const hasMega = item.href in MEGA_MENUS;
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
                                ? "bg-gold/10 text-gold"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                            )}
                          >
                            <span>{item.label}</span>
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
                                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                                      >
                                        {SubIcon && (
                                          <SubIcon className="size-4 shrink-0 text-gold/70" />
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
                            "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                            active
                              ? "bg-gold/10 text-gold"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </m.div>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="border-t border-border/50 px-6 py-5 space-y-3">
              <div className="flex items-center gap-2">
                <CommandPalette />
                <ThemeToggle />
              </div>
              {isAuthenticated ? (
                <Button
                  href="/dashboard"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  onClick={onClose}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    href="/login"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={onClose}
                  >
                    Sign In
                  </Button>
                  <Button
                    href="/register"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    onClick={onClose}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </m.aside>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const scrolled = useScrolled(12);
  const isActive = useActivePath();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hoveredMega, setHoveredMega] = React.useState<string | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isAuthenticated, fetchMe } = useAuthStore();

  /* Check auth on mount */
  React.useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* Lock body scroll when mobile menu is open */
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Escape key closes mobile menu */
  React.useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  /* Mega menu hover management with close delay */
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

  const cancelCloseMega = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  /* Cleanup timer on unmount */
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
            ? "border-b border-white/10 bg-white/60 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1)] backdrop-blur-2xl dark:bg-ink/60 dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)]"
            : "border-b border-white/5 bg-white/30 backdrop-blur-xl dark:bg-ink/30",
        )}
      >
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-5 lg:h-[68px] lg:px-7">
            {/* ─── Logo ─── */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 text-lg font-semibold tracking-tight"
              aria-label={`${siteConfig.name} home`}
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-soft text-white text-sm font-bold shadow-sm transition-transform duration-300 group-hover:scale-105">
                {siteConfig.shortName}
              </span>
              <span className="hidden text-foreground sm:inline">
                {siteConfig.name}
              </span>
            </Link>

            {/* ─── Center Nav (Desktop) ─── */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-0.5 lg:flex"
              onMouseLeave={() => {
                scheduleCloseMega();
              }}
            >
              {mainNav.map((item) => {
                const active = isActive(item.href);
                const hasMega = item.href in MEGA_MENUS;
                const megaOpen = hoveredMega === item.href && hasMega;

                return (
                  <div
                    key={item.href}
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
                        "relative rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all duration-200 xl:px-4",
                        active
                          ? "text-gold"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                      {/* Active pill */}
                      {active && (
                        <m.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-xl bg-gold/8"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Mega menu */}
                    {hasMega && (
                      <MegaMenu
                        data={MEGA_MENUS[item.href]}
                        open={megaOpen}
                      />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ─── Right Actions ─── */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CommandPalette />
              <ThemeToggle className="hidden sm:inline-flex" />
              {isAuthenticated ? (
                <>
                  <Button
                    href="/dashboard"
                    variant="ghost"
                    size="sm"
                    className="hidden lg:inline-flex"
                  >
                    Dashboard
                  </Button>
                  <UserAvatarMenu />
                </>
              ) : (
                <>
                  <Button
                    href="/login"
                    variant="ghost"
                    size="sm"
                    className="hidden lg:inline-flex"
                  >
                    Sign In
                  </Button>
                  <Button
                    href="/register"
                    variant="gold"
                    size="sm"
                    className="hidden lg:inline-flex"
                  >
                    Get Started
                  </Button>
                </>
              )}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary lg:hidden"
              >
                {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>

        {/* Scroll progress bar */}
        <m.div
          aria-hidden
          style={{ scaleX: progressScale }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-60"
        />
      </header>

      {/* Mobile overlay */}
      <MobileOverlay
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
