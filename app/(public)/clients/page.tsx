import type { Metadata } from "next";
import { ArrowRight, Quote, Star } from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { LogoCloud } from "@/components/logo-cloud";
import { Testimonials } from "@/components/lazy/testimonials";
import { Stats } from "@/components/stats";
import { CTA } from "@/components/cta";
import { ShapesWarm } from "@/components/animated-shapes";
import { SectionDivider } from "@/components/section-divider";
import { Card, CardContent } from "@/components/card";
import { clientLogos, clientStats, clientSuccessStories } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Clients",
  description:
    "Our clients — the teams and brands we partner with to build exceptional digital products.",
  path: "/clients",
});

export default function ClientsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[65svh] flex items-center overflow-hidden bg-gradient-to-b from-amber-50/30 via-white to-white">
        <ShapesWarm />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal type="fade-up">
                <span className="inline-flex items-center rounded-full border border-amber-200/30 bg-gradient-to-r from-amber-100/50 to-amber-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 shadow-sm">
                  Clients
                </span>
              </Reveal>
              <Reveal type="fade-up" delay={0.05}>
                <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Trusted by{' '}
                  <span className="text-gradient-gold">great teams</span>
                </h1>
              </Reveal>
              <Reveal type="fade-up" delay={0.1}>
                <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                  The companies and founders who build with India Web Programmers.
                </p>
              </Reveal>
              <Reveal type="fade-up" delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/contact-us" variant="gold" size="lg">
                    Work with us
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button href="#stories" variant="outline" size="lg">
                    Read stories
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal type="scale-in" delay={0.2} className="hidden lg:block">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 p-8 shadow-elevated ring-1 ring-border/40">
                <Quote className="size-10 text-amber-200/60" />
                <blockquote className="mt-4 text-lg leading-relaxed text-foreground/80">
                  "India Web Programmers became an extension of our team. The quality bar they set raised ours."
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-border/30 pt-6">
                  <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 text-sm font-bold">
                    PN
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Priya Nair</p>
                    <p className="text-xs text-muted-foreground">VP Product, Aurora Bank</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </Section>

      {/* ── Logo Cloud ── */}
      <LogoCloud
        id="logos"
        eyebrow="Trusted by"
        title="Clients we've partnered with"
        names={clientLogos}
      />

      <SectionDivider variant="wave" />

      {/* ── Success Stories ── */}
      <Testimonials
        id="stories"
        eyebrow="Success stories"
        title="What our clients say"
        description="A few words from the teams we've worked alongside."
        items={clientSuccessStories}
        variant="alt"
      />

      {/* ── Stats ── */}
      <Stats id="stats" stats={clientStats} />

      <SectionDivider variant="gradient" />

      <CTA
        eyebrow="Join them"
        title="Become our next success story"
        description="Let's build something your customers will love."
        primaryLabel="Work with us"
        primaryHref="/contact-us"
        primaryVariant="shimmer"
      />
    </>
  );
}
