import type { LucideIcon } from "lucide-react";
import type { SocialIconKey } from "@/types";
import {
  Accessibility,
  Atom,
  BarChart3,
  BrainCircuit,
  Brush,
  Building,
  Bus,
  Calendar,
  Camera,
  Car,
  Clock,
  Cloud,
  Code2,
  Cpu,
  CreditCard,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Globe,
  Headphones,
  Heart,
  Hotel,
  Landmark,
  Laptop,
  LayoutDashboard,
  Layers,
  Lightbulb,
  LineChart,
  Mail,
  MapPin,
  MessageSquare,
  Network,
  Newspaper,
  Palette,
  PenTool,
  Phone,
  Pill,
  Plane,
  Puzzle,
  Rocket,
  Scissors,
  Server,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  Truck,
  Users,
  Video,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

export interface Stat {
  value: string;
  label: string;
  hint?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  points: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface TechGroup {
  category: string;
  items: { name: string; icon: LucideIcon }[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  year: string;
  accent: string;
  image: string;
}

export interface WhyItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface IndustryItem {
  title: string;
  icon: LucideIcon;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  problem: string;
  solution: string;
  result: string;
  technologies: string[];
  category: string;
}

export interface HomeTechItem {
  name: string;
  icon: LucideIcon;
  color: string;
}

/* ------------------------------------------------------------------ */
/*  HOME                                                              */
/* ------------------------------------------------------------------ */

export const companyStats: Stat[] = [
  { value: "12+", label: "Years Experience", hint: "Shipping since 2013" },
  { value: "350+", label: "Projects Delivered", hint: "Across 4 continents" },
  { value: "98%", label: "Client Satisfaction", hint: "Based on reviews" },
  { value: "45+", label: "Team Members", hint: "Design + engineering" },
  { value: "20+", label: "Countries Served", hint: "Global reach" },
];

export const homeServices: ServiceItem[] = [
  {
    id: "web-development",
    title: "Website Development",
    description:
      "Fast, accessible and beautifully crafted marketing and brand websites that convert visitors into customers.",
    icon: Globe,
    href: "/what-we-do/web-development",
    points: ["Headless & CMS", "Core Web Vitals", "Accessibility AA"],
  },
  {
    id: "web-apps",
    title: "Web Applications",
    description: "Scalable products and platforms engineered for real growth with modern architecture.",
    icon: Code2,
    href: "/what-we-do/web-apps",
    points: ["React / Next.js", "API design", "Cloud-native"],
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    description: "Cross-platform mobile experiences that feel native and perform beautifully.",
    icon: Smartphone,
    href: "/what-we-do/mobile-apps",
    points: ["Flutter", "React Native", "iOS & Android"],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    description: "Intelligent workflows and AI-powered features that transform how you operate.",
    icon: BrainCircuit,
    href: "/what-we-do/ai-automation",
    points: ["LLM Integration", "Smart Workflows", "Data Pipelines"],
  },
  {
    id: "ui-ux",
    title: "UI / UX Design",
    description: "Research-led interfaces that feel effortless to use and look premium.",
    icon: PenTool,
    href: "/what-we-do/ui-ux",
    points: ["Design systems", "Prototyping", "Usability testing"],
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    description: "Conversion-focused storefronts that load fast and sell more.",
    icon: ShoppingCart,
    href: "/what-we-do/ecommerce",
    points: ["Shopify / custom", "Payments", "Subscriptions"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    description: "Reliable, observable infrastructure that scales with your ambition.",
    icon: Cloud,
    href: "/what-we-do/cloud",
    points: ["AWS / Azure", "CI/CD", "Monitoring"],
  },
  {
    id: "api",
    title: "API Integration",
    description: "Robust, well-documented APIs and third-party integrations that just work.",
    icon: Puzzle,
    href: "/what-we-do/api",
    points: ["REST / GraphQL", "Webhooks", "Microservices"],
  },
  {
    id: "crm-erp",
    title: "CRM & ERP",
    description: "Custom business systems that streamline operations and boost productivity.",
    icon: LayoutDashboard,
    href: "/what-we-do/crm-erp",
    points: ["Custom CRM", "ERP Systems", "Workflow Automation"],
  },
];

export const industries: IndustryItem[] = [
  { title: "Healthcare", icon: Heart, description: "HIPAA-compliant platforms, EHR/EMR, telemedicine" },
  { title: "Finance & Banking", icon: Landmark, description: "Fintech dashboards, payment gateways, trading systems" },
  { title: "E-commerce & Retail", icon: ShoppingCart, description: "Headless storefronts, marketplaces, POS systems" },
  { title: "Education & E-learning", icon: Laptop, description: "LMS platforms, virtual classrooms, EdTech apps" },
  { title: "Real Estate", icon: Building, description: "Property portals, CRM tools, virtual tour platforms" },
  { title: "Travel & Hospitality", icon: Plane, description: "Booking engines, travel portals, hotel management" },
  { title: "Logistics & Supply Chain", icon: Truck, description: "Fleet tracking, warehouse management, inventory systems" },
  { title: "Media & Entertainment", icon: Video, description: "Streaming platforms, content management, OTT apps" },
];

export const homeTechItems: HomeTechItem[] = [
  { name: "React", icon: Atom, color: "text-cyan-500" },
  { name: "Next.js", icon: Atom, color: "text-foreground" },
  { name: "Python", icon: Cpu, color: "text-amber-500" },
  { name: "FastAPI", icon: Zap, color: "text-emerald-500" },
  { name: "Flutter", icon: Smartphone, color: "text-blue-500" },
  { name: "MongoDB", icon: Database, color: "text-emerald-600" },
  { name: "PostgreSQL", icon: Database, color: "text-blue-600" },
  { name: "Node.js", icon: Server, color: "text-green-600" },
  { name: "Docker", icon: Layers, color: "text-blue-500" },
  { name: "AWS", icon: Cloud, color: "text-amber-500" },
  { name: "Firebase", icon: Zap, color: "text-amber-600" },
  { name: "Tailwind", icon: Brush, color: "text-cyan-500" },
  { name: "TypeScript", icon: Code2, color: "text-blue-600" },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We dig into your goals, audience and metrics to define what success looks like.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "Wireframes, design systems and polished interfaces validated with real users.",
  },
  {
    step: "03",
    title: "Develop",
    description:
      "Clean, tested, scalable code with continuous demos so you always see progress.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Rigorous QA, performance budgets and a calm, confident go-live.",
  },
  {
    step: "05",
    title: "Optimize",
    description:
      "We monitor, learn and improve � turning launch day into long-term growth.",
  },
];

export const techStack: TechGroup[] = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", icon: Atom },
      { name: "React", icon: Atom },
      { name: "TypeScript", icon: Code2 },
      { name: "Tailwind", icon: Brush },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: Server },
      { name: "Python", icon: Cpu },
      { name: "PostgreSQL", icon: Database },
      { name: "GraphQL", icon: Network },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", icon: Cloud },
      { name: "Vercel", icon: Globe },
      { name: "Docker", icon: Layers },
      { name: "CI/CD", icon: GitBranch },
    ],
  },
  {
    category: "Design & QA",
    items: [
      { name: "Figma", icon: PenTool },
      { name: "Storybook", icon: Layers },
      { name: "Playwright", icon: ShieldCheck },
      { name: "Lighthouse", icon: Gauge },
    ],
  },
];

