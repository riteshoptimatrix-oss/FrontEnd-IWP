"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Sparkles, MessageSquare, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Free Consultation",
    description: "We understand your requirements, goals and budget in a no-obligation call or meeting.",
    color: "from-blue-500 to-blue-600",
    light: "from-blue-50 to-blue-100/60",
  },
  {
    step: "02",
    icon: PenTool,
    title: "Design & Planning",
    description: "We create wireframes and design mockups for your approval before writing a single line of code.",
    color: "from-indigo-500 to-indigo-600",
    light: "from-indigo-50 to-indigo-100/60",
  },
  {
    step: "03",
    icon: Code2,
    title: "Development",
    description: "Our team builds your product with regular updates and milestone reviews throughout.",
    color: "from-violet-500 to-violet-600",
    light: "from-violet-50 to-violet-100/60",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Launch & Support",
    description: "We deploy, test, and hand over — then stay with you for support, updates and growth.",
    color: "from-emerald-500 to-emerald-600",
    light: "from-emerald-50 to-emerald-100/60",
  },
];

export function HowWeWorkSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16">
      <Container>
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
            <Sparkles className="size-3.5" aria-hidden />
            How We Work
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From Idea to Launch{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              in 4 Steps
            </span>
          </h2>
          <p className="mt-2 max-w-xl text-base text-slate-500">
            A transparent, collaborative process that keeps you in control from concept to deployment.
          </p>
        </m.div>

        <div className="relative mt-10">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <m.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                  className="group relative"
                >
                  <div className="relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className={`absolute -top-3 right-4 flex size-7 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-[11px] font-bold text-white shadow-sm`}>
                      {step.step}
                    </div>

                    <div className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.light} ring-1 ring-slate-200/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                      <Icon className={`size-5 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} aria-hidden />
                    </div>

                    <h3 className="mt-3 text-base font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{step.description}</p>
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
          >
            Start Your Project
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </m.div>
      </Container>
    </section>
  );
}
