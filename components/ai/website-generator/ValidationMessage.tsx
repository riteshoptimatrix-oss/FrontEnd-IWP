"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface ValidationMessageProps {
  message?: string;
}

export function ValidationMessage({ message }: ValidationMessageProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
