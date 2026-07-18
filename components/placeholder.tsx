import { Construction } from "lucide-react";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";

export interface PlaceholderProps {
  /** Name of the section/page this stands in for. */
  title?: string;
  note?: string;
}

/**
 * Reusable "content coming soon" placeholder used across inner pages.
 * Keeps page scaffolds DRY while real sections are built later.
 */
export function Placeholder({ title, note }: PlaceholderProps) {
  return (
    <Section>
      <Container className="flex flex-col items-center gap-4 py-20 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
          <Construction className="size-7" aria-hidden />
        </span>
        <Heading as="h2" size="sm">
          Content coming soon
        </Heading>
        <p className="max-w-xl text-muted-foreground">
          {note
            ? note
            : `This is a placeholder for the ${
                title ?? "page"
              } section. Real content and components will be built here next.`}
        </p>
      </Container>
    </Section>
  );
}
