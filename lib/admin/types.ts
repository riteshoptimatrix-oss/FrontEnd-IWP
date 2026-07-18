export type AdminRole = "super_admin" | "admin" | "moderator" | "content_manager" | "support" | "user";

export type AccountStatus = "active" | "suspended" | "deactivated" | "pending";

export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  avatar: string | null;
  phone: string | null;
  role: AdminRole;
  created_at: string;
  updated_at: string;
  last_login: string | null;
  email_verified: boolean;
  account_status: AccountStatus;
  company: string | null;
  bio: string | null;
}

export interface DashboardStats {
  total_users: number;
  active_users_today: number;
  new_registrations: number;
  completed_tests: number;
  daily_challenges_completed: number;
  average_accuracy: number;
  average_wpm: number;
  certificates_issued: number;
  leaderboard_entries: number;
  server_status: string;
  api_status: string;
  database_status: string;
  user_growth_data: { date: string; count: number }[];
  language_distribution: { language: string; count: number }[];
  activity_data: { date: string; sessions: number; unique_users: number }[];
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface UserListResult {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface Snippet {
  _id: string;
  language: string;
  title: string;
  content: string;
  difficulty: string;
  category: string;
  tags: string[];
  explanation?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface SnippetCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  language: string;
  difficulty: string;
  icon: string | null;
  sort_order: number;
  snippet_count: number;
  created_at: string;
}

export interface Challenge {
  _id: string;
  date: string;
  language: string;
  category: string;
  difficulty: string;
  duration_seconds: number;
  xp_reward: number;
  bonus_xp: number;
  title: string;
  description: string;
  snippet_id: string | null;
  created_at: string;
  type?: string;
}

export interface Certificate {
  _id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  template_name: string;
  title: string;
  description: string;
  issued_at: string;
  expires_at: string | null;
  revoked: boolean;
  revoked_at: string | null;
  revoked_reason: string | null;
  verification_code: string;
  metrics: Record<string, unknown>;
  created_at: string;
}

export interface CertificateTemplate {
  _id: string;
  name: string;
  title: string;
  description: string;
  criteria: Record<string, unknown>;
  design: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
}

export interface AuditLog {
  _id: string;
  admin_id: string;
  admin_email: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

export interface AdminNotification {
  _id: string;
  title: string;
  message: string;
  type: string;
  target: string;
  sent_by: string | null;
  sent_at: string | null;
  is_active: boolean;
  created_at: string;
}

export interface SystemSetting {
  _id: string;
  key: string;
  value: Record<string, unknown>;
  category: string;
  updated_by: string | null;
  updated_at: string;
  created_at: string;
}

export interface LeaderboardEntry {
  user_id: string;
  score: number;
  display_name?: string;
  xp?: number;
  level?: number;
}

export interface AdminApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}
