"use client";

import * as React from "react";
import { m, AnimatePresence } from "framer-motion";
import { Sparkles, Plus } from "lucide-react";

import { Container } from "@/components/container";
import { homeFaqs } from "@/lib/data";
import { cn } from "@/lib/utils";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={cn(
        "rounded-2xl border bg-white/40 backdrop-blur-sm transition-all duration-300",
        open
          ? "border-blue-200/50 shadow-md shadow-blue-100/10"
          : "border-blue-100/20 hover:border-blue-200/30 hover:shadow-sm",
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-6 py-5 text-left sm:px-7"
      >
        <span className="text-sm font-medium sm:text-base">{question}</span>
        <Plus
          className={cn(
            "size-4 shrink-0 text-blue-400 transition-transform duration-300",
            open && "rotate-45",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-7">
              {answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-100/15 blur-3xl" />
      <Container>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/30 bg-blue-50/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-600 backdrop-blur-sm">
            <Sparkles className="size-3.5" />
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Frequently asked <span className="text-blue-600">questions</span>
          </h2>
        </m.div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-3">
          {homeFaqs.map((faq) => (
            <m.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <FaqItem question={faq.question} answer={faq.answer} />
            </m.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
