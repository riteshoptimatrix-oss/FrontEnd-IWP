import { api } from "@/lib/api-client";
import type {
  AdminDashboardStats,
  TechnologyItem,
  TechnologyStatus,
  PaginatedTechnologies,
  CategoryItem,
  PackItem,
  QuestionItem,
  PaginatedQuestions,
  AssetItem,
  ValidationResult,
  BulkImportResult,
  VersionItem,
  ExportFormat,
} from "./types";

const BASE = "/api/v1/tech-logo-match/admin";

function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export const techLogoMatchAdminApi = {
  // ── Dashboard ──
  async getDashboard(): Promise<AdminDashboardStats> {
    return api.get(`${BASE}/dashboard`);
  },

  // ── Technologies ──
  async listTechnologies(params?: {
    page?: number; limit?: number; search?: string;
    category?: string; difficulty?: string; status?: string;
    sort_by?: string; sort_order?: number;
  }): Promise<PaginatedTechnologies> {
    return api.get(`${BASE}/technologies${buildQuery(params || {})}`);
  },

  async getTechnology(id: string): Promise<TechnologyItem> {
    return api.get(`${BASE}/technologies/${id}`);
  },

  async createTechnology(data: Partial<TechnologyItem>): Promise<TechnologyItem> {
    return api.post(`${BASE}/technologies`, data);
  },

  async updateTechnology(id: string, data: Partial<TechnologyItem>): Promise<TechnologyItem> {
    return api.put(`${BASE}/technologies/${id}`, data);
  },

  async deleteTechnology(id: string): Promise<void> {
    return api.delete(`${BASE}/technologies/${id}`);
  },

  async archiveTechnology(id: string): Promise<TechnologyItem> {
    return api.post(`${BASE}/technologies/${id}/archive`, {});
  },

  async restoreTechnology(id: string): Promise<TechnologyItem> {
    return api.post(`${BASE}/technologies/${id}/restore`, {});
  },

  // ── Categories ──
  async listCategories(search?: string): Promise<CategoryItem[]> {
    return api.get(`${BASE}/categories${buildQuery({ search })}`);
  },

  async createCategory(data: Partial<CategoryItem>): Promise<CategoryItem> {
    return api.post(`${BASE}/categories`, data);
  },

  async updateCategory(id: string, data: Partial<CategoryItem>): Promise<CategoryItem> {
    return api.put(`${BASE}/categories/${id}`, data);
  },

  async deleteCategory(id: string): Promise<void> {
    return api.delete(`${BASE}/categories/${id}`);
  },

  // ── Packs ──
  async listPacks(search?: string): Promise<PackItem[]> {
    return api.get(`${BASE}/packs${buildQuery({ search })}`);
  },

  async createPack(data: Partial<PackItem>): Promise<PackItem> {
    return api.post(`${BASE}/packs`, data);
  },

  async updatePack(id: string, data: Partial<PackItem>): Promise<PackItem> {
    return api.put(`${BASE}/packs/${id}`, data);
  },

  async deletePack(id: string): Promise<void> {
    return api.delete(`${BASE}/packs/${id}`);
  },

  // ── Questions ──
  async listQuestions(params?: {
    page?: number; limit?: number; search?: string;
    question_type?: string; difficulty?: string;
    category?: string; technology_id?: string;
    sort_by?: string; sort_order?: number;
  }): Promise<PaginatedQuestions> {
    return api.get(`${BASE}/questions${buildQuery(params || {})}`);
  },

  async getQuestion(id: string): Promise<QuestionItem> {
    return api.get(`${BASE}/questions/${id}`);
  },

  async createQuestion(data: Partial<QuestionItem>): Promise<QuestionItem> {
    return api.post(`${BASE}/questions`, data);
  },

  async updateQuestion(id: string, data: Partial<QuestionItem>): Promise<QuestionItem> {
    return api.put(`${BASE}/questions/${id}`, data);
  },

  async deleteQuestion(id: string): Promise<void> {
    return api.delete(`${BASE}/questions/${id}`);
  },

  // ── Assets ──
  async listAssets(params?: { page?: number; limit?: number; technology_id?: string }): Promise<AssetItem[]> {
    return api.get(`${BASE}/assets${buildQuery(params || {})}`);
  },

  async getAsset(id: string): Promise<AssetItem> {
    return api.get(`${BASE}/assets/${id}`);
  },

  async uploadAsset(file: File, technology_id?: string, is_alternative?: boolean, label?: string): Promise<AssetItem> {
    const form = new FormData();
    form.append("file", file);
    if (technology_id) form.append("technology_id", technology_id);
    if (is_alternative) form.append("is_alternative", "true");
    if (label) form.append("label", label);
    return api.post(`${BASE}/assets`, form, { headers: { "Content-Type": "multipart/form-data" } });
  },

  async replaceAsset(id: string, file: File): Promise<AssetItem> {
    const form = new FormData();
    form.append("file", file);
    return api.put(`${BASE}/assets/${id}/replace`, form, { headers: { "Content-Type": "multipart/form-data" } });
  },

  async deleteAsset(id: string): Promise<void> {
    return api.delete(`${BASE}/assets/${id}`);
  },

  // ── Bulk Import ──
  async bulkImportTechnologies(items: Record<string, unknown>[]): Promise<BulkImportResult> {
    return api.post(`${BASE}/bulk/technologies`, items);
  },

  async bulkImportQuestions(items: Record<string, unknown>[]): Promise<BulkImportResult> {
    return api.post(`${BASE}/bulk/questions`, items);
  },

  // ── Export ──
  getExportUrl(entity: "technologies" | "questions", format: ExportFormat): string {
    return `${BASE}/export/${entity}?format=${format}`;
  },

  // ── Validation ──
  async runValidation(): Promise<ValidationResult> {
    return api.post(`${BASE}/validate`, {});
  },

  // ── Versions ──
  async getVersions(params?: { entity_type?: string; entity_id?: string; page?: number; limit?: number }): Promise<VersionItem[]> {
    return api.get(`${BASE}/versions${buildQuery(params || {})}`);
  },
};
