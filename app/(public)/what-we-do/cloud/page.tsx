import type { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/site";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { ShapesHome } from "@/components/animated-shapes";
import { allServices, whyChooseUs } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Cloud & DevOps",
  description: "Reliable, observable infrastructure that scales with your ambition.",
  path: "/what-we-do/cloud",
});

export default function CloudPage() {
  const service = allServices.find((s) => s.id === "cloud")!;

  return (
    <>
      <Section className="relative min-h-[65svh] flex items-center overflow-hidden bg-gradient-to-b from-violet-50/30 via-white to-white">
        <ShapesHome />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal type="fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/30 bg-gradient-to-r from-violet-100/50 to-violet-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 shadow-sm">
                <service.icon className="size-3.5" aria-hidden />
                {service.title}
              </span>
            </Reveal>
            <Reveal type="fade-up" delay={0.05}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Enterprise-grade{' '}
                <span className="text-gradient-gold">{service.title}</span>
              </h1>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
                {service.description}
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.15}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact-us" variant="gold" size="lg">
                  Start a project
                  <ArrowRight className="size-4" />
                </Button>
                <Button href="#features" variant="outline" size="lg">
                  Explore features
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </Section>

      <Section id="features" className="pt-8 sm:pt-10 lg:pt-12">
        <Container>
          <Reveal type="fade-up" className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need{' '}
              <span className="text-gradient-gold">in one place</span>
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Every capability is engineered for quality, performance, and real-world impact.
            </p>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.points.map((p) => (
              <Reveal inGroup key={p}>
                <div className="flex items-center gap-3 rounded-xl border border-violet-200/20 bg-violet-50/30 px-4 py-3 transition-all duration-300 hover:border-violet-300/40 hover:bg-violet-50/60">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100/60 to-violet-50/40 text-violet-600 ring-1 ring-violet-200/40">
                    <service.icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-foreground">{p}</span>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section className="pt-8 sm:pt-10 lg:pt-12">
        <Container>
          <Reveal type="fade-up" className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Why choose{' '}
              <span className="text-gradient-gold">India Web Programmers</span>
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              We combine deep technical expertise with genuine care for your outcomes.
            </p>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <Reveal inGroup key={item.title}>
                <div className="group rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200/30 hover:shadow-card-hover">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100/60 to-violet-50/40 text-violet-600 ring-1 ring-violet-200/40 transition-all duration-300 group-hover:scale-110">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
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
              Let's Talk
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to build{' '}
              <span className="text-gradient-gold">something great?</span>
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
