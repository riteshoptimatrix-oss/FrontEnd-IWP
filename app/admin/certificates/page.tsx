"use client";

import * as React from "react";
import {
  Award, Plus, Ban, Search, Loader2, X, CheckCircle,
  XCircle, FileText,
} from "lucide-react";
import { adminApi } from "@/lib/admin/api";
import type { Certificate, CertificateTemplate } from "@/lib/admin/types";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { cn } from "@/lib/utils";

export default function AdminCertificatesPage() {
  const [certs, setCerts] = React.useState<Certificate[]>([]);
  const [templates, setTemplates] = React.useState<CertificateTemplate[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [showIssue, setShowIssue] = React.useState(false);
  const [showTemplates, setShowTemplates] = React.useState(false);
  const [verifyCode, setVerifyCode] = React.useState("");
  const [verifyResult, setVerifyResult] = React.useState<Certificate | null>(null);
  const [actionLoading, setActionLoading] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({ user_id: "", template_name: "CodeSprint Proficiency", title: "", description: "" });

  React.useEffect(() => { loadCerts(); loadTemplates(); }, [page]);

  const loadCerts = async () => {
    try {
      setLoading(true);
      const { data: res } = await adminApi.getCertificates({ page, limit: 20 });
      setCerts(res.data.certificates);
      setTotalPages(res.data.total_pages);
      setTotal(res.data.total);
    } catch {} finally { setLoading(false); }
  };

  const loadTemplates = async () => {
    try { const { data: res } = await adminApi.getCertificateTemplates(); setTemplates(res.data); } catch {}
  };

  const handleIssue = async () => {
    try { await adminApi.createCertificate(form); setShowIssue(false); setForm({ user_id: "", template_name: "CodeSprint Proficiency", title: "", description: "" }); loadCerts(); } catch {}
  };

  const handleRevoke = async (id: string) => {
    const reason = prompt("Reason for revocation:");
    if (!reason) return;
    try { setActionLoading(id); await adminApi.revokeCertificate(id, reason); loadCerts(); } catch {} finally { setActionLoading(null); }
  };

  const handleVerify = async () => {
    if (!verifyCode) return;
    try { const { data: res } = await adminApi.verifyCertificate(verifyCode); setVerifyResult(res.data); } catch { setVerifyResult(null); }
  };

  const columns = [
    {
      key: "title", header: "Certificate",
      render: (item: Certificate) => (
        <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.user_name} &middot; {item.user_email}</p>
        </div>
      ),
    },
    {
      key: "template_name", header: "Template",
      render: (item: Certificate) => <span className="text-xs text-muted-foreground">{item.template_name}</span>,
    },
    {
      key: "verification_code", header: "Code",
      render: (item: Certificate) => <span className="font-mono text-xs text-muted-foreground">{item.verification_code?.substring(0, 16)}...</span>,
    },
    {
      key: "revoked", header: "Status",
      render: (item: Certificate) => (
        <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", item.revoked ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400")}>
          {item.revoked ? <><XCircle className="size-3" /> Revoked</> : <><CheckCircle className="size-3" /> Active</>}
        </span>
      ),
    },
    {
      key: "created_at", header: "Issued",
      render: (item: Certificate) => <span className="text-xs text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</span>,
    },
    {
      key: "actions", header: "Actions",
      render: (item: Certificate) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {!item.revoked && (
            <button onClick={() => handleRevoke(item._id)} disabled={actionLoading === item._id} className="flex size-7 items-center justify-center rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" title="Revoke">
              <Ban className="size-3.5" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Certificate Management" description={`Manage ${total} certificates`} icon={<Award className="size-5" />}>
        <button onClick={() => setShowIssue(true)} className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-sm font-medium text-white hover:bg-gold/90">
          <Plus className="size-4" /> Issue Certificate
        </button>
        <button onClick={() => setShowTemplates(!showTemplates)} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary">
          <FileText className="size-4" /> Templates
        </button>
      </AdminPageHeader>

      {/* Verify Section */}
      <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-white/80 p-4 backdrop-blur-xl dark:bg-ink/80">
        <Search className="size-4 text-muted-foreground" />
        <input value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} placeholder="Verify certificate by code..." className="flex-1 bg-transparent text-sm outline-none" />
        <button onClick={handleVerify} className="rounded-xl bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold hover:bg-gold/20">Verify</button>
      </div>
      {verifyResult && (
        <div className={cn("rounded-2xl border p-4 text-sm", verifyResult.revoked ? "border-red-200 bg-red-50 dark:bg-red-950/20" : "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20")}>
          <p className="font-medium">{verifyResult.title}</p>
          <p className="text-xs text-muted-foreground">Issued to {verifyResult.user_name} on {new Date(verifyResult.issued_at).toLocaleDateString()}</p>
          {verifyResult.revoked && <p className="mt-1 text-xs text-red-600">Revoked: {verifyResult.revoked_reason}</p>}
        </div>
      )}

      <AdminDataTable columns={columns} data={certs} loading={loading} page={page} totalPages={totalPages} total={total} onPageChange={setPage} emptyMessage="No certificates found" />

      {showIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl border border-border/50 bg-white p-6 shadow-xl dark:bg-ink">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Issue Certificate</h3>
              <button onClick={() => setShowIssue(false)} className="flex size-8 items-center justify-center rounded-lg hover:bg-secondary"><X className="size-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium">User ID</label>
                <input value={form.user_id} onChange={(e) => setForm({ ...form, user_id: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" placeholder="User ID" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" placeholder="Certificate title" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Template</label>
                <input value={form.template_name} onChange={(e) => setForm({ ...form, template_name: e.target.value })} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full rounded-xl border border-border/50 bg-white/80 px-3 py-2 text-sm dark:bg-ink/80" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowIssue(false)} className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
                <button onClick={handleIssue} disabled={!form.user_id || !form.title} className="rounded-xl bg-gold px-4 py-2 text-sm font-medium text-white hover:bg-gold/90 disabled:opacity-50">Issue</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
