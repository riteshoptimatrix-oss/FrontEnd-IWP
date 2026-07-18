import * as React from "react";
import { Home } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";

export interface PageBannerProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: { label: string; href: string }[];
  align?: "left" | "center";
  className?: string;
  accent?: "blue" | "cyan" | "teal" | "violet" | "warm";
}

const accentStyles: Record<string, { from: string; to: string; glow: string }> = {
  blue: { from: "via-blue-50/40", to: "to-white", glow: "bg-gold/5" },
  cyan: { from: "via-cyan-50/30", to: "to-white", glow: "bg-cyan-300/5" },
  teal: { from: "via-emerald-50/30", to: "to-white", glow: "bg-emerald-300/5" },
  violet: { from: "via-violet-50/30", to: "to-white", glow: "bg-violet-300/5" },
  warm: { from: "via-amber-50/30", to: "to-white", glow: "bg-amber-300/5" },
};

export function PageBanner({
  eyebrow,
  title,
  description,
  breadcrumbs,
  align = "left",
  accent = "blue",
  className,
}: PageBannerProps) {
  const isCenter = align === "center";
  const s = accentStyles[accent];

  return (
    <header
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-white",
        s.from,
        s.to,
        "border-b border-border/40",
        className,
      )}
    >
      {/* Decorative glow */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full blur-3xl",
          s.glow,
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-cyan-300/5 blur-3xl"
      />
      {/* Subtle floating shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[20%] top-[15%] h-8 w-8 rounded-xl border border-gold/10 bg-gold/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[10%] bottom-[20%] h-6 w-6 rounded-lg border border-cyan-200/20 bg-cyan-50/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <Container className="relative">
        <div
          className={cn(
            "flex min-h-[36vh] flex-col justify-end gap-5 pb-14 pt-32 sm:min-h-[40vh] sm:pb-20",
            isCenter ? "items-center text-center" : "items-start text-left",
          )}
        >
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Home className="size-3.5" aria-hidden />
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-2">
                  <span aria-hidden className="text-muted-foreground/40">/</span>
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-foreground/80" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <a
                      href={crumb.href}
                      className="transition-colors hover:text-foreground text-muted-foreground"
                    >
                      {crumb.label}
                    </a>
                  )}
                </span>
              ))}
            </nav>
          ) : null}

          <Reveal type="fade-up" className={cn("flex flex-col gap-4", isCenter && "items-center")}>
            {eyebrow ? (
              <span className="inline-flex items-center rounded-full border border-gold/15 bg-gradient-to-r from-gold/10 to-gold/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold shadow-sm">
                {eyebrow}
              </span>
            ) : null}
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
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
        </div>
      </Container>
    </header>
  );
}
