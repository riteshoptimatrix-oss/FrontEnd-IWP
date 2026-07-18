"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/skeleton";

function ContactFormSkeleton() {
  return (
    <div className="mx-auto max-w-xl space-y-5 rounded-2xl border border-border bg-card p-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
      <Skeleton className="h-12 w-40" />
    </div>
  );
}

export const ContactForm = dynamic(
  () => import("@/components/contact-form").then((m) => m.ContactForm),
  { loading: () => <ContactFormSkeleton /> },
);
