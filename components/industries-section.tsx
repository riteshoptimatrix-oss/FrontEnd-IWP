import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { SectionTitle } from "@/components/section-title";
import { RevealGroup, Reveal } from "@/components/motion/reveal";
import type { IndustryItem } from "@/lib/data";

interface IndustriesSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items: IndustryItem[];
  variant?: "default" | "alt";
}

export function IndustriesSection({
  id,
  eyebrow = "Industries We Serve",
  title = "Built for your industry",
  description = "Deep domain knowledge across sectors — we understand your users, regulations and growth levers.",
  items,
  variant = "default",
}: IndustriesSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24 lg:py-32",
        variant === "alt" ? "bg-secondary/40" : "bg-background",
      )}
    >
      <Container>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <RevealGroup className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" stagger={0.06}>
          {items.map((item) => (
            <Reveal inGroup key={item.title}>
              <div className="group relative cursor-default overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-card-hover">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 text-gold ring-1 ring-gold/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                    <item.icon className="size-5" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-gold/[0.03] to-transparent" />
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
