"use client";

import * as React from "react";
import { m } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

import { portfolioData as caseStudies } from "@/data/knowledge/portfolio";


export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[120px] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 mb-6">
            <Briefcase className="size-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Client Success Stories</h1>
          <p className="text-lg text-slate-500">
            See how we've helped ambitious brands transform their digital presence and achieve measurable ROI.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, i) => (
            <m.div
              key={study.client}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:shadow-xl hover:border-indigo-300"
            >
              <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-slate-700">{study.client}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{study.metric}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{study.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{study.description}</p>
                <Link href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                  Read Case Study
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </div>
  );
}
