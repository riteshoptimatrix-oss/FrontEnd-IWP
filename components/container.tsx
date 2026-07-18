import * as React from "react";

import { cn } from "@/lib/utils";

export interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Narrower reading width for text-heavy sections. */
  size?: "default" | "narrow" | "wide";
}

const sizeMap = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  wide: "max-w-screen-2xl",
} as const;

/** Centered, responsive max-width wrapper used across the site. */
export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className,
      )}
      {...props}
    />
  );
}
