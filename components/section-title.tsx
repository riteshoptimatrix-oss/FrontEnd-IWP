import * as React from "react";

import { cn } from "@/lib/utils";
import { Heading } from "@/components/heading";
import { Reveal } from "@/components/motion/reveal";

export interface SectionTitleProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
  as = "h2",
}: SectionTitleProps) {
  const isCenter = align === "center";

  return (
    <Reveal
      type="fade-up"
      className={cn(
        "flex flex-col gap-5",
        isCenter ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center rounded-full border border-gold/20 bg-gold/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold",
            isCenter && "mx-auto",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <Heading as={as} size="md" className={titleClassName}>
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            isCenter && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
