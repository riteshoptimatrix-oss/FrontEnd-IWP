import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Sparkles, Zap, Brain, Palette, Layers,
  LayoutDashboard, History, User, Settings, BarChart3,
  Trophy, Star, Calendar, Gift,
} from "lucide-react";

import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/card";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { SectionFaq } from "@/components/section-faq";
import { buildMetadata } from "@/lib/site";
import {
  technologies, gameModes, difficultyLevels,
  howToPlaySteps, benefits, comingSoon, faqs, previewExamples,
} from "@/lib/tech-logo-match-data";
import { TechnologyCard } from "@/components/tech-logo-match/technology-card";
import { GameModeCard } from "@/components/tech-logo-match/game-mode-card";
import { DifficultyCard } from "@/components/tech-logo-match/difficulty-card";
import { PreviewCard } from "@/components/tech-logo-match/preview-card";
import { TechLogoMatchBackground } from "./background";

export const metadata: Metadata = buildMetadata({
  title: "Tech Logo Match — Recognize Frontend Technologies | OptiMatrix",
  description:
    "Learn to recognize frontend web technologies by their official logos. Master HTML, CSS, JavaScript, React, and more through interactive challenges.",
  path: "/optimatrix/tech-logo-match",
});

export default function TechLogoMatchPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-b from-violet-500/[0.03] via-background to-background">
        <TechLogoMatchBackground />
        <Container className="relative flex flex-col items-center justify-center py-24 text-center">
          <Reveal type="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-gradient-to-r from-violet-50 to-violet-100/50 px-4 py-1.5 text-sm font-medium text-violet-700 shadow-sm">
              <Palette className="size-4" aria-hidden />
              OptiMatrix &middot; New Game
            </span>
          </Reveal>

          <Reveal type="fade-up" delay={0.08}>
            <h1 className="mt-8 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient-gold">Tech Logo Match</span>
            </h1>
          </Reveal>

          <Reveal type="fade-up" delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Learn frontend technologies by identifying their official logos.
              Master 23 technologies through interactive logo recognition challenges.
            </p>
          </Reveal>

          <Reveal type="fade-up" delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="/optimatrix/tech-logo-match/play" variant="gold" size="lg">
                <Zap className="size-4" />
                Play Now
                <ArrowRight className="size-4" />
              </Button>
              <Button href="#how-to-play" variant="outline" size="lg">
                <Layers className="size-4" />
                How It Works
              </Button>
              <Button href="/optimatrix" variant="outline" size="lg">
                <ArrowLeft className="size-4" />
                OptiMatrix
              </Button>
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={0.22}>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground/40">
              23 technologies &middot; 4 game modes &middot; 4 difficulty levels
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ── Navigation ── */}
      <Section className="border-t border-border/30 bg-background/50">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-2 py-4">
            <Link
              href="/optimatrix/tech-logo-match/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
            >
              <LayoutDashboard className="size-3.5" />
              Dashboard
            </Link>
            <Link
              href="/optimatrix/tech-logo-match/history"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
            >
              <History className="size-3.5" />
              History
            </Link>
            <Link
              href="/optimatrix/tech-logo-match/profile"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
            >
              <User className="size-3.5" />
              Profile
            </Link>
            <Link
              href="/optimatrix/tech-logo-match/analytics"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
            >
              <BarChart3 className="size-3.5" />
              Analytics
            </Link>
            <Link
              href="/optimatrix/tech-logo-match/settings"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
            >
              <Settings className="size-3.5" />
              Settings
            </Link>
            <Link
              href="/optimatrix/tech-logo-match/leaderboard"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
            >
              <Trophy className="size-3.5" />
              Leaderboard
            </Link>
            <Link
              href="/optimatrix/tech-logo-match/achievements"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
            >
              <Star className="size-3.5" />
              Achievements
            </Link>
            <Link
              href="/optimatrix/tech-logo-match/challenges"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
            >
              <Calendar className="size-3.5" />
              Challenges
            </Link>
            <Link
              href="/optimatrix/tech-logo-match/rewards"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold/30 hover:text-gold"
            >
              <Gift className="size-3.5" />
              Rewards
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── Game Introduction ── */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Introduction</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What is Tech Logo Match?</h2>
              <p className="mt-4 text-muted-foreground">
                An interactive game that helps you learn and recognize frontend web technologies
                by their official logos. Whether you are a beginner exploring the ecosystem or
                an experienced developer sharpening your visual memory, Tech Logo Match makes
                learning fun and engaging.
              </p>
            </div>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: "🎨", stat: "15", label: "Technologies" },
              { icon: "🎮", stat: "4", label: "Game Modes" },
              { icon: "📊", stat: "4", label: "Difficulty Levels" },
            ].map((item) => (
              <Reveal inGroup key={item.label}>
                <Card className="text-center">
                  <CardHeader className="items-center p-6">
                    <span className="text-3xl">{item.icon}</span>
                    <CardTitle className="mt-2 text-3xl font-bold">{item.stat}</CardTitle>
                    <CardDescription>{item.label}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── How To Play ── */}
      <Section id="how-to-play" className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Guide</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">How To Play</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Getting started is easy. Follow these simple steps to begin recognizing
                frontend technologies like a pro.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {howToPlaySteps.map((step) => (
              <Reveal type="fade-up" key={step.step} delay={step.step * 0.06}>
                <div className="group relative text-center">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 text-2xl ring-1 ring-gold/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:ring-gold/20">
                    {step.icon}
                  </div>
                  <div className="mt-2 text-lg font-bold text-gold">0{step.step}</div>
                  <h3 className="mt-1 text-sm font-semibold">{step.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Technology Categories ── */}
      <Section id="categories" className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Technologies</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Technology Categories</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Master the full frontend ecosystem. Each card includes the official logo,
                a short description, and difficulty indicator.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {technologies.map((tech, i) => (
              <TechnologyCard key={tech.id} tech={tech} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Game Modes ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Modes</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Game Modes</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Choose the mode that matches your learning style. Each mode offers a
                unique way to test and expand your technology recognition skills.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {gameModes.map((mode, i) => (
              <GameModeCard key={mode.id} mode={mode} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Difficulty Levels ── */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Difficulty</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Choose Your Level</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Start easy and work your way up. Each difficulty level adds more
                technologies and challenges to test your knowledge.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {difficultyLevels.map((level, i) => (
              <DifficultyCard key={level.id} level={level} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Preview Section ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Preview</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">See It In Action</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Here is a glimpse of what you will be matching. Can you identify
                these technologies from their logos?
              </p>
            </div>
          </Reveal>

          <div className="mt-12 space-y-3">
            {previewExamples.map((example, i) => (
              <PreviewCard
                key={example.logoId}
                logoId={example.logoId}
                name={example.name}
                description={example.description}
                index={i}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Benefits ── */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Benefits</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Why Play Tech Logo Match?</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                More than just a game — a powerful learning tool for developers at every level.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Reveal inGroup key={benefit.title}>
                <div className="group rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-md">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 text-2xl ring-1 ring-gold/10 transition-all duration-300 group-hover:scale-110">
                    {benefit.icon}
                  </span>
                  <h3 className="mt-4 text-sm font-semibold">{benefit.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Gamification ── */}
      <Section className="border-t border-border/40 bg-secondary/30">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Gamification</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Compete & Earn</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Earn XP, unlock achievements and badges, complete daily and weekly challenges,
                and climb the leaderboard. Every game brings you closer to the next level.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal inGroup>
              <Link href="/optimatrix/tech-logo-match/leaderboard" className="group block rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-md">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 text-2xl ring-1 ring-gold/10 transition-all duration-300 group-hover:scale-110">🏆</span>
                <h3 className="mt-4 text-sm font-semibold">Leaderboard</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">Compete globally. Earn XP and rank up through 9 tiers from Beginner to Legend.</p>
              </Link>
            </Reveal>
            <Reveal inGroup>
              <Link href="/optimatrix/tech-logo-match/achievements" className="group block rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-md">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 text-2xl ring-1 ring-gold/10 transition-all duration-300 group-hover:scale-110">⭐</span>
                <h3 className="mt-4 text-sm font-semibold">Achievements & Badges</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">Unlock 17 achievements and 10 badges across 5 tiers as you master technologies.</p>
              </Link>
            </Reveal>
            <Reveal inGroup>
              <Link href="/optimatrix/tech-logo-match/challenges" className="group block rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-md">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 text-2xl ring-1 ring-gold/10 transition-all duration-300 group-hover:scale-110">📅</span>
                <h3 className="mt-4 text-sm font-semibold">Daily & Weekly Challenges</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">Complete rotating challenges for bonus XP. New daily and weekly goals every cycle.</p>
              </Link>
            </Reveal>
            <Reveal inGroup>
              <Link href="/optimatrix/tech-logo-match/rewards" className="group block rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-md">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/15 to-gold/5 text-2xl ring-1 ring-gold/10 transition-all duration-300 group-hover:scale-110">🎁</span>
                <h3 className="mt-4 text-sm font-semibold">XP & Rewards</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">Track your XP, level progress, and view recent rewards from games and challenges.</p>
              </Link>
            </Reveal>
          </RevealGroup>
        </Container>
      </Section>

      {/* ── Coming Soon ── */}
      <Section className="border-t border-border/40">
        <Container>
          <Reveal type="fade-up">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Roadmap</span>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Coming Soon</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                We are building even more features to make Tech Logo Match the
                ultimate technology recognition trainer.
              </p>
            </div>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((feature, i) => (
              <Reveal inGroup key={feature.title}>
                <Card className="h-full">
                  <CardHeader className="gap-2 p-5 sm:p-6">
                    <span className="text-2xl">{feature.icon}</span>
                    <CardTitle className="text-sm">{feature.title}</CardTitle>
                    <CardDescription className="text-xs">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* ── FAQ ── */}
      <SectionFaq
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about Tech Logo Match."
        faqs={faqs}
      />

      {/* ── Final CTA ── */}
      <Section className="border-t border-border/40 bg-gradient-to-b from-violet-500/[0.03] via-background to-background">
        <Container className="text-center">
          <Reveal type="fade-up">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Test Your Knowledge?</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Start recognizing frontend technologies today. Challenge yourself
              across 23 technologies, 4 game modes, and 4 difficulty levels.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/optimatrix/tech-logo-match/play" variant="gold" size="lg">
                <Zap className="size-4" />
                Play Now
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
