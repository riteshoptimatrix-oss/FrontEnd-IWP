import type { Metadata } from "next";
import { ArrowRight, Keyboard, Brain, Zap, Palette } from "lucide-react";

import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { buildMetadata } from "@/lib/site";
import { allLanguages } from "@/lib/codesprint/snippets";

export const metadata: Metadata = buildMetadata({
  title: "OptiMatrix",
  description:
    "OptiMatrix — our platform for building, optimizing and scaling digital experiences.",
  path: "/optimatrix",
});

const totalLanguages = allLanguages.length;
const totalSnippets = allLanguages.reduce(
  (sum, lang) =>
    sum +
    lang.categories.reduce(
      (catSum, cat) =>
        catSum + cat.snippets.easy.length + cat.snippets.medium.length + cat.snippets.hard.length,
      0,
    ),
  0,
);

const displayedLanguages = allLanguages.slice(0, 6);
const remainingCount = totalLanguages - displayedLanguages.length;

function FeatureCard({
  icon,
  badge,
  title,
  description,
  tags,
  stats,
  href,
  buttonLabel,
  buttonIcon: ButtonIcon,
  gradientFrom,
  gradientVia,
}: {
  icon: string;
  badge: string;
  title: string;
  description: string;
  tags: { label: string; color?: string }[];
  stats: { label: string; color: string }[];
  href: string;
  buttonLabel: string;
  buttonIcon: typeof Keyboard;
  gradientFrom: string;
  gradientVia: string;
}) {
  return (
    <div className="group relative mx-auto max-w-2xl">
      <div
        className="absolute -inset-1 rounded-[28px] opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${gradientFrom}33, ${gradientFrom}1a, ${gradientVia}26)`,
        }}
      />

      <div className="relative overflow-hidden rounded-3xl border border-gold/15 bg-white/80 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-gold/30 group-hover:shadow-[0_40px_120px_-12px_rgba(0,0,0,0.12)] dark:bg-ink/80 dark:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.3)] dark:group-hover:shadow-[0_40px_120px_-12px_rgba(0,0,0,0.4)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/[0.04] via-transparent to-cyan-500/[0.03] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative p-8 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div className="relative flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/15 to-gold/5 text-3xl shadow-sm ring-1 ring-gold/10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-md group-hover:ring-gold/20">
              {icon}
              <div className="absolute -right-1 -top-1 size-4 rounded-full bg-gradient-to-br from-gold to-gold-soft shadow-sm" />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/8 px-2.5 py-0.5 text-[11px] font-medium text-gold ring-1 ring-gold/10">
                    <span className="size-1.5 rounded-full bg-gold animate-pulse" />
                    {badge}
                  </div>
                  <h3 className="mt-2 text-xl font-bold sm:text-2xl">{title}</h3>
                  <p className="mt-2 max-w-md text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={tag.label}
                    className="rounded-full bg-gold/8 px-3 py-1 text-xs font-medium text-gold ring-1 ring-gold/10 transition-all duration-300 hover:bg-gold/15 hover:ring-gold/20"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-6 text-sm text-muted-foreground">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full" style={{ backgroundColor: stat.color }} />
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Button href={href} variant="gold" size="lg">
                  <ButtonIcon className="size-4" />
                  {buttonLabel}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gold/5 blur-3xl transition-opacity duration-700 group-hover:bg-gold/8" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-cyan-300/5 blur-3xl transition-opacity duration-700 group-hover:bg-cyan-300/8" />
      </div>
    </div>
  );
}

export default function OptiMatrixPage() {
  return (
    <Section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <Container className="relative py-24">
        <Reveal type="fade-up">
          <h1 className="mb-12 text-center text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="text-gradient-gold">OptiMatrix</span>
            <span className="block mt-2 text-xl font-normal text-muted-foreground sm:text-2xl">
              Build, optimize, and scale digital experiences
            </span>
          </h1>
        </Reveal>

        <RevealGroup className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3 lg:gap-8">
          <Reveal inGroup>
            <FeatureCard
              icon="⌨️"
              badge="New"
              title="Developer Typing Challenge"
              description="Master real-world coding syntax by typing production-style code snippets. Build speed, accuracy, and fluency across 9+ languages."
              tags={[
                ...displayedLanguages.map((l) => ({ label: l.name })),
                ...(remainingCount > 0 ? [{ label: `+${remainingCount} more` }] : []),
              ]}
              stats={[
                { label: `${totalSnippets} snippets`, color: "#10b981" },
                { label: "3 levels", color: "var(--color-gold)" },
              ]}
              href="/optimatrix/code-sprint"
              buttonLabel="Start Challenge"
              buttonIcon={Keyboard}
              gradientFrom="gold"
              gradientVia="cyan-500"
            />
          </Reveal>

          <Reveal inGroup>
            <FeatureCard
              icon="🧠"
              badge="New"
              title="Syntax Match"
              description="Train your programming memory by matching syntax, components, APIs, hooks and coding concepts across 9+ languages."
              tags={[
                { label: "HTML" },
                { label: "CSS" },
                { label: "JavaScript" },
                { label: "React" },
                { label: "Next.js" },
                { label: "TypeScript" },
                { label: "+3 more" },
              ]}
              stats={[
                { label: "9 languages", color: "var(--color-gold)" },
                { label: "3 levels", color: "#10b981" },
              ]}
              href="/optimatrix/syntax-match"
              buttonLabel="Play Now"
              buttonIcon={Zap}
              gradientFrom="violet-400"
              gradientVia="gold"
            />
          </Reveal>

          <Reveal inGroup>
            <FeatureCard
              icon="🎨"
              badge="New"
              title="Tech Logo Match"
              description="Recognize frontend technologies using their official logos and improve your visual memory across 15+ technologies."
              tags={[
                { label: "React" },
                { label: "Vue" },
                { label: "Angular" },
                { label: "Next.js" },
                { label: "Tailwind" },
                { label: "TypeScript" },
                { label: "+9 more" },
              ]}
              stats={[
                { label: "15 technologies", color: "var(--color-gold)" },
                { label: "4 modes", color: "#10b981" },
              ]}
              href="/optimatrix/tech-logo-match"
              buttonLabel="Play Now"
              buttonIcon={Palette}
              gradientFrom="violet-500"
              gradientVia="gold"
            />
          </Reveal>
        </RevealGroup>
      </Container>
    </Section>
  );
}
