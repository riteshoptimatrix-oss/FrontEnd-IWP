import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { RevealGroup, Reveal } from "@/components/motion/reveal";
import type { TimelineItem } from "@/lib/data";

export interface TimelineProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items: TimelineItem[];
}

export function Timeline({
  id,
  eyebrow,
  title,
  description,
  items,
}: TimelineProps) {
  return (
    <Section id={id}>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        {eyebrow ? (
          <span className="inline-flex items-center rounded-full border border-gold/20 bg-gold/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
            {eyebrow}
          </span>
        ) : null}
        {title ? (
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>

      <Container className="mt-12 max-w-3xl">
        <RevealGroup className="relative flex flex-col gap-8 border-l-2 border-border/60 pl-8">
          {items.map((item) => (
            <Reveal inGroup key={item.year} className="relative">
              <span className="absolute -left-[2.45rem] flex size-6 items-center justify-center rounded-full border-2 border-gold bg-white shadow-sm">
                <span className="size-2.5 rounded-full bg-gold" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-wide text-gold">
                {item.year}
              </span>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
