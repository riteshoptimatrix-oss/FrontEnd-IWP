"use client";

import React from "react";
import { useWebsiteGeneratorStore } from "@/store/website-generator-store";
import { FeatureOption } from "@/types/website-generator";
import {
  Mail,
  Image as ImageIcon,
  Quote,
  HelpCircle,
  Send,
  BookOpen,
  Users,
  Briefcase,
  CreditCard,
  UserPlus,
  MessageCircle,
  Phone,
  MapPin,
  Search,
  BarChart3,
  Eye,
  Sparkles,
  Moon,
  CheckCircle2,
  Square,
} from "lucide-react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const FEATURES: FeatureOption[] = [
  { id: "Contact Form", title: "Contact Form", description: "Interactive inquiry form with email routing.", icon: Mail, category: "conversion" },
  { id: "Gallery", title: "Gallery", description: "Responsive image grid with lightbox modal viewer.", icon: ImageIcon, category: "core" },
  { id: "Testimonials", title: "Testimonials", description: "Customer reviews, ratings, and social proof carousel.", icon: Quote, category: "engagement" },
  { id: "FAQ", title: "FAQ", description: "Expandable accordion for frequently asked questions.", icon: HelpCircle, category: "engagement" },
  { id: "Newsletter", title: "Newsletter", description: "Email subscription form for leads & updates.", icon: Send, category: "conversion" },
  { id: "Blog", title: "Blog", description: "Articles list with search, categories, and post pages.", icon: BookOpen, category: "core" },
  { id: "Team Section", title: "Team Section", description: "Leadership profiles, bios, and social links.", icon: Users, category: "engagement" },
  { id: "Services", title: "Services", description: "Detailed service catalog with feature cards.", icon: Briefcase, category: "core" },
  { id: "Pricing", title: "Pricing", description: "Tiered pricing table with monthly/annual toggles.", icon: CreditCard, category: "conversion" },
  { id: "Careers", title: "Careers", description: "Job openings board and application submission form.", icon: UserPlus, category: "core" },
  { id: "WhatsApp Button", title: "WhatsApp Button", description: "Floating direct chat widget for instant messaging.", icon: MessageCircle, category: "conversion" },
  { id: "Call Button", title: "Call Button", description: "One-tap phone dialer button for mobile visitors.", icon: Phone, category: "conversion" },
  { id: "Google Maps", title: "Google Maps", description: "Embedded interactive map with custom location pin.", icon: MapPin, category: "core" },
  { id: "SEO Ready", title: "SEO Ready", description: "OpenGraph meta tags, sitemap, and JSON-LD schema.", icon: Search, category: "tech" },
  { id: "Analytics Ready", title: "Analytics Ready", description: "Google Analytics 4 & Meta Pixel event tracking.", icon: BarChart3, category: "tech" },
  { id: "Accessibility", title: "Accessibility", description: "WCAG 2.1 AA compliant ARIA labels & keyboard focus.", icon: Eye, category: "tech" },
  { id: "Animations", title: "Animations", description: "Smooth scroll progress, fade-ins, and micro-interactions.", icon: Sparkles, category: "tech" },
  { id: "Dark Mode Toggle", title: "Dark Mode Toggle", description: "Theme switch allowing visitors to toggle dark mode.", icon: Moon, category: "tech" },
];

export function FeatureSelector() {
  const { selectedFeatures, toggleFeature } = useWebsiteGeneratorStore();

  const categories = [
    { id: "core", name: "Core Sections" },
    { id: "conversion", name: "Lead & Conversion" },
    { id: "engagement", name: "User Engagement" },
    { id: "tech", name: "Tech & Optimization" },
  ];

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="border-b border-zinc-200/80 dark:border-zinc-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Step 4: Select Website Features
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Choose all functional components and optimization modules to include.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
          {selectedFeatures.length} Selected
        </div>
      </div>

      {categories.map((cat) => {
        const catFeatures = FEATURES.filter((f) => f.category === cat.id);
        if (catFeatures.length === 0) return null;

        return (
          <div key={cat.id} className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              {cat.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catFeatures.map((feature) => {
                const Icon = feature.icon;
                const isSelected = selectedFeatures.includes(feature.id);

                return (
                  <m.div
                    key={feature.id}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleFeature(feature.id)}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-200 select-none",
                      isSelected
                        ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm"
                        : "border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700"
                    )}
                  >
                    <div
                      className={cn(
                        "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border mt-0.5",
                        isSelected
                          ? "bg-white/10 text-white border-white/20 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold tracking-tight truncate">
                          {feature.title}
                        </h4>

                        {isSelected ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
                        ) : (
                          <Square className="h-4 w-4 text-zinc-300 dark:text-zinc-600 shrink-0" />
                        )}
                      </div>

                      <p
                        className={cn(
                          "text-[11px] mt-1 line-clamp-2 leading-relaxed",
                          isSelected ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-400"
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </m.div>
  );
}
