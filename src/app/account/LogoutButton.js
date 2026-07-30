"use client";
import { LogOut } from "lucide-react";
import { useAuth } from "@/frontend/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 p-4 hover:bg-red-50 transition-colors text-red-600 font-medium w-full text-left"
    >
      <LogOut className="w-5 h-5" /> Logout
    </button>
  );
}
