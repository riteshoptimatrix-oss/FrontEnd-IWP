"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/container";
import { portfolioProjects } from "@/lib/data";

export function PortfolioSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-100/15 blur-3xl" />
      <Container>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            Our Portfolio
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Projects we're <span className="text-blue-600">proud of</span>
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Real projects we have built for real clients.
          </p>
        </m.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project, i) => (
            <m.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-white/50 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-border/60 hover:shadow-xl">
                <div className={`aspect-[16/9] w-full bg-gradient-to-br ${project.accent} flex items-center justify-center p-6`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={180}
                    height={120}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <span className="inline-block rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
                    {project.category}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-blue-50/50 px-2 py-0.5 text-[11px] font-medium text-blue-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border/20 px-6 py-4 sm:px-6">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-all duration-300 group-hover:gap-2">
                    View project <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200/50 bg-white/60 px-6 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-blue-300/50 hover:shadow-md"
          >
            View all projects <ArrowRight className="size-4" />
          </Link>
        </m.div>
      </Container>
    </section>
  );
}
