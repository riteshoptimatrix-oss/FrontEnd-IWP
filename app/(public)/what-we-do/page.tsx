import type { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { SectionTitle } from "@/components/section-title";
import { FeatureGrid } from "@/components/feature-grid";
import { StepsList } from "@/components/steps-list";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/card";
import { TiltCard } from "@/components/tilt-card";
import { ShapesHome } from "@/components/animated-shapes";
import {
  allServices,
  processSteps,
  whyChooseUs,
  industries,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "What We Do",
  description:
    "We build websites, web apps, mobile apps, AI automation, UI/UX design, e-commerce, cloud infrastructure, and more — end-to-end digital engineering.",
  path: "/what-we-do",
});

export default function WhatWeDoPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[65svh] flex items-center overflow-hidden bg-gradient-to-b from-violet-50/30 via-white to-white">
        <ShapesHome />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal type="fade-up">
              <span className="inline-flex items-center rounded-full border border-violet-200/30 bg-gradient-to-r from-violet-100/50 to-violet-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 shadow-sm">
                <Sparkles className="size-3.5 -ml-0.5 mr-1" aria-hidden />
                What We Serve
              </span>
            </Reveal>
            <Reveal type="fade-up" delay={0.05}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Full-cycle digital engineering{' '}
                <span className="text-gradient-gold">from concept to scale</span>
              </h1>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
                We design, build and grow digital products that perform — websites,
                applications, platforms and AI-powered systems tailored to your goals.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.15}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact-us" variant="gold" size="lg">
                  Start a project
                  <ArrowRight className="size-4" />
                </Button>
                <Button href="#capabilities" variant="outline" size="lg">
                  See capabilities
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </Section>

      {/* ── What We Build ── */}
      <Section id="capabilities" className="pt-8 sm:pt-10 lg:pt-12">
        <Container>
          <SectionTitle
            eyebrow="Capabilities"
            title="What we build"
            description="Every capability is backed by senior engineers, proven processes, and a commitment to quality."
          />
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allServices.map((s) => (
              <Reveal inGroup key={s.id}>
                <TiltCard>
                  <Card
                    hover
                    className="group relative flex h-full flex-col overflow-hidden"
                  >
                    <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-violet-50/40 transition-all duration-500 group-hover:scale-[3] group-hover:opacity-0" />
                    <CardHeader>
                      <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100/60 to-violet-50/40 text-violet-600 ring-1 ring-violet-200/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
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
                            className="inline-flex items-center rounded-md bg-violet-50/60 px-2 py-0.5 text-[11px] font-medium text-violet-700"
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
                        className="w-full group-hover:border-violet-200 group-hover:bg-violet-50/40"
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

      {/* ── Process ── */}
      <StepsList
        id="process"
        eyebrow="How we work"
        title="Our delivery process"
        description="A proven, transparent journey from discovery to launch and beyond."
        steps={processSteps}
      />

      {/* ── Why Choose Us ── */}
      <FeatureGrid
        id="why-us"
        eyebrow="Why India Web Programmers"
        title="What sets us apart"
        description="We combine deep technical expertise with genuine care for your outcomes."
        items={whyChooseUs}
        columns={4}
        variant="alt"
      />

      {/* ── Industries ── */}
      <Section id="industries" className="pt-8 sm:pt-10 lg:pt-12">
        <Container>
          <SectionTitle
            eyebrow="Industries"
            title="Serving diverse industries"
            description="Domain experience across every product we ship."
          />
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Reveal inGroup key={ind.title}>
                <div className="group flex items-start gap-4 rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200/30 hover:shadow-card-hover">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100/60 to-violet-50/40 text-violet-600 ring-1 ring-violet-200/40 transition-all duration-300 group-hover:scale-110">
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

      <section className="relative overflow-hidden border-t border-border/40 bg-white">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/30 blur-[100px]" />
        <Container className="relative py-16 sm:py-20">
          <Reveal type="fade-up" className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200/40 bg-violet-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 shadow-sm">
              <Sparkles className="size-3" aria-hidden />
              Let's talk
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to build something{' '}
              <span className="text-gradient-gold">great?</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Tell us about your project and we'll craft a plan tailored to your goals.
            </p>
            <div className="mt-8">
              <Button href="/contact-us" variant="gold" size="lg">
                Start a conversation
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
