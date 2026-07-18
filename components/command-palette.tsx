"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  FileText,
  Briefcase,
  Code2,
  Users,
  MessageSquare,
  Layers,
  Globe,
  Palette,
  Smartphone,
  Cpu,
  Cloud,
  ShoppingCart,
  LayoutDashboard,
  Sparkles,
  Hash,
  Command,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchItem {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: React.ElementType;
  category: string;
}

const SEARCH_DATA: SearchItem[] = [
  { id: "home", label: "Home", description: "Welcome page", href: "/", icon: Sparkles, category: "Pages" },
  { id: "about", label: "About Us", description: "Our story, values & team", href: "/about-us", icon: Users, category: "Pages" },
  { id: "services", label: "Services", description: "All services overview", href: "/services", icon: Layers, category: "Pages" },
  { id: "portfolio", label: "Portfolio", description: "Selected work & case studies", href: "/portfolio", icon: Briefcase, category: "Pages" },
  { id: "clients", label: "Clients", description: "Trusted partners & testimonials", href: "/clients", icon: Users, category: "Pages" },
  { id: "contact", label: "Contact Us", description: "Get in touch", href: "/contact-us", icon: MessageSquare, category: "Pages" },
  { id: "optimatrix", label: "OptiMatrix", description: "Our flagship platform", href: "/optimatrix", icon: Code2, category: "Pages" },
  { id: "web-dev", label: "Website Development", description: "Fast, accessible websites", href: "/services/website-development", icon: Globe, category: "Services" },
  { id: "web-apps", label: "Web Applications", description: "Scalable web apps", href: "/services", icon: Code2, category: "Services" },
  { id: "mobile", label: "Mobile Apps", description: "Cross-platform mobile", href: "/services", icon: Smartphone, category: "Services" },
  { id: "ai", label: "AI & Automation", description: "Intelligent workflows", href: "/services", icon: Cpu, category: "Services" },
  { id: "uiux", label: "UI/UX Design", description: "Research-led design", href: "/services", icon: Palette, category: "Services" },
  { id: "ecom", label: "E-commerce", description: "Conversion-focused stores", href: "/services", icon: ShoppingCart, category: "Services" },
  { id: "cloud-svc", label: "Cloud & DevOps", description: "Reliable infrastructure", href: "/services", icon: Cloud, category: "Services" },
  { id: "crm", label: "CRM & ERP", description: "Custom business systems", href: "/services", icon: LayoutDashboard, category: "Services" },
  { id: "nextjs", label: "Next.js", description: "React framework for production", href: "/services", icon: Hash, category: "Technology" },
  { id: "react-tech", label: "React", description: "Component-driven UI", href: "/services", icon: Code2, category: "Technology" },
  { id: "flutter", label: "Flutter", description: "Cross-platform mobile", href: "/services", icon: Smartphone, category: "Technology" },
  { id: "python", label: "Python", description: "Backend & data engineering", href: "/services", icon: Code2, category: "Technology" },
  { id: "nodejs", label: "Node.js", description: "Server-side JavaScript", href: "/services", icon: Code2, category: "Technology" },
];

