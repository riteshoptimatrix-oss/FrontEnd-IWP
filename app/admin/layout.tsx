"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

const ADMIN_ROLES = ["super_admin", "admin", "moderator", "content_manager", "support"];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, fetchMe } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    } else if (!isLoading && isAuthenticated && user && !ADMIN_ROLES.includes(user.role)) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-gold/3">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || !ADMIN_ROLES.includes(user.role)) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-gold/3">
      <AdminSidebar />
      <div className="flex flex-1 flex-col pl-0 lg:pl-64">
        <AdminHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
