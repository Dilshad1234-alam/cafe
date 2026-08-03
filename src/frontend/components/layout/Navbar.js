"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/frontend/data/siteConfig";
import { useAuth } from "@/frontend/hooks/useAuth";
import { useCartStore } from "@/frontend/store/cartStore";
import { useSettingsStore } from "@/frontend/store/settingsStore";
import { 
  Menu, X, ShoppingCart, User, LogOut, Loader2, 
  ChevronDown, LayoutDashboard, ShoppingBag, Utensils
} from "lucide-react";
import { toast } from "sonner";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  // Hydration safe cart count
  const cartItemsCount = useCartStore((state) => state.getTotalItems());
  const { settings } = useSettingsStore();

  const businessName = settings?.business?.name || siteConfig.name;
  const whatsappUrl = settings?.social?.whatsappNumber ? `https://wa.me/${settings.social.whatsappNumber}` : siteConfig.links.whatsapp;
  const phoneUrl = settings?.business?.phone ? `tel:${settings.business.phone.replace(/[^0-9+]/g, '')}` : siteConfig.links.phone;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show navbar on auth pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
      setIsProfileDropdownOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path) => pathname === path;

  return (
    <>
      {settings?.appearance?.announcementEnabled && settings?.appearance?.announcementText && (
        <div className="bg-brand-yellow text-brand-charcoal text-center py-2 px-4 text-sm font-bold">
          {settings.appearance.announcementText}
        </div>
      )}
      <header 
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3" 
            : "bg-white py-4"
        }`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group" onClick={closeMenu}>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex items-center justify-center bg-white group-hover:scale-105 transition-transform">
              {/* Replace /logo.png with the actual path to your logo if different */}
              <img src="/ChatGPT%20Image%20Aug%203,%202026,%2012_19_52%20PM.png" alt="The Tasty Zone Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-serif font-bold text-2xl text-brand-charcoal tracking-tight hidden sm:block">
              {businessName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-brand-yellow ${
                  isActive(item.href) ? "text-brand-yellow" : "text-gray-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Cart Button */}
            <Link 
              href="/cart" 
              className="relative p-2 text-gray-600 hover:text-brand-yellow transition-colors"
              aria-label="View cart"
              onClick={(e) => {
                if (!isAuthenticated) {
                  e.preventDefault();
                  toast.info("Please login to view your cart.");
                  router.push("/login");
                }
                closeMenu();
              }}
            >
              <ShoppingCart className="w-6 h-6" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-red rounded-full transform translate-x-1 -translate-y-1">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Auth State Desktop */}
            <div className="hidden md:block">
              {!mounted || authLoading ? (
                <div className="w-24 h-10 bg-gray-100 animate-pulse rounded-lg"></div>
              ) : isAuthenticated && user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    aria-expanded={isProfileDropdownOpen}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-charcoal text-white flex items-center justify-center font-bold text-sm">
                      {user.fullname?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                      {user.fullname}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-50 mb-2">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.fullname}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      
                      {user.role === "admin" && (
                        <Link 
                          href="/admin" 
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-yellow"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      
                      <Link 
                        href="/account" 
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-yellow"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        My Account
                      </Link>
                      
                      <Link 
                        href="/orders" 
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-yellow"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        My Orders
                      </Link>
                      
                      <div className="border-t border-gray-50 mt-2 pt-2">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link 
                    href="/login"
                    className="text-sm font-medium text-gray-600 hover:text-brand-charcoal transition-colors"
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/register"
                    className="text-sm font-medium bg-brand-charcoal text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-brand-yellow"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div 
        className={`md:hidden fixed inset-x-0 top-[72px] bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible"
        } overflow-hidden`}
      >
        <div className="px-4 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-72px)]">
          {/* Mobile Links */}
          <nav className="flex flex-col space-y-4">
            {siteConfig.nav.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={closeMenu}
                className={`text-lg font-medium px-2 py-1 transition-colors ${
                  isActive(item.href) ? "text-brand-yellow border-l-2 border-brand-yellow" : "text-gray-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-100 pt-6">
            {!mounted || authLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-brand-yellow" />
              </div>
            ) : isAuthenticated && user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center font-bold">
                    {user.fullname?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.fullname}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                
                {user.role === "admin" && (
                  <Link 
                    href="/admin" 
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-2 py-2 text-gray-600 hover:text-brand-yellow"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Admin Dashboard
                  </Link>
                )}
                
                <Link 
                  href="/account" 
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-2 py-2 text-gray-600 hover:text-brand-yellow"
                >
                  <User className="w-5 h-5" />
                  My Account
                </Link>
                
                <Link 
                  href="/orders" 
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-2 py-2 text-gray-600 hover:text-brand-yellow"
                >
                  <ShoppingBag className="w-5 h-5" />
                  My Orders
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-2 py-2 text-red-600 hover:text-red-700 w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/login"
                  onClick={closeMenu}
                  className="flex justify-center items-center py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50"
                >
                  Log In
                </Link>
                <Link 
                  href="/register"
                  onClick={closeMenu}
                  className="flex justify-center items-center py-3 bg-brand-charcoal text-white rounded-xl font-medium hover:bg-gray-800"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile CTA */}
          <div className="pt-2">
            <a 
              href={phoneUrl}
              className="flex justify-center items-center gap-2 w-full py-4 bg-brand-yellow text-brand-charcoal font-bold rounded-xl shadow-lg shadow-brand-yellow/30"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
