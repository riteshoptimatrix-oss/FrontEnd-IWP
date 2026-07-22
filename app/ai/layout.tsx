import { Metadata } from "next";
import { AIWorkspaceLayout } from "@/components/ai/layout/AIWorkspaceLayout";

export const metadata: Metadata = {
  title: "AI Workspace | India Web Programmers",
  description: "Enterprise AI workspace and development suite for modern web engineering.",
};

export default function AIRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AIWorkspaceLayout>{children}</AIWorkspaceLayout>;
}
