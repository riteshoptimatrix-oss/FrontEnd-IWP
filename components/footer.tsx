import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/container";
import { SocialIcon } from "@/components/social-icons";
import { NewsletterForm } from "@/components/newsletter-form";
import { footerNav, siteConfig } from "@/lib/site";

const legalLinks = [
  { label: "Privacy Policy", href: "/about-us" },
  { label: "Terms of Service", href: "/about-us" },
  { label: "Cookie Policy", href: "/about-us" },
];

export function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border/50 bg-white/60 backdrop-blur-2xl dark:bg-ink/60",
        className,
      )}
    >
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6">
          {/* Brand + Newsletter + Socials */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <Link
              href="/"
              className="group flex items-center gap-2.5 text-lg font-semibold tracking-tight"
              aria-label={`${siteConfig.name} home`}
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-soft text-white text-sm font-bold shadow-sm transition-transform duration-300 group-hover:scale-105">
                {siteConfig.shortName}
              </span>
              <span className="text-foreground">{siteConfig.name}</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline} {siteConfig.description}
            </p>

            <div className="mt-2 flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
                Subscribe to our newsletter
              </p>
              <NewsletterForm />
            </div>

            <div className="mt-2 flex items-center gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-xl border border-border/50 text-muted-foreground transition-all duration-200 hover:border-gold/30 hover:bg-gold/10 hover:text-gold hover:-translate-y-0.5"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold/70" aria-hidden />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-gold/70" aria-hidden />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-gold/70" aria-hidden />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="transition-colors hover:text-gold"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
