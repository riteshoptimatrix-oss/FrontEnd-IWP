import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Keyboard, Timer, Target, Trophy, Sparkles } from "lucide-react";

import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { buildMetadata } from "@/lib/site";
import {
  codeSprintLanguages,
  codeSprintDifficulties,
  codeSprintDurations,
  codeSprintComingSoon,
  codeSprintStats,
  codeSprintBenefits,
  codeSprintHowItWorks,
} from "@/lib/codesprint-data";
import { CodeSprintBackground } from "./background";
import { LanguageCard } from "@/components/codesprint/language-card";
import { DifficultyCard } from "@/components/codesprint/difficulty-card";
import { DurationCard } from "@/components/codesprint/duration-card";
import { ComingSoonCard } from "@/components/codesprint/coming-soon-card";
import { CodePreview } from "@/components/codesprint/code-preview";
import { LeaderboardPreview } from "@/components/codesprint/leaderboard-preview";
import { AchievementsPreview } from "@/components/codesprint/achievements-preview";

export const metadata: Metadata = buildMetadata({
  title: "CodeSprint — Developer Typing Challenge | OptiMatrix",
  description:
    "Master real-world coding syntax by typing production-style code snippets. Build speed, accuracy, and fluency across 9+ programming languages.",
  path: "/optimatrix/code-sprint",
});

const featuredCodeExample = `// React Custom Hook - useLocalStorage
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    setStored(prev => {
      const next = value instanceof Function ? value(prev) : value;
      window.localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  return [stored, setValue];
}`;

export default function CodeSprintPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-gold/[0.03] via-background to-background">
        <CodeSprintBackground />
        <Container className="relative flex flex-col items-center justify-center py-24 text-center">
          <Reveal type="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-gradient-to-r from-gold/10 to-gold/5 px-4 py-1.5 text-sm font-medium text-gold shadow-sm">
              <Keyboard className="size-4" aria-hidden />
              OptiMatrix &middot; Coming Soon
            </span>
          </Reveal>

          <Reveal type="fade-up" delay={0.08}>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient-gold">CodeSprint</span>
            </h1>
          </Reveal>

          <Reveal type="fade-up" delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Master real-world coding syntax by typing production-style code snippets.
              Build speed, accuracy, and fluency across 9+ programming languages.
            </p>
          </Reveal>

          <Reveal type="fade-up" delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="/optimatrix/code-sprint/play" variant="gold" size="lg">
                <Keyboard className="size-4" />
                Start Challenge
                <ArrowRight className="size-4" />
              </Button>
              <Button href="/optimatrix" variant="outline" size="lg">
                <ArrowLeft className="size-4" />
                Back to OptiMatrix
              </Button>
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.22}>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground/40">
              Early access &middot; 2026
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Stats Bar ── */}
      <Section className="border-y border-border/40 py-12 sm:py-16">
        <Container>
          <RevealGroup className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {codeSprintStats.map((stat) => (
              <Reveal inGroup key={stat.label}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold sm:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── What Is CodeSprint ── */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">About</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What is CodeSprint?</h2>
              <p className="mt-5 text-lg text-muted-foreground">
                CodeSprint is a typing practice tool built specifically for developers.
                Instead of typing random words, you type real code — React components, Python functions,
                TypeScript interfaces. It&apos;s how you build the muscle memory that makes you a faster,
                more accurate developer.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Code Preview ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="mx-auto max-w-3xl">
              <div className="text-center mb-8">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Preview</span>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Type Real Code</h2>
                <p className="mt-4 text-muted-foreground">
                  Practice with production-quality code snippets that you&apos;d actually write.
                </p>
              </div>
              <CodePreview
                code={featuredCodeExample}
                language="typescript"
                filename="useLocalStorage.ts"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Why Practice ── */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Benefits</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Why Practice Typing Code?</h2>
            </div>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {codeSprintBenefits.map((benefit) => (
              <Reveal inGroup key={benefit.title}>
                <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                  <CardHeader>
                    <div className="text-3xl">{benefit.icon}</div>
                    <CardTitle>{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── How It Works ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Process</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">How It Works</h2>
            </div>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {codeSprintHowItWorks.map((step) => (
              <Reveal inGroup key={step.step}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 text-xl font-bold text-gold ring-1 ring-gold/15">
                    {step.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Language Grid ── */}
      <Section id="languages" className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Languages</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Choose Your Language</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Practice with production-quality code snippets across {codeSprintLanguages.length} programming languages.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {codeSprintLanguages.map((lang, i) => (
              <LanguageCard key={lang.id} language={lang} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Difficulty Levels ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Difficulty</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Pick Your Level</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                From beginner-friendly snippets to advanced production patterns.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {codeSprintDifficulties.map((diff, i) => (
              <DifficultyCard key={diff.id} difficulty={diff} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Duration Selector ── */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Duration</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Set Your Timer</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Quick sprints or deep focus sessions — pick what works for you.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {codeSprintDurations.map((dur, i) => (
              <DurationCard key={dur.id} duration={dur} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Leaderboard Preview ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Compete</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Global Leaderboard</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                See how you stack up against developers worldwide.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 mx-auto max-w-2xl">
            <LeaderboardPreview />
          </div>
        </Container>
      </Section>

      {/* ── Achievements Preview ── */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Rewards</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Achievements</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Unlock badges and milestones as you improve your typing skills.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 mx-auto max-w-3xl">
            <AchievementsPreview />
          </div>
        </Container>
      </Section>

      {/* ── Coming Soon ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Roadmap</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Coming Soon</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                We&apos;re building even more features to make CodeSprint the ultimate typing trainer.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {codeSprintComingSoon.map((feature, i) => (
              <ComingSoonCard key={feature.title} feature={feature} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Final CTA ── */}
      <Section className="border-t border-border/40 bg-gradient-to-b from-gold/[0.03] via-background to-background">
        <Container className="text-center">
          <Reveal type="fade-up">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Level Up?</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              CodeSprint is launching soon. Be the first to start practicing when it drops.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact-us" variant="gold" size="lg">
                <Sparkles className="size-4" />
                Get Early Access
                <ArrowRight className="size-4" />
              </Button>
              <Button href="/optimatrix" variant="outline" size="lg">
                <ArrowLeft className="size-4" />
                Back to OptiMatrix
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
