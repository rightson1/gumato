"use client";
import React, { useEffect, useState } from "react";
import { Toaster as Sooner } from "sonner";
import { Toaster } from "@/components/ui/toaster";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "../provider/AuthProvider";
const Client = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("SW registered:", registration))
        .catch((error) => console.log("SW registration failed:", error));
    }
  }, []);
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Sooner />
        {children}

        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Client;
