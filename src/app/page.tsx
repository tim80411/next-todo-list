"use client";

import HomeSection from "@/containers/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-10">
      <QueryClientProvider client={queryClient}>
        <HomeSection />
      </QueryClientProvider>
    </main>
  );
}
