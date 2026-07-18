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
      <div className="dark">
        <div className="flex min-h-[60vh] items-center justify-center bg-[#0a0a0f]">
          <div className="flex flex-col items-center gap-4">
            <div className="size-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            <p className="text-sm text-zinc-500">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user && checked) {
    return (
      <div className="dark">
        <div className="min-h-screen bg-[#0a0a0f] bg-[radial-gradient(ellipse_at_top,_rgba(200,170,80,0.03)_0%,_transparent_60%)]">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-md py-20 px-4"
          >
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gold/10 border border-gold/20">
                <Lock className="size-8 text-gold" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-zinc-100">Sign in Required</h2>
              <p className="mt-3 text-sm text-zinc-500">
                You need to be signed in to start typing challenges, track your progress, and save scores.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/login?redirect=/optimatrix/code-sprint/play"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-gold/20 transition-all hover:bg-gold/90 hover:shadow-gold/30"
                >
                  <LogIn className="size-4" />
                  Sign In
                </Link>
                <Link
                  href="/register?redirect=/optimatrix/code-sprint/play"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all hover:border-zinc-700 hover:text-zinc-200"
                >
                  <UserPlus className="size-4" />
                  Create Account
                </Link>
              </div>
              <p className="mt-6 text-xs text-zinc-700">
                Your progress and scores will be saved securely.
              </p>
            </div>
          </m.div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
