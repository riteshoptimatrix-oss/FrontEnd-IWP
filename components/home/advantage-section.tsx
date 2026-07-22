"use client";

import * as React from "react";
import { m, useScroll, type Transition } from "framer-motion";
import { ArrowUpRight, Sparkles, Code2, Rocket, LineChart, ShieldCheck } from "lucide-react";

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

const cards = [
  {
    icon: Code2,
    subtitle: "AI-NATIVE ENGINEERING",
    title: "Modern Tech Stack",
    tag: "Built for Scale",
    content:
      "We leverage cutting-edge technologies and AI-assisted workflows to build scalable, high-performance web applications tailored to your business needs.",
    buttonText: "Explore Our Tech",
    link: "/services",
    gradient: "from-blue-500/10 via-blue-400/5 to-transparent",
    borderGlow: "group-hover:border-blue-500/30 group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)]",
    iconColor: "text-blue-500",
  },
  {
    icon: Rocket,
    subtitle: "AGILE METHODOLOGY",
    title: "Seamless Delivery",
    tag: "Concept to Launch",
    content:
      "From initial planning to final deployment, our agile process ensures rapid iterations, continuous feedback, and successful project delivery on time.",
    buttonText: "View Our Process",
    link: "/about-us",
    gradient: "from-indigo-500/10 via-indigo-400/5 to-transparent",
    borderGlow: "group-hover:border-indigo-500/30 group-hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)]",
    iconColor: "text-indigo-500",
  },
  {
    icon: LineChart,
    subtitle: "CLIENT-CENTRIC",
    title: "Result-Driven",
    tag: "Measurable Impact",
    content:
      "We focus on your business goals. By prioritizing user experience and conversion optimization, we deliver solutions that drive real, measurable growth.",
    buttonText: "See Success Stories",
    link: "/portfolio",
    gradient: "from-purple-500/10 via-purple-400/5 to-transparent",
    borderGlow: "group-hover:border-purple-500/30 group-hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)]",
    iconColor: "text-purple-500",
  },
  {
    icon: ShieldCheck,
    subtitle: "DEDICATED SUPPORT",
    title: "Ongoing Partnership",
    tag: "Beyond Launch",
    content:
      "Our relationship doesn't end at launch. We provide continuous maintenance, performance monitoring, and strategic support to keep you ahead.",
    buttonText: "Connect With Us",
    link: "/contact-us",
    gradient: "from-cyan-500/10 via-cyan-400/5 to-transparent",
    borderGlow: "group-hover:border-cyan-500/30 group-hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)]",
    iconColor: "text-cyan-500",
  },
];

export function AdvantageSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden bg-white">
      {/* Background accents linking from Hero */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply pointer-events-none"></div>

      {/* Subtle grid lines for high-tech feel in light theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none"></div>

      <div className="absolute -top-48 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <m.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 mb-6 shadow-sm"
          >
            <Sparkles className="size-3.5 text-blue-600" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700">
              The AI Advantage
            </span>
          </m.div>

          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl mb-6 leading-tight"
          >
            Not just faster. <br className="hidden sm:block" />
            <span className="text-slate-500 font-medium">Fundamentally different.</span>
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Experience the next generation of digital engineering. We combine human expertise with AI capabilities to deliver unparalleled scale, speed, and quality.
          </m.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <m.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 + index * 0.1 }}
                className={`group relative flex flex-col rounded-3xl p-6 sm:p-8 transition-all duration-500 border border-slate-200 bg-white/60 backdrop-blur-md shadow-sm hover:-translate-y-1 ${card.borderGlow} overflow-hidden`}
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10 mb-6 flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm group-hover:shadow transition-all">
                      <Icon className={`size-5 text-slate-400 group-hover:${card.iconColor} transition-colors`} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-700 transition-colors">
                      {card.subtitle}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-2">
                    {card.title}
                  </h4>
                  <p className={`text-xs font-bold ${card.iconColor} mb-6 uppercase tracking-wider`}>
                    {card.tag}
                  </p>

                  <div className="h-px w-full bg-slate-100 mb-6" />

                  <p className="text-sm leading-relaxed text-slate-600 group-hover:text-slate-700 transition-colors">
                    {card.content}
                  </p>
                </div>

                <a
                  href={card.link}
                  className="relative z-10 group/btn flex items-center justify-center w-full py-3.5 px-4 rounded-xl bg-slate-50 text-slate-700 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 border border-slate-200 hover:border-blue-600"
                >
                  {card.buttonText}
                  <ArrowUpRight className="ml-2 size-4 text-slate-400 group-hover/btn:text-white transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
