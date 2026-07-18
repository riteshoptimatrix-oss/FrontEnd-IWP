import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/card";
import { FeatureGrid } from "@/components/feature-grid";
import { Reveal } from "@/components/motion/reveal";
import { aboutStory, missionVision, coreValues } from "@/lib/data";

export function AboutBlocks() {
  return (
    <>
      <Section>
        <Reveal
          type="fade-up"
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-gold/15 bg-gradient-to-r from-gold/10 to-gold/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold shadow-sm">
            Our story
          </span>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            A decade of craft
          </h2>
          <p className="mt-1 text-lg leading-relaxed text-muted-foreground">
            {aboutStory}
          </p>
        </Reveal>
      </Section>

      <Section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 via-background to-background">
        {/* Floating shapes */}
        <div aria-hidden className="pointer-events-none absolute right-[5%] top-[10%] h-24 w-24 rounded-2xl border border-violet-200/20 bg-gradient-to-br from-violet-50/30 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute left-[8%] bottom-[15%] h-16 w-16 rounded-xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent" />
        <Container className="relative grid gap-6 md:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                {missionVision.mission}
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                {missionVision.vision}
              </CardDescription>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <FeatureGrid
        eyebrow="Core values"
        title="What we stand for"
        description="The principles that shape how we work and the results we deliver."
        items={coreValues}
        columns={4}
      />
    </>
  );
}
