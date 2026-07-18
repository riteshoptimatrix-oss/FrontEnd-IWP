import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { FeatureGrid } from "@/components/feature-grid";
import { StepsList } from "@/components/steps-list";
import { TechStack } from "@/components/tech-stack";
import { Pricing } from "@/components/lazy/pricing";
import { SectionFaq } from "@/components/section-faq";
import { CTA } from "@/components/cta";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/card";
import { TiltCard } from "@/components/tilt-card";
import { ShapesServices } from "@/components/animated-shapes";
import { SectionDivider } from "@/components/section-divider";
import { SectionTitle } from "@/components/section-title";
import {
  allServices,
  industries,
  processSteps,
  serviceBenefits,
  servicesFaqs,
  techStack,
  companyStats,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Our services — website development, web applications, design, SEO and growth engineering.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[65svh] flex items-center overflow-hidden bg-gradient-to-b from-cyan-50/30 via-white to-white">
        <ShapesServices />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal type="fade-up">
              <span className="inline-flex items-center rounded-full border border-cyan-200/30 bg-gradient-to-r from-cyan-100/50 to-cyan-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 shadow-sm">
                Services
              </span>
            </Reveal>
            <Reveal type="fade-up" delay={0.05}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Everything you need to{' '}
                <span className="text-gradient-gold">ship great products</span>
              </h1>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
                End-to-end digital engineering — from first pixel to production scale.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.15}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact-us" variant="gold" size="lg">
                  Start a project
                  <ArrowRight className="size-4" />
                </Button>
                <Button href="#services" variant="outline" size="lg">
                  Explore services
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </Section>

      {/* ── Stats strip ── */}
      <Section className="py-12 border-y border-border/40">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {companyStats.slice(0, 4).map((s) => (
              <Reveal key={s.value} type="fade-up" className="text-center">
                <p className="text-2xl font-semibold text-gold sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Service Cards ── */}
      <Section id="services">
        <Container>
          <SectionTitle
            eyebrow="Capabilities"
            title="Services engineered for outcomes"
            description="Pick a starting point — we tailor every engagement to your goals."
          />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allServices.map((s) => (
              <Reveal inGroup key={s.id}>
                <TiltCard>
                  <Card
                    hover
                    className="group relative flex h-full flex-col overflow-hidden"
                  >
                    <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan-50/40 transition-all duration-500 group-hover:scale-[3] group-hover:opacity-0" />
                    <CardHeader>
                      <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100/60 to-cyan-50/40 text-cyan-600 ring-1 ring-cyan-200/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                        <s.icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle>{s.title}</CardTitle>
                      <CardDescription>{s.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-1.5">
                        {s.points.map((p) => (
                          <span
                            key={p}
                            className="inline-flex items-center rounded-md bg-cyan-50/60 px-2 py-0.5 text-[11px] font-medium text-cyan-700"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        href={s.href}
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:border-cyan-200 group-hover:bg-cyan-50/40"
                      >
                        Learn more
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </CardFooter>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <SectionDivider variant="gradient" />

      {/* ── Process ── */}
      <StepsList
        id="process"
        eyebrow="How we work"
        title="A calm, proven process"
        description="Predictable delivery so you always know what's next."
        steps={processSteps}
      />

      {/* ── Benefits ── */}
      <FeatureGrid
        id="benefits"
        eyebrow="Why it pays off"
        title="Benefits of partnering with us"
        items={serviceBenefits}
        columns={4}
        variant="gradient"
      />

      <SectionDivider variant="wave" />

      {/* ── Tech Stack ── */}
      <TechStack
        id="stack"
        eyebrow="Our stack"
        title="Modern, future-proof technology"
        groups={techStack}
      />

      {/* ── Industries ── */}
      <Section variant="alt" id="industries">
        <Container>
          <SectionTitle
            eyebrow="Industries"
            title="Built for your industry"
            description="Domain experience across every product we ship."
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Reveal inGroup key={ind.title}>
                <div className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:shadow-card-hover">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100/60 to-cyan-50/40 text-cyan-600 ring-1 ring-cyan-200/40 transition-all duration-300 group-hover:scale-110">
                    <ind.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight">{ind.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{ind.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <SectionDivider variant="gradient" />

      {/* ── Pricing ── */}
      <Pricing id="pricing" />

      {/* ── FAQ ── */}
      <SectionFaq
        id="faq"
        eyebrow="FAQ"
        title="Frequently asked questions"
        faqs={servicesFaqs}
      />

      <CTA
        eyebrow="Engage us"
        title="Need a custom solution?"
        description="We'll tailor an engagement to your goals and timeline."
        primaryLabel="Request a quote"
        primaryHref="/contact-us"
        primaryVariant="shimmer"
      />
    </>
  );
}
