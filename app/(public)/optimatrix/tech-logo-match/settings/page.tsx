"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Bell, Eye, Zap, Sun, Moon,
  Monitor, Volume2, Timer, Sparkles,
} from "lucide-react";
import { m } from "framer-motion";

import { useAuthStore } from "@/lib/auth-store";
import { techLogoMatchApi, type Settings } from "@/lib/tech-logo-match-api";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Button } from "@/components/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-border/40", className)} />;
}

function Toggle({ enabled, onChange, label }: { enabled: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="flex items-center justify-between rounded-xl border border-border/40 bg-card/30 px-4 py-3 transition-colors hover:bg-accent/30"
    >
      <span className="text-sm font-medium">{label}</span>
      <div className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        enabled ? "bg-gold" : "bg-border/40",
      )}>
        <div className={cn(
          "absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform",
          enabled && "translate-x-5",
        )} />
      </div>
    </button>
  );
}

export default function TechLogoMatchSettingsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true); setError(null);
    try {
      const res = await techLogoMatchApi.getSettings();
      setSettings(res);
    } catch {
      setError("Failed to load settings.");
    } finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const updateSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    if (!settings) return;
    setSettings((prev) => prev ? { ...prev, [key]: value } : prev);
    setSaved(false);
  }, [settings]);

  const saveSettings = useCallback(async () => {
    if (!settings) return;
    setSaving(true); setSaved(false);
    try {
      const res = await techLogoMatchApi.saveSettings(settings);
      setSettings(res);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save settings.");
    } finally { setSaving(false); }
  }, [settings]);

  if (!user) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
          <Bell className="size-16 text-muted-foreground/30" />
          <h1 className="text-3xl font-bold tracking-tight">Sign in Required</h1>
          <p className="max-w-md text-muted-foreground">Sign in to customize your Tech Logo Match settings.</p>
          <Button href="/login" variant="gold" size="lg">Sign In</Button>
          <Button onClick={() => router.push("/optimatrix/tech-logo-match")} variant="outline" size="sm">
            <ArrowLeft className="size-4" /> Back
          </Button>
        </Container>
      </Section>
    );
  }

  if (loading) {
    return (
      <Section>
        <Container className="py-10">
          <Skeleton className="mb-8 h-8 w-48" />
          <div className="space-y-3">{[1,2,3,4,5].map((i) => <Skeleton key={i} className="h-14" />)}</div>
        </Container>
      </Section>
    );
  }

  if (!settings) {
    return (
      <Section>
        <Container className="flex flex-col items-center gap-4 py-20 text-center">
          <p className="text-red-500">{error || "No data"}</p>
          <Button onClick={fetchSettings} variant="outline" size="sm">Retry</Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-gradient-to-b from-violet-500/[0.02] via-background to-background">
      <Container className="py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Settings</span>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Game Settings</h1>
          </div>
          <div className="flex gap-2">
            {saved && <span className="flex items-center text-xs text-emerald-500">Saved!</span>}
            <Button onClick={saveSettings} variant="gold" size="sm" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button href="/optimatrix/tech-logo-match" variant="outline" size="sm">
              <ArrowLeft className="size-4" /> Back
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Volume2 className="size-4 text-gold" /> Audio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-5 pt-0">
              <Toggle enabled={settings.sound_enabled} onChange={(v) => updateSetting("sound_enabled", v)} label="Sound Effects" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Eye className="size-4 text-gold" /> Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-5 pt-0">
              <Toggle enabled={settings.animations_enabled} onChange={(v) => updateSetting("animations_enabled", v)} label="Animations" />
              <Toggle enabled={settings.timer_visible} onChange={(v) => updateSetting("timer_visible", v)} label="Timer Visibility" />
              <Toggle enabled={settings.high_contrast} onChange={(v) => updateSetting("high_contrast", v)} label="High Contrast Mode" />
              <Toggle enabled={settings.reduced_motion} onChange={(v) => updateSetting("reduced_motion", v)} label="Reduced Motion" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Sparkles className="size-4 text-gold" /> Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-5 pt-0">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Preferred Difficulty</label>
                <select
                  value={settings.preferred_difficulty || ""}
                  onChange={(e) => updateSetting("preferred_difficulty", e.target.value || null)}
                  className="rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-sm"
                >
                  <option value="">None</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Preferred Category</label>
                <select
                  value={settings.preferred_category || ""}
                  onChange={(e) => updateSetting("preferred_category", e.target.value || null)}
                  className="rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-sm"
                >
                  <option value="">None</option>
                  <option value="all">All Technologies</option>
                  <option value="framework">Frameworks</option>
                  <option value="language">Languages</option>
                  <option value="styling">Styling</option>
                  <option value="tool">Build & Dev Tools</option>
                  <option value="platform">Platforms & Services</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Preferred Game Mode</label>
                <select
                  value={settings.preferred_mode || ""}
                  onChange={(e) => updateSetting("preferred_mode", e.target.value || null)}
                  className="rounded-lg border border-border/40 bg-background/60 px-3 py-2 text-sm"
                >
                  <option value="">None</option>
                  <option value="logo-to-name">Logo → Name</option>
                  <option value="name-to-logo">Name → Logo</option>
                  <option value="logo-to-category">Logo → Category</option>
                  <option value="mixed">Mixed Challenge</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
