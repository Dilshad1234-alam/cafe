"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Pizza, 
  FolderTree, 
  ShoppingBag, 
  Users, 
  Ticket, 
  Star, 
  Settings,
  ExternalLink,
  CreditCard
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

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:flex md:flex-col h-screen sticky top-0 left-0">
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="block focus:outline-none">
          <h2 className="text-2xl font-black text-brand-yellow tracking-tight">Admin Portal</h2>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive 
                  ? 'bg-brand-yellow text-brand-charcoal shadow-md shadow-brand-yellow/10' 
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
    </aside>
  );
}
