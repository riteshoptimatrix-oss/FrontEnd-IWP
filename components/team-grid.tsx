import { Section } from "@/components/section";
import { RevealGroup, Reveal } from "@/components/motion/reveal";
import type { TeamMember } from "@/lib/data";

export interface TeamGridProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  members: TeamMember[];
}

export function TeamGrid({
  id,
  eyebrow,
  title,
  description,
  members,
}: TeamGridProps) {
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

      <RevealGroup className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {members.map((member) => (
          <Reveal
            inGroup
            key={member.name}
            className="flex flex-col items-center gap-3 text-center group"
          >
            <span className="flex aspect-square w-full items-center justify-center rounded-2xl bg-gradient-to-br from-gold/15 via-gold/5 to-blue-50 text-2xl font-semibold text-gold transition-transform duration-300 group-hover:scale-105 shadow-sm ring-1 ring-gold/10">
              {member.initials}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {member.name}
              </p>
              <p className="text-xs text-muted-foreground">{member.role}</p>
            </div>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
