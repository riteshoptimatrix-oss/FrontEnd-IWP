import type { Metadata } from "next";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { Stats } from "@/components/stats";
import { StepsList } from "@/components/steps-list";
import { PortfolioGrid } from "@/components/lazy/portfolio-grid";
import { LogoCloud } from "@/components/logo-cloud";
import { Testimonials } from "@/components/lazy/testimonials";
import { SectionFaq } from "@/components/section-faq";
import { CTA } from "@/components/cta";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/card";
import { TiltCard } from "@/components/tilt-card";
import { SectionDivider } from "@/components/section-divider";
import { ShapesHome, ParticleField } from "@/components/animated-shapes";
import { IndustriesSection } from "@/components/industries-section";
import { CaseStudies } from "@/components/case-studies";
import { HomeTechStack } from "@/components/home-tech-stack";
import { StickyContact } from "@/components/sticky-contact";
import {
  aboutStory,
  clientLogos,
  companyStats,
  homeFaqs,
  homeServices,
  homeTestimonials,
  homeCaseStudies,
  homeTechItems,
  industries,
  processSteps,
  whyChooseUs,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  description:
    "India Web Programmers — enterprise-grade web development, design and digital engineering partner.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* ── 1. Cinematic Hero ── */}
      <Hero />

      {/* ── 2. Company Statistics ── */}
      <Stats id="stats" stats={companyStats} />

      <SectionDivider variant="gradient" />

      {/* ── 3. Interactive Services ── */}
      <Section variant="alt" id="services">
        <Container>
          <Reveal type="fade-up" className="flex flex-col items-center text-center">
            <span className="inline-flex w-fit items-center rounded-full border border-gold/15 bg-gradient-to-r from-gold/10 to-gold/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold shadow-sm">
              What we do
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Services that scale with you
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              From first concept to ongoing growth — a partnership built around your goals.
            </p>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {homeServices.map((s) => (
              <Reveal inGroup key={s.id}>
                <TiltCard>
                  <Card
                    hover
                    className="relative h-full overflow-hidden"
                  >
                    <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-gold/[0.03]" />
                    <CardHeader>
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 text-gold ring-1 ring-gold/10 transition-all duration-300 group-hover:scale-110">
                        <s.icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle>{s.title}</CardTitle>
                      <CardDescription>{s.description}</CardDescription>
                    </CardHeader>
                    <div className="px-6 pb-6 sm:px-7">
                      <div className="flex flex-wrap gap-1.5">
                        {s.points.map((p) => (
                          <span
                            key={p}
                            className="inline-flex items-center rounded-md bg-gold/5 px-2 py-0.5 text-[11px] font-medium text-gold-soft"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </RevealGroup>
          <Reveal type="fade-up" className="mt-10 text-center">
            <Button href="/services" variant="shimmer" size="lg">
              View all services
              <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        </Container>
      </Section>

      <SectionDivider variant="wave" />

      {/* ── 4. Industries We Serve ── */}
      <IndustriesSection
        id="industries"
        items={industries}
      />

      <SectionDivider variant="line" />

      {/* ── 5. Development Process ── */}
      <StepsList
        id="process"
        eyebrow="How we work"
        title="A calm, proven process"
        description="Predictable delivery — you always know what's next."
        steps={processSteps}
      />

      <SectionDivider variant="gradient" />

      {/* ── 6. Technology Stack ── */}
      <HomeTechStack
        id="stack"
        items={homeTechItems}
      />

      {/* ── 7. Portfolio Preview ── */}
      <PortfolioGrid
        id="portfolio"
        eyebrow="Selected work"
        title="Portfolio preview"
        description="A glimpse at the products and platforms we've helped build."
      />

      <SectionDivider variant="gradient" />

      {/* ── 8. Client Logos ── */}
      <LogoCloud
        id="clients"
        eyebrow="Trusted by"
        title="Clients we've partnered with"
        names={clientLogos}
      />

      <SectionDivider variant="wave" />

      {/* ── 9. Testimonials ── */}
      <Testimonials
        id="testimonials"
        eyebrow="Kind words"
        title="What clients say"
        items={homeTestimonials}
      />

      <SectionDivider variant="line" />

      {/* ── 10. Case Studies ── */}
      <CaseStudies
        id="case-studies"
        items={homeCaseStudies}
      />

      <SectionDivider variant="gradient" />

      {/* ── 11. FAQ ── */}
      <SectionFaq
        id="faq"
        eyebrow="FAQ"
        title="Frequently asked questions"
        faqs={homeFaqs}
      />

      {/* ── 12. Premium CTA ── */}
      <CTA
        eyebrow="Let's build"
        title={<>Ready to engineer something <span className="text-gradient-premium">exceptional</span>?</>}
        description="Tell us about your project and we'll craft a tailored plan to bring it to life."
        primaryLabel="Start a project"
        primaryHref="/contact-us"
        primaryVariant="shimmer"
        secondaryLabel="View our work"
        secondaryHref="/portfolio"
      />

      {/* ── 13. Sticky Contact ── */}
      <StickyContact />
    </>
  );
}
