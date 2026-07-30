"use client";

import Link from "next/link";
import { siteConfig } from "@/frontend/data/siteConfig";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-brand-cream border-t border-brand-charcoal/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif font-bold text-3xl text-brand-yellow tracking-wide">{siteConfig.shortName}</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-yellow transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-yellow transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-400 hover:text-brand-yellow text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-brand-yellow shrink-0" />
                <a href={siteConfig.links.phone} className="hover:text-brand-yellow transition-colors">{siteConfig.formattedPhone}</a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Clock className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                <span>{siteConfig.hours}</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Order Now</h3>
            <p className="text-gray-400 text-sm mb-6">
              {siteConfig.deliveryText}
            </p>
            <div className="space-y-3">
              <a 
                href={siteConfig.links.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Order on WhatsApp
              </a>
              <a 
                href={siteConfig.links.googleMaps} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:text-left text-sm text-gray-500">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
