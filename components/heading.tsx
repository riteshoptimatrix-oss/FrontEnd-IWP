import * as React from "react";

import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

const sizeMap: Record<HeadingSize, string> = {
  xs: "text-xl",
  sm: "text-2xl sm:text-3xl",
  md: "text-3xl sm:text-4xl leading-[1.1]",
  lg: "text-4xl sm:text-5xl leading-[1.08]",
  xl: "text-5xl sm:text-6xl leading-[1.06]",
  "2xl": "text-6xl sm:text-7xl leading-[1.05]",
  "3xl": "text-7xl sm:text-8xl leading-[1.04]",
  "4xl": "text-8xl sm:text-9xl leading-[1.03]",
};

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: HeadingSize;
  gradient?: boolean;
}

export function Heading({
  as: Tag = "h2",
  size = "lg",
  gradient = false,
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        "font-semibold tracking-tight text-balance",
        gradient ? "text-gradient-gold" : "text-foreground",
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
