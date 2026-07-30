"use client";

import { MapPin, Phone, Mail, ShoppingBag, Truck } from "lucide-react";
import { siteConfig } from "@/frontend/data/siteConfig";

export default function ContactInfo() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Main Info Card */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-8">
              {siteConfig.name}
            </h2>

            <div className="space-y-6 mb-8 flex-grow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 text-brand-yellow flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600 leading-relaxed">{siteConfig.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 text-brand-yellow flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">{siteConfig.formattedPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 text-brand-yellow flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">hello@thetastyzone.com</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <a 
                href={siteConfig.links.phone}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-charcoal text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                <Phone className="w-4 h-4" /> Call
              </a>
              <a 
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20bd5a] transition-colors"
              >
                WhatsApp
              </a>
              <a 
                href={siteConfig.links.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-brand-charcoal rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                <MapPin className="w-4 h-4" /> Directions
              </a>
            </div>
          </div>

          {/* Availability Card */}
          <div className="flex flex-col gap-8">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-2">Takeaway Available</h3>
                <p className="text-gray-500">Pick up your fresh order directly from the cafe.</p>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                <Truck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-2">Delivery Available</h3>
                <p className="text-gray-500">Fast delivery straight to your doorstep.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
