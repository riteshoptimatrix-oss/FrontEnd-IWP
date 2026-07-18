import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-9 w-9",
  xl: "h-12 w-12",
} as const;

export interface LoadingProps {
  size?: keyof typeof sizeMap;
  label?: string;
  full?: boolean;
  className?: string;
}

export function Loading({
  size = "md",
  label = "Loading",
  full = false,
  className,
}: LoadingProps) {
  const spinner = (
    <Loader2
      className={cn("animate-spin text-gold", sizeMap[size])}
      aria-hidden
    />
  );

  if (full) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex min-h-[60vh] w-full flex-col items-center justify-center gap-4",
          className,
        )}
      >
        {spinner}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex items-center gap-3", className)}
    >
      {spinner}
      {label ? <span className="text-sm text-muted-foreground">{label}</span> : null}
      <span className="sr-only">{label}</span>
    </div>
  );
}
