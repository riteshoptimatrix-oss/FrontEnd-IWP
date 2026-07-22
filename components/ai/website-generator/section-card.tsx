"use client";

import React from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface SectionCardProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  selected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  type?: "single" | "multiple";
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  selected,
  onClick,
  children,
  className,
  type = "single"
}: SectionCardProps) {
  return (
    <m.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300",
        selected
          ? "border-primary bg-primary/5 premium-shadow"
          : "border-border bg-card hover:border-primary/50 hover:bg-muted/50",
        className
      )}
    >
      {/* Selected Indicator */}
      <div 
        className={cn(
          "absolute right-4 top-4 transition-opacity duration-300",
          selected ? "opacity-100" : "opacity-0"
        )}
      >
        <CheckCircle2 className="h-5 w-5 text-primary" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        {Icon && (
          <div className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center mb-4 transition-colors",
            selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        
        <h3 className={cn(
          "font-semibold text-lg mb-1 transition-colors",
          selected ? "text-foreground" : "text-foreground"
        )}>
          {title}
        </h3>
        
        {description && (
          <p className="text-muted-foreground text-sm flex-1">
            {description}
          </p>
        )}

        {children && (
          <div className="mt-4 pt-4 border-t border-border flex-1">
            {children}
          </div>
        )}
      </div>

      {/* Glow Effect */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none",
          selected && "opacity-100"
        )}
      />
    </m.div>
  );
}
