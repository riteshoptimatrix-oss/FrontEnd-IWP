"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { m, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function OptiMatrixLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, fetchMe } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      // If Zustand says we aren't authenticated, double check with the backend
      if (!isAuthenticated) {
        try {
          await fetchMe();
        } catch (error) {
          console.error("Auth verification failed", error);
        }
      }

      if (isMounted) {
        setIsChecking(false);
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, fetchMe]);

  React.useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      // User is definitively not logged in; redirect them to login page
      const redirectUrl = encodeURIComponent(pathname);
      router.replace(`/login?redirect=${redirectUrl}`);
    }
  }, [isChecking, isAuthenticated, router, pathname]);

  // Show a full-page loading state while verifying to prevent content flash
  if (isChecking || !isAuthenticated) {
    return (
      <div className="flex min-h-[90vh] items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100">
            <Loader2 className="size-8 animate-spin text-blue-600" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/5"></div>
          </div>
          <p className="text-sm font-medium text-slate-500 animate-pulse">
            Verifying secure access...
          </p>
        </div>
      </div>
    );
  }

  // Once authenticated, render the OptiMatrix children routes smoothly
  return (
    <AnimatePresence mode="wait">
      <m.div
        key="optimatrix-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
