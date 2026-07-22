"use client";

import React from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { NavItem } from "@/types/ai";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  item,
  isActive,
  isCollapsed,
  onClick,
}: SidebarItemProps) {
  const Icon = item.icon;

  return (
    <div className="relative group">
      <Link
        href={item.href}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 select-none",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        <m.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center shrink-0"
        >
          <Icon
            className={cn(
              "h-5 w-5 transition-colors",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground group-hover:text-foreground"
            )}
          />
        </m.div>

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <m.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="truncate whitespace-nowrap"
            >
              {item.name}
            </m.span>
          )}
        </AnimatePresence>

        {item.badge && !isCollapsed && (
          <span className="ml-auto px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-muted text-muted-foreground border border-border">
            {item.badge}
          </span>
        )}
      </Link>

      {/* Tooltip for collapsed desktop state */}
      {isCollapsed && (
        <div
          role="tooltip"
          className="absolute left-full ml-3 px-2.5 py-1 bg-popover text-popover-foreground text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-150 z-50 whitespace-nowrap shadow-md border border-border"
        >
          {item.name}
          {item.badge && (
            <span className="ml-1.5 opacity-75 text-[10px]">({item.badge})</span>
          )}
        </div>
      )}
    </div>
  );
}
