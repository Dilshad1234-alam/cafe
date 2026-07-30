"use client";

import { MapPin, Navigation } from "lucide-react";
import { siteConfig } from "@/frontend/data/siteConfig";
import Image from "next/image";

export default function LocationMap() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-charcoal mb-6">
              Find Us Here
            </h2>
            <p className="text-gray-500 mb-8 max-w-md text-lg leading-relaxed">
              We are located in the heart of Gondia. Drop by to grab a quick bite or pick up your takeaway order.
            </p>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 inline-block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-charcoal">{siteConfig.name}</h3>
                  <p className="text-gray-500 text-sm">{siteConfig.address}</p>
                </div>
              </div>
            </div>

            <div>
              <a 
                href={siteConfig.links.googleMaps}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-yellow text-brand-charcoal rounded-xl font-bold hover:bg-[#E5A800] transition-colors"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative w-full h-[400px] md:h-[500px] bg-gray-200 rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
            {/* Map Placeholder Image */}
            <Image 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000"
              alt="Cafe Location Map"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized
            />
            
            {/* Map Overlay and Pin */}
            <div className="absolute inset-0 bg-brand-charcoal/20 group-hover:bg-brand-charcoal/10 transition-colors duration-500"></div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-red text-white rounded-full flex items-center justify-center shadow-2xl mb-2 animate-bounce border-4 border-white">
                <MapPin className="w-8 h-8" />
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-lg font-bold text-brand-charcoal text-sm">
                The Tasty Zone
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
