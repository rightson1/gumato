"use client";
import React, { useState } from "react";
import { Toaster as Sooner } from "sonner";
import { Toaster } from "@/components/ui/toaster";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "../provider/AuthProvider";
const Client = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
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
