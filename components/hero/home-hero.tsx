"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { m, type Transition } from "framer-motion";
import { ArrowUpRight, Search, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AiChatModal } from "@/components/ai-chat-modal";

const keywordRoutes: [RegExp, string][] = [
  [/about|company|who are you|team|story|history|background/i, "/about-us"],
  [/service|offer|what you do|web development|design|develop|build/i, "/services"],
  [/portfolio|project|work|case study|example|showcase/i, "/portfolio"],
  [/contact|reach|get in touch|support|email|call|phone/i, "/contact-us"],
  [/optimatrix|game|typing|code sprint|syntax|logo match|practice|learn|challenge/i, "/optimatrix"],
  [/client|customer|partner|testimonial/i, "/clients"],
  [/engagement|hire|model|collaboration|team augmentation/i, "/engagement-models"],
  [/industry|healthcare|finance|education|ecommerce|real estate|travel/i, "/industries"],
  [/pricing|plan|cost|price|budget/i, "/engagement-models"],
  [/career|job|join|hiring|work with us|position/i, "/about-us"],
];

function findRoute(input: string): string {
  for (const [pattern, route] of keywordRoutes) {
    if (pattern.test(input)) return route;
  }
  return "/contact-us";
}

const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

const trustItems = [
  "Trusted by Global Clients",
  "End-to-End Development",
  "High Performance & Secure",
];

function FloatingShape({ className, delay = 0, duration = 10 }: { className: string; delay?: number; duration?: number }) {
  return (
    <m.div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", className)}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        opacity: [0.1, 0.6, 0.1],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

export function HomeHero() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) {
        setIsChatOpen(true);
        return;
      }
      setIsChatOpen(true);
    },
    [query],
  );

  return (
    <>
      <section className="relative min-h-[90vh] bg-[#F8FAFC] overflow-hidden flex flex-col pt-[180px] pb-16">
        
        {/* 1. Engineering Grid with Fade Mask */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_20%,transparent_100%)] opacity-50 pointer-events-none"></div>

        {/* 2. Minimal White-Based Animated Background Shapes */}
        {/* Large soft ambient moving blurs */}
        <FloatingShape className="top-[5%] left-[10%] w-[350px] h-[350px] bg-white blur-[60px]" duration={12} delay={0} />
        <FloatingShape className="top-[40%] right-[10%] w-[450px] h-[450px] bg-white blur-[80px]" duration={15} delay={1} />
        <FloatingShape className="bottom-[5%] left-[25%] w-[400px] h-[400px] bg-slate-100/80 blur-[70px]" duration={14} delay={2} />
        <FloatingShape className="top-[20%] left-[50%] w-[300px] h-[300px] bg-white blur-[50px]" duration={10} delay={0.5} />
        
        {/* Micro-particles for subtle movement */}
        <FloatingShape className="top-[30%] left-[20%] w-2 h-2 bg-slate-300 blur-[1px]" duration={8} delay={1} />
        <FloatingShape className="top-[60%] right-[25%] w-3 h-3 bg-slate-200 blur-[1px]" duration={9} delay={0.5} />
        <FloatingShape className="bottom-[20%] left-[40%] w-1.5 h-1.5 bg-slate-300 blur-none" duration={7} delay={1.5} />
        <FloatingShape className="top-[15%] right-[15%] w-2 h-2 bg-slate-200 blur-none" duration={10} delay={2} />
        <FloatingShape className="top-[50%] left-[60%] w-2.5 h-2.5 bg-white blur-none shadow-sm" duration={11} delay={3} />

        {/* 3. Noise Overlay for Tactile Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply pointer-events-none"></div>

        {/* Solid white background block for the transparent Navbar */}
        <div className="absolute top-0 left-0 w-full h-[76px] bg-white z-10 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"></div>

        {/* Top Curve SVG (Connecting to the white block above) */}
        <div className="absolute top-[75px] left-0 w-full z-20 pointer-events-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.02)]">
          <svg viewBox="0 0 1440 80" className="w-full h-[40px] md:h-[70px] text-white fill-current" preserveAspectRatio="none">
            <path d="M0,0 L400,0 C480,0 540,80 720,80 C900,80 960,0 1040,0 L1440,0 Z" />
          </svg>
        </div>

        {/* Floating AI Search Bar */}
        <div className="absolute top-[90px] md:top-[115px] left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-xl">
          {/* Gradient Border Wrapper */}
          <div className="relative rounded-full p-[1.5px] bg-gradient-to-r from-blue-200 via-orange-300 to-blue-400 shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <form
              className="bg-white rounded-full p-1.5 md:p-2 pl-4 md:pl-5 flex items-center h-[56px] w-full cursor-text"
              onClick={() => setIsChatOpen(true)}
              onSubmit={handleSubmit}
            >
              {/* Dark Blue Icon with Sparkles */}
              <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-tr from-[#1a2340] via-[#243b75] to-[#2b4c9e] text-white shrink-0 mr-3 shadow-inner">
                <Sparkles size={16} className="text-blue-100 fill-white" />
              </div>
              
              <span className="text-[15px] font-semibold text-[#0F172A] mr-3 hidden sm:inline-block">Ask AI</span>
              
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsChatOpen(true);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChatOpen(true);
                }}
                placeholder="Hire expert develop"
                className="flex-1 bg-transparent text-[15px] outline-none text-slate-700 placeholder:text-slate-400 min-w-0"
              />
              
              <button 
                type="submit" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChatOpen(true);
                }}
                className="p-2 md:pr-4 text-blue-400 hover:text-blue-500 transition-colors ml-2"
              >
                <Search size={22} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

      <div className="relative z-10 mx-auto flex flex-1 w-full max-w-5xl flex-col items-center justify-center px-4 text-center mt-12 md:mt-20">
        
        {/* Top Label */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="flex items-center gap-2.5 mb-8 rounded-full bg-white px-4 py-1.5 shadow-sm border border-slate-200"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">Introducing</span>
          <span className="flex items-center gap-2 border-l border-slate-200 pl-2">
            <span className="flex size-4 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 items-center justify-center text-[8px] text-white">∞</span>
            <span className="text-[13px] font-bold text-slate-800 tracking-wide">IndiaWebProgrammers</span>
          </span>
        </m.div>

        {/* Heading */}
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight text-slate-900 mb-6 leading-[1.08]"
        >
          Elevate Your Business <br className="hidden md:block" /> 
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">With Premium Web Engineering</span>
        </m.h1>

        {/* Description */}
        <m.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          className="max-w-3xl text-base sm:text-lg text-slate-600 mb-10 leading-relaxed"
        >
          IndiaWebProgrammers is our dedicated framework which defines key principles for modern web development to Build, Run, and Evolve your teams and deliver systems with speed, scale, and real business outcomes.
        </m.p>

        {/* Buttons */}
        <m.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <a
            href="/services"
            className="group flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 shadow-md hover:shadow-lg"
          >
            View Our Process
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="/contact-us"
            className="flex items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-400 shadow-sm"
          >
            Book a Strategy Call
          </a>
        </m.div>

        {/* Trust Row */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-xs sm:text-sm text-slate-500 w-full"
        >
          {trustItems.map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 && <span className="hidden md:block text-slate-300">|</span>}
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-blue-500" />
                <span className="font-medium text-slate-700">{item}</span>
              </div>
            </React.Fragment>
          ))}
        </m.div>
      </div>

      </section>

      <AiChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        initialQuery={query}
      />
    </>
  );
}