export const portfolioProjects: Project[] = [
  {
    id: "lead-finder-agent",
    title: "Lead Finder Agent",
    category: "AI / Automation",
    summary: "An AI-powered lead generation agent built with Next.js frontend and Python FastAPI backend using Playwright for web scraping.",
    tags: ["Next.js", "Python", "FastAPI", "Playwright"],
    year: "2025",
    accent: "from-blue-500/30 to-blue-500/5",
    image: "/images/projects/lead_finder.png",
  },
  {
    id: "school-management-system",
    title: "Advance School Management System",
    category: "Web Apps",
    summary: "A comprehensive school management platform with attendance, grades, scheduling, and parent communication modules.",
    tags: ["PHP", "Laravel", "MySQL", "School Management"],
    year: "2025",
    accent: "from-emerald-500/30 to-emerald-500/5",
    image: "/images/projects/school_management.png",
  },
  {
    id: "pms-company",
    title: "Advance PMS for the Company",
    category: "Web Apps",
    summary: "A full-featured performance management system with goal tracking, reviews, and analytics for enterprise teams.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    year: "2025",
    accent: "from-violet-500/30 to-violet-500/5",
    image: "/images/projects/pms.png",
  },
  {
    id: "hospital-management",
    title: "Hospital Management System",
    category: "Mobile Apps",
    summary: "A cross-platform hospital management app with patient records, appointments, billing, and real-time doctor dashboards.",
    tags: ["Flutter", "Python", "FastAPI", "Healthcare"],
    year: "2025",
    accent: "from-red-500/30 to-red-500/5",
    image: "/images/projects/hospital_management.png",
  },
  {
    id: "ai-resume-builder",
    title: "AI Resume Builder",
    category: "AI / Automation",
    summary: "An intelligent resume builder that uses AI to generate tailored resumes, cover letters, and career insights.",
    tags: ["Next.js", "Node.js", "Express", "AI"],
    year: "2024",
    accent: "from-orange-500/30 to-orange-500/5",
    image: "/images/projects/resume_builder.png",
  },
  {
    id: "ai-hr-rating",
    title: "AI HR Rating Management System",
    category: "AI / Automation",
    summary: "An AI-driven HR rating platform that automates employee evaluation, feedback analysis, and performance scoring.",
    tags: ["MongoDB", "Express", "React", "Node.js", "AI"],
    year: "2024",
    accent: "from-cyan-500/30 to-cyan-500/5",
    image: "/images/projects/hr_rating.png",
  },
];

