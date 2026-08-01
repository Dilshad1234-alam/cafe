import { requireAdminUser } from "@/backend/middleware/auth";
import AdminSidebar from "@/frontend/components/admin/layout/AdminSidebar";
import AdminHeader from "@/frontend/components/admin/layout/AdminHeader";
import { siteConfig } from "@/frontend/data/siteConfig";

export const metadata = {
  title: `Admin Portal | ${siteConfig.name}`,
};

export default async function AdminLayout({ children }) {
  // Protect all nested admin routes
  // Unauthenticated users are redirected to login, non-admins are redirected to home
  await requireAdminUser();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
