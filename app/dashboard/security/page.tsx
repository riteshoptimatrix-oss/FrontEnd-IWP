"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { m } from "framer-motion";
import {
  Shield, Lock, Key, Smartphone, AlertTriangle, CheckCircle2,
  Loader2, Monitor, AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api-client";
import { changePasswordSchema, type ChangePasswordInput } from "@/lib/validations";

export default function SecurityPage() {
  const [showChangePassword, setShowChangePassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { current_password: "", new_password: "", confirm_password: "" },
  });

  const onSubmit = async (data: ChangePasswordInput) => {
    try {
      await api.post("/users/change-password", {
        current_password: data.current_password,
        new_password: data.new_password,
      });
      toast.success("Password changed", { description: "Your password has been updated successfully." });
      reset();
      setShowChangePassword(false);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        "Failed to change password. Check your current password.";
      toast.error("Password change failed", { description: message });
    }
  };

  return (
    <div className="space-y-8">
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold">Security</h1>
        <p className="text-muted-foreground">Manage your account security settings</p>
      </m.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Change Password */}
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Key className="size-5" /> Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              {!showChangePassword ? (
                <div>
                  <p className="text-sm text-muted-foreground mb-4">Update your password regularly to keep your account secure.</p>
                  <Button variant="outline" onClick={() => setShowChangePassword(true)}>
                    <Lock className="size-4" /> Change Password
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Current Password</label>
                    <input
                      type="password"
                      {...register("current_password")}
                      className={cn(
                        "w-full rounded-xl border bg-white px-4 py-3 text-sm focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50",
                        errors.current_password ? "border-red-400" : "border-border",
                      )}
                    />
                    {errors.current_password && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="size-3" /> {errors.current_password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">New Password</label>
                    <input
                      type="password"
                      {...register("new_password")}
                      className={cn(
                        "w-full rounded-xl border bg-white px-4 py-3 text-sm focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50",
                        errors.new_password ? "border-red-400" : "border-border",
                      )}
                    />
                    {errors.new_password && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="size-3" /> {errors.new_password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Confirm New Password</label>
                    <input
                      type="password"
                      {...register("confirm_password")}
                      className={cn(
                        "w-full rounded-xl border bg-white px-4 py-3 text-sm focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50",
                        errors.confirm_password ? "border-red-400" : "border-border",
                      )}
                    />
                    {errors.confirm_password && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="size-3" /> {errors.confirm_password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" variant="gold" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
                      Update Password
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => { setShowChangePassword(false); reset(); }}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </m.div>

        {/* Two-Factor Authentication */}
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Smartphone className="size-5" /> Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/30">
                  <Shield className="size-7 text-amber-500" />
                </div>
                <h3 className="mt-4 font-semibold">2FA is not enabled</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline" className="mt-4" disabled>
                  <Smartphone className="size-4" /> Enable 2FA (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        </m.div>
      </div>

      {/* Active Sessions - Empty */}
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Monitor className="size-5" /> Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-8 text-center">
              <Monitor className="size-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm text-muted-foreground">No session data available</p>
              <p className="text-xs text-muted-foreground/60">Session information will appear here once the feature is connected to the backend</p>
            </div>
          </CardContent>
        </Card>
      </m.div>
    </div>
  );
}
