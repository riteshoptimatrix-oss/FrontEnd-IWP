import type { Metadata } from "next";
import { ArrowRight, Code2, Check, X, Minus } from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { FeatureGrid } from "@/components/feature-grid";
import { StepsList } from "@/components/steps-list";
import { TechStack } from "@/components/tech-stack";
import { CTA } from "@/components/cta";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { TiltCard } from "@/components/tilt-card";
import { ShapesTeal } from "@/components/animated-shapes";
import { SectionDivider } from "@/components/section-divider";
import { SectionTitle } from "@/components/section-title";
import { SectionFaq } from "@/components/section-faq";
import { cn } from "@/lib/utils";
import {
  techStack,
  websiteBenefits,
  websiteFeaturesExpanded,
  websiteTypesExpanded,
  websiteWorkflowExpanded,
  cmsComparison,
  websiteDevFaqs,
  companyStats,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Website Development",
  description:
    "Website development services — fast, accessible and beautifully crafted websites that convert.",
  path: "/services/website-development",
});

function ComparisonIcon({ advantage }: { advantage: "headless" | "traditional" | "tie" }) {
  if (advantage === "headless") {
    return <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><Check className="size-3.5" /></span>;
  }
  if (advantage === "traditional") {
    return <span className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-blue-600"><Check className="size-3.5" /></span>;
  }
  return <span className="flex size-6 items-center justify-center rounded-full bg-amber-100 text-amber-600"><Minus className="size-3.5" /></span>;
}

export default function WebsiteDevelopmentPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[65svh] flex items-center overflow-hidden bg-gradient-to-b from-teal-50/30 via-white to-white">
        <ShapesTeal />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal type="fade-up">
                <span className="inline-flex items-center rounded-full border border-teal-200/30 bg-gradient-to-r from-teal-100/50 to-teal-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 shadow-sm">
                  Website Development
                </span>
              </Reveal>
              <Reveal type="fade-up" delay={0.05}>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Websites that{' '}
                  <span className="text-gradient-gold">perform and convert</span>
                </h1>
              </Reveal>
              <Reveal type="fade-up" delay={0.1}>
                <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                  High-performance, accessible websites engineered to represent your brand and grow with it.
                </p>
              </Reveal>
              <Reveal type="fade-up" delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact-us" variant="gold" size="lg">
                    Start a project
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button href="#benefits" variant="outline" size="lg">
                    See benefits
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal type="scale-in" delay={0.2} className="hidden lg:block">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-teal-50/50 via-white to-teal-50/30 shadow-elevated ring-1 ring-border/40">
                <div className="absolute inset-0 bg-grid-subtle" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <span className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 text-white shadow-lg">
                      <Code2 className="size-10" />
                    </span>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">Built with modern stack</p>
                      <p className="text-sm text-muted-foreground">Next.js · Tailwind · TypeScript</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 flex gap-2">
                  <span className="size-2 rounded-full bg-teal-400/40" />
                  <span className="size-2 rounded-full bg-teal-300/30" />
                  <span className="size-2 rounded-full bg-teal-200/20" />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </Section>



      {/* ── Benefits ── */}
      <FeatureGrid
        id="benefits"
        eyebrow="Business benefits"
        title="Websites that work harder"
        description="Every build is held to a performance and accessibility budget."
        items={websiteBenefits}
        columns={4}
      />

      <SectionDivider variant="gradient" />

      {/* ── Website Types ── */}
      <Section id="types">
        <Container>
          <SectionTitle
            eyebrow="What we build"
            title="Website types we craft"
            description="From landing pages to full-scale platforms — we build it right."
          />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {websiteTypesExpanded.map((t) => (
              <Reveal inGroup key={t.title}>
                <TiltCard>
                  <Card hover className="group h-full">
                    <CardHeader>
                      <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-100/60 to-teal-50/40 text-teal-600 ring-1 ring-teal-200/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                        <t.icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle>{t.title}</CardTitle>
                      <CardDescription>{t.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <SectionDivider variant="wave" />

      {/* ── Workflow ── */}
      <StepsList
        id="workflow"
        eyebrow="Our workflow"
        title="A workflow built for launch"
        description="From strategy to a confident go-live — every step deliberate."
        steps={websiteWorkflowExpanded}
      />

      {/* ── Features ── */}
      <FeatureGrid
        id="features"
        eyebrow="Out of the box"
        title="Features included by default"
        items={websiteFeaturesExpanded}
        columns={3}
        variant="gradient"
      />

      <SectionDivider variant="gradient" />

      {/* ── CMS Comparison ── */}
      <Section id="comparison">
        <Container>
          <SectionTitle
            eyebrow="How we build"
            title="Headless vs traditional CMS"
            description="A transparent comparison to help you decide."
          />
          <Reveal type="fade-up" className="mt-12 overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-0 rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm">
                {/* Header */}
                <div className="border-b border-border/50 bg-muted/30 px-6 py-4 text-sm font-semibold text-foreground">
                  Feature
                </div>
                <div className="border-b border-border/50 bg-muted/30 px-6 py-4 text-center text-sm font-semibold text-foreground">
                  Traditional CMS
                </div>
                <div className="border-b border-border/50 bg-muted/30 px-6 py-4 text-center text-sm font-semibold text-foreground">
                  Headless CMS
                </div>
                <div className="border-b border-border/50 bg-muted/30 px-4 py-4" />

                {/* Rows */}
                {cmsComparison.map((row, i) => (
                  <div
                    key={row.feature}
                    className={cn(
                      "contents",
                      i % 2 === 0 && "[&>div]:bg-muted/10"
                    )}
                  >
                    <div className="px-6 py-4 text-sm font-medium text-foreground">{row.feature}</div>
                    <div className="px-6 py-4 text-center text-sm text-muted-foreground">{row.traditional}</div>
                    <div className="px-6 py-4 text-center text-sm text-muted-foreground">{row.headless}</div>
                    <div className="flex items-center justify-center px-4 py-4">
                      <ComparisonIcon advantage={row.advantage} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <SectionDivider variant="line" />

      {/* ── Stack ── */}
      <TechStack
        id="stack"
        eyebrow="Our stack"
        title="Modern, future-proof technology"
        groups={techStack}
      />

      <SectionDivider variant="gradient" />

      {/* ── FAQ ── */}
      <SectionFaq
        id="faq"
        eyebrow="FAQ"
        title="Website development questions"
        description="Everything you need to know before we start."
        faqs={websiteDevFaqs}
      />

      <CTA
        eyebrow="Get started"
        title="Ready to build your website?"
        description="Tell us about your brand and goals — we'll handle the rest."
        primaryLabel="Start a project"
        primaryHref="/contact-us"
        primaryVariant="shimmer"
      />
    </>
  );
}
