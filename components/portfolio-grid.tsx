"use client";

import * as React from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section } from "@/components/section";
import { SectionTitle } from "@/components/section-title";
import { OptimizedImage } from "@/components/optimized-image";
import { EmptyState } from "@/components/empty-state";
import { portfolioCategories, portfolioProjects } from "@/lib/data";

export interface PortfolioGridProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function PortfolioGrid({
  id,
  eyebrow,
  title,
  description,
}: PortfolioGridProps) {
  const [active, setActive] = React.useState<string>("All");

  const list =
    active === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === active);

  return (
    <Section id={id}>
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div
        className="mt-10 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {portfolioCategories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className={cn(
                "rounded-xl border px-5 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "border-gold/30 bg-gold text-white shadow-sm"
                  : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border hover:bg-secondary",
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {list.length === 0 ? (
        <EmptyState
          className="mt-12"
          title="No projects in this category yet"
          description="Check back soon or browse all of our work."
          actionLabel="View all work"
          actionHref="/portfolio"
        />
      ) : (
        <m.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {list.map((project) => (
              <m.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <div
                  className={cn(
                    "relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br shadow-card transition-shadow duration-300 group-hover:shadow-card-hover",
                    project.accent,
                  )}
                >
                  <OptimizedImage
                    src={project.image}
                    alt={`${project.title} — ${project.category} project`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.summary}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-xl border border-border/60 bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
                    {project.category}
                  </span>
                </div>
              </m.article>
            ))}
          </AnimatePresence>
        </m.div>
      )}
    </Section>
  );
}
