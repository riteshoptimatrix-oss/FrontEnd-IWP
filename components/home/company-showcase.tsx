"use client";

import * as React from "react";
import { m } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";

const highlights = [
  "100% tailor-made — no templates. Every product built from scratch for your exact requirements.",
  "Young, energetic team of developers, designers & marketers focused on generating leads and growing your business.",
  "End-to-end IT services — consultation, design, development, launch, and long-term maintenance & support.",
];

export function CompanyShowcase() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
              <Sparkles className="size-3.5" aria-hidden />
              About IndiaWebProgrammers
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Three Years of{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Building & Growing
              </span>
            </h2>

            <p className="mt-3 text-base leading-relaxed text-slate-500">
              From a passionate small team in Bhuj to a full-service IT company trusted by businesses across India.
            </p>

            <p className="mt-3 text-base leading-relaxed text-slate-500">
              IndiaWebProgrammers Infotech Pvt. Ltd. is a privately-owned technology company in Bhuj, Kutch. We combine technical expertise with a deep understanding of business needs to deliver solutions that create real, measurable growth.
            </p>

            <div className="mt-4 space-y-2.5">
              {highlights.map((h) => (
                <div key={h} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-blue-500" />
                  <span className="text-sm leading-relaxed text-slate-600">{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
              >
                Work With Us
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { value: "50+", label: "Projects" },
                  { value: "40+", label: "Clients" },
                  { value: "100%", label: "Satisfaction" },
                ].map((stat, i) => (
                  <m.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="flex flex-col items-center rounded-xl border border-slate-100 bg-white p-5 text-center shadow-sm"
                  >
                    <span className="text-3xl font-bold text-blue-600 sm:text-4xl">{stat.value}</span>
                    <span className="mt-1 text-sm font-medium text-slate-500">{stat.label}</span>
                  </m.div>
                ))}
              </div>

              <div className="mt-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-center">
                <p className="text-sm font-semibold text-slate-700">
                  Your Dedicated IT Partner in Bhuj
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Contact us — we respond within one business day
                </p>
              </div>
            </div>
          </m.div>
        </div>
      </Container>
    </section>
  );
}
