"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, LayoutDashboard, Pizza, FolderTree, ShoppingBag, 
  Users, Ticket, Star, Settings, ExternalLink, CreditCard
} from 'lucide-react';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Pizza },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/coupons', label: 'Coupons', icon: Ticket },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-600 hover:text-brand-charcoal hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-72 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Admin Navigation"
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <Link href="/admin" className="focus:outline-none" onClick={() => setIsOpen(false)}>
            <h2 className="text-xl font-black text-brand-yellow tracking-tight">Admin Portal</h2>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-brand-yellow text-brand-charcoal' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" /> 
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-all font-medium w-full"
          >
            <ExternalLink className="w-5 h-5 shrink-0" />
            View Website
          </Link>
        </div>
      </div>
    </div>
  );
}