const CATEGORIES = ["Pages", "Services", "Technology"];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter items
  const filtered = React.useMemo(() => {
    if (!query.trim()) return SEARCH_DATA;
    const q = query.toLowerCase();
    return SEARCH_DATA.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q),
    );
  }, [query]);

  // Group by category
  const grouped = React.useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of filtered) {
      const arr = map.get(item.category) ?? [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return map;
  }, [filtered]);

  // Keyboard shortcut
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input on open
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Escape to close
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      const item = filtered[selectedIndex];
      setRecentSearches((prev) => {
        const next = [item.label, ...prev.filter((s) => s !== item.label)].slice(0, 5);
        try { localStorage.setItem("recentSearches", JSON.stringify(next)); } catch {}
        return next;
      });
      setOpen(false);
      router.push(item.href);
    }
  };

  // Load recent searches
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("recentSearches");
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch {}
  }, []);

  // Scroll selected into view
  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const selected = list.querySelector(`[data-index="${selectedIndex}"]`);
    selected?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  // Flat index counter for keyboard nav
  let flatIndex = -1;

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/50 px-3 py-2 text-sm text-muted-foreground transition-all duration-200 hover:border-gold/20 hover:bg-secondary hover:text-foreground"
        aria-label="Open search (Ctrl+K)"
      >
        <Search className="size-4" />
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden items-center gap-0.5 rounded-md border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:inline-flex">
          <Command className="size-2.5" />K
        </kbd>
      </button>

      {/* Overlay + Dialog */}
      <AnimatePresence>
        {open && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
              aria-hidden
              onClick={() => setOpen(false)}
            />
            <div className="fixed inset-0 z-[101] flex items-start justify-center px-4 pt-[15vh]" role="dialog" aria-modal="true" aria-label="Search">
              <m.div
                initial={{ opacity: 0, scale: 0.96, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -10 }}
                transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-lg overflow-hidden rounded-2xl border border-border/60 bg-card shadow-elevated"
              >
                {/* Search input */}
                <div className="flex items-center gap-3 border-b border-border/40 px-4">
                  <Search className="size-5 shrink-0 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search pages, services, technologies..."
                    className="h-14 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    aria-label="Search"
                    autoComplete="off"
                  />
                  <kbd className="shrink-0 rounded-md border border-border/60 bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
                  {/* Recent searches (when no query) */}
                  {!query.trim() && recentSearches.length > 0 && (
                    <div className="mb-2">
                      <p className="px-3 py-2 text-xs font-medium text-muted-foreground">Recent</p>
                      {recentSearches.map((label) => {
                        const item = SEARCH_DATA.find((s) => s.label === label);
                        if (!item) return null;
                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
                          >
                            <item.icon className="size-4 text-muted-foreground" />
                            <span className="flex-1">{item.label}</span>
                            <span className="text-xs text-muted-foreground">{item.category}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Categorized results */}
                  {filtered.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
                      <Search className="size-8 opacity-40" />
                      <p className="text-sm">No results found</p>
                    </div>
                  ) : (
                    CATEGORIES.map((cat) => {
                      const items = grouped.get(cat);
                      if (!items?.length) return null;
                      return (
                        <div key={cat} className="mb-2">
                          <p className="px-3 py-2 text-xs font-medium text-muted-foreground">{cat}</p>
                          {items.map((item) => {
                            flatIndex++;
                            const idx = flatIndex;
                            const isSelected = idx === selectedIndex;
                            return (
                              <Link
                                key={item.id}
                                href={item.href}
                                data-index={idx}
                                onClick={() => setOpen(false)}
                                onMouseEnter={() => setSelectedIndex(idx)}
                                role="option"
                                aria-selected={isSelected}
                                className={cn(
                                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                                  isSelected ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                                )}
                              >
                                <span className={cn("flex size-8 items-center justify-center rounded-lg transition-colors", isSelected ? "bg-gold/10 text-gold" : "bg-secondary text-muted-foreground")}>
                                  <item.icon className="size-4" />
                                </span>
                                <div className="flex-1 min-w-0">
                                  <span className="block font-medium truncate">{item.label}</span>
                                  <span className="block text-xs text-muted-foreground truncate">{item.description}</span>
                                </div>
                                <ArrowRight className={cn("size-4 shrink-0 transition-opacity", isSelected ? "opacity-100" : "opacity-0")} />
                              </Link>
                            );
                          })}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 border-t border-border/40 px-4 py-2.5 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border/60 bg-secondary px-1 py-0.5 text-[9px]">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border/60 bg-secondary px-1 py-0.5 text-[9px]">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border/60 bg-secondary px-1 py-0.5 text-[9px]">esc</kbd>
                    close
                  </span>
                </div>
              </m.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
