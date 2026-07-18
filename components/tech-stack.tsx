import { cn } from "@/lib/utils";
import { Section } from "@/components/section";
import { SectionTitle } from "@/components/section-title";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/card";
import { RevealGroup, Reveal } from "@/components/motion/reveal";
import type { TechGroup } from "@/lib/data";

export interface TechStackProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  groups: TechGroup[];
  variant?: "default" | "alt" | "gradient" | "ink";
}

export function TechStack({
  id,
  eyebrow,
  title,
  description,
  groups,
  variant,
}: TechStackProps) {
  return (
    <Section id={id} variant={variant}>
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2" stagger={0.1}>
        {groups.map((group) => (
          <Reveal inGroup key={group.category}>
            <Card className="h-full overflow-hidden">
              <CardHeader>
                <CardTitle className="text-gold">{group.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="inline-flex cursor-default items-center gap-1.5 rounded-xl border border-border/60 bg-secondary/80 px-3.5 py-2 text-sm font-medium text-foreground/80 transition-all duration-200 hover:border-gold/25 hover:bg-gold/[0.06] hover:text-gold hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <item.icon className="size-3.5 text-gold" aria-hidden />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
