import { ComponentType } from "react";

export type BusinessInfo = {
  companyName: string;
  logoUrl?: string;
  category: string;
  description: string;
  phone: string;
  altPhone?: string;
  whatsapp?: string;
  email: string;
  existingWebsite?: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  fullAddress: string;
  googleMapsUrl?: string;
  workingHours: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
};

export type WebsiteTypeOption = {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  tag: string;
};

export type ThemePreviewStyle = {
  navBg: string;
  heroBg: string;
  cardBg: string;
  accent: string;
  textColor: string;
  isDark?: boolean;
};

export type ThemeOption = {
  id: string;
  title: string;
  description: string;
  style: ThemePreviewStyle;
  badge?: string;
};

export type FeatureOption = {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  category: "core" | "engagement" | "conversion" | "tech";
};

export type WizardStepNumber = 1 | 2 | 3 | 4 | 5;

export type StepDefinition = {
  number: WizardStepNumber;
  title: string;
  description: string;
};

export type FieldErrors = Partial<Record<string, string>>;
