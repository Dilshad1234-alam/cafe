import { requireAdminUser } from "@/backend/middleware/auth";
import Link from "next/link";
import { LayoutDashboard, Users, Pizza, ShoppingBag, Settings } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | The Tasty Zone Cafe",
};

export default async function AdminLayout({ children }) {
  // Protect all nested admin routes
  await requireAdminUser();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold text-orange-500 tracking-tight">Admin Portal</h2>
        </div>
        <nav className="mt-4 flex flex-col gap-1 px-4">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <LayoutDashboard className="w-5 h-5 text-gray-400" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <Pizza className="w-5 h-5 text-gray-400" /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <ShoppingBag className="w-5 h-5 text-gray-400" /> Orders
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <Users className="w-5 h-5 text-gray-400" /> Customers
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
            <Settings className="w-5 h-5 text-gray-400" /> Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
