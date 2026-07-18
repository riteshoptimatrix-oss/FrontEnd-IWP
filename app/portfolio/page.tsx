import type { Metadata } from "next";
import { ArrowRight, Eye, Award, BarChart3, Globe } from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { PortfolioGrid } from "@/components/lazy/portfolio-grid";
import { LogoCloud } from "@/components/logo-cloud";
import { CTA } from "@/components/cta";
import { ShapesHome } from "@/components/animated-shapes";
import { SectionDivider } from "@/components/section-divider";
import { clientLogos, companyStats } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Selected work from India Web Programmers — websites, products and platforms we've engineered.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[65svh] flex items-center overflow-hidden bg-gradient-to-b from-blue-50/30 via-white to-white">
        <ShapesHome />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal type="fade-up">
              <span className="inline-flex items-center rounded-full border border-blue-200/30 bg-gradient-to-r from-blue-100/50 to-blue-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
                Portfolio
              </span>
            </Reveal>
            <Reveal type="fade-up" delay={0.05}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Work{' '}
                <span className="text-gradient-gold">we're proud of</span>
              </h1>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
                A glimpse at the products and platforms we've helped bring to life.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.15}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact-us" variant="gold" size="lg">
                  Start your project
                  <ArrowRight className="size-4" />
                </Button>
                <Button href="#work" variant="outline" size="lg">
                  Browse work
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
            {companyStats.map((s) => (
              <Reveal key={s.value} type="fade-up" className="text-center">
                <p className="text-2xl font-semibold text-gold sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Portfolio Grid ── */}
      <PortfolioGrid
        id="work"
        eyebrow="Selected work"
        title="Case studies & builds"
        description="Filter by discipline. Hover any project to see the stack."
      />

      <SectionDivider variant="gradient" />

      {/* ── Trusted by ── */}
      <LogoCloud
        id="clients"
        eyebrow="Trusted by"
        title="Teams we've partnered with"
        names={clientLogos}
        variant="gradient"
      />

      <CTA
        eyebrow="Start yours"
        title="Have a project in mind?"
        description="Let's talk about how we can help you ship it."
        primaryLabel="Contact us"
        primaryHref="/contact-us"
        primaryVariant="shimmer"
      />
    </>
  );
}
