"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  Download,
  Clock,
  XCircle,
  Palette,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
  FolderArchive,
  PlusCircle,
  Eye,
} from "lucide-react";
import { DashboardStats, ProjectRecord } from "@/types/ai";
import { ModuleHeader } from "@/components/ai/common/ModuleHeader";
import { LoadingSkeleton } from "@/components/ai/common/LoadingSkeleton";
import { fetchDashboardStats, fetchProjects } from "@/lib/website-generator-api";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentProjects, setRecentProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [statsData, projectsData] = await Promise.all([
          fetchDashboardStats(),
          fetchProjects({ limit: 5 }),
        ]);

        if (isMounted) {
          setStats(statsData);
          setRecentProjects(projectsData.projects || []);
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <ModuleHeader
        title="AI Workspace Dashboard"
        subtitle="Monitor real-time website generation metrics, active builds, theme usage, and recent projects."
        badge="Live Analytics"
        icon={TrendingUp}
      />

      {/* Quick Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/20">
            <Sparkles className="w-3.5 h-3.5" /> Production AI Website Generator
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Build Production-Ready Websites in Seconds
          </h2>
          <p className="text-sm text-blue-50 leading-relaxed">
            Launch our 5-step wizard to generate full-stack static websites complete with responsive templates, theme presets, AI copy, SEO metadata, and downloadable ZIP archives.
          </p>
        </div>
        <Link
          href="/ai/website-generator"
          className="flex items-center gap-2 px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 text-sm font-extrabold rounded-xl shadow-md transition-all whitespace-nowrap"
        >
          <PlusCircle className="w-5 h-5 text-blue-600" /> Launch Generator
        </Link>
      </div>

      {/* Metric Cards Grid */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Websites Generated</span>
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{stats?.total_websites_generated || 0}</p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total ZIP Downloads</span>
              <Download className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{stats?.total_downloads || 0}</p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Active Builds</span>
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-extrabold text-amber-600">{stats?.active_builds || 0}</p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Failed Builds</span>
              <XCircle className="w-5 h-5 text-rose-500" />
            </div>
            <p className="text-3xl font-extrabold text-rose-600">{stats?.failed_builds || 0}</p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Most Used Theme</span>
              <Palette className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-700">{stats?.most_used_theme || "White"}</p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Top Website Category</span>
              <Layers className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-extrabold text-purple-700">{stats?.most_used_website_type || "Business"}</p>
          </div>
        </div>
      )}

      {/* Recent Projects Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <FolderArchive className="w-5 h-5 text-blue-600" /> Recent Projects
          </h3>
          <Link href="/ai/downloads" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            View Download Center <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm">
          {recentProjects.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm font-medium">
              No recent projects generated yet. Click "Launch Generator" to build your first website!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentProjects.map((p) => (
                <div key={p.job_id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{p.custom_name || p.company_name}</h4>
                    <p className="text-xs text-slate-500">
                      {p.website_type} • <span className="text-blue-600 font-semibold">{p.theme} Theme</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href="/ai/downloads"
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 rounded-xl flex items-center gap-1.5 transition-colors border border-slate-200/80"
                    >
                      <Eye className="w-3.5 h-3.5 text-blue-600" /> View & Download
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
