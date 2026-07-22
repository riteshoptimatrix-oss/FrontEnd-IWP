"use client";

import * as React from "react";
import { m, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight, Keyboard, Brain, Palette, Zap,
  Trophy, Users, Code2, Sparkles,
  Flame, Gamepad2, Clock, Hash,
  Star, Shield, Layers, BarChart3, Search,
} from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

function FloatingParticle({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <m.div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", className)}
      animate={{
        y: [0, -20 - Math.random() * 20, 0],
        opacity: [0, 0.4, 0],
      }}
      transition={{
        duration: 3 + Math.random() * 3,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

function GradientOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <m.div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-[80px]", className)}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.06, 0.12, 0.06],
        x: [0, 20, 0],
      }}
      transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay }}
    />
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  tags: string[];
  stats: { icon: React.ReactNode; label: string }[];
  href: string;
  buttonLabel: string;
  delay?: number;
}

function FeatureCard({ icon, iconBg, title, description, tags, stats, href, buttonLabel, delay = 0 }: FeatureCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
      className="group"
    >
      <div className="rounded-xl border border-slate-200/70 bg-white p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
        <div className={cn("flex size-10 items-center justify-center rounded-lg", iconBg)}>
          {icon}
        </div>

        <h3 className="mt-4 text-[15px] font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
          {stats.map((stat) => (
            <span key={stat.label} className="flex items-center gap-1">
              {stat.icon}
              {stat.label}
            </span>
          ))}
        </div>

        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          {buttonLabel}
          <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </m.div>
  );
}

const features = [
  {
    icon: <Keyboard className="size-5 text-white" />,
    iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    title: "Code Sprint",
    description: "Race against the clock typing real production code. Build speed and accuracy across 9+ languages.",
    tags: ["9+ Languages", "3 Difficulty Levels", "Leaderboard"],
    stats: [
      { icon: <Clock className="size-3" />, label: "Timed Challenges" },
      { icon: <Flame className="size-3" />, label: "Streaks" },
    ],
    href: "/optimatrix/code-sprint",
    buttonLabel: "Start Sprint",
  },
  {
    icon: <Brain className="size-5 text-white" />,
    iconBg: "bg-gradient-to-br from-violet-500 to-violet-600",
    title: "Syntax Match",
    description: "Train your programming memory by matching syntax, components, APIs and coding concepts across languages.",
    tags: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript"],
    stats: [
      { icon: <Hash className="size-3" />, label: "9 Languages" },
      { icon: <Zap className="size-3" />, label: "3 Levels" },
    ],
    href: "/optimatrix/syntax-match",
    buttonLabel: "Play Now",
  },
  {
    icon: <Palette className="size-5 text-white" />,
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    title: "Tech Logo Match",
    description: "Recognize frontend technologies by their official logos. Sharpen visual memory across 15+ technologies.",
    tags: ["React", "Vue", "Angular", "Next.js", "Tailwind", "TypeScript"],
    stats: [
      { icon: <Hash className="size-3" />, label: "15+ Technologies" },
      { icon: <Gamepad2 className="size-3" />, label: "4 Game Modes" },
    ],
    href: "/optimatrix/tech-logo-match",
    buttonLabel: "Play Now",
  },
  {
    icon: <Search className="size-5 text-white" />,
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
    title: "Regex Pattern Tester",
    description: "Test and debug regular expressions in real-time. Match patterns against sample text with live highlighting and capture group inspection.",
    tags: ["Live Matching", "Capture Groups", "Replace Preview"],
    stats: [
      { icon: <Hash className="size-3" />, label: "Real-time" },
      { icon: <Zap className="size-3" />, label: "Interactive" },
    ],
    href: "/optimatrix/regex-pattern-tester",
    buttonLabel: "Open Tester",
  },
];

const stats = [
  { icon: Code2, value: "500+", label: "Code Snippets" },
  { icon: Layers, value: "4", label: "Game Modes" },
  { icon: Users, value: "1K+", label: "Active Players" },
  { icon: Flame, value: "9+", label: "Languages" },
];

const benefits = [
  { icon: Trophy, title: "Leaderboards", desc: "Compete with developers worldwide and climb the ranks." },
  { icon: Zap, title: "Real Code", desc: "Practice with production snippets from popular frameworks." },
  { icon: BarChart3, title: "Progress Tracking", desc: "Monitor your speed, accuracy and improvement over time." },
  { icon: Shield, title: "Streak System", desc: "Stay consistent with daily challenges and streak rewards." },
];

export default function OptiMatrixPage() {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  return (
    <div>
      {/* ── Hero ── */}
      <m.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative flex min-h-[85vh] items-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white"
      >
        <GradientOrb className="-top-48 left-1/2 h-[600px] w-[600px] -translate-x-1/2 bg-blue-300" />
        <GradientOrb className="-bottom-48 -right-48 h-[450px] w-[450px] bg-indigo-300" delay={2} />
        <GradientOrb className="left-[15%] top-1/3 h-[300px] w-[300px] bg-cyan-300" delay={4} />

        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]" />

        <FloatingParticle className="left-[20%] top-[25%] h-1.5 w-1.5 bg-blue-400/30" delay={0} />
        <FloatingParticle className="right-[25%] top-[15%] h-1 w-1 bg-indigo-400/30" delay={1.2} />
        <FloatingParticle className="left-[40%] top-[55%] h-2 w-2 bg-cyan-400/20" delay={2.5} />
        <FloatingParticle className="right-[15%] top-[45%] h-1.5 w-1.5 bg-blue-400/25" delay={0.8} />
        <FloatingParticle className="left-[60%] top-[20%] h-1 w-1 bg-violet-400/20" delay={3} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <m.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200/40 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 shadow-sm"
            >
              <Sparkles className="size-3.5" aria-hidden />
              Skill Platform
            </m.span>

            <m.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="mt-6 max-w-4xl text-[2.5rem] font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Master development{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                through play
              </span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg"
            >
              OptiMatrix transforms the way you learn coding. Challenge yourself
              with typing sprints, memory matches, and visual recognition games
              designed to make you a better developer.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Link
                href="/optimatrix/code-sprint"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                Start Playing
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/optimatrix/tech-logo-match"
                className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5"
              >
                Explore Games
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </m.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <m.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Scroll</span>
            <div className="flex h-10 w-5 items-start justify-center rounded-full border border-slate-200 p-1">
              <m.div
                className="h-2 w-1 rounded-full bg-blue-400/50"
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </m.div>
        </m.div>
      </m.section>

      {/* ── Stats Strip ── */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <m.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <stat.icon className="size-5 text-blue-500/60" aria-hidden />
                <p className="text-2xl font-bold text-slate-900 sm:text-3xl">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <m.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"
            >
              <Gamepad2 className="size-3.5" aria-hidden />
              Game Modes
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
            >
              Four ways to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                level up
              </span>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mt-3 max-w-2xl text-base text-slate-500 sm:text-lg"
            >
              Each mode targets a different skill. Play them all and become a
              well-rounded developer.
            </m.p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-slate-50/60 py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Built for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                continuous growth
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
              Track your progress, compete on leaderboards, and build skills
              that translate directly to real-world development.
            </p>
          </m.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, i) => (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-100">
                  <item.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <GradientOrb className="left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-blue-200" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Ready to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                level up
              </span>{" "}
              your skills?
            </h2>
            <p className="mt-4 max-w-xl text-base text-slate-500 sm:text-lg">
              Join developers who are sharpening their craft with OptiMatrix.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="/optimatrix/code-sprint"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </div>
  );
}
