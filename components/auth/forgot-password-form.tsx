"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { m, AnimatePresence } from "framer-motion";
import { Shield, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ForgotPasswordInput,
  type ResetPasswordInput,
} from "@/lib/validations";

export function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token");
  const [success, setSuccess] = React.useState("");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (resetToken) {
    return <ResetPasswordInner token={resetToken} onSuccess={setSuccess} />;
  }
  return <ForgotPasswordInner onSuccess={setSuccess} success={success} />;
}

/* ------------------------------------------------------------------ */
/*  Forgot Password                                                    */
/* ------------------------------------------------------------------ */

function ForgotPasswordInner({
  onSuccess,
  success,
}: {
  onSuccess: (msg: string) => void;
  success: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      const { data: res } = await api.post("/auth/forgot-password", data);
      onSuccess(res.message);
      toast.success("Email sent", { description: "Check your inbox for the reset link." });
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        "Something went wrong. Please try again.";
      toast.error("Failed to send email", { description: message });
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md"
    >
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gold/10">
          <Shield className="size-7 text-gold" />
        </div>
        <h1 className="text-2xl font-bold">Forgot Password?</h1>
        <p className="mt-2 text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      {success ? (
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 dark:border-green-900/50 dark:bg-green-950/30"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-700 dark:text-green-300">{success}</p>
        </m.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@company.com"
              className={cn(
                "w-full rounded-xl border bg-white px-4 py-3 text-sm placeholder:text-muted-foreground/40 focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50",
                errors.email ? "border-red-400" : "border-border",
              )}
            />
            {errors.email && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="size-3" /> {errors.email.message}
              </p>
            )}
          </div>

          <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : "Send Reset Link"}
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      </div>
    </m.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reset Password                                                     */
/* ------------------------------------------------------------------ */

function ResetPasswordInner({
  token,
  onSuccess,
}: {
  token: string;
  onSuccess: (msg: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      await api.post("/auth/reset-password", { token, password: data.password });
      onSuccess("Password reset successfully! Redirecting to login...");
      toast.success("Password reset", { description: "Redirecting to login..." });
      setTimeout(() => { window.location.href = "/login"; }, 2000);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        "Reset failed. The link may have expired.";
      toast.error("Reset failed", { description: message });
    }
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md"
    >
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gold/10">
          <Shield className="size-7 text-gold" />
        </div>
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <p className="mt-2 text-muted-foreground">Enter your new password below.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium">New Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Min. 8 characters"
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-sm placeholder:text-muted-foreground/40 focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50",
              errors.password ? "border-red-400" : "border-border",
            )}
          />
          {errors.password && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="size-3" /> {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Repeat password"
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-sm placeholder:text-muted-foreground/40 focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50",
              errors.confirmPassword ? "border-red-400" : "border-border",
            )}
          />
          {errors.confirmPassword && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle className="size-3" /> {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : "Reset Password"}
        </Button>
      </form>
    </m.div>
  );
}
