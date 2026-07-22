import { Home, ArrowLeft, Search } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-30" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          {/* Animated 404 number */}
          <div className="relative inline-block">
            <p className="font-display text-[8rem] font-bold leading-none tracking-tighter text-slate-900 sm:text-[12rem]">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-900 shadow-sm animate-float">
                <Search className="size-8" />
              </span>
            </div>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted-foreground mx-auto">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
            Let&rsquo;s get you back on track.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="default" size="lg">
              <Home className="size-4" aria-hidden />
              Back home
            </Button>
            <Button href="/contact-us" variant="outline" size="lg">
              <ArrowLeft className="size-4" aria-hidden />
              Contact us
            </Button>
          </div>

          {/* Quick links */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Services", href: "/services" },
              { label: "Portfolio", href: "/portfolio" },
              { label: "About Us", href: "/about-us" },
              { label: "Contact", href: "/contact-us" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:-translate-y-0.5 hover:shadow-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
