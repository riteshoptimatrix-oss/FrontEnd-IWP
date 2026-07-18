import { Clock, Mail, MapPin, Phone, MessageSquare } from "lucide-react";

import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/lazy/contact-form";
import { contactDetails, workingHours } from "@/lib/data";

function Detail({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 text-gold ring-1 ring-gold/10">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="block text-sm font-medium text-foreground">
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-secondary hover:-translate-y-0.5"
      >
        {content}
      </a>
    );
  }
  return <div className="flex items-center gap-3 p-2">{content}</div>;
}

export function ContactSection() {
  return (
    <Section id="contact" className="relative overflow-hidden">
      {/* Floating decorative shapes */}
      <div aria-hidden className="pointer-events-none absolute right-[10%] top-[15%] h-20 w-20 rounded-2xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-[5%] bottom-[20%] h-14 w-14 rounded-xl border border-cyan-200/20 bg-cyan-50/30" />
      <Container className="grid gap-12 lg:grid-cols-2 relative">
        <div className="flex flex-col gap-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <Detail
              icon={Mail}
              label="Email"
              value={contactDetails.email}
              href={`mailto:${contactDetails.email}`}
            />
            <Detail
              icon={Phone}
              label="Phone"
              value={contactDetails.phone}
              href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`}
            />
            <Detail icon={MapPin} label="Office" value={contactDetails.address} />
            <Detail
              icon={MessageSquare}
              label="Response time"
              value={contactDetails.responseTime}
            />
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Clock className="size-5 text-gold" aria-hidden />
              Working hours
            </h3>
            <ul className="flex flex-col divide-y divide-border/60">
              {workingHours.map((slot) => (
                <li
                  key={slot.day}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="font-medium text-foreground">{slot.day}</span>
                  <span className="text-muted-foreground">{slot.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="relative aspect-video overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-gold/5 via-white to-blue-50/50 shadow-card"
            role="img"
            aria-label={`Map placeholder for our office in ${contactDetails.address}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0 0 0 / 0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0 0 0 / 0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="size-8 text-gold/60" aria-hidden />
              <span className="text-sm font-medium">Map placeholder</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card sm:p-8">
          <h2 className="mb-1 text-2xl font-semibold tracking-tight">
            Send us a message
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Frontend demo &mdash; no message is actually sent.
          </p>
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
