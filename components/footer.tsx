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
        "border-t border-black/5 bg-white/70 shadow-[0_-8px_30px_rgba(0,0,0,0.02)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70",
        className,
      )}
    >
      <Container className="py-10 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
          {/* Brand + Newsletter + Socials */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Link
              href="/"
              className="group flex items-center shrink-0 w-fit rounded-lg bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]"
              aria-label={`${siteConfig.name} home`}
            >
              <img
                src="https://indiawebprogrammers.com/images/logo.gif"
                alt={siteConfig.name}
                className="h-[76px] w-auto object-contain"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline} {siteConfig.description}
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
                Subscribe to our newsletter
              </p>
              <NewsletterForm />
            </div>

            <div className="mt-6 flex items-center gap-2">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-xl border border-border/50 bg-white/50 text-slate-500 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200/60 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md dark:bg-slate-900/50 dark:hover:border-blue-800/50 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:ml-auto">
              <h3 className="mb-3 text-sm font-semibold tracking-wide text-foreground">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="lg:col-span-1 lg:ml-auto">
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-foreground">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blue-500" aria-hidden />
                <span className="leading-relaxed">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-blue-500" aria-hidden />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-blue-500" aria-hidden />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
        <Container className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
          <p className="text-sm font-medium text-muted-foreground">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
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