export const portfolioCategories = [
  "All",
  "Web Apps",
  "Mobile Apps",
  "AI / Automation",
] as const;

export const whyChooseUs: WhyItem[] = [
  {
    icon: Sparkles,
    title: "Craft over shortcuts",
    description:
      "We sweat the details � typography, motion, performance � because they compound into trust.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Accessibility, privacy and best-practice security are baked in, not bolted on.",
  },
  {
    icon: Gauge,
    title: "Performance obsessed",
    description:
      "Every build is held to a performance budget so your users never wait.",
  },
  {
    icon: Users,
    title: "A real partner",
    description:
      "Senior people on every engagement, transparent communication, no hand-offs.",
  },
];

export const homeTestimonials: Testimonial[] = [
  {
    name: "Priya Nair",
    role: "VP Product",
    company: "Aurora Bank",
    quote:
      "They treated our roadmap like their own. The dashboard launched early and our NPS jumped double digits.",
    initials: "PN",
  },
  {
    name: "Marcus Hale",
    role: "Founder",
    company: "Lumen",
    quote:
      "Our store is faster, cleaner and converts better. The team is genuinely a pleasure to work with.",
    initials: "MH",
  },
  {
    name: "Sofia Reyes",
    role: "CMO",
    company: "Northwind",
    quote:
      "The brand site they designed won us new enterprise deals within the first month. Beautiful and effective.",
    initials: "SR",
  },
];

export const clientLogos = [
  "Aurora",
  "Lumen",
  "Northwind",
  "Vertex",
  "Bloom",
  "Craft",
  "Meridian",
  "Orbit",
];

export const homeFaqs: Faq[] = [
  {
    question: "What kinds of projects do you take on?",
    answer:
      "We partner on websites, web applications, e-commerce and product design � from a landing page to a multi-year platform engagement.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A marketing site is often 3�6 weeks; a complex web app can run 3�9 months with phased delivery and continuous demos.",
  },
  {
    question: "Do you work with our existing team?",
    answer:
      "Yes. We plug into your designers, engineers and tools, or run end-to-end � whatever accelerates your goals.",
  },
  {
    question: "What does ongoing support look like?",
    answer:
      "We offer flexible retainers for optimization, new features and monitoring so your product keeps improving after launch.",
  },
];

/* ------------------------------------------------------------------ */
/*  ABOUT                                                             */
/* ------------------------------------------------------------------ */

export const aboutStory =
  "India Web Programmers began in 2013 with a simple belief: the web should feel effortless. Over the past decade we've grown from a tight-knit studio into a multidisciplinary team of designers, engineers and strategists � but our obsession with craft hasn't changed.";

export const missionVision = {
  mission:
    "To engineer digital experiences that are fast, accessible and genuinely delightful � helping ambitious teams ship with confidence.",
  vision:
    "A web where every interaction feels considered, every millisecond counts, and great design is the default � not the exception.",
};

export const coreValues: ValueItem[] = [
  {
    icon: Target,
    title: "Outcome-driven",
    description: "We start from your goals and measure success in business and human terms.",
  },
  {
    icon: Lightbulb,
    title: "Curious & candid",
    description: "We ask hard questions, share honest opinions and stay relentlessly curious.",
  },
  {
    icon: ShieldCheck,
    title: "Trustworthy",
    description: "Clear communication, predictable delivery and security baked into everything.",
  },
  {
    icon: Sparkles,
    title: "Craft-obsessed",
    description: "We care about the details others skip � they're what users remember.",
  },
];

