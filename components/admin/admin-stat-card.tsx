"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function AdminStatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
  className,
}: AdminStatCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-white/80 p-5 backdrop-blur-xl transition-all duration-300 hover:shadow-card-hover dark:bg-ink/80",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
          {trend && trendValue && (
            <span
              className={cn(
                "text-xs font-medium",
                trend === "up" && "text-emerald-600",
                trend === "down" && "text-red-500",
                trend === "neutral" && "text-muted-foreground",
              )}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </span>
          )}
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
          <Icon className="size-5" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
  );
}
