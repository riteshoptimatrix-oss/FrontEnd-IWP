"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { getTitleForLevel } from "@/lib/codesprint/level-system";

interface LevelBadgeProps {
  level: number;
  size?: "sm" | "md" | "lg";
  showTitle?: boolean;
}

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-lg",
};

export function LevelBadge({ level, size = "md", showTitle = false }: LevelBadgeProps) {
  const title = getTitleForLevel(level);
  const isHigh = level >= 7;
  const isElite = level >= 9;

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex items-center justify-center rounded-full font-bold",
          sizeClasses[size],
          isElite
            ? "bg-gradient-to-br from-gold to-amber-500 text-white shadow-lg shadow-gold/20"
            : isHigh
              ? "bg-gradient-to-br from-gold/20 to-amber-500/20 text-gold ring-1 ring-gold/30"
              : "bg-gold/10 text-gold",
        )}
      >
        {level}
      </div>
      {showTitle && (
        <span className={cn("text-sm font-medium", isElite ? "text-gold" : "text-muted-foreground")}>
          {title}
        </span>
      )}
    </div>
  );
}
