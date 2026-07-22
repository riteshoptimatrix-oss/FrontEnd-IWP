import { ComponentType } from "react";

export type NavItem = {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
};

export type AIModuleCard = {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href?: string;
  status: "available" | "coming_soon" | "phase_2";
  category: "generator" | "utility" | "creative";
  accentColor?: string;
};

export type WorkspacePreferences = {
  theme: "light" | "dark" | "system";
  defaultFramework: "nextjs" | "react" | "vite";
  autoSave: boolean;
  emailNotifications: boolean;
  soundEnabled: boolean;
};

export type QuickActionProps = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  color?: string;
  badge?: string;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
  isCurrent?: boolean;
};

export type ProjectRecord = {
  job_id: string;
  company_name: string;
  custom_name?: string;
  website_type: string;
  theme: string;
  selected_features: string[];
  status: "PENDING" | "VALIDATING" | "READY" | "PROCESSING" | "COMPLETED" | "FAILED";
  favorite: boolean;
  download_count: number;
  last_downloaded?: string;
  zip_filename?: string;
  pages_generated: string[];
  created_at: string;
  updated_at: string;
};

export type DashboardStats = {
  total_websites_generated: number;
  total_downloads: number;
  active_builds: number;
  failed_builds: number;
  most_used_theme: string;
  most_used_website_type: string;
};

export type BuildLogItem = {
  stage: string;
  message: string;
  timestamp: string;
};
