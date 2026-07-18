"use client";

import dynamic from "next/dynamic";

export const FloatingButtons = dynamic(
  () => import("@/components/contact-floating-buttons").then((m) => m.FloatingButtons),
  { ssr: false },
);