export const aboutTimeline: TimelineItem[] = [
  {
    year: "2013",
    title: "The studio is born",
    description: "Three founders start building websites with an unreasonable focus on quality.",
  },
  {
    year: "2017",
    title: "First enterprise clients",
    description: "We deliver our first multi-team platform engagements and scale the studio.",
  },
  {
    year: "2021",
    title: "Design system practice",
    description: "We formalize a design-systems team to keep consistency at scale.",
  },
  {
    year: "2025",
    title: "OptiMatrix launches",
    description: "Our flagship platform enters early access, codifying a decade of learnings.",
  },
];

export const aboutAchievements: Stat[] = [
  { value: "350+", label: "Projects shipped" },
  { value: "12", label: "Years in business" },
  { value: "45+", label: "Team members" },
  { value: "20+", label: "Countries served" },
];

export const teamMembers: TeamMember[] = [
  { name: "Aarav Sharma", role: "Founder & CEO", initials: "AS" },
  { name: "Neha Gupta", role: "Head of Design", initials: "NG" },
  { name: "Kabir Mehta", role: "Principal Engineer", initials: "KM" },
  { name: "Ananya Rao", role: "Strategy Lead", initials: "AR" },
  { name: "Dev Patel", role: "Engineering Manager", initials: "DP" },
  { name: "Isha Verma", role: "Design Systems", initials: "IV" },
];

/* ------------------------------------------------------------------ */
/*  SERVICES                                                         */
/* ------------------------------------------------------------------ */

export const allServices: ServiceItem[] = [...homeServices];

export const serviceBenefits: WhyItem[] = [
  {
    icon: Zap,
    title: "Faster time-to-market",
    description: "Proven process and reusable systems get you live sooner.",
  },
  {
    icon: Gauge,
    title: "Lower cost of ownership",
    description: "Maintainable code and clear docs reduce long-term spend.",
  },
  {
    icon: BarChart3,
    title: "Measurable impact",
    description: "We tie delivery to the metrics your business cares about.",
  },
  {
    icon: BrainCircuit,
    title: "Future-proof stack",
    description: "Modern, well-supported technologies chosen for longevity.",
  },
];

export const industryNames = [
  "Fintech",
  "E-commerce",
  "Healthcare",
  "Education",
  "Travel",
  "Real Estate",
  "Media",
  "SaaS",
  "Manufacturing",
  "Hospitality",
  "Logistics",
  "Automotive",
];

