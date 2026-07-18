import * as React from "react";
import { SearchX } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";

export interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/30 px-6 py-16 text-center",
        className,
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <SearchX className="size-6" aria-hidden />
      </span>
      <h3 className="mt-5 text-xl font-semibold tracking-tight">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {actionLabel && actionHref ? (
        <Button href={actionHref} variant="gold" size="sm" className="mt-6">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
