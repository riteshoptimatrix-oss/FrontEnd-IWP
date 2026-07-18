"use client";

import * as React from "react";
import { Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/button";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex w-full max-w-md items-center gap-2", className)}
      aria-label="Newsletter subscription"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="Email address"
        className="h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 transition-all duration-200"
      />
      <Button type="submit" variant="gold" size="icon" aria-label="Subscribe">
        <Send />
      </Button>
      {submitted ? (
        <span className="sr-only" role="status">
          Thanks for subscribing!
        </span>
      ) : null}
    </form>
  );
}
