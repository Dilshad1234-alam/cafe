import { requireAuthenticatedUser } from "@/backend/middleware/auth";
import Link from "next/link";
import { User, LogOut, MapPin, PackageSearch } from "lucide-react";
import LogoutButton from "./LogoutButton";

export const metadata = {
  title: "My Account | The Tasty Zone Cafe",
};

export default async function AccountPage() {
  const user = await requireAuthenticatedUser();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar / Quick Links */}
        <div className="col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4">
              <User className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.fullname}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase">
              {user.role}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <Link href="/account/orders" className="flex items-center gap-3 p-4 hover:bg-orange-50 transition-colors text-gray-700 hover:text-orange-600 font-medium border-b border-gray-50">
              <PackageSearch className="w-5 h-5" /> My Orders
            </Link>
            <Link href="/account/addresses" className="flex items-center gap-3 p-4 hover:bg-orange-50 transition-colors text-gray-700 hover:text-orange-600 font-medium border-b border-gray-50">
              <MapPin className="w-5 h-5" /> Saved Addresses
            </Link>
            <LogoutButton />
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Details</h3>
            
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-base text-gray-900">{user.fullname}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                <dd className="mt-1 text-base text-gray-900">{user.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 text-base text-gray-900">{user.phone || "Not provided"}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Account Status</dt>
                <dd className="mt-1 text-base text-gray-900">{user.isActive ? "Active" : "Inactive"}</dd>
              </div>
              <div className="sm:col-span-2 border-t border-gray-100 pt-6">
                <dt className="text-sm font-medium text-gray-500">Last Login</dt>
                <dd className="mt-1 text-sm text-gray-600">
                  {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "Never"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
