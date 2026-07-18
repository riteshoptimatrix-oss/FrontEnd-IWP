import { api } from "@/lib/api-client";

export const adminApi = {
  login: (email: string, password: string) =>
    api.post("/admin/login", { email, password }),

  getDashboardStats: () => api.get("/admin/dashboard/stats"),

  // Users
  getUsers: (params: Record<string, string | number> = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") query.set(k, String(v));
    });
    return api.get(`/admin/users?${query.toString()}`);
  },
  getUser: (id: string) => api.get(`/admin/users/${id}`),
  updateUserRole: (id: string, role: string) =>
    api.put(`/admin/users/${id}/role`, { role }),
  suspendUser: (id: string, reason?: string) =>
    api.post(`/admin/users/${id}/suspend`, { action: "suspend", reason }),
  reactivateUser: (id: string) => api.post(`/admin/users/${id}/reactivate`),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  resetUserStats: (id: string) => api.post(`/admin/users/${id}/reset-stats`),

  // Snippets
  getSnippets: (params: Record<string, string | number> = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") query.set(k, String(v));
    });
    return api.get(`/admin/snippets?${query.toString()}`);
  },
  createSnippet: (data: Record<string, unknown>) =>
    api.post("/admin/snippets", data),
  updateSnippet: (id: string, data: Record<string, unknown>) =>
    api.put(`/admin/snippets/${id}`, data),
  deleteSnippet: (id: string) => api.delete(`/admin/snippets/${id}`),
  duplicateSnippet: (id: string) => api.post(`/admin/snippets/${id}/duplicate`),
  bulkImportSnippets: (snippets: Record<string, unknown>[]) =>
    api.post("/admin/snippets/bulk-import", { snippets }),
  exportSnippets: (language?: string) =>
    api.get(`/admin/snippets/export${language ? `?language=${language}` : ""}`),

  // Categories
  getCategories: (language?: string) =>
    api.get(`/admin/categories${language ? `?language=${language}` : ""}`),
  createCategory: (data: Record<string, unknown>) =>
    api.post("/admin/categories", data),
  updateCategory: (id: string, data: Record<string, unknown>) =>
    api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id: string) => api.delete(`/admin/categories/${id}`),

  // Challenges
  getChallenges: (params: Record<string, string | number> = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") query.set(k, String(v));
    });
    return api.get(`/admin/challenges?${query.toString()}`);
  },
  createChallenge: (data: Record<string, unknown>) =>
    api.post("/admin/challenges", data),
  archiveChallenge: (id: string) => api.post(`/admin/challenges/${id}/archive`),
  deleteChallenge: (id: string) => api.delete(`/admin/challenges/${id}`),

  // Certificates
  getCertificates: (params: Record<string, string | number> = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") query.set(k, String(v));
    });
    return api.get(`/admin/certificates?${query.toString()}`);
  },
  createCertificate: (data: Record<string, unknown>) =>
    api.post("/admin/certificates", data),
  revokeCertificate: (id: string, reason: string) =>
    api.post(`/admin/certificates/${id}/revoke`, { reason }),
  verifyCertificate: (code: string) =>
    api.get(`/admin/certificates/verify/${code}`),
  getCertificateTemplates: () => api.get("/admin/certificate-templates"),
  createCertificateTemplate: (data: Record<string, unknown>) =>
    api.post("/admin/certificate-templates", data),
  updateCertificateTemplate: (id: string, data: Record<string, unknown>) =>
    api.put(`/admin/certificate-templates/${id}`, data),
  deleteCertificateTemplate: (id: string) =>
    api.delete(`/admin/certificate-templates/${id}`),

  // Leaderboard
  getLeaderboard: (metric: string = "xp", limit: number = 100) =>
    api.get(`/admin/leaderboard?metric=${metric}&limit=${limit}`),
  refreshLeaderboard: (metrics: string[]) =>
    api.post("/admin/leaderboard/refresh", { metrics }),
  removeInvalidScores: () => api.post("/admin/leaderboard/remove-invalid"),
  detectSuspicious: (threshold: number = 0.95) =>
    api.post("/admin/leaderboard/suspicious", { threshold }),

  // Reports
  generateReport: (reportType: string, days?: number) =>
    api.post("/admin/reports/generate", { report_type: reportType, days }),

  // Audit Logs
  getAuditLogs: (params: Record<string, string | number> = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") query.set(k, String(v));
    });
    return api.get(`/admin/audit-logs?${query.toString()}`);
  },

  // Notifications
  broadcastNotification: (data: { title: string; message: string; type?: string; target?: string }) =>
    api.post("/admin/notifications/broadcast", data),
  getNotifications: (params: Record<string, string | number> = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") query.set(k, String(v));
    });
    return api.get(`/admin/notifications?${query.toString()}`);
  },
  deleteNotification: (id: string) => api.delete(`/admin/notifications/${id}`),

  // Settings
  getSettings: (category?: string) =>
    api.get(`/admin/settings${category ? `?category=${category}` : ""}`),
  updateSetting: (key: string, value: unknown, category: string) =>
    api.put("/admin/settings", { key, value, category }),

  // Global Search
  globalSearch: (query: string, types: string[] = ["users", "snippets", "certificates", "challenges"]) =>
    api.post("/admin/search", { query, types }),
};
