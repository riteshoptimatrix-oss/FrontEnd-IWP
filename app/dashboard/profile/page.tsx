"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { m } from "framer-motion";
import { Camera, Save, Loader2, User, Building2, Phone, Globe, ExternalLink, Link2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api-client";
import { profileSchema, type ProfileInput } from "@/lib/validations";

export default function ProfilePage() {
  const { user, updateProfile } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    values: user ? {
      full_name: user.full_name || "",
      phone: user.phone || "",
      company: user.company || "",
      bio: user.bio || "",
      social_twitter: user.social_links?.twitter || "",
      social_linkedin: user.social_links?.linkedin || "",
      social_github: user.social_links?.github || "",
      social_website: user.social_links?.website || "",
    } : undefined,
  });

  const onSubmit = async (data: ProfileInput) => {
    try {
      await updateProfile({
        full_name: data.full_name,
        phone: data.phone || null,
        company: data.company || null,
        bio: data.bio || null,
        social_links: {
          twitter: data.social_twitter,
          linkedin: data.social_linkedin,
          github: data.social_github,
          website: data.social_website,
        },
      });
      toast.success("Profile updated", { description: "Your profile has been saved." });
    } catch (err: unknown) {
      const message =
        (err as Error).message ||
        "Failed to update profile.";
      toast.error("Update failed", { description: message });
    }
  };

  const initials = user?.full_name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  const profileCompleteness = React.useMemo(() => {
    if (!user) return 0;
    const fields = [user.full_name, user.email, user.phone, user.company, user.bio, user.avatar];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [user]);

  return (
    <div className="space-y-8">
      <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </m.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Avatar & completion */}
        <div className="space-y-6">
          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center p-6">
                <div className="relative group">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.full_name} className="size-24 rounded-2xl object-cover" />
                  ) : (
                    <span className="flex size-24 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold-soft text-2xl font-bold text-white">
                      {initials}
                    </span>
                  )}
                  <button type="button" className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera className="size-5 text-white" />
                  </button>
                </div>
                <h3 className="mt-4 font-semibold">{user?.full_name}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <div className="mt-4 w-full">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Profile completion</span>
                    <span>{profileCompleteness}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${profileCompleteness}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </m.div>
        </div>

        {/* Right: Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldWithIcon label="Full Name" icon={<User className="size-4" />} error={errors.full_name?.message}>
                  <input {...register("full_name")} className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground/40 focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50" />
                </FieldWithIcon>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FieldWithIcon label="Email" icon={<User className="size-4" />}>
                    <input value={user?.email || ""} disabled className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm opacity-60 dark:bg-ink/50" />
                  </FieldWithIcon>
                  <FieldWithIcon label="Phone" icon={<Phone className="size-4" />} error={errors.phone?.message}>
                    <input {...register("phone")} placeholder="+1 234 567 890" className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground/40 focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50" />
                  </FieldWithIcon>
                </div>
                <FieldWithIcon label="Company" icon={<Building2 className="size-4" />} error={errors.company?.message}>
                  <input {...register("company")} placeholder="Your company" className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground/40 focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50" />
                </FieldWithIcon>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Bio</label>
                  <textarea
                    {...register("bio")}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className={cn(
                      "w-full rounded-xl border bg-white px-4 py-3 text-sm placeholder:text-muted-foreground/40 focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50",
                      errors.bio ? "border-red-400" : "border-border",
                    )}
                  />
                  {errors.bio && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="size-3" /> {errors.bio.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </m.div>

          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldWithIcon label="Twitter" icon={<ExternalLink className="size-4" />} error={errors.social_twitter?.message}>
                  <input {...register("social_twitter")} placeholder="https://twitter.com/..." className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground/40 focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50" />
                </FieldWithIcon>
                <FieldWithIcon label="LinkedIn" icon={<Link2 className="size-4" />} error={errors.social_linkedin?.message}>
                  <input {...register("social_linkedin")} placeholder="https://linkedin.com/in/..." className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground/40 focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50" />
                </FieldWithIcon>
                <FieldWithIcon label="GitHub" icon={<ExternalLink className="size-4" />} error={errors.social_github?.message}>
                  <input {...register("social_github")} placeholder="https://github.com/..." className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground/40 focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50" />
                </FieldWithIcon>
                <FieldWithIcon label="Website" icon={<Globe className="size-4" />} error={errors.social_website?.message}>
                  <input {...register("social_website")} placeholder="https://..." className="w-full rounded-xl border border-border bg-white py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground/40 focus:border-gold focus:ring-2 focus:ring-gold/20 dark:bg-ink/50" />
                </FieldWithIcon>
              </CardContent>
            </Card>
          </m.div>

          <div className="flex justify-end">
            <Button type="submit" variant="gold" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FieldWithIcon({ label, icon, error, children }: {
  label: string; icon?: React.ReactNode; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40">{icon}</span>}
        {children}
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle className="size-3" /> {error}
        </p>
      )}
    </div>
  );
}
