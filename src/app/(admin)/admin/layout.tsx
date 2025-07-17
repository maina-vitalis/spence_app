import {
  AdminSidebar,
  MobileAdminSidebar,
} from "@/components/admin/AdminSidebar";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="h-screen flex bg-background">
        {/* Desktop Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <MobileAdminSidebar />
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </SessionProvider>
  );
}
