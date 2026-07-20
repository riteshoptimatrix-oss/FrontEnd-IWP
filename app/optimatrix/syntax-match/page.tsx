import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Sparkles, Brain, Zap, BarChart3, Clock,
  Trophy, Target, Gift,
} from "lucide-react";

import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/card";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { buildMetadata } from "@/lib/site";
import { SectionFaq } from "@/components/section-faq";
import {
  syntaxMatchLanguages,
  syntaxMatchDifficulties,
  syntaxMatchBenefits,
  syntaxMatchComingSoon,
  syntaxMatchHowToPlay,
  syntaxMatchPreviewPairs,
  syntaxMatchFAQ,
} from "@/lib/syntax-match-data";
import { SyntaxMatchBackground } from "./background";
import { LanguageCard } from "@/components/syntax-match/language-card";
import { DifficultyCard } from "@/components/syntax-match/difficulty-card";
import { PreviewCard } from "@/components/syntax-match/preview-card";
import { ComingSoonCard } from "@/components/syntax-match/coming-soon-card";

export const metadata: Metadata = buildMetadata({
  title: "Syntax Match — Memory Training | OptiMatrix",
  description:
    "Train your programming memory by matching syntax, components, APIs, hooks and coding concepts across 9+ languages.",
  path: "/optimatrix/syntax-match",
});

export default function SyntaxMatchPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-gold/[0.03] via-background to-background">
        <SyntaxMatchBackground />
        <Container className="relative flex flex-col items-center justify-center py-24 text-center">
          <Reveal type="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-gradient-to-r from-emerald-50 to-emerald-100/50 px-4 py-1.5 text-sm font-medium text-emerald-700 shadow-sm">
              <Brain className="size-4" aria-hidden />
              OptiMatrix &middot; Play Now
            </span>
          </Reveal>

          <Reveal type="fade-up" delay={0.08}>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient-gold">Syntax Match</span>
            </h1>
          </Reveal>

          <Reveal type="fade-up" delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Train your programming memory by matching syntax, components, APIs,
              hooks and coding concepts across 9+ languages.
            </p>
          </Reveal>

          <Reveal type="fade-up" delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="/optimatrix/syntax-match/play" variant="gold" size="lg">
                <Zap className="size-4" />
                Play Now
                <ArrowRight className="size-4" />
              </Button>
              <Button href="/optimatrix/syntax-match/dashboard" variant="outline" size="lg">
                <BarChart3 className="size-4" />
                Dashboard
              </Button>
              <Button href="/optimatrix/syntax-match/leaderboard" variant="outline" size="lg">
                <Trophy className="size-4" />
                Leaderboard
              </Button>
              <Button href="/optimatrix/syntax-match/achievements" variant="outline" size="lg">
                <Sparkles className="size-4" />
                Achievements
              </Button>
              <Button href="/optimatrix/syntax-match/challenges" variant="outline" size="lg">
                <Target className="size-4" />
                Challenges
              </Button>
              <Button href="/optimatrix/syntax-match/rewards" variant="outline" size="lg">
                <Gift className="size-4" />
                Rewards
              </Button>
              <Button href="/optimatrix/syntax-match/analytics" variant="outline" size="lg">
                <BarChart3 className="size-4" />
                Analytics
              </Button>
              <Button href="/optimatrix/syntax-match/history" variant="outline" size="lg">
                <Clock className="size-4" />
                History
              </Button>
              <Button href="/optimatrix" variant="outline" size="lg">
                <ArrowLeft className="size-4" />
                OptiMatrix
              </Button>
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.22}>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground/40">
              Now available &middot; Track your progress with saved statistics
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── How It Works ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Process</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">How to Play</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                A simple memory challenge that sharpens your coding recall.
              </p>
            </div>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {syntaxMatchHowToPlay.map((step) => (
              <Reveal inGroup key={step.step}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 text-xl font-bold text-gold ring-1 ring-gold/15">
                    {step.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                  {step.step < syntaxMatchHowToPlay.length && (
                    <div aria-hidden className="mt-3 text-2xl text-gold/20">↓</div>
                  )}
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Supported Languages ── */}
      <Section id="languages" className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Languages</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Supported Languages</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Match syntax across {syntaxMatchLanguages.length} programming languages and frameworks.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {syntaxMatchLanguages.map((lang, i) => (
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
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Choose Your Level</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                From beginner-friendly to expert-level syntax challenges.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {syntaxMatchDifficulties.map((diff, i) => (
              <DifficultyCard key={diff.id} difficulty={diff} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Card Preview ── */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Preview</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What You&apos;ll Match</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Each game presents pairs of syntax concepts you need to match from memory.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 mx-auto grid max-w-2xl gap-2.5 sm:grid-cols-2">
            {syntaxMatchPreviewPairs.map((pair, i) => (
              <PreviewCard key={pair.language} pair={pair} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Benefits ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Benefits</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Why Play Syntax Match?</h2>
            </div>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {syntaxMatchBenefits.map((benefit) => (
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

      {/* ── Leaderboard Preview (Placeholder) ── */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Compete</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Leaderboard</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                See how you rank against other developers. Coming in a future update.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 mx-auto max-w-2xl">
            <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/30 p-12 text-center">
              <div className="text-5xl">🏆</div>
              <h3 className="mt-4 text-xl font-semibold">Leaderboard Coming Soon</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Compete with developers worldwide once leaderboards launch.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Achievements Preview (Placeholder) ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Rewards</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Achievements</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Unlock badges and milestones as you master more languages.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 mx-auto max-w-3xl">
            <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/30 p-12 text-center">
              <div className="text-5xl">🏅</div>
              <h3 className="mt-4 text-xl font-semibold">Achievements Coming Soon</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Earn badges for completing challenges and mastering languages.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── FAQ ── */}
      <SectionFaq
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about Syntax Match."
        faqs={syntaxMatchFAQ}
      />

      {/* ── Coming Soon ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Roadmap</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Coming Soon</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                We&apos;re building even more features to make Syntax Match the ultimate memory trainer.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {syntaxMatchComingSoon.map((feature, i) => (
              <ComingSoonCard key={feature.title} feature={feature} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Final CTA ── */}
      <Section className="border-t border-border/40 bg-gradient-to-b from-gold/[0.03] via-background to-background">
        <Container className="text-center">
          <Reveal type="fade-up">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Train Your Memory?</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Start playing Syntax Match now. Track your progress, history, and statistics.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/optimatrix/syntax-match/play" variant="gold" size="lg">
                <Zap className="size-4" />
                Play Now
                <ArrowRight className="size-4" />
              </Button>
              <Button href="/optimatrix/syntax-match/dashboard" variant="outline" size="lg">
                <BarChart3 className="size-4" />
                View Dashboard
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
