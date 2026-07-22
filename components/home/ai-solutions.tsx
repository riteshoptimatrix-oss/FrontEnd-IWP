"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Sparkles, Bot, BrainCircuit, Workflow, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";

const aiProducts = [
  {
    title: "OptiMatrix AI",
    description: "Enterprise AI platform for intelligent automation, predictive analytics and decision intelligence.",
    icon: BrainCircuit,
    href: "/optimatrix",
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "AI Chat Solutions",
    description: "Custom conversational AI agents trained on your data for customer support and lead generation.",
    icon: Bot,
    href: "/ai",
    color: "from-blue-400 to-cyan-500",
  },
  {
    title: "Intelligent Workflows",
    description: "Automate complex business processes with AI-driven workflow orchestration and smart routing.",
    icon: Workflow,
    href: "/solutions",
    color: "from-indigo-500 to-blue-600",
  },
];

export function AiSolutions() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-blue-100/20 blur-3xl" />
      <Container>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            AI Solutions
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Intelligence that <span className="text-blue-600">drives results</span>
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Purpose-built AI products engineered for the enterprise.
          </p>
        </m.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiProducts.map((product, i) => {
            const Icon = product.icon;
            return (
              <m.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={product.href} className="group block h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-blue-100/30 bg-white/50 p-7 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200/50 hover:shadow-xl hover:shadow-blue-100/20">
                    <div aria-hidden className={`absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br ${product.color} opacity-5 transition-opacity duration-500 group-hover:opacity-10`} />
                    <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight">{product.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                    <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-all duration-300 group-hover:gap-2">
                      Explore <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </m.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
