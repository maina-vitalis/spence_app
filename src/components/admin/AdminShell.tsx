"use client";

import {
  AdminSidebar,
  MobileAdminSidebar,
} from "@/components/admin/AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex bg-background">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="md:hidden flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <MobileAdminSidebar />
        </div>

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
