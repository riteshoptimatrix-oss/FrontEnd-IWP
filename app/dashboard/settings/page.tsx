"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { m } from "framer-motion";
import { Save, Loader2, Sun, Moon, Monitor, Globe, Clock, Bell } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api-client";
import { settingsSchema, type SettingsInput } from "@/lib/validations";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

const timezones = [
  "UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Asia/Kolkata", "Asia/Tokyo",
  "Asia/Shanghai", "Australia/Sydney", "Pacific/Auckland",
];

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "hi", label: "Hindi" },
  { value: "ja", label: "Japanese" },
];

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(settingsSchema),
    values: user ? {
      theme_preference: (user.theme_preference as "light" | "dark" | "system") || "system",
      timezone: user.timezone || "UTC",
      language: user.language || "en",
      notification_settings: {
        email_notifications: user.notification_settings?.email_notifications ?? true,
        project_updates: user.notification_settings?.project_updates ?? true,
        ai_reports: user.notification_settings?.ai_reports ?? true,
        security_alerts: user.notification_settings?.security_alerts ?? true,
        marketing: user.notification_settings?.marketing ?? false,
      },
    } : undefined,
  });

  const onSubmit = async (data: SettingsInput) => {
    try {
      const { data: res } = await api.put("/users/settings", data);
      if (res.user) updateUser(res.user);
      toast.success("Settings saved", { description: "Your preferences have been updated." });
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
        "Failed to save settings.";
      toast.error("Save failed", { description: message });
    }
  };

  return (
    <div className="space-y-8">
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your experience</p>
      </m.div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Appearance */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Sun className="size-5" /> Appearance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Controller
                    control={control}
                    name="theme_preference"
                    render={({ field }) => (
                      <div>
                        <label className="mb-2 block text-sm font-medium">Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                          {themes.map((t) => (
                            <button
                              key={t.value}
                              type="button"
                              onClick={() => field.onChange(t.value)}
                              className={cn(
                                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                                field.value === t.value
                                  ? "border-gold bg-gold/5"
                                  : "border-border hover:border-border/80 hover:bg-secondary/50",
                              )}
                            >
                              <t.icon className="size-5" />
                              <span className="text-sm font-medium">{t.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  />
                </CardContent>
              </Card>
            </m.div>

            {/* Language & Timezone */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Globe className="size-5" /> Language & Region</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Language</label>
                      <select
                        {...register("language")}
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50"
                      >
                        {languages.map((l) => (
                          <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Timezone</label>
                      <select
                        {...register("timezone")}
                        className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50"
                      >
                        {timezones.map((tz) => (
                          <option key={tz} value={tz}>{tz}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </m.div>

            {/* Notifications */}
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bell className="size-5" /> Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {([
                    { key: "email_notifications" as const, label: "Email notifications", desc: "Receive email updates" },
                    { key: "project_updates" as const, label: "Project updates", desc: "Get notified about project changes" },
                    { key: "ai_reports" as const, label: "AI reports", desc: "Notifications when reports are ready" },
                    { key: "security_alerts" as const, label: "Security alerts", desc: "Important security notifications" },
                    { key: "marketing" as const, label: "Marketing", desc: "Product updates and offers" },
                  ]).map((item) => (
                    <Controller
                      key={item.key}
                      control={control}
                      name={`notification_settings.${item.key}`}
                      render={({ field }) => (
                        <div className="flex items-center justify-between rounded-xl border border-border/50 p-4">
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => field.onChange(!field.value)}
                            className={cn(
                              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                              field.value ? "bg-gold" : "bg-muted",
                            )}
                          >
                            <span className={cn(
                              "inline-block size-4 rounded-full bg-white transition-transform",
                              field.value ? "translate-x-6" : "translate-x-1",
                            )} />
                          </button>
                        </div>
                      )}
                    />
                  ))}
                </CardContent>
              </Card>
            </m.div>
          </div>

          {/* Sidebar info */}
          <div>
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Clock className="mx-auto size-8 text-gold/50" />
                    <h3 className="mt-3 font-semibold">Account Preferences</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Your settings are saved automatically. Changes to appearance apply immediately.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" variant="gold" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
