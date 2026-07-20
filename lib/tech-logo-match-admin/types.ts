export type TechnologyStatus = "active" | "archived";
export type QuestionType = "logo_to_name" | "name_to_logo" | "logo_to_category" | "mixed";
export type ExportFormat = "csv" | "excel" | "json";
export type ValidationSeverity = "error" | "warning" | "info";

export interface TechnologyItem {
  id: string;
  official_name: string;
  short_name: string;
  category: string;
  description: string;
  difficulty: string;
  aliases: string[];
  official_url: string;
  display_order: number;
  status: TechnologyStatus;
  logo_path: string | null;
  logo_url: string | null;
  logo_mime: string | null;
  logo_size: number | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  version: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  display_order: number;
  technology_count: number;
  created_at: string;
  updated_at: string;
}

export interface PackItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  difficulty: string;
  estimated_minutes: number;
  technology_count: number;
  created_at: string;
  updated_at: string;
}

export interface QuestionItem {
  id: string;
  technology_id: string;
  technology_name: string;
  question_type: QuestionType;
  prompt: string;
  correct_answer: string;
  options: string[];
  difficulty: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface AssetItem {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  width: number | null;
  height: number | null;
  url: string;
  path: string;
  version: number;
  technology_id: string | null;
  is_alternative: boolean;
  label: string;
  created_at: string;
  created_by: string | null;
}

export interface VersionItem {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  changes: Record<string, unknown>;
  changed_by: string | null;
  changed_at: string;
  version: number;
}

export interface ValidationIssue {
  type: string;
  severity: ValidationSeverity;
  entity_type: string;
  entity_id: string | null;
  entity_name: string | null;
  message: string;
  details: Record<string, unknown> | null;
}

export interface ValidationResult {
  total_issues: number;
  errors: number;
  warnings: number;
  issues: ValidationIssue[];
  passed: boolean;
}

export interface AdminDashboardStats {
  total_technologies: number;
  active_technologies: number;
  archived_technologies: number;
  total_categories: number;
  total_packs: number;
  total_questions: number;
  total_assets: number;
  assets_size_bytes: number;
  technologies_without_logo: number;
  technologies_by_difficulty: Record<string, number>;
  technologies_by_category: Record<string, number>;
  recent_activity: VersionItem[];
}

export interface PaginatedTechnologies {
  technologies: TechnologyItem[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface PaginatedQuestions {
  questions: QuestionItem[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface BulkImportItem {
  row: number;
  status: string;
  message: string;
  data: Record<string, unknown> | null;
}

export interface BulkImportResult {
  total: number;
  succeeded: number;
  failed: number;
  items: BulkImportItem[];
}
