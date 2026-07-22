"use client";

import * as React from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { Lock, LogIn, UserPlus } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { user, fetchMe } = useAuthStore();
  const [loading, setLoading] = React.useState(true);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        setLoading(false);
        setChecked(true);
        return;
      }
      try {
        await fetchMe();
      } catch {
        // Not logged in
      } finally {
        setLoading(false);
        setChecked(true);
      }
    };
    checkAuth();
  }, [user, fetchMe]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="size-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <p className="text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && checked) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-white">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-md py-20 px-4"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-slate-200/50">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200">
              <Lock className="size-8 text-blue-600" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900">Sign in Required</h2>
            <p className="mt-3 text-sm text-slate-500">
              You need to be signed in to start typing challenges, track your progress, and save scores.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/login?redirect=/optimatrix/code-sprint/play"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
              >
                <LogIn className="size-4" />
                Sign In
              </Link>
              <Link
                href="/register?redirect=/optimatrix/code-sprint/play"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-all hover:border-slate-300 hover:text-slate-800"
              >
                <UserPlus className="size-4" />
                Create Account
              </Link>
            </div>
            <p className="mt-6 text-xs text-slate-400">
              Your progress and scores will be saved securely.
            </p>
          </div>
        </m.div>
      </div>
    );
  }

  return <>{children}</>;
}
