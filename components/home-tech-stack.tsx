import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/section-title";
import { RevealGroup, Reveal } from "@/components/motion/reveal";
import type { HomeTechItem } from "@/lib/data";

interface HomeTechStackProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items: HomeTechItem[];
}

export function HomeTechStack({
  id,
  eyebrow = "Tech Stack",
  title = "Built with modern technology",
  description = "We use the best tools for the job — chosen for performance, reliability and developer experience.",
  items,
}: HomeTechStackProps) {
  return (
    <section id={id} className="py-20 sm:py-24 lg:py-32 bg-secondary/30">
      <Container>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <RevealGroup className="mt-14 flex flex-wrap justify-center gap-4" stagger={0.05}>
          {items.map((item) => (
            <Reveal inGroup key={item.name}>
              <div className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-5 py-3.5 shadow-card transition-all duration-300 hover:border-gold/20 hover:shadow-card-hover hover:-translate-y-1 cursor-default">
                <div className="flex size-9 items-center justify-center rounded-xl bg-secondary/80 transition-all duration-300 group-hover:bg-gold/[0.08] group-hover:shadow-sm">
                  <item.icon className={cn("size-4.5 transition-all duration-300", item.color)} aria-hidden />
                </div>
                <span className="text-sm font-medium text-foreground/80 transition-colors duration-300 group-hover:text-foreground">
                  {item.name}
                </span>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
