import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, BrainCircuit, Building2, Briefcase, Lightbulb, Rocket, Target, UserPlus, Network, Gauge, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { SectionTitle } from "@/components/section-title";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { TiltCard } from "@/components/tilt-card";
import { ShapesWarm } from "@/components/animated-shapes";

export const metadata: Metadata = buildMetadata({
  title: "Engagement Models",
  description: "Flexible hiring models — expert augmentation, team augmentation, managed delivery, and BOT model tailored to your project needs.",
  path: "/engagement-models",
});

const engagementModels = [
  {
    title: "Expert Augmentation",
    description: "Hire senior specialists, consultants, and architects to solve core project challenges, lead teams, and fill critical skill gaps.",
    icon: BrainCircuit,
    items: ["Consulting", "Tech Advisory", "Team Leadership"],
  },
  {
    title: "Team Augmentation",
    description: "Expand your in-house team with our expert designers, developers, consultants, AI-native engineers, QA specialists, and project managers.",
    icon: UserPlus,
    items: ["Staffing & Squad-Based Teams", "Dedicated Specialists", "Embedded Engineers"],
  },
  {
    title: "Managed Delivery",
    description: "Entrust your project to an experienced team that manages planning, execution, and delivery end-to-end.",
    icon: Target,
    items: ["Outcome-Driven Execution", "Least Time-to-Market", "Managed Time & Materials"],
  },
  {
    title: "BOT Model",
    description: "Set up an offshore development center with full ownership transfer once operations stabilize.",
    icon: Building2,
    items: ["Offshore Development Center (ODC)", "Global Delivery Center (GDC)", "Nearshore Development Center (NDC)"],
  },
];

const teamStructures = [
  {
    duration: "Long Term",
    tag: "Autonomous Project Teams",
    sub: "Independent Ownership",
    description: "Just bring your project brief, and we will handle everything with the deployment of a dedicated team of project managers, developers, designers, and QA.",
    icon: Rocket,
  },
  {
    duration: "Long Term",
    tag: "Mixed Teams",
    sub: "India Web Programmers + Customer or 3rd Party",
    description: "Embed our engineers directly into your in-house team, sharing mutual tools, ideas, and goals, driving results better and faster.",
    icon: Network,
  },
  {
    duration: "Short Term",
    tag: "Rapid Development Team",
    sub: "Small Team of Specialists",
    description: "Need to launch something really fast? We deploy a senior-heavy compact team for a quick MVP, proof of concept, or version 1.0 development.",
    icon: Gauge,
  },
  {
    duration: "Short Term",
    tag: "Consulting",
    sub: "Strategic Guidance on Demand",
    description: "From architecture review to technical audit, get the best consultation from our senior advisors and architects.",
    icon: Lightbulb,
  },
];

export default function EngagementModelsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[65svh] flex items-center overflow-hidden bg-gradient-to-b from-amber-50/30 via-white to-white">
        <ShapesWarm />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal type="fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-gradient-to-r from-amber-100/50 to-amber-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 shadow-sm">
                <Briefcase className="size-3.5" aria-hidden />
                Hiring Framework
              </span>
            </Reveal>
            <Reveal type="fade-up" delay={0.05}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Engagement{' '}
                <span className="text-gradient-gold">Models</span>
              </h1>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
                Every project's success demands a tailored engagement approach. We offer flexible hiring models that align with your operating model for flexible talent onboarding, real-time team extension, and fostering control on every stage.
              </p>
            </Reveal>
          </div>
        </Container>
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </Section>

      {/* ── Engagement Models Intro ── */}
      <Section id="models" className="pt-8 sm:pt-10 lg:pt-12">
        <Container>
          <SectionTitle
            eyebrow="Engagement Models"
            title="Flexible models for every need"
            description="From full project ownership to an individual expert or a managed team, we take care of all project needs with a robust set of hiring models."
          />
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2">
            {engagementModels.map((model, i) => (
              <Reveal inGroup key={model.title}>
                <TiltCard>
                  <Card hover className="group relative flex h-full flex-col overflow-hidden">
                    <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-amber-50/40 transition-all duration-500 group-hover:scale-[3] group-hover:opacity-0" />
                    <CardHeader>
                      <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100/60 to-amber-50/40 text-amber-600 ring-1 ring-amber-200/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                        <model.icon className="size-5" aria-hidden />
                      </span>
                      <CardTitle>{model.title}</CardTitle>
                      <CardDescription>{model.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-1.5">
                        {model.items.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1 rounded-md bg-amber-50/60 px-2.5 py-1 text-[11px] font-medium text-amber-700"
                          >
                            <CheckCircle2 className="size-3" aria-hidden />
                            {item}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Team Structures ── */}
      <Section id="team-structures" variant="alt" className="pt-8 sm:pt-10 lg:pt-12">
        <Container>
          <SectionTitle
            eyebrow="How We Operate"
            title="Team Structures"
            description="We don't force a one-size-fits-all model; instead, we understand particular project needs and deploy the right structure to provide long-term value."
          />
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2">
            {teamStructures.map((ts) => (
              <Reveal inGroup key={ts.tag}>
                <Card hover className="group relative h-full overflow-hidden">
                  <div className="absolute right-0 top-0 rounded-bl-2xl bg-amber-100/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                    {ts.duration}
                  </div>
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100/60 to-amber-50/40 text-amber-600 ring-1 ring-amber-200/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                      <ts.icon className="size-5" aria-hidden />
                    </span>
                    <CardTitle>{ts.tag}</CardTitle>
                    <p className="text-xs font-medium text-amber-600/80">{ts.sub}</p>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{ts.description}</CardDescription>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>


    </>
  );
}
