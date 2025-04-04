"use client";

import type React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside className="hidden md:block w-64 border-r">
          <Sidebar />
        </aside>
        <main className="flex-1 pb-10">
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
