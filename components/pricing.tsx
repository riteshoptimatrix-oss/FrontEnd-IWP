import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section } from "@/components/section";
import { SectionTitle } from "@/components/section-title";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/card";
import { Button } from "@/components/button";
import { RevealGroup, Reveal } from "@/components/motion/reveal";
import { pricingTiers } from "@/lib/data";

export interface PricingProps {
  id?: string;
}

export function Pricing({ id }: PricingProps) {
  return (
    <Section id={id}>
      <SectionTitle
        eyebrow="Pricing"
        title="Engagements that scale with you"
        description="Transparent, scope-based pricing. Every quote is tailored to your goals."
      />
      <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier, i) => {
          const featured = i === 1;
          return (
            <Reveal inGroup key={tier.name}>
              <Card
                className={cn(
                  "flex h-full flex-col relative",
                  featured && "border-gold/30 shadow-elevated ring-1 ring-gold/20",
                )}
              >
                <CardHeader>
                  {featured ? (
                    <span className="mb-1 inline-flex w-fit rounded-full bg-gradient-to-r from-gold to-gold-soft px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      Most popular
                    </span>
                  ) : null}
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <p className="pt-3 text-3xl font-semibold tracking-tight">
                    {tier.price}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="flex flex-col gap-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    href="/contact-us"
                    variant={featured ? "gold" : "outline"}
                    className="w-full"
                  >
                    {featured ? "Get started" : "Contact us"}
                  </Button>
                </CardFooter>
              </Card>
            </Reveal>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
