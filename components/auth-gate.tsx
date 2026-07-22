"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { Loader2 } from "lucide-react";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, fetchMe } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    fetchMe();
  }, [fetchMe]);

  React.useEffect(() => {
    if (isMounted && !isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router, isMounted]);

  // Don't render anything on the server to prevent hydration mismatches
  if (!isMounted) return null;

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <Loader2 className="size-8 animate-spin text-blue-600" />
          <p className="font-medium animate-pulse">Restoring secure session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
