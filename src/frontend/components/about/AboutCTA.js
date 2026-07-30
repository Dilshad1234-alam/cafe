"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/frontend/data/siteConfig";

export default function AboutCTA() {
  return (
    <section className="py-32 bg-brand-yellow relative overflow-hidden">
      
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_center,_#161616_2px,_transparent_2px)]" style={{ backgroundSize: "40px 40px" }}></div>
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-charcoal/5 text-brand-charcoal font-bold tracking-widest text-sm uppercase mb-8 border border-brand-charcoal/10">
          Hungry Yet?
        </div>

        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black text-brand-charcoal mb-8 leading-[1.1]">
          Ready to taste your <br className="hidden md:block"/>
          <span className="relative inline-block">
            next favourite?
            <svg className="absolute w-full h-4 -bottom-1 left-0 text-brand-charcoal/20" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-brand-charcoal/70 font-medium mb-12 max-w-2xl mx-auto">
          Explore our menu and order your cafe favourites today. Fast delivery, hot food, great memories.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/menu"
            className="w-full sm:w-auto px-10 py-5 bg-brand-charcoal text-white rounded-2xl font-bold text-lg hover:bg-gray-900 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(22,22,22,0.2)]"
          >
            View Menu
            <ArrowRight className="w-6 h-6" />
          </Link>
          <a 
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-10 py-5 bg-white text-brand-charcoal rounded-2xl font-bold text-lg hover:bg-gray-50 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 border border-transparent shadow-[0_15px_30px_rgba(255,255,255,0.4)]"
          >
            <MessageCircle className="w-6 h-6 text-[#25D366]" />
            Order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
