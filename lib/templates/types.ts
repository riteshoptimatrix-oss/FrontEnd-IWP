import { ComponentType } from "react";

export type CategoryId =
  | "business"
  | "restaurant"
  | "hotel"
  | "gym"
  | "hospital"
  | "clinic"
  | "lawyer"
  | "real-estate"
  | "school"
  | "coaching"
  | "software-company"
  | "digital-agency"
  | "ecommerce"
  | "portfolio"
  | "landing-page"
  | "salon"
  | "spa"
  | "cafe"
  | "bakery"
  | "travel"
  | "construction"
  | "interior"
  | "architecture"
  | "finance"
  | "insurance"
  | "ngo"
  | "manufacturing"
  | "electronics"
  | "furniture"
  | "blog"
  | "news";

export type ThemeId =
  | "White"
  | "Dark"
  | "Corporate"
  | "Startup"
  | "Luxury"
  | "Glass"
  | "Gradient"
  | "Minimal"
  | "Premium";

export type PageDefinition = {
  id: string;
  name: string;
  filename: string;
  isDefault?: boolean;
  description: string;
  sections: string[];
};

export type NavItemConfig = {
  label: string;
  href: string;
  isCTA?: boolean;
};

export type CategoryUXSpec = {
  primaryCTA: string;
  secondaryCTA: string;
  heroHeadlinePlaceholder: string;
  specializedComponents: string[];
  featuresList: string[];
  colorThemeFallback: ThemeId;
};

export type TemplateConfig = {
  id: CategoryId;
  title: string;
  description: string;
  tag: string;
  iconName: string;
  pages: PageDefinition[];
  navigation: NavItemConfig[];
  categoryUX: CategoryUXSpec;
  sections: string[];
};

export type ThemeTokenMap = {
  id: ThemeId;
  name: string;
  bgMain: string;
  bgSectionAlt: string;
  bgCard: string;
  bgNav: string;
  textHeading: string;
  textBody: string;
  textMuted: string;
  borderPrimary: string;
  borderAccent: string;
  accentPrimary: string;
  accentHover: string;
  accentText: string;
  shadowLevel: string;
  radiusStyle: string;
  isDark: boolean;
};
