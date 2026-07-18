"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={4000}
      toastOptions={{
        className: "rounded-xl border border-border/50 text-sm font-medium",
        style: {
          background: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
          border: "1px solid hsl(var(--border) / 0.5)",
          borderRadius: "16px",
          padding: "12px 16px",
          backdropFilter: "blur(12px)",
        },
      }}
    />
  );
}
