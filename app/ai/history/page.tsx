"use client";

import React, { useState, useEffect } from "react";
import {
  History,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";
import { ProjectRecord } from "@/types/ai";
import { ModuleHeader } from "@/components/ai/common/ModuleHeader";
import { EmptyState } from "@/components/ai/common/EmptyState";
import { LoadingSkeleton } from "@/components/ai/common/LoadingSkeleton";
import { fetchProjects, fetchProjectDetails } from "@/lib/website-generator-api";

export default function HistoryPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Details Modal State
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState<any | null>(null);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const res = await fetchProjects({
        page,
        limit: 10,
        search: search || undefined,
        status: statusFilter || undefined,
      });

      setProjects(res.projects || []);
      setTotalPages(res.pages || 1);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    loadHistory();
  };

  const handleOpenDetails = async (jobId: string) => {
    setSelectedJobId(jobId);
    const data = await fetchProjectDetails(jobId);
    if (data) {
      setProjectDetails(data);
    }
  };

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Generation History & Audit Logs"
        subtitle="Explore the complete timeline, build logs, and past generations of your AI Website Generator."
        badge="Audit Logs"
        icon={History}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm backdrop-blur-md">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search history by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors"
          />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
          >
            <option value="">All Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
            <option value="PROCESSING">Processing</option>
          </select>
        </div>
      </div>

      {/* History Table */}
      {loading ? (
        <LoadingSkeleton />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No Generation History Recorded"
          description="You haven't generated any websites yet. Start with our 5-step wizard to see generation logs here."
          actionText="Create Website"
          actionHref="/ai/website-generator"
        />
      ) : (
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-bold">Company Name</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Theme</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Created Date</th>
                  <th className="px-6 py-4 font-bold">Downloads</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <tr key={project.job_id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {project.custom_name || project.company_name}
                    </td>
                    <td className="px-6 py-4">{project.website_type}</td>
                    <td className="px-6 py-4">
                      <span className="text-blue-600 font-semibold">{project.theme}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          project.status === "COMPLETED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : project.status === "FAILED"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {project.status === "COMPLETED" ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-blue-600" />
                        )}
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                      {new Date(project.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-xs font-extrabold text-blue-600">
                      {project.download_count || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenDetails(project.job_id)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 rounded-xl transition-colors inline-flex items-center gap-1 border border-slate-200/80"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        View Logs
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Build Details & Timeline Logs Modal */}
      {selectedJobId && projectDetails && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl p-6 space-y-6 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {projectDetails.custom_name || projectDetails.company_name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Job ID: <code className="text-blue-600 font-mono">{projectDetails.job_id}</code>
                </p>
              </div>
              <button
                onClick={() => setSelectedJobId(null)}
                className="text-slate-600 hover:text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100"
              >
                Close
              </button>
            </div>

            {/* Build Log Timeline */}
            <div className="space-y-4 overflow-y-auto pr-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Build Execution Logs Timeline
              </h4>

              <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                {projectDetails.build_logs?.map((log: any, idx: number) => (
                  <div key={idx} className="relative space-y-1">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 shadow-md shadow-blue-500/50" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{log.stage}</span>
                      <span className="text-slate-400 font-medium">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{log.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
