"use client";

import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/frontend/hooks/useAuth';

export default function AdminProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/login?redirect=/admin');
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-10 h-10 bg-brand-charcoal text-white rounded-full flex items-center justify-center font-bold">
          {user.fullname?.charAt(0).toUpperCase() || 'A'}
        </div>
        <div className="hidden sm:flex flex-col items-start mr-2">
          <span className="text-sm font-bold text-gray-900 leading-tight">
            {user.fullname}
          </span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {user.role}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
            <p className="text-sm font-bold text-gray-900">{user.fullname}</p>
            <p className="text-xs font-medium text-gray-500 uppercase">{user.role}</p>
          </div>
          
          <div className="py-1">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-3 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
