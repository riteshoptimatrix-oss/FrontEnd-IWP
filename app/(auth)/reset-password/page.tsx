"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-gold/5 px-4 py-12">
      <div className="w-full max-w-lg">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border/50 bg-white/80 p-8 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-10 dark:bg-ink/80 dark:shadow-[0_24px_80px_-12px_rgba(0,0,0,0.3)]"
        >
          <div className="mb-4 text-center">
            <Link href="/" className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-soft text-white text-sm font-bold shadow-sm">
                {siteConfig.shortName}
              </span>
              <span>{siteConfig.name}</span>
            </Link>
          </div>
          <ForgotPasswordForm />
        </m.div>
      </div>
    </div>
  );
}
