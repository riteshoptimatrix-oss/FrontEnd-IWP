import type { Metadata } from "next";
import { ArrowRight, Heart, Target, Globe, Code2, Search, ShoppingCart, Megaphone, RefreshCw, Server, Wrench, Lightbulb, Users, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { SectionTitle } from "@/components/section-title";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { ShapesAbout } from "@/components/animated-shapes";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "India Web Programmers — total IT solutions from concept to completion. Website design, development, SEO, e-commerce, and software development.",
  path: "/about-us",
});

const serviceList = [
  { icon: Code2, title: "Website Designing", description: "Creative, responsive, and user-centric designs that captivate your audience and drive engagement." },
  { icon: Wrench, title: "Web Maintenance", description: "Ongoing updates, security patches, and performance monitoring to keep your site running smoothly." },
  { icon: RefreshCw, title: "Website Redesigning", description: "Modernize your digital presence with a fresh look, improved UX, and updated technology stack." },
  { icon: Search, title: "Search Engine Submission", description: "Get indexed faster across major search engines to boost your online visibility from day one." },
  { icon: Megaphone, title: "Search Engine Optimization", description: "Data-driven SEO strategies that improve rankings, drive organic traffic, and grow your business." },
  { icon: ShoppingCart, title: "E-commerce Solutions", description: "End-to-end online store development with seamless payments, inventory management, and checkout." },
  { icon: Globe, title: "Web Promotion", description: "Multi-channel digital promotion to amplify your reach and connect with the right audience." },
  { icon: Server, title: "Software Development", description: "Custom software tailored to your business processes — from CRM to enterprise platforms." },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[65svh] flex items-center overflow-hidden bg-gradient-to-b from-blue-50/30 via-white to-white">
        <ShapesAbout />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal type="fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/30 bg-gradient-to-r from-blue-100/50 to-blue-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
                <Heart className="size-3.5" aria-hidden />
                About Us
              </span>
            </Reveal>
            <Reveal type="fade-up" delay={0.05}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Total solutions{' '}
                <span className="text-gradient-gold">from concept to completion</span>
              </h1>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
                India Web Programmers is one of the few companies providing complete
                business solutions to organizations of every size — from concept to
                completion of web-based projects.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.15}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/contact-us" variant="gold" size="lg">
                  Get started
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

      {/* ── Full Description ── */}
      <Section id="services" className="pt-8 sm:pt-10 lg:pt-12">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal type="fade-up">
              <span className="inline-flex items-center rounded-full border border-blue-200/30 bg-gradient-to-r from-blue-100/50 to-blue-50/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
                Who we are
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Your partner in{' '}
                <span className="text-gradient-gold">digital excellence</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                India Web Programmers is happy to offer you a wide array of web services
                to meet immediate and future needs of organizations and individuals globally.
                We provide quality web design services at a fraction of the cost of many
                other companies.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Over the years, we have become skilled at designing and promoting websites
                for online business marketers and clients. We also have a wide range of
                technical expertise including e-commerce solutions, website design, and
                high quality web hosting services.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Our team knows that our clients deserve our time and attention — therefore
                we provide every single client with a high quality product.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-blue-50/30 to-white p-8 shadow-sm">
                <div className="grid gap-4">
                  {[
                    { icon: Lightbulb, stat: "Total Solutions", desc: "From concept to completion — we handle it all" },
                    { icon: Users, stat: "Client-First", desc: "Every client deserves our time and attention" },
                    { icon: Sparkles, stat: "Quality Focus", desc: "High quality products at competitive costs" },
                    { icon: Globe, stat: "Global Reach", desc: "Serving organizations and individuals worldwide" },
                  ].map((item) => (
                    <div key={item.stat} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100/60 to-blue-50/40 text-blue-600 ring-1 ring-blue-200/40">
                        <item.icon className="size-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{item.stat}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Services Grid ── */}
      <Section id="services-grid" variant="alt" className="pt-8 sm:pt-10 lg:pt-12">
        <Container>
          <SectionTitle
            eyebrow="What We Offer"
            title="Comprehensive IT solutions"
            description="We provide end-to-end digital services including website design, development, SEO, e-commerce, and software development."
          />
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceList.map((s) => (
              <Reveal inGroup key={s.title}>
                <Card hover className="group h-full transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100/60 to-blue-50/40 text-blue-600 ring-1 ring-blue-200/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                      <s.icon className="size-5" aria-hidden />
                    </span>
                    <CardTitle className="text-sm">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{s.description}</CardDescription>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Mission ── */}
      <Section id="mission" className="pt-8 sm:pt-10 lg:pt-12">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Reveal type="fade-up">
                <span className="inline-flex items-center rounded-full border border-blue-200/30 bg-gradient-to-r from-blue-100/50 to-blue-50/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
                  <Target className="size-3.5 mr-1" aria-hidden />
                  Our Mission
                </span>
              </Reveal>
              <Reveal type="fade-up" delay={0.05}>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Leadership through{' '}
                  <span className="text-gradient-gold">total IT solutions</span>
                </h2>
              </Reveal>
              <Reveal type="fade-up" delay={0.1}>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  India Web Programmers will take a leadership role in offering Total IT
                  Solutions to business organizations all over the world. Our most important
                  aim is to provide clients with solutions that are unique, creative,
                  functional — and give them the value of their money invested.
                </p>
              </Reveal>
              <Reveal type="fade-up" delay={0.12}>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  We always consider our customers as our most important asset. Our team works
                  hard to provide the best, most cutting edge solutions possible. The success
                  of our clients is the success of ours.
                </p>
              </Reveal>
            </div>
            <Reveal type="fade-up" delay={0.15} className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-blue-50/40 to-white p-6 shadow-sm">
                <Target className="size-8 text-blue-200/60" aria-hidden />
                <h3 className="mt-3 text-lg font-semibold">Client success is our success</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We have a team of expert web programmers and web designers that can handle
                  every area of your business needs — from designing a website to its maintenance.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Contact us today to find out how our web design, e-commerce, and online
                  marketing services can go to work for you.
                </p>
                <div className="mt-4">
                  <Button href="/contact-us" variant="gold" size="sm">
                    Contact us today
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>


    </>
  );
}
