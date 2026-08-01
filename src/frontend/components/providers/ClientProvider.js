"use client";

import { AuthProvider } from "./AuthProvider";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useSettingsStore } from "@/frontend/store/settingsStore";

export default function ClientProvider({ children }) {
  const fetchSettings = useSettingsStore((state) => state.fetchSettings);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      {children}
    </AuthProvider>
  );
}
