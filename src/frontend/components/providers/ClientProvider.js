"use client";

import { AuthProvider } from "./AuthProvider";
import { Toaster } from "sonner";

export default function ClientProvider({ children }) {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors />
      {children}
    </AuthProvider>
  );
}
