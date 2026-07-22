import type { Metadata } from "next";
import type { NavItem, SiteSocial, ContactInfo } from "@/types";
import {
  Code2, Smartphone, BrainCircuit, PenTool, ShoppingCart,
  Cloud, Puzzle, LineChart, Globe,
  HeartPulse, Landmark, GraduationCap, Building2,
  Plane, Truck, PlaySquare, BookOpen, Briefcase, FileText, Video
} from "lucide-react";

/**
 * Centralized site configuration.
 * Single source of truth for branding, navigation, SEO and contact data
 * so presentational components never hard-code duplicated content.
 */
export const siteConfig = {
  name: "India Web Programmers",
  shortName: "IWP",
  description:
    "Enterprise-grade web development, design and digital engineering partner helping ambitious brands ship fast, accessible and beautiful products.",
  tagline: "Engineering luxury digital experiences.",
  url: "https://www.indiawebprogrammers.com",
  locale: "en_US",
  author: "India Web Programmers",
  keywords: [
    "web development",
    "IT company",
    "enterprise software",
    "website development",
    "UI UX design",
    "OptiMatrix",
    "digital engineering",
  ],
  contact: {
    email: "info@optiinfo.com",
    phone: "+91 8128361116",
    address: "Indraprastha Corporate, 706, Corporate Rd, opp. Shell Petrol Pump, Chinar Bungalows, Prahlad Nagar, Ahmedabad, Gujarat 380015",
  } satisfies ContactInfo,
  socials: [
    { label: "Twitter", icon: "twitter", href: "https://twitter.com" },
    { label: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" },
    { label: "GitHub", icon: "github", href: "https://github.com" },
    { label: "Instagram", icon: "instagram", href: "https://instagram.com" },
  ] satisfies SiteSocial[],
} as const;

/**
 * Primary navigation shown in the navbar and (subset) in the footer.
 */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Clients", href: "/clients" },
  { label: "OptiMatrix", href: "/optimatrix" },
  { label: "Contact", href: "/contact-us" },
];

/* ------------------------------------------------------------------ */
/*  MEGA MENU DATA                                                     */
/* ------------------------------------------------------------------ */

export type MegaMenuItem = {
  label: string;
  href: string;
  description?: string;
  icon?: typeof Code2;
};

export type MegaMenuSection = {
  title: string;
  items: MegaMenuItem[];
  featured?: MegaMenuItem[];
};

export const servicesMegaMenu: MegaMenuSection = {
  title: "Our Services",
  items: [
    { label: "Website Development", href: "/services/website-development", description: "Fast, accessible marketing & brand sites.", icon: Globe },
    { label: "Web Applications", href: "/services", description: "Scalable products engineered for growth.", icon: Code2 },
    { label: "Mobile Apps", href: "/services", description: "Cross-platform native-feel experiences.", icon: Smartphone },
    { label: "AI & Automation", href: "/services", description: "Intelligent workflows & AI-powered features.", icon: BrainCircuit },
    { label: "UI / UX Design", href: "/services", description: "Research-led interfaces that feel premium.", icon: PenTool },
    { label: "E-commerce", href: "/services", description: "Conversion-focused storefronts that sell more.", icon: ShoppingCart },
    { label: "Cloud & DevOps", href: "/services", description: "Reliable, scalable infrastructure.", icon: Cloud },
    { label: "API Integration", href: "/services", description: "Robust APIs & third-party integrations.", icon: Puzzle },
  ],
  featured: [
    { label: "Digital Marketing & SEO", href: "/services", description: "Data-driven growth strategies.", icon: LineChart },
    { label: "View All Services →", href: "/services" },
  ],
};

export const industriesMegaMenu: MegaMenuSection = {
  title: "Industries We Serve",
  items: [
    { label: "Healthcare", href: "/industries/healthcare", description: "HIPAA-compliant platforms, EHR/EMR, telemedicine.", icon: HeartPulse },
    { label: "Finance & Banking", href: "/industries/finance", description: "Fintech dashboards, payment gateways, trading systems.", icon: Landmark },
    { label: "E-commerce & Retail", href: "/industries/ecommerce", description: "Headless storefronts, marketplaces, POS systems.", icon: ShoppingCart },
    { label: "Education & E-learning", href: "/industries/education", description: "LMS platforms, virtual classrooms, EdTech apps.", icon: GraduationCap },
    { label: "Real Estate", href: "/industries/real-estate", description: "Property portals, CRM tools, virtual tour platforms.", icon: Building2 },
    { label: "Travel & Hospitality", href: "/industries/travel", description: "Booking engines, travel portals, hotel management.", icon: Plane },
    { label: "Logistics & Supply Chain", href: "/industries/logistics", description: "Fleet tracking, warehouse management, inventory systems.", icon: Truck },
    { label: "Media & Entertainment", href: "/industries/media", description: "Streaming platforms, content management, OTT apps.", icon: PlaySquare },
  ],
  featured: [
    { label: "View All Industries →", href: "/industries" },
  ],
};

export const portfolioMegaMenu: MegaMenuSection = {
  title: "Featured Work",
  items: [
    { label: "Lead Finder Agent", href: "/portfolio", description: "AI-powered lead generation with Playwright." },
    { label: "Advance School Management System", href: "/portfolio", description: "Comprehensive PHP school platform." },
    { label: "Advance PMS for the Company", href: "/portfolio", description: "MERN-based performance management." },
  ],
  featured: [
    { label: "View All Projects →", href: "/portfolio" },
  ],
};

export const resourcesMegaMenu: MegaMenuSection = {
  title: "Resources & Insights",
  items: [
    { label: "Blog", href: "/resources/blog", description: "Insights, news, and technical deep dives.", icon: BookOpen },
    { label: "Case Studies", href: "/resources/case-studies", description: "Success stories from our clients.", icon: Briefcase },
    { label: "HTML Compiler", href: "/resources/html-compiler", description: "Write and compile HTML code directly in your browser.", icon: Code2 },
    { label: "Portfolio Projects", href: "/portfolio", description: "View our selected work and case studies.", icon: Code2 },
  ],
  featured: [
    { label: "View All Resources →", href: "/resources" },
  ],
};

/**
 * Footer link architecture grouped by column.
 */
export const footerNav: {
  title: string;
  items: NavItem[];
}[] = [
  {
    title: "Quick Links",
    items: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "All Services", href: "/services" },
      { label: "Website Development", href: "/services/website-development" },
      { label: "UI/UX Design", href: "/services" },
      { label: "Digital Engineering", href: "/services" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Our Clients", href: "/clients" },
      { label: "OptiMatrix", href: "/optimatrix" },
      { label: "Careers", href: "/about-us" },
      { label: "Blog", href: "/portfolio" },
    ],
  },
];

export type SiteConfig = typeof siteConfig;

/**
 * Builds a complete, DRY `Metadata` object for a route. Always sets a
 * canonical URL, Open Graph and Twitter Card so SEO is consistent across
 * every page without repeating the boilerplate.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage = "/images/og.svg",
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const desc = description ?? siteConfig.description;
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;

  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  };
}
