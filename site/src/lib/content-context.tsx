"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteData } from "./types";

const ContentContext = createContext<SiteData | null>(null);

export function ContentProvider({
  data,
  children,
}: {
  data: SiteData;
  children: ReactNode;
}) {
  return (
    <ContentContext.Provider value={data}>{children}</ContentContext.Provider>
  );
}

export function useContent(): SiteData {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return ctx;
}
