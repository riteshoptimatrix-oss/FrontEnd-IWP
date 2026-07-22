"use client";

import * as React from "react";
import { m } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";
import { homeServices } from "@/lib/data";
import { cn } from "@/lib/utils";

function ServiceCard({ service, index }: { service: typeof homeServices[number]; index: number }) {
  const Icon = service.icon;
  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={service.href} className="group block">
        <div className="relative overflow-hidden rounded-2xl border border-blue-100/30 bg-white/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-200/50 hover:shadow-xl hover:shadow-blue-100/20 sm:p-7">
          <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg">
            <Icon className="size-5" />
          </span>
          <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {service.points.map((p) => (
              <span key={p} className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600">
                {p}
              </span>
            ))}
          </div>
          <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
            Learn more <ArrowRight className="size-3" />
          </span>
        </div>
      </Link>
    </m.div>
  );
}

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -left-48 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-100/20 blur-3xl" />
      <Container>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            What we do
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Services that <span className="text-blue-600">scale with you</span>
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            From first concept to ongoing growth — a partnership built around your goals.
          </p>
        </m.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
