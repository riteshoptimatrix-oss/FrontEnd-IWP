"use client";

import * as React from "react";
import { AlertTriangle, RotateCw, Home } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[70svh] items-center overflow-hidden bg-gradient-to-b from-red-50/30 via-white to-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-xl text-center">
          <span className="flex mx-auto size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive shadow-sm">
            <AlertTriangle className="size-7" aria-hidden />
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Something went wrong
          </h1>
          <p className="mt-3 text-muted-foreground">
            An unexpected error occurred. You can try again or head back home.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={reset} variant="gold">
              <RotateCw className="size-4" aria-hidden />
              Try again
            </Button>
            <Button href="/" variant="outline">
              <Home className="size-4" aria-hidden />
              Back home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
