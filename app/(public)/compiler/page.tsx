import type { Metadata } from "next";
import { buildMetadata } from "@/lib/site";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { HtmlCompiler } from "@/components/html-compiler";

export const metadata: Metadata = buildMetadata({
  title: "HTML Compiler",
  description: "Live HTML, CSS, and JavaScript code compiler.",
  path: "/compiler",
});

export default function CompilerPage() {
  return (
    <>
      <Section className="min-h-screen py-10 pt-24 bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <Reveal type="fade-down">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                HTML Code Compiler
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                Write HTML, CSS, and JavaScript and see the results instantly in the live preview.
              </p>
            </div>
          </Reveal>
          
          <Reveal type="fade-up" delay={0.1}>
            <HtmlCompiler />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
