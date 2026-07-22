"use client";

import * as React from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Briefcase, FileText, Video, Sparkles, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

const resources = [
  {
    title: "Blog",
    description: "Insights, engineering news, and technical deep dives.",
    icon: BookOpen,
    href: "/resources/blog",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50/50",
  },
  {
    title: "Case Studies",
    description: "Success stories and ROI from our enterprise clients.",
    icon: Briefcase,
    href: "/resources/case-studies",
    color: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50/50",
  },
  {
    title: "HTML Compiler",
    description: "Write and compile HTML code directly in your browser.",
    icon: Code2,
    href: "/resources/html-compiler",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50/50",
  },
  {
    title: "Webinars & Events",
    description: "Live and recorded sessions with our tech experts.",
    icon: Video,
    href: "/resources/webinars",
    color: "from-fuchsia-500 to-pink-600",
    bg: "bg-fuchsia-50/50",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-[120px] pb-24 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute top-48 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-400/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 shadow-sm mb-6">
            <Sparkles className="size-3.5" />
            Knowledge Base
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Explore our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Resources
            </span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Everything you need to know about digital engineering, AI transformation, and building world-class products.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {resources.map((resource, i) => {
            const Icon = resource.icon;
            return (
              <m.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={resource.href}
                  className={cn(
                    "group relative flex flex-col h-full rounded-2xl border border-slate-200/60 bg-white p-8 transition-all duration-300",
                    "hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200"
                  )}
                >
                  <div className={cn("absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100", resource.bg)} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={cn(
                      "flex items-center justify-center w-14 h-14 rounded-xl mb-6 text-white shadow-sm",
                      `bg-gradient-to-br ${resource.color}`
                    )}>
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-8 flex-1">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                      Explore {resource.title}
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </m.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
