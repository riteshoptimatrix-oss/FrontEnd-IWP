import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section } from "@/components/section";
import { SectionTitle } from "@/components/section-title";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { RevealGroup, Reveal } from "@/components/motion/reveal";

export interface FeatureItemLike {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FeatureItemLike[];
  columns?: 2 | 3 | 4;
  align?: "left" | "center";
  hover?: boolean;
  className?: string;
  variant?: "default" | "alt" | "gradient" | "ink";
}

const colMap: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({
  id,
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  align = "center",
  hover = true,
  className,
  variant,
}: FeatureGridProps) {
  return (
    <Section id={id} variant={variant} className={cn(className)}>
      {(eyebrow || title || description) && (
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={align}
        />
      )}
      <RevealGroup
        className={cn("mt-12 grid gap-6", colMap[columns])}
      >
        {items.map((item) => (
          <Reveal inGroup key={item.title}>
            <Card hover={hover} className="h-full">
              <CardHeader>
                {item.icon ? (
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 text-gold ring-1 ring-gold/10">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                ) : null}
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
