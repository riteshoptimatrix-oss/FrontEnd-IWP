import type { Metadata } from "next";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { SectionTitle } from "@/components/section-title";
import { ShapesHome } from "@/components/animated-shapes";
import { industries } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description: "Industries we serve — healthcare, finance, e-commerce, education, real estate, travel, logistics, media & entertainment.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[65svh] flex items-center overflow-hidden bg-gradient-to-b from-emerald-50/30 via-white to-white">
        <ShapesHome />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal type="fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/30 bg-gradient-to-r from-emerald-100/50 to-emerald-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 shadow-sm">
                <Building2 className="size-3.5" aria-hidden />
                Industries
              </span>
            </Reveal>
            <Reveal type="fade-up" delay={0.05}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Built for{' '}
                <span className="text-gradient-gold">your industry</span>
              </h1>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
                Deep domain expertise across every product we ship — from healthcare
                compliance to e-commerce scale and everything in between.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.15}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact-us" variant="gold" size="lg">
                  Start your project
                  <ArrowRight className="size-4" />
                </Button>
                <Button href="#industries" variant="outline" size="lg">
                  Browse industries
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </Section>

      {/* ── Industries Grid ── */}
      <Section id="industries" className="pt-8 sm:pt-10 lg:pt-12">
        <Container>
          <SectionTitle
            eyebrow="Industries We Serve"
            title="Domain expertise across every sector"
            description="Our experience spans diverse industries, giving us the insight to deliver solutions that truly understand your market."
          />
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <Reveal inGroup key={ind.title}>
                <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200/30 hover:shadow-card-hover">
                  <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-emerald-50/40 transition-all duration-500 group-hover:scale-[4] group-hover:opacity-0" />
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100/60 to-emerald-50/40 text-emerald-600 ring-1 ring-emerald-200/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                    <ind.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{ind.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ind.description}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-border/40 bg-white">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/30 blur-[100px]" />
        <Container className="relative py-16 sm:py-20">
          <Reveal type="fade-up" className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/40 bg-emerald-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 shadow-sm">
              <Sparkles className="size-3" aria-hidden />
              Let's Talk
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to build for{' '}
              <span className="text-gradient-gold">your industry?</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Tell us about your domain, challenges, and goals — we'll craft a solution tailored to your market.
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
