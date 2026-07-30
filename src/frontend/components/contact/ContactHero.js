"use client";

import { Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/frontend/data/siteConfig";

export default function ContactHero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-brand-charcoal text-white relative overflow-hidden text-center">
      
      {/* Decorative Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-yellow/15 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <h1 className="font-serif text-5xl md:text-6xl font-black text-brand-yellow mb-6">
          Contact Us
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 font-medium">
          We'd love to hear from you.<br className="hidden md:block"/>
          Whether you have a question, feedback, or want to place an order, we're here to help.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={siteConfig.links.phone}
            className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-brand-charcoal rounded-xl font-bold hover:bg-[#E5A800] transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          <a 
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