export const pricingTiers = [
  {
    name: "Starter",
    price: "Custom",
    description: "For a focused website or MVP.",
    features: ["1�3 week timeline", "Design + build", "Basic SEO", "1 round of QA"],
  },
  {
    name: "Growth",
    price: "Custom",
    description: "For scaling products and storefronts.",
    features: ["4�12 week timeline", "Design system", "Performance budget", "Analytics + CRO"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For platforms and long-term partnerships.",
    features: ["Dedicated team", "Architecture review", "SLA & support", "Quarterly roadmap"],
  },
];

export const servicesFaqs: Faq[] = [
  {
    question: "How do you price engagements?",
    answer:
      "We price based on scope, complexity and timeline � fixed for well-defined work, and time-and-materials for evolving products. Every quote is transparent.",
  },
  {
    question: "Can you work in our timezone?",
    answer:
      "We offer overlapping hours with US and EU teams and use async tooling so progress never stalls while you sleep.",
  },
  {
    question: "Do you provide ongoing maintenance?",
    answer:
      "Yes. Our retainers cover monitoring, optimizations, security updates and new feature work.",
  },
  {
    question: "Who will I be working with?",
    answer:
      "A senior, Dedicated team � no junior hand-offs. You'll know the people building your product.",
  },
];

/* ------------------------------------------------------------------ */
/*  WEBSITE DEVELOPMENT                                            */
/* ------------------------------------------------------------------ */

export const websiteBenefits: WhyItem[] = [
  {
    icon: Gauge,
    title: "Blazing performance",
    description: "Sub-second loads and perfect Core Web Vitals for higher conversion.",
  },
  {
    icon: Accessibility,
    title: "Accessible to all",
    description: "WCAG-aligned markup so everyone � including screen readers � can use it.",
  },
  {
    icon: Smartphone,
    title: "Flawless on every device",
    description: "Responsive by default, tested across viewports and real devices.",
  },
  {
    icon: Search,
    title: "Found by search",
    description: "Technical SEO, structured data and clean URLs from day one.",
  },
];

export const websiteTypes: FeatureItem[] = [
  {
    icon: Globe,
    title: "Corporate & Brand",
    description: "Credible, conversion-focused sites that tell your story.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Storefronts engineered to load fast and sell more.",
  },
  {
    icon: PenTool,
    title: "Portfolio & Editorial",
    description: "Beautiful, media-rich experiences for creators and publishers.",
  },
  {
    icon: Layers,
    title: "Landing & Campaign",
    description: "High-converting pages for launches, events and ads.",
  },
];

export const websiteWorkflow: ProcessStep[] = [
  {
    step: "01",
    title: "Strategy & UX",
    description: "We map goals, audiences and journeys before a single pixel is drawn.",
  },
  {
    step: "02",
    title: "Design & Prototype",
    description: "Interactive prototypes validated with users and stakeholders.",
  },
  {
    step: "03",
    title: "Build & Integrate",
    description: "Component-driven development with your CMS or headless backend.",
  },
  {
    step: "04",
    title: "QA & Launch",
    description: "Cross-browser, device and accessibility testing, then a confident launch.",
  },
];

export const websiteFeatures: FeatureItem[] = [
  { icon: Zap, title: "Edge-rendered", description: "Global delivery for instant first paint." },
  { icon: ShieldCheck, title: "Secure forms", description: "Validated, spam-protected contact and lead forms." },
  { icon: Workflow, title: "CMS you control", description: "Edit content without calling a developer." },
  { icon: BarChart3, title: "Analytics ready", description: "Events and funnels wired from launch." },
  { icon: Search, title: "SEO foundation", description: "Sitemaps, metadata and structured data." },
  { icon: Palette, title: "Design system", description: "Consistent, on-brand UI at scale." },
];

export const websiteTypesExpanded: FeatureItem[] = [
  ...websiteTypes,
  {
    icon: Calendar,
    title: "Booking & Scheduling",
    description: "Appointment, reservation and calendar platforms.",
  },
  {
    icon: Video,
    title: "Media & Streaming",
    description: "Video, podcast and content streaming experiences.",
  },
  {
    icon: Newspaper,
    title: "News & Publishing",
    description: "Content-heavy editorial platforms with CMS workflows.",
  },
  {
    icon: Building,
    title: "SaaS & Dashboards",
    description: "Product-led sites with gated content and app previews.",
  },
];

export const websiteFeaturesExpanded: FeatureItem[] = [
  ...websiteFeatures,
  { icon: Globe, title: "Multi-language", description: "i18n-ready architecture for global audiences." },
  { icon: Camera, title: "Image optimization", description: "Automatic AVIF/WebP, lazy loading and CDNs." },
  { icon: CreditCard, title: "Payment integration", description: "Stripe, Razorpay or custom checkout flows." },
  { icon: FileText, title: "Blog & CMS", description: "Headless or integrated content editing." },
  { icon: Users, title: "User accounts", description: "Authentication, profiles and role-based access." },
  { icon: LineChart, title: "A/B testing", description: "Built-in experiment hooks for data-driven decisions." },
];

export const websiteWorkflowExpanded: ProcessStep[] = [
  {
    step: "01",
    title: "Strategy & UX",
    description: "We map goals, audiences and journeys before a single pixel is drawn.",
  },
  {
    step: "02",
    title: "Information Architecture",
    description: "Sitemaps, content models and navigation validated with real users.",
  },
  {
    step: "03",
    title: "Design & Prototype",
    description: "Interactive prototypes tested across devices and stakeholder reviews.",
  },
  {
    step: "04",
    title: "Build & Integrate",
    description: "Component-driven development with your CMS or headless backend.",
  },
  {
    step: "05",
    title: "QA & Accessibility",
    description: "Cross-browser, device and WCAG compliance testing.",
  },
  {
    step: "06",
    title: "Launch & Optimize",
    description: "Performance monitoring, analytics wiring and iterative improvement.",
  },
];

export interface CmsComparisonRow {
  feature: string;
  traditional: string;
  headless: string;
  advantage: "headless" | "traditional" | "tie";
}

export const cmsComparison: CmsComparisonRow[] = [
  { feature: "Performance", traditional: "Server-rendered, slower", headless: "Edge-rendered, instant", advantage: "headless" },
  { feature: "Flexibility", traditional: "Limited by theme", headless: "Any frontend framework", advantage: "headless" },
  { feature: "Security", traditional: "Full attack surface", headless: "Decoupled, smaller surface", advantage: "headless" },
  { feature: "Developer Experience", traditional: "PHP/template locks", headless: "Modern stack, full control", advantage: "headless" },
  { feature: "Content Editing", traditional: "Built-in, familiar", headless: "Requires headless CMS setup", advantage: "traditional" },
  { feature: "Time to Launch", traditional: "Faster for simple sites", headless: "More setup, more payoff", advantage: "traditional" },
  { feature: "Scalability", traditional: "Horizontal limited", headless: "CDN-native, scales globally", advantage: "headless" },
  { feature: "Cost", traditional: "Lower upfront", headless: "Higher upfront, lower long-term", advantage: "tie" },
];

export const websiteDevFaqs: Faq[] = [
  {
    question: "How long does it take to build a website?",
    answer:
      "A focused marketing site takes 3–6 weeks. Complex sites with custom features or integrations run 6–12 weeks with phased delivery.",
  },
  {
    question: "Do you work with existing designs?",
    answer:
      "Absolutely. We can build from your Figma files, refine an existing design, or take the lead on both strategy and design.",
  },
  {
    question: "What CMS do you recommend?",
    answer:
      "It depends on your content model. We work with Sanity, Contentful, Strapi and WordPress headless — and will recommend what fits your team.",
  },
  {
    question: "Will my website be fast?",
    answer:
      "Yes. We set a performance budget for every project and monitor Core Web Vitals through launch and beyond.",
  },
  {
    question: "Do you provide hosting?",
    answer:
      "We set up deployment on Vercel, Netlify or AWS and hand you the keys. Managed hosting retainers are also available.",
  },
  {
    question: "Can you redesign my existing site?",
    answer:
      "Yes. We audit the current experience, preserve SEO equity, and rebuild on a modern stack without losing what works.",
  },
];

/* ------------------------------------------------------------------ */
/*  CLIENTS                                                          */
/* ------------------------------------------------------------------ */

export const clientSuccessStories: Testimonial[] = [
  {
    name: "Priya Nair",
    role: "VP Product",
    company: "Aurora Bank",
    quote:
      "India Web Programmers became an extension of our team. The quality bar they set raised ours.",
    initials: "PN",
  },
  {
    name: "Marcus Hale",
    role: "Founder",
    company: "Lumen",
    quote:
      "They translated a fuzzy vision into a product our customers immediately understood and loved.",
    initials: "MH",
  },
  {
    name: "Sofia Reyes",
    role: "CMO",
    company: "Northwind",
    quote:
      "Reliable, senior and genuinely caring about outcomes. Hard to find a partner like this.",
    initials: "SR",
  },
];

export const clientStats: Stat[] = [
  { value: "350+", label: "Projects delivered" },
  { value: "98%", label: "Would recommend" },
  { value: "20+", label: "Countries served" },
  { value: "4.9/5", label: "Average rating" },
];

/* ------------------------------------------------------------------ */
/*  CONTACT                                                          */
/* ------------------------------------------------------------------ */

export const contactDetails = {
  email: "info@optiinfo.com",
  phone: "+91 8128361116",
  address: "Indraprastha Corporate, 706, Corporate Rd, opp. Shell Petrol Pump, Chinar Bungalows, Prahlad Nagar, Ahmedabad, Gujarat 380015",
  responseTime: "Within 1 business day",
};

export const workingHours: { day: string; hours: string }[] = [
  { day: "Monday � Friday", hours: "9:00 � 18:00 IST" },
  { day: "Saturday", hours: "10:00 � 14:00 IST" },
  { day: "Sunday", hours: "Closed" },
];

export const contactFaqs: Faq[] = [
  {
    question: "What should I include in my first message?",
    answer:
      "A short description of your goal, timeline and budget range is perfect. Links to references help too.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Absolutely. We're happy to sign an NDA before any conversation about your project.",
  },
  {
    question: "Can you start immediately?",
    answer:
      "Often yes. For larger engagements we'll scope a plan together first so we start on the right foot.",
  },
  {
    question: "How does the project inquiry wizard work?",
    answer:
      "Our wizard walks you through business type, project requirements, budget and timeline — so we can prepare a tailored proposal before our first call.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "A senior team member reviews your inquiry within one business day and reaches out with next steps — usually a discovery call.",
  },
  {
    question: "Can I schedule a meeting directly?",
    answer:
      "Yes. Use the meeting scheduler section below to pick a time that works for you. We offer free 30-minute consultations.",
  },
];

export interface ContactMethod {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  href?: string;
  cta: string;
}

export const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    label: "Email us",
    value: "info@optiinfo.com",
    description: "We respond within one business day",
    href: "mailto:info@optiinfo.com",
    cta: "Send email",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+91 8128361116",
    description: "Mon–Fri, 9:00–18:00 IST",
    href: "tel:+918128361116",
    cta: "Call now",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "Chat with us",
    description: "Quick replies for urgent inquiries",
    href: "https://wa.me/918128361116",
    cta: "Open WhatsApp",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "Ahmedabad, Gujarat",
    description: "India — with clients across 20+ countries",
    cta: "Get directions",
  },
];

