import type { Metadata } from "next";
import { ArrowRight, PlaySquare, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { ShapesHome } from "@/components/animated-shapes";

export const metadata: Metadata = buildMetadata({
  title: "Media & Entertainment",
  description: "Streaming platforms, content management, OTT apps.",
  path: "/industries/media",
});

export default function MediaPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[65svh] flex items-center overflow-hidden bg-gradient-to-b from-rose-50/30 via-white to-white">
        <ShapesHome />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal type="fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-200/30 bg-gradient-to-r from-rose-100/50 to-rose-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600 shadow-sm">
                <PlaySquare className="size-3.5" aria-hidden />
                Media & Entertainment
              </span>
            </Reveal>
            <Reveal type="fade-up" delay={0.05}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Engaging digital{' '}
                <span className="text-gradient-gold">Experiences</span>
              </h1>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
                High-performance streaming platforms, scalable content management systems, and immersive OTT apps.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.15}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact-us" variant="gold" size="lg">
                  Start your project
                  <ArrowRight className="size-4" />
                </Button>
                <Button href="/industries" variant="outline" size="lg">
                  View all industries
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </Section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-border/40 bg-white">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-100/30 blur-[100px]" />
        <Container className="relative py-16 sm:py-20">
          <Reveal type="fade-up" className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-200/40 bg-rose-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600 shadow-sm">
              <Sparkles className="size-3" aria-hidden />
              Let's Talk
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to launch in{' '}
              <span className="text-gradient-gold">Media</span>?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Tell us about your challenges and goals — we'll craft a secure, scalable solution tailored to your needs.
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
