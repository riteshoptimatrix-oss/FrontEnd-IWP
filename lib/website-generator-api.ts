import { DashboardStats, ProjectRecord } from "@/types/ai";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

import { getAccessToken } from "./api-client";

function getAuthHeaders(): Record<string, string> {
  const token = getAccessToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await fetch(`${API_BASE}/website-generator/dashboard-stats`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Failed to fetch dashboard stats, returning fallback:", err);
    return {
      total_websites_generated: 0,
      total_downloads: 0,
      active_builds: 0,
      failed_builds: 0,
      most_used_theme: "White",
      most_used_website_type: "Business",
    };
  }
}

export async function fetchProjects(params: {
  search?: string;
  status?: string;
  website_type?: string;
  theme?: string;
  favorite_only?: boolean;
  page?: number;
  limit?: number;
}): Promise<{ total: number; page: number; limit: number; pages: number; projects: ProjectRecord[] }> {
  try {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.search) query.append("search", params.search);
    if (params.status) query.append("status", params.status);
    if (params.website_type) query.append("website_type", params.website_type);
    if (params.theme) query.append("theme", params.theme);
    if (params.favorite_only) query.append("favorite_only", "true");

    const res = await fetch(`${API_BASE}/website-generator/projects?${query.toString()}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Failed to fetch projects, returning empty list:", err);
    return { total: 0, page: 1, limit: 10, pages: 1, projects: [] };
  }
}

export async function fetchProjectDetails(jobId: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE}/website-generator/projects/${jobId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`Failed to fetch project details for ${jobId}:`, err);
    return null;
  }
}

export async function toggleFavoriteProject(jobId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/website-generator/projects/${jobId}/favorite`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch (err) {
    console.warn(`Failed to toggle favorite for ${jobId}:`, err);
    return false;
  }
}

export async function renameProject(jobId: string, newName: string): Promise<boolean> {
  try {
    const headers = getAuthHeaders();
    headers["Content-Type"] = "application/json";

    const res = await fetch(`${API_BASE}/website-generator/projects/${jobId}/rename`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ name: newName }),
    });
    return res.ok;
  } catch (err) {
    console.warn(`Failed to rename project ${jobId}:`, err);
    return false;
  }
}

export async function duplicateProject(jobId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/website-generator/projects/${jobId}/duplicate`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch (err) {
    console.warn(`Failed to duplicate project ${jobId}:`, err);
    return false;
  }
}

export async function deleteProject(jobId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/website-generator/projects/${jobId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch (err) {
    console.warn(`Failed to delete project ${jobId}:`, err);
    return false;
  }
}

export function getDownloadUrl(jobId: string): string {
  return `${API_BASE}/website-generator/download/${jobId}`;
}

export async function downloadWebsiteZipWithAuth(jobId: string, filename: string = "website.zip"): Promise<void> {
  const url = getDownloadUrl(jobId);
  const res = await fetch(url, { headers: getAuthHeaders() });
  
  if (!res.ok) {
    throw new Error(`Failed to download: ${res.statusText}`);
  }
  
  const blob = await res.blob();
  const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(blobUrl);
  a.remove();
}

export function getPreviewUrl(jobId: string, pageName: string = "index.html"): string {
  const token = typeof window !== 'undefined' ? localStorage.getItem('iwp_access_token') : null;
  let url = `${API_BASE}/website-generator/preview/${jobId}/${pageName}`;
  if (token) {
    url += `?token=${encodeURIComponent(token)}`;
  }
  return url;
}

export async function startGenerationJob(payload: any): Promise<{ job_id: string; status: string; message: string } | null> {
  try {
    const headers = getAuthHeaders();
    headers["Content-Type"] = "application/json";
    const res = await fetch(`${API_BASE}/website-generator/start`, {
      method: "POST",
      headers,
      body: JSON.stringify({ payload }),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.detail || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Failed to start generation job:", err);
    throw err;
  }
}

export async function getBuildProgress(jobId: string): Promise<{ job_id: string; status: string; progress_percentage: number; progress_message: string; error_message?: string; updated_at: string } | null> {
  try {
    const res = await fetch(`${API_BASE}/website-generator/build-progress/${jobId}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`Failed to get build progress for ${jobId}:`, err);
    return null;
  }
}
