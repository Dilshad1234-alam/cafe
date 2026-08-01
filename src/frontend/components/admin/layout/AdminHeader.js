"use client";

import React from 'react';
import AdminMobileNav from './AdminMobileNav';
import AdminProfileMenu from './AdminProfileMenu';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeader() {
  const pathname = usePathname();
  
  // Basic breadcrumb generation based on URL segments
  const segments = pathname.split('/').filter(Boolean);
  
  const breadcrumbs = segments.map((segment, index) => {
    const isLast = index === segments.length - 1;
    const url = `/${segments.slice(0, index + 1).join('/')}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    
    return { label, url, isLast };
  });

  return (
    <header className="bg-white border-b border-gray-100 h-16 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <AdminMobileNav />
        
        {/* Desktop Breadcrumbs */}
        <nav className="hidden md:flex items-center text-sm font-medium text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.url}>
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400 shrink-0" />}
              {crumb.isLast ? (
                <span className="text-brand-charcoal font-bold">{crumb.label}</span>
              ) : (
                <Link href={crumb.url} className="hover:text-brand-charcoal transition-colors">
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <AdminProfileMenu />
      </div>
    </header>
  );
}
