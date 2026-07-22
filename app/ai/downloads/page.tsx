"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  Search,
  Star,
  Edit2,
  Copy,
  Trash2,
  Eye,
  FolderArchive,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { ProjectRecord } from "@/types/ai";
import { ModuleHeader } from "@/components/ai/common/ModuleHeader";
import { EmptyState } from "@/components/ai/common/EmptyState";
import { LoadingSkeleton } from "@/components/ai/common/LoadingSkeleton";
import {
  fetchProjects,
  toggleFavoriteProject,
  renameProject,
  duplicateProject,
  deleteProject,
  getDownloadUrl,
  downloadWebsiteZipWithAuth,
  getPreviewUrl,
} from "@/lib/website-generator-api";

export default function DownloadsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  // Modal states
  const [previewJobId, setPreviewJobId] = useState<string | null>(null);
  const [renameTarget, setRenameTarget] = useState<{ id: string; name: string } | null>(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetchProjects({});
      setProjects(res.projects || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleFavoriteToggle = async (jobId: string) => {
    const success = await toggleFavoriteProject(jobId);
    if (success) {
      setProjects((prev) =>
        prev.map((p) => (p.job_id === jobId ? { ...p, favorite: !p.favorite } : p))
      );
    }
  };

  const handleRenameSubmit = async () => {
    if (!renameTarget || !newProjectName.trim()) return;
    setActionLoading(true);
    const success = await renameProject(renameTarget.id, newProjectName.trim());
    if (success) {
      setProjects((prev) =>
        prev.map((p) =>
          p.job_id === renameTarget.id ? { ...p, custom_name: newProjectName.trim() } : p
        )
      );
      setRenameTarget(null);
    }
    setActionLoading(false);
  };

  const handleDuplicate = async (jobId: string) => {
    setActionLoading(true);
    const success = await duplicateProject(jobId);
    if (success) {
      await loadProjects();
    }
    setActionLoading(false);
  };

  const handleDeleteSubmit = async () => {
    if (!deleteTargetId) return;
    setActionLoading(true);
    const success = await deleteProject(deleteTargetId);
    if (success) {
      setProjects((prev) => prev.filter((p) => p.job_id !== deleteTargetId));
      setDeleteTargetId(null);
    }
    setActionLoading(false);
  };

  const handleDownload = async (jobId: string, companyName: string) => {
    try {
      setActionLoading(true);
      await downloadWebsiteZipWithAuth(jobId, `${companyName}-Website.zip`);
    } catch (err) {
      console.error(err);
      alert("Failed to download website. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      (p.custom_name || p.company_name).toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.website_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.theme.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "favorites" ? p.favorite : true;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Download Center & Export Manager"
        subtitle="Access, manage, preview, and download your production-grade generated website bundles."
        badge="Production"
        icon={FolderArchive}
      />

      {/* Search & Tabs Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === "all"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Bundles ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === "favorites"
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Starred ({projects.filter((p) => p.favorite).length})
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search company, theme, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </div>
      </div>

      {/* Content Body */}
      {loading ? (
        <LoadingSkeleton />
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          title="No Website Exports Found"
          description={
            searchQuery
              ? "No generated websites match your current filter or search criteria."
              : "Build your first production static website using the Enterprise Website Generator Wizard."
          }
          actionText="Launch Website Generator"
          actionHref="/ai/website-generator"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.job_id}
              className="group relative bg-white border border-slate-200/90 hover:border-blue-500 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Top Bar: Star & Status */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      project.status === "COMPLETED"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : project.status === "FAILED"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200 animate-pulse"
                    }`}
                  >
                    {project.status === "COMPLETED" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : project.status === "FAILED" ? (
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                    )}
                    {project.status}
                  </span>

                  <button
                    onClick={() => handleFavoriteToggle(project.job_id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 transition-colors"
                    title="Favorite Project"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        project.favorite ? "fill-amber-400 text-amber-400" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Title & Metadata */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900 truncate">
                      {project.custom_name || project.company_name}
                    </h3>
                    <button
                      onClick={() => {
                        setRenameTarget({
                          id: project.job_id,
                          name: project.custom_name || project.company_name,
                        });
                        setNewProjectName(project.custom_name || project.company_name);
                      }}
                      className="text-slate-400 hover:text-blue-600 transition-colors"
                      title="Rename Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{project.website_type}</span>
                    <span>•</span>
                    <span className="text-blue-600 font-semibold">{project.theme} Theme</span>
                  </p>
                </div>

                {/* Features & Stats Badges */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-6 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Pages Generated:</span>
                    <span className="font-bold text-slate-900">
                      {project.pages_generated?.length || 5} pages
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Total Downloads:</span>
                    <span className="font-extrabold text-blue-600">{project.download_count || 0}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleDownload(project.job_id, project.company_name)}
                    disabled={project.status !== "COMPLETED"}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-extrabold rounded-xl shadow-md shadow-blue-500/20 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    ZIP Export
                  </button>
                </div>

                <div className="flex justify-between items-center pt-2 text-xs text-slate-500">
                  <button
                    onClick={() => handleDuplicate(project.job_id)}
                    className="flex items-center gap-1 hover:text-slate-900 transition-colors font-medium"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Duplicate
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(project.job_id)}
                    className="flex items-center gap-1 hover:text-rose-600 transition-colors font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Live Preview Modal */}
      {previewJobId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-extrabold text-slate-900">Live Website Preview</h3>
              </div>
              <button
                onClick={() => setPreviewJobId(null)}
                className="text-slate-600 hover:text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-200"
              >
                Close
              </button>
            </div>
            <iframe
              src={getPreviewUrl(previewJobId)}
              className="w-full flex-1 border-0 bg-white"
              title="Preview"
            />
          </div>
        </div>
      )}

      {/* Rename Modal */}
      {renameTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900">Rename Project</h3>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-600"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRenameTarget(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleRenameSubmit}
                disabled={actionLoading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-md"
              >
                {actionLoading ? "Saving..." : "Save Name"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900">Delete Project Bundle?</h3>
            <p className="text-sm text-slate-600">
              Are you sure you want to delete this project? This will soft-delete the project record from your active list.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSubmit}
                disabled={actionLoading}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold rounded-xl shadow-md"
              >
                {actionLoading ? "Deleting..." : "Delete Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
