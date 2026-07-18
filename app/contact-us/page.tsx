import type { Metadata } from "next";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { buildMetadata } from "@/lib/site";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Button } from "@/components/button";
import { SectionTitle } from "@/components/section-title";
import { SectionFaq } from "@/components/section-faq";
import { CTA } from "@/components/cta";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { SectionDivider } from "@/components/section-divider";
import { ShapesHome } from "@/components/animated-shapes";
import { SocialIcon } from "@/components/social-icons";
import { SmartContactForm } from "@/components/lazy/smart-contact-form";
import { ProjectWizard } from "@/components/lazy/project-wizard";
import { MeetingScheduler } from "@/components/lazy/meeting-scheduler";
import { FloatingButtons } from "@/components/lazy/floating-buttons";
import {
  contactDetails,
  workingHours,
  contactFaqs,
  contactMethods,
  socialLinks,
  officeInfoItems,
} from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with India Web Programmers — start a project inquiry, schedule a meeting, or reach out directly.",
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <>
      {/* ── 1. Premium Hero ── */}
      <Section className="relative min-h-[60svh] flex items-center overflow-hidden bg-gradient-to-b from-violet-50/30 via-white to-white">
        <ShapesHome />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-subtle [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal type="fade-up">
              <span className="inline-flex items-center rounded-full border border-violet-200/30 bg-gradient-to-r from-violet-100/50 to-violet-50/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 shadow-sm">
                Get in touch
              </span>
            </Reveal>
            <Reveal type="fade-up" delay={0.05}>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Start your next{' '}
                <span className="text-gradient-gold">great project</span>
              </h1>
            </Reveal>
            <Reveal type="fade-up" delay={0.1}>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground mx-auto">
                Whether you need a website, a web app, or a full-scale platform — we&apos;re here to make it happen.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={0.15}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="#contact" variant="gold" size="lg">
                  Send a message
                  <ArrowRight className="size-4" />
                </Button>
                <Button href="#wizard" variant="outline" size="lg">
                  Start project inquiry
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </Section>

      {/* ── 2. Contact Methods ── */}
      <Section className="py-12 -mt-8 relative z-10">
        <Container>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method) => (
              <Reveal inGroup key={method.label}>
                <Card hover className="group h-full text-center">
                  <CardHeader>
                    <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100/60 to-violet-50/40 text-violet-600 ring-1 ring-violet-200/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                      <method.icon className="size-5" aria-hidden />
                    </span>
                    <CardTitle>{method.label}</CardTitle>
                    <CardDescription className="text-sm">
                      {method.href ? (
                        <a href={method.href} className="text-gold hover:underline font-medium" target={method.href.startsWith("http") ? "_blank" : undefined} rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                          {method.value}
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">{method.value}</span>
                      )}
                    </CardDescription>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </CardHeader>
                  <CardContent>
                    {method.href && (
                      <a
                        href={method.href}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:underline"
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {method.cta}
                        <ArrowUpRight className="size-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <SectionDivider variant="gradient" />

      {/* ── 3 & 4. Smart Contact Form + Project Inquiry Wizard ── */}
      <Section id="contact">
        <Container>
          <SectionTitle
            eyebrow="Tell us about your project"
            title="How would you like to get started?"
            description="Use the quick form for a simple message, or walk through our project wizard for a detailed inquiry."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Smart Contact Form */}
            <div>
              <Reveal type="fade-up">
                <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
                  <h3 className="text-lg font-semibold tracking-tight mb-1">Send a message</h3>
                  <p className="text-sm text-muted-foreground mb-6">Quick and direct — we&apos;ll respond within one business day.</p>
                  <SmartContactForm />
                </div>
              </Reveal>
            </div>

            {/* Project Inquiry Wizard */}
            <div id="wizard">
              <Reveal type="fade-up" delay={0.1}>
                <div className="rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.02] to-transparent p-6 shadow-card sm:p-8">
                  <h3 className="text-lg font-semibold tracking-tight mb-1 flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-gold/10 text-gold">
                      <Calendar className="size-4" />
                    </span>
                    Project inquiry wizard
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">Answer a few questions and we&apos;ll prepare a tailored proposal.</p>
                  <ProjectWizard />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider variant="wave" />

      {/* ── 9. Meeting Scheduler ── */}
      <Section id="meeting" variant="alt">
        <Container>
          <SectionTitle
            eyebrow="Book a time"
            title="Schedule a free consultation"
            description="Pick a date and time that works for you. 30-minute discovery calls — no strings attached."
          />
          <div className="mt-12">
            <MeetingScheduler />
          </div>
        </Container>
      </Section>

      <SectionDivider variant="gradient" />

      {/* ── 10. Office Information ── */}
      <Section id="office">
        <Container>
          <SectionTitle
            eyebrow="Our offices"
            title="Where to find us"
            description="Headquartered in Ahmedabad, serving clients across 20+ countries."
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {officeInfoItems.map((item) => (
              <Reveal inGroup key={item.label}>
                <Card hover className="group h-full">
                  <CardHeader>
                    <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100/60 to-violet-50/40 text-violet-600 ring-1 ring-violet-200/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                      <item.icon className="size-5" aria-hidden />
                    </span>
                    <CardTitle>{item.label}</CardTitle>
                    <CardDescription className="font-medium text-foreground">{item.value}</CardDescription>
                    {item.detail && <p className="text-xs text-muted-foreground">{item.detail}</p>}
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </RevealGroup>

          {/* Working hours */}
          <div className="mx-auto mt-10 max-w-md">
            <Reveal type="fade-up">
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Clock className="size-5 text-gold" aria-hidden />
                  Working hours
                </h3>
                <ul className="flex flex-col divide-y divide-border/60">
                  {workingHours.map((w) => (
                    <li key={w.day} className="flex items-center justify-between py-3 text-sm">
                      <span className="font-medium text-foreground">{w.day}</span>
                      <span className="text-muted-foreground">{w.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── 11. Google Map ── */}
      <Section className="pt-0">
        <Container>
          <Reveal type="fade-up">
            <div
              className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-violet-50/40 via-white to-violet-50/20 shadow-card"
              role="img"
              aria-label={`Map placeholder for our office in ${contactDetails.address}`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0 0 0 / 0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0 0 0 / 0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-gold/10 text-gold ring-1 ring-gold/10">
                  <MapPin className="size-7" aria-hidden />
                </span>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">Interactive map</p>
                  <p className="text-xs text-muted-foreground">{contactDetails.address}</p>
                </div>
                <span className="rounded-full bg-gold/10 px-3 py-1 text-[10px] font-medium text-gold">
                  Google Maps integration ready
                </span>
              </div>
              {/* Decorative dots */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="size-2 rounded-full bg-violet-400/40" />
                <span className="size-2 rounded-full bg-violet-300/30" />
                <span className="size-2 rounded-full bg-violet-200/20" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <SectionDivider variant="gradient" />

      {/* ── 12. Social Media ── */}
      <Section variant="alt">
        <Container>
          <SectionTitle
            eyebrow="Follow us"
            title="Let&apos;s connect"
            description="Stay updated with our latest work, insights and behind-the-scenes."
          />
          <RevealGroup className="mt-10 flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <Reveal inGroup key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-6 py-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-card-hover"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100/60 to-violet-50/40 text-violet-600 ring-1 ring-violet-200/40 transition-all duration-300 group-hover:scale-110">
                    <SocialIcon name={link.icon} className="size-5" />
                  </span>
                  <span className="text-sm font-medium text-foreground">{link.label}</span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-200 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <SectionDivider variant="wave" />

      {/* ── 13. FAQ ── */}
      <SectionFaq
        id="faq"
        eyebrow="FAQ"
        title="Before you reach out"
        description="Answers to the most common questions about working with us."
        faqs={contactFaqs}
      />

      {/* ── 14. Final CTA ── */}
      <CTA
        eyebrow="Ready to build?"
        title="Let&apos;s create something remarkable"
        description="Tell us about your vision — we'll bring the expertise, the craft, and the commitment."
        primaryLabel="Book a consultation"
        primaryHref="#meeting"
        primaryVariant="shimmer"
        secondaryLabel="Send a message"
        secondaryHref="#contact"
      />

      {/* ── Floating Elements ── */}
      <FloatingButtons />
    </>
  );
}
