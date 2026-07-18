import type { Metadata } from "next";
import { Target, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Timeline } from "@/components/timeline";
import { TeamGrid } from "@/components/lazy/team-grid";
import { Stats } from "@/components/stats";
import { CTA } from "@/components/cta";
import { SectionDivider } from "@/components/section-divider";
import {
  aboutAchievements,
  aboutTimeline,
  coreValues,
  missionVision,
  teamMembers,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about India Web Programmers — our story, values and the team behind the work.",
  path: "/about-us",
});

export default function AboutPage() {
  return (
    <>
      {/* ── Mission + Vision ── */}
      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {[missionVision.mission, missionVision.vision].map((text, i) => (
              <Reveal key={i} type="fade-up" delay={i * 0.08}>
                <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-card">
                  <span className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 text-gold ring-1 ring-gold/10">
                    {i === 0 ? <Target className="size-5" /> : <Sparkles className="size-5" />}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {i === 0 ? "Our Mission" : "Our Vision"}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <SectionDivider variant="gradient" />

      {/* ── Core Values ── */}
      <Section variant="alt">
        <Container>
          <Reveal type="fade-up" className="flex flex-col items-center text-center">
            <span className="inline-flex w-fit items-center rounded-full border border-violet-200/30 bg-gradient-to-r from-violet-100/50 to-violet-50/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-violet-600 shadow-sm">
              What we believe
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Our core values
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Principles that guide every project, every decision, every day.
            </p>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v) => (
              <Reveal inGroup key={v.title}>
                <div className="group rounded-2xl bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100/60 to-violet-50/40 text-violet-600 ring-1 ring-violet-200/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                    <v.icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <SectionDivider variant="wave" />

      {/* ── Timeline ── */}
      <Timeline
        eyebrow="Our journey"
        title="A decade in the making"
        description="From a three-person studio to a multidisciplinary team — here's how we got here."
        items={aboutTimeline}
      />

      {/* ── Stats ── */}
      <Stats id="achievements" tone="light" stats={aboutAchievements} />

      <SectionDivider variant="gradient" />

      {/* ── Team ── */}
      <TeamGrid
        eyebrow="The people"
        title="Meet the team"
        description="Senior, hands-on specialists across design, engineering and strategy."
        members={teamMembers}
      />

      <CTA
        eyebrow="Work with us"
        title="Let's create something remarkable"
        description="We partner with teams who care about the details."
        primaryLabel="Get in touch"
        primaryHref="/contact-us"
        primaryVariant="shimmer"
      />
    </>
  );
}
