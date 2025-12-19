'use client';

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 60 seconds (matches ISR revalidation)
        staleTime: 60 * 1000, // 60 seconds

        // Cache data for 5 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes

        // Retry failed requests 1 time
        retry: 1,

        // Don't refetch on window focus (data is already fresh via ISR)
        refetchOnWindowFocus: false,

        // Refetch on mount if data is stale
        refetchOnMount: true,

        // Don't refetch on reconnect (rely on ISR freshness)
        refetchOnReconnect: false,
      },
      mutations: {
        // Retry mutations once on failure
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

