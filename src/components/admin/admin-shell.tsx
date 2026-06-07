"use client";

import { useState } from "react";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

interface AdminShellProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AdminShell({ children, title, description }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col">
        <AdminHeader
          title={title}
          description={description}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 bg-hero-gradient p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
