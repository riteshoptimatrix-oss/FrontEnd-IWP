import * as React from "react";

import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "@/components/container";

export interface SectionProps extends React.ComponentPropsWithoutRef<"section"> {
  container?: boolean;
  containerProps?: ContainerProps;
  variant?: "default" | "alt" | "gradient" | "ink";
}

const variantStyles: Record<string, string> = {
  default: "bg-background",
  alt: "bg-secondary/40",
  gradient: "bg-gradient-to-b from-secondary/30 via-background to-background",
  ink: "bg-gradient-to-b from-ink to-black text-white",
};

export function Section({
  className,
  container = true,
  containerProps,
  variant = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-20 sm:py-24 lg:py-32",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {container ? (
        <Container {...containerProps}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
