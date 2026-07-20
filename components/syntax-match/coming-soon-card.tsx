import type { SyntaxMatchComingSoon } from "@/lib/syntax-match-data";
import { cn } from "@/lib/utils";

export interface ComingSoonCardProps {
  feature: SyntaxMatchComingSoon;
  index: number;
}

export function ComingSoonCard({ feature, index }: ComingSoonCardProps) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border/60 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-card-hover sm:p-7",
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 text-2xl ring-1 ring-gold/10">
        {feature.icon}
      </div>
      <h4 className="mt-4 text-base font-semibold tracking-tight">{feature.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {feature.description}
      </p>
    </div>
  );
}
