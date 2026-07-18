import { Section } from "@/components/section";
import { SectionTitle } from "@/components/section-title";
import { Accordion } from "@/components/accordion";
import type { Faq } from "@/lib/data";

export interface SectionFaqProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  faqs: Faq[];
  variant?: "default" | "alt" | "gradient" | "ink";
}

/** Heading + accessible accordion FAQ block, reused across pages. */
export function SectionFaq({
  id,
  eyebrow,
  title,
  description,
  faqs,
  variant,
}: SectionFaqProps) {
  return (
    <Section id={id} variant={variant}>
      <SectionTitle
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="mt-12">
        <Accordion items={faqs} />
      </div>
    </Section>
  );
}
