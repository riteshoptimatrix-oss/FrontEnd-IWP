"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number | null;
  className?: string;
}

export function Accordion({
  items,
  defaultOpen = 0,
  className,
}: AccordionProps) {
  const [open, setOpen] = React.useState<number | null>(defaultOpen);

  return (
    <div
      className={cn(
        "mx-auto max-w-3xl divide-y divide-border/60 rounded-2xl border border-border/60 bg-card shadow-card",
        className,
      )}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `accordion-panel-${i}`;
        const buttonId = `accordion-button-${i}`;
        return (
          <div key={i} className="transition-colors hover:bg-secondary/30 first:rounded-t-2xl last:rounded-b-2xl">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium transition-colors",
                  isOpen ? "text-gold" : "text-foreground hover:text-gold",
                )}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-gold/70 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