export interface WizardBusinessType {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const wizardBusinessTypes: WizardBusinessType[] = [
  { id: "startup", label: "Startup", icon: Rocket },
  { id: "smb", label: "Small / Medium Business", icon: Building },
  { id: "enterprise", label: "Enterprise", icon: Landmark },
  { id: "agency", label: "Agency / Studio", icon: Users },
  { id: "nonprofit", label: "Non-Profit", icon: Heart },
  { id: "individual", label: "Individual / Founder", icon: Lightbulb },
];

export const wizardProjectTypes = [
  "Website",
  "Web Application",
  "Mobile App",
  "E-commerce Store",
  "SaaS Platform",
  "AI / Automation",
  "CRM / ERP System",
  "API / Integration",
  "UI/UX Redesign",
  "Full-Stack Product",
];

export const wizardFeatures = [
  "User Authentication",
  "Payment Integration",
  "Real-time Notifications",
  "Analytics Dashboard",
  "CMS / Blog",
  "Search & Filtering",
  "Multi-language Support",
  "Push Notifications",
  "File Upload / Storage",
  "Chat / Messaging",
  "Third-party API",
  "Admin Panel",
];

export const wizardPageCounts = [
  "1–5 pages",
  "6–15 pages",
  "16–30 pages",
  "30+ pages",
  "Not sure yet",
];

export const wizardBudgetRanges = [
  "Under ₹2L",
  "₹2L – ₹5L",
  "₹5L – ₹15L",
  "₹15L – ₹50L",
  "₹50L+",
  "Not sure yet",
];

export const wizardTimelines = [
  { id: "urgent", label: "Urgent", description: "ASAP — willing to pay a premium", icon: Zap },
  { id: "1-month", label: "1 Month", description: "Fast-tracked, focused scope", icon: Calendar },
  { id: "2-months", label: "2 Months", description: "Balanced speed and quality", icon: Calendar },
  { id: "3-months", label: "3 Months", description: "Thorough, well-paced delivery", icon: Calendar },
  { id: "flexible", label: "Flexible", description: "No rush — quality first", icon: Clock },
];

export const wizardTechPreferences = [
  { id: "nextjs", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "flutter", label: "Flutter" },
  { id: "python", label: "Python" },
  { id: "fastapi", label: "FastAPI" },
  { id: "nodejs", label: "Node.js" },
  { id: "mongodb", label: "MongoDB" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "wordpress", label: "WordPress" },
  { id: "custom", label: "No preference / Custom" },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconKey;
}

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "X (Twitter)", href: "https://x.com", icon: "twitter" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { label: "GitHub", href: "https://github.com", icon: "github" },
];

export interface OfficeInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  detail?: string;
}

export const officeInfoItems: OfficeInfoItem[] = [
  { icon: MapPin, label: "Office Address", value: "Indraprastha Corporate, 706, Corporate Rd, opp. Shell Petrol Pump, Chinar Bungalows, Prahlad Nagar, Ahmedabad, Gujarat 380015", detail: "" },
  { icon: Clock, label: "Working Hours", value: "Mon – Fri, 9:00 – 18:00 IST", detail: "Saturday: 10:00 – 14:00 IST" },
  { icon: Headphones, label: "Support", value: "info@optiinfo.com", detail: "Response within 4 hours" },
  { icon: Phone, label: "Sales", value: "+91 8128361116", detail: "Mon – Fri, 9:00 – 18:00 IST" },
];
