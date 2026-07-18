import { Home, ArrowLeft, Search } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { ShapesHome } from "@/components/animated-shapes";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-gradient-to-b from-violet-50/30 via-white to-white">
      <ShapesHome />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          {/* Animated 404 number */}
          <div className="relative inline-block">
            <p className="font-display text-[8rem] font-bold leading-none tracking-tighter text-gradient-gold sm:text-[12rem]">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold-soft text-white shadow-lg animate-float">
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
            <Button href="/" variant="gold" size="lg">
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
                className="rounded-xl border border-border/60 bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-gold/20 hover:bg-gold/5 hover:text-gold hover:-translate-y-0.5 hover:shadow-card"
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
