"use client";

import React from "react";

export function WorkspaceContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 w-full relative">{children}</div>;
}
