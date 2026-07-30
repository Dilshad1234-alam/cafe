"use client";

import { Clock, CalendarDays } from "lucide-react";
import { siteConfig } from "@/frontend/data/siteConfig";

export default function BusinessHours() {
  return (
    <section className="py-20 bg-brand-charcoal text-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#ffffff_2px,_transparent_2px)]" style={{ backgroundSize: "32px 32px" }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">Opening Hours</h2>
        
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between max-w-2xl mx-auto gap-8 shadow-2xl">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-yellow/20 rounded-2xl flex items-center justify-center text-brand-yellow">
              <CalendarDays className="w-7 h-7" />
            </div>
            <div className="text-left">
              <p className="text-gray-400 text-sm font-medium mb-1">Days</p>
              <h3 className="font-bold text-xl text-white">Monday – Sunday</h3>
            </div>
          </div>

          <div className="hidden md:block w-px h-16 bg-white/10"></div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-yellow/20 rounded-2xl flex items-center justify-center text-brand-yellow">
              <Clock className="w-7 h-7" />
            </div>
            <div className="text-left">
              <p className="text-gray-400 text-sm font-medium mb-1">Time</p>
              <h3 className="font-bold text-xl text-white">{siteConfig.hours}</h3>
            </div>
          </div>

        </div>

        {/* Static Open Now Badge */}
        <div className="mt-12 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#20bd5a]/10 text-[#20bd5a] border border-[#20bd5a]/20 font-bold tracking-wide">
          <div className="w-3 h-3 rounded-full bg-[#20bd5a] animate-pulse"></div>
          Open Now
        </div>

      </div>
    </section>
  );
}
